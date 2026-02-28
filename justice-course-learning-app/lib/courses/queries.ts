import { createSupabaseServerClient } from '@/lib/supabase/server';

export async function getPublishedCourses() {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from('courses')
    .select('id, slug, title, description, estimated_minutes')
    .eq('status', 'published')
    .eq('is_public', true)
    .order('created_at', { ascending: true });

  if (error) {
    throw new Error(error.message);
  }

  return data ?? [];
}

export async function getCourseDetail(courseIdOrSlug: string) {
  const supabase = await createSupabaseServerClient();
  let courseQuery = supabase
    .from('courses')
    .select('id, slug, title, description, estimated_minutes, status, is_public, owner_user_id')
    .eq('status', 'published');

  courseQuery = courseIdOrSlug.includes('-') ? courseQuery.eq('slug', courseIdOrSlug) : courseQuery.eq('id', courseIdOrSlug);

  const { data: course, error: courseError } = await courseQuery.maybeSingle();

  if (courseError) {
    throw new Error(courseError.message);
  }

  if (!course) {
    return null;
  }

  const { data: modules, error: modulesError } = await supabase
    .from('modules')
    .select('id, title, summary, position, lessons(id, title, objective, position, estimated_minutes)')
    .eq('course_id', course.id)
    .order('position', { ascending: true });

  if (modulesError) {
    throw new Error(modulesError.message);
  }

  return {
    ...course,
    modules: (modules ?? []).map((module) => ({
      ...module,
      lessons: (module.lessons ?? []).sort((a, b) => a.position - b.position)
    }))
  };
}

export async function getCoursePlayerData(courseIdOrSlug: string) {
  const supabase = await createSupabaseServerClient();

  const { data: course, error: courseError } = await supabase
    .from('courses')
    .select('id, slug, title, description, estimated_minutes')
    .or(`id.eq.${courseIdOrSlug},slug.eq.${courseIdOrSlug}`)
    .maybeSingle();

  if (courseError) {
    throw new Error(courseError.message);
  }

  if (!course) {
    return null;
  }

  const { data: modules, error: modulesError } = await supabase
    .from('modules')
    .select(
      'id, course_id, title, summary, position, lessons(id, module_id, title, objective, position, estimated_minutes, activities(id, lesson_id, type, title, position, payload))'
    )
    .eq('course_id', course.id)
    .order('position', { ascending: true });

  if (modulesError) {
    throw new Error(modulesError.message);
  }

  return {
    ...course,
    modules: (modules ?? []).map((module) => ({
      ...module,
      lessons: (module.lessons ?? [])
        .sort((a, b) => a.position - b.position)
        .map((lesson) => ({
          ...lesson,
          activities: (lesson.activities ?? []).sort((a, b) => a.position - b.position)
        }))
    }))
  };
}
