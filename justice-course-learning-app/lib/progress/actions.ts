import { createSupabaseServerClient } from '@/lib/supabase/server';
import { awardXp } from '@/lib/xp/award';

export async function enrollInCourse(userId: string, courseId: string) {
  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.from('enrollments').upsert({ user_id: userId, course_id: courseId }, { onConflict: 'user_id,course_id' });
  if (error) {
    throw new Error(error.message);
  }
}

export async function completeActivity(params: {
  userId: string;
  activityId: string;
  courseId: string;
  status?: 'completed' | 'submitted' | 'passed' | 'failed';
  score?: number;
  response?: Record<string, unknown>;
}) {
  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.from('activity_completions').upsert(
    {
      user_id: params.userId,
      activity_id: params.activityId,
      status: params.status ?? 'completed',
      score: params.score,
      response: params.response ?? {},
      xp_awarded: 25
    },
    { onConflict: 'user_id,activity_id' }
  );

  if (error) {
    throw new Error(error.message);
  }

  return awardXp({
    userId: params.userId,
    courseId: params.courseId,
    sourceType: 'activity',
    sourceId: params.activityId,
    ruleKey: 'activity_completion',
    metadata: { status: params.status ?? 'completed' }
  });
}

export async function completeLesson(params: { userId: string; lessonId: string; courseId: string }) {
  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.from('lesson_completions').upsert(
    {
      user_id: params.userId,
      lesson_id: params.lessonId,
      xp_awarded: 50
    },
    { onConflict: 'user_id,lesson_id' }
  );

  if (error) {
    throw new Error(error.message);
  }

  return awardXp({
    userId: params.userId,
    courseId: params.courseId,
    sourceType: 'lesson',
    sourceId: params.lessonId,
    ruleKey: 'lesson_completion'
  });
}

export async function submitReflection(params: {
  userId: string;
  courseId: string;
  lessonId: string;
  activityId: string;
  content: string;
}) {
  const supabase = await createSupabaseServerClient();

  const { error: submissionError } = await supabase.from('submissions').insert({
    user_id: params.userId,
    course_id: params.courseId,
    lesson_id: params.lessonId,
    activity_id: params.activityId,
    kind: 'reflection',
    content: params.content
  });

  if (submissionError) {
    throw new Error(submissionError.message);
  }

  await supabase.from('activity_completions').upsert(
    {
      user_id: params.userId,
      activity_id: params.activityId,
      status: 'submitted',
      response: { contentLength: params.content.length },
      xp_awarded: 30
    },
    { onConflict: 'user_id,activity_id' }
  );

  return awardXp({
    userId: params.userId,
    courseId: params.courseId,
    sourceType: 'reflection',
    sourceId: params.activityId,
    ruleKey: 'reflection_submission'
  });
}

export async function submitAssessmentAttempt(params: {
  userId: string;
  courseId: string;
  lessonId: string;
  activityId: string;
  score: number;
  passed: boolean;
  answers: Record<string, unknown>;
}) {
  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.from('assessment_attempts').insert({
    user_id: params.userId,
    course_id: params.courseId,
    lesson_id: params.lessonId,
    activity_id: params.activityId,
    score: params.score,
    passed: params.passed,
    answers: params.answers
  });

  if (error) {
    throw new Error(error.message);
  }

  await supabase.from('activity_completions').upsert(
    {
      user_id: params.userId,
      activity_id: params.activityId,
      status: params.passed ? 'passed' : 'failed',
      score: params.score,
      response: params.answers,
      xp_awarded: params.passed ? 100 : 0
    },
    { onConflict: 'user_id,activity_id' }
  );

  if (!params.passed) {
    return { xpAwarded: 0, totalXp: 0, level: 1, unlockedAchievements: [] };
  }

  return awardXp({
    userId: params.userId,
    courseId: params.courseId,
    sourceType: 'assessment',
    sourceId: params.activityId,
    ruleKey: 'assessment_pass'
  });
}

export async function submitSimulationResult(params: {
  userId: string;
  courseId: string;
  lessonId: string;
  activityId: string;
  scenarioKey: string;
  score: number;
  outcome: string;
  state: Record<string, unknown>;
}) {
  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.from('simulation_results').insert({
    user_id: params.userId,
    course_id: params.courseId,
    lesson_id: params.lessonId,
    activity_id: params.activityId,
    scenario_key: params.scenarioKey,
    score: params.score,
    outcome: params.outcome,
    state: params.state
  });

  if (error) {
    throw new Error(error.message);
  }

  await supabase.from('activity_completions').upsert(
    {
      user_id: params.userId,
      activity_id: params.activityId,
      status: params.outcome === 'success' ? 'passed' : 'failed',
      score: params.score,
      response: params.state,
      xp_awarded: params.outcome === 'success' ? 75 : 0
    },
    { onConflict: 'user_id,activity_id' }
  );

  if (params.outcome !== 'success') {
    return { xpAwarded: 0, totalXp: 0, level: 1, unlockedAchievements: [] };
  }

  return awardXp({
    userId: params.userId,
    courseId: params.courseId,
    sourceType: 'simulation',
    sourceId: params.activityId,
    ruleKey: 'simulation_success'
  });
}
