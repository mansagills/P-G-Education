import { createSupabaseAdminClient } from '@/lib/supabase/admin';

export async function evaluateAchievementUnlocks(userId: string, courseId: string) {
  const supabase = createSupabaseAdminClient();
  const unlocked: string[] = [];

  const { data: primarySourceCountData } = await supabase
    .from('activity_completions')
    .select('id, activities!inner(type, lesson_id)')
    .eq('user_id', userId)
    .eq('activities.type', 'primary_source');

  const primarySourceCount = primarySourceCountData?.length ?? 0;
  if (primarySourceCount >= 3) {
    unlocked.push('primary_source_analyst');
  }

  const { data: simData } = await supabase
    .from('simulation_results')
    .select('id, outcome')
    .eq('user_id', userId)
    .eq('course_id', courseId)
    .eq('outcome', 'success')
    .limit(1);

  if ((simData?.length ?? 0) > 0) {
    unlocked.push('community_strategist');
  }

  const { data: lessonTotalsData } = await supabase
    .from('lessons')
    .select('id, modules!inner(course_id)')
    .eq('modules.course_id', courseId);

  const totalLessons = lessonTotalsData?.length ?? 0;

  const { data: userCompletedLessons } = await supabase
    .from('lesson_completions')
    .select('id, lessons!inner(module_id, modules!inner(course_id))')
    .eq('user_id', userId)
    .eq('lessons.modules.course_id', courseId);

  const completedLessons = userCompletedLessons?.length ?? 0;

  if (totalLessons > 0 && completedLessons >= totalLessons) {
    unlocked.push('civil_rights_historian');
  }

  return unlocked;
}
