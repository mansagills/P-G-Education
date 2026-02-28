create extension if not exists "pgcrypto";

-- Profiles + roles
create table if not exists profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text,
  avatar_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists roles (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique check (slug in ('student', 'instructor', 'admin')),
  created_at timestamptz not null default now()
);

create table if not exists user_roles (
  user_id uuid not null references auth.users(id) on delete cascade,
  role_id uuid not null references roles(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (user_id, role_id)
);

-- Course content
create table if not exists courses (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  description text not null default '',
  owner_user_id uuid references auth.users(id) on delete set null,
  is_public boolean not null default true,
  status text not null default 'draft' check (status in ('draft', 'published')),
  estimated_minutes integer not null default 60,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists modules (
  id uuid primary key default gen_random_uuid(),
  course_id uuid not null references courses(id) on delete cascade,
  title text not null,
  summary text not null default '',
  position integer not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (course_id, position)
);

create table if not exists lessons (
  id uuid primary key default gen_random_uuid(),
  module_id uuid not null references modules(id) on delete cascade,
  title text not null,
  objective text not null default '',
  estimated_minutes integer not null default 20,
  position integer not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (module_id, position)
);

create table if not exists activities (
  id uuid primary key default gen_random_uuid(),
  lesson_id uuid not null references lessons(id) on delete cascade,
  type text not null check (type in ('reading', 'video', 'timeline', 'primary_source', 'reflection', 'quiz', 'simulation_carpool')),
  title text not null,
  position integer not null,
  payload jsonb not null default '{}'::jsonb,
  xp_reward_override integer,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (lesson_id, position)
);

-- Learner progress
create table if not exists enrollments (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  course_id uuid not null references courses(id) on delete cascade,
  enrolled_at timestamptz not null default now(),
  unique (user_id, course_id)
);

create table if not exists lesson_completions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  lesson_id uuid not null references lessons(id) on delete cascade,
  completed_at timestamptz not null default now(),
  xp_awarded integer not null default 0,
  unique (user_id, lesson_id)
);

create table if not exists activity_completions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  activity_id uuid not null references activities(id) on delete cascade,
  status text not null default 'completed' check (status in ('completed', 'submitted', 'passed', 'failed')),
  score numeric(5,2),
  response jsonb not null default '{}'::jsonb,
  completed_at timestamptz not null default now(),
  xp_awarded integer not null default 0,
  unique (user_id, activity_id)
);

create table if not exists xp_transactions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  course_id uuid not null references courses(id) on delete cascade,
  source_type text not null check (source_type in ('lesson', 'activity', 'simulation', 'assessment', 'reflection', 'achievement')),
  source_id uuid not null,
  rule_key text not null,
  xp_amount integer not null,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  unique (user_id, source_type, source_id, rule_key)
);

create table if not exists achievements (
  id uuid primary key default gen_random_uuid(),
  key text not null unique,
  title text not null,
  description text not null,
  icon text not null default 'badge',
  rule_config jsonb not null default '{}'::jsonb,
  xp_bonus integer not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists user_achievements (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  achievement_id uuid not null references achievements(id) on delete cascade,
  course_id uuid not null references courses(id) on delete cascade,
  awarded_at timestamptz not null default now(),
  unique (user_id, achievement_id, course_id)
);

create table if not exists submissions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  course_id uuid not null references courses(id) on delete cascade,
  lesson_id uuid references lessons(id) on delete set null,
  activity_id uuid references activities(id) on delete set null,
  kind text not null check (kind in ('reflection', 'oral_history')),
  content text not null,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table if not exists assessment_attempts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  course_id uuid not null references courses(id) on delete cascade,
  lesson_id uuid not null references lessons(id) on delete cascade,
  activity_id uuid not null references activities(id) on delete cascade,
  score numeric(5,2) not null,
  passed boolean not null,
  answers jsonb not null default '{}'::jsonb,
  attempted_at timestamptz not null default now()
);

create table if not exists simulation_results (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  course_id uuid not null references courses(id) on delete cascade,
  lesson_id uuid not null references lessons(id) on delete cascade,
  activity_id uuid not null references activities(id) on delete cascade,
  scenario_key text not null,
  score numeric(5,2) not null,
  outcome text not null,
  state jsonb not null default '{}'::jsonb,
  attempted_at timestamptz not null default now()
);

-- Indexes
create index if not exists idx_user_roles_user_id on user_roles(user_id);
create index if not exists idx_courses_owner_user_id on courses(owner_user_id);
create index if not exists idx_modules_course_id on modules(course_id);
create index if not exists idx_lessons_module_id on lessons(module_id);
create index if not exists idx_activities_lesson_id on activities(lesson_id);
create index if not exists idx_enrollments_user_course on enrollments(user_id, course_id);
create index if not exists idx_lesson_completions_user_lesson on lesson_completions(user_id, lesson_id);
create index if not exists idx_activity_completions_user_activity on activity_completions(user_id, activity_id);
create index if not exists idx_xp_transactions_user_course on xp_transactions(user_id, course_id);
create index if not exists idx_xp_transactions_user_created on xp_transactions(user_id, created_at desc);
create index if not exists idx_user_achievements_user_course on user_achievements(user_id, course_id);
create index if not exists idx_submissions_user_course on submissions(user_id, course_id);
create index if not exists idx_submissions_created on submissions(user_id, created_at desc);
create index if not exists idx_assessment_attempts_user_course on assessment_attempts(user_id, course_id);
create index if not exists idx_simulation_results_user_course on simulation_results(user_id, course_id);

-- Helpers
create or replace function public.is_admin(user_uuid uuid)
returns boolean
language sql
stable
as $$
  select exists (
    select 1
    from user_roles ur
    join roles r on r.id = ur.role_id
    where ur.user_id = user_uuid and r.slug = 'admin'
  );
$$;

create or replace function public.is_instructor_for_course(user_uuid uuid, course_uuid uuid)
returns boolean
language sql
stable
as $$
  select exists (
    select 1 from courses c
    where c.id = course_uuid
      and (c.owner_user_id = user_uuid or public.is_admin(user_uuid))
  );
$$;

create or replace function public.can_access_course(user_uuid uuid, course_uuid uuid)
returns boolean
language sql
stable
as $$
  select exists (
    select 1
    from courses c
    where c.id = course_uuid
      and (
        (c.is_public = true and c.status = 'published')
        or c.owner_user_id = user_uuid
        or public.is_admin(user_uuid)
        or exists (
          select 1 from enrollments e
          where e.course_id = c.id and e.user_id = user_uuid
        )
      )
  );
$$;

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  student_role_id uuid;
begin
  insert into public.profiles(id, display_name)
  values (new.id, coalesce(new.raw_user_meta_data ->> 'name', split_part(new.email, '@', 1)))
  on conflict (id) do nothing;

  select id into student_role_id from public.roles where slug = 'student';
  if student_role_id is not null then
    insert into public.user_roles(user_id, role_id)
    values (new.id, student_role_id)
    on conflict do nothing;
  end if;

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row execute function public.handle_new_user();

-- Seed role rows
insert into roles(slug)
values ('student'), ('instructor'), ('admin')
on conflict (slug) do nothing;

alter table profiles enable row level security;
alter table roles enable row level security;
alter table user_roles enable row level security;
alter table courses enable row level security;
alter table modules enable row level security;
alter table lessons enable row level security;
alter table activities enable row level security;
alter table enrollments enable row level security;
alter table lesson_completions enable row level security;
alter table activity_completions enable row level security;
alter table xp_transactions enable row level security;
alter table achievements enable row level security;
alter table user_achievements enable row level security;
alter table submissions enable row level security;
alter table assessment_attempts enable row level security;
alter table simulation_results enable row level security;

-- Profiles / roles
create policy "Users can read own profile"
  on profiles for select
  using (id = auth.uid());

create policy "Users can update own profile"
  on profiles for update
  using (id = auth.uid());

create policy "Roles readable by authenticated"
  on roles for select
  using (auth.uid() is not null);

create policy "User roles own or admin"
  on user_roles for select
  using (user_id = auth.uid() or public.is_admin(auth.uid()));

-- Course content access
create policy "Public can read published courses"
  on courses for select
  using (
    (is_public = true and status = 'published')
    or owner_user_id = auth.uid()
    or public.is_admin(auth.uid())
    or exists (
      select 1 from enrollments e
      where e.course_id = courses.id and e.user_id = auth.uid()
    )
  );

create policy "Instructors can manage owned courses"
  on courses for all
  using (owner_user_id = auth.uid() or public.is_admin(auth.uid()))
  with check (owner_user_id = auth.uid() or public.is_admin(auth.uid()));

create policy "Readable modules when course access granted"
  on modules for select
  using (public.can_access_course(auth.uid(), course_id));

create policy "Owned-course module management"
  on modules for all
  using (public.is_instructor_for_course(auth.uid(), course_id))
  with check (public.is_instructor_for_course(auth.uid(), course_id));

create policy "Readable lessons when course access granted"
  on lessons for select
  using (
    exists (
      select 1
      from modules m
      where m.id = lessons.module_id
        and public.can_access_course(auth.uid(), m.course_id)
    )
  );

create policy "Owned-course lesson management"
  on lessons for all
  using (
    exists (
      select 1 from modules m
      where m.id = lessons.module_id
        and public.is_instructor_for_course(auth.uid(), m.course_id)
    )
  )
  with check (
    exists (
      select 1 from modules m
      where m.id = lessons.module_id
        and public.is_instructor_for_course(auth.uid(), m.course_id)
    )
  );

create policy "Readable activities when course access granted"
  on activities for select
  using (
    exists (
      select 1
      from lessons l
      join modules m on m.id = l.module_id
      where l.id = activities.lesson_id
        and public.can_access_course(auth.uid(), m.course_id)
    )
  );

create policy "Owned-course activity management"
  on activities for all
  using (
    exists (
      select 1
      from lessons l
      join modules m on m.id = l.module_id
      where l.id = activities.lesson_id
        and public.is_instructor_for_course(auth.uid(), m.course_id)
    )
  )
  with check (
    exists (
      select 1
      from lessons l
      join modules m on m.id = l.module_id
      where l.id = activities.lesson_id
        and public.is_instructor_for_course(auth.uid(), m.course_id)
    )
  );

-- Progress
create policy "Users enroll themselves"
  on enrollments for insert
  with check (user_id = auth.uid());

create policy "Users read own enrollments or instructor owned courses"
  on enrollments for select
  using (
    user_id = auth.uid()
    or public.is_instructor_for_course(auth.uid(), course_id)
  );

create policy "Users manage own lesson completions"
  on lesson_completions for all
  using (user_id = auth.uid())
  with check (user_id = auth.uid());

create policy "Instructors read lesson completions for owned courses"
  on lesson_completions for select
  using (
    exists (
      select 1
      from lessons l
      join modules m on m.id = l.module_id
      where l.id = lesson_completions.lesson_id
        and public.is_instructor_for_course(auth.uid(), m.course_id)
    )
  );

create policy "Users manage own activity completions"
  on activity_completions for all
  using (user_id = auth.uid())
  with check (user_id = auth.uid());

create policy "Instructors read activity completions for owned courses"
  on activity_completions for select
  using (
    exists (
      select 1
      from activities a
      join lessons l on l.id = a.lesson_id
      join modules m on m.id = l.module_id
      where a.id = activity_completions.activity_id
        and public.is_instructor_for_course(auth.uid(), m.course_id)
    )
  );

create policy "Users read own xp"
  on xp_transactions for select
  using (user_id = auth.uid());

create policy "Users insert own xp rows"
  on xp_transactions for insert
  with check (user_id = auth.uid());

create policy "Instructors read xp for owned courses"
  on xp_transactions for select
  using (public.is_instructor_for_course(auth.uid(), course_id));

create policy "Achievements readable"
  on achievements for select
  using (true);

create policy "Users read own achievements"
  on user_achievements for select
  using (user_id = auth.uid());

create policy "Users insert own achievements"
  on user_achievements for insert
  with check (user_id = auth.uid());

create policy "Instructors read achievements for owned courses"
  on user_achievements for select
  using (public.is_instructor_for_course(auth.uid(), course_id));

create policy "Users manage own submissions"
  on submissions for all
  using (user_id = auth.uid())
  with check (user_id = auth.uid());

create policy "Instructors read submissions for owned courses"
  on submissions for select
  using (public.is_instructor_for_course(auth.uid(), course_id));

create policy "Users manage own assessment attempts"
  on assessment_attempts for all
  using (user_id = auth.uid())
  with check (user_id = auth.uid());

create policy "Instructors read assessment attempts for owned courses"
  on assessment_attempts for select
  using (public.is_instructor_for_course(auth.uid(), course_id));

create policy "Users manage own simulation results"
  on simulation_results for all
  using (user_id = auth.uid())
  with check (user_id = auth.uid());

create policy "Instructors read simulation results for owned courses"
  on simulation_results for select
  using (public.is_instructor_for_course(auth.uid(), course_id));
