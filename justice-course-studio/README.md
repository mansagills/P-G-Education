# JusticeCourse Learning App (MVP)

Companion learner app for JusticeCourse Studio, built with Next.js + Supabase.

## Stack
- Next.js App Router
- TypeScript
- Tailwind CSS
- Supabase Auth + Postgres + RLS

## Core Learning Routes
- `/` landing
- `/auth/sign-in`
- `/auth/sign-up`
- `/courses`
- `/courses/[courseId]`
- `/dashboard`
- `/learn/[courseId]`
- `/profile`
- `/instructor`
- `/instructor/courses/[courseId]`

## Companion Builder Routes
- `/builder`
- `/assets`
- `/timeline`
- `/sources`

## Environment Variables
Copy `.env.local.example` to `.env.local` and set:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`

## Database Setup
1. Run `database/schema.sql` in Supabase SQL editor.
2. Run `database/seed.sql` to load Montgomery Bus Boycott seed course.

## Grant Instructor Role (Admin SQL)
```sql
insert into user_roles (user_id, role_id)
select u.id, r.id
from auth.users u
join roles r on r.slug = 'instructor'
where u.email = 'teacher@example.com'
on conflict do nothing;
```

## Run Locally
```bash
npm install
npm run dev
```

## Validation Commands
```bash
npm run typecheck
npm run test
npm run build
```

## Notes
- Course content is DB-driven (`courses/modules/lessons/activities`).
- Learner app reads `published` courses from shared Supabase tables.
- XP and achievements are centralized in `lib/xp/*` and `lib/achievements/*`.
