import { notFound, redirect } from 'next/navigation';
import { LearnClient } from '@/components/course/LearnClient';
import { requireStudentAccess } from '@/components/layout/RouteGuard';
import { getCoursePlayerData } from '@/lib/courses/queries';
import { createSupabaseServerClient } from '@/lib/supabase/server';
import { getNextIncompleteLessonId } from '@/lib/progress/nextLesson';

export default async function LearnPage({
  params,
  searchParams
}: {
  params: Promise<{ courseId: string }>;
  searchParams: Promise<{ lesson?: string }>;
}) {
  const user = await requireStudentAccess();
  const { courseId } = await params;
  const { lesson } = await searchParams;

  const course = await getCoursePlayerData(courseId);

  if (!course) {
    notFound();
  }

  const supabase = await createSupabaseServerClient();
  const { data: enrollment } = await supabase
    .from('enrollments')
    .select('id')
    .eq('user_id', user.id)
    .eq('course_id', course.id)
    .maybeSingle();

  if (!enrollment) {
    redirect(`/courses/${course.slug}`);
  }

  const { data: lessonCompletions } = await supabase.from('lesson_completions').select('lesson_id').eq('user_id', user.id);

  const completedLessonIds = (lessonCompletions ?? []).map((row) => row.lesson_id);

  const activeLessonId =
    lesson ??
    getNextIncompleteLessonId(
      {
        modules: course.modules.map((module) => ({
          lessons: module.lessons.map((l) => ({ id: l.id }))
        }))
      },
      completedLessonIds
    );

  if (!activeLessonId) {
    notFound();
  }

  return <LearnClient course={course} completedLessonIds={completedLessonIds} activeLessonId={activeLessonId} />;
}
