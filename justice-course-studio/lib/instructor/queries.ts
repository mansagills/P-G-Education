import { createSupabaseServerClient } from '@/lib/supabase/server';

export async function getOwnedCourses(ownerUserId: string) {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from('courses')
    .select('id, slug, title, description, status')
    .eq('owner_user_id', ownerUserId)
    .order('created_at', { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return data ?? [];
}

export async function getInstructorCourseSnapshot(courseId: string) {
  const supabase = await createSupabaseServerClient();

  const { data: enrollments, error: enrollmentsError } = await supabase
    .from('enrollments')
    .select('user_id, enrolled_at, profiles:user_id(display_name)')
    .eq('course_id', courseId)
    .order('enrolled_at', { ascending: false });

  if (enrollmentsError) {
    throw new Error(enrollmentsError.message);
  }

  const { data: lessonCompletions, error: completionError } = await supabase
    .from('lesson_completions')
    .select('user_id, lesson_id, completed_at, lessons!inner(module_id, modules!inner(course_id))')
    .eq('lessons.modules.course_id', courseId);

  if (completionError) {
    throw new Error(completionError.message);
  }

  const { data: reflections, error: reflectionsError } = await supabase
    .from('submissions')
    .select('id, user_id, content, created_at, profiles:user_id(display_name), lessons(title)')
    .eq('course_id', courseId)
    .eq('kind', 'reflection')
    .order('created_at', { ascending: false })
    .limit(30);

  if (reflectionsError) {
    throw new Error(reflectionsError.message);
  }

  return {
    enrollments: enrollments ?? [],
    lessonCompletions: lessonCompletions ?? [],
    reflections: reflections ?? []
  };
}
