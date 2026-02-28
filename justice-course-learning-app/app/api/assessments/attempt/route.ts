import { NextResponse } from 'next/server';
import { submitAssessmentAttempt } from '@/lib/progress/actions';
import { createSupabaseServerClient } from '@/lib/supabase/server';

export async function POST(request: Request) {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = (await request.json()) as {
    courseId?: string;
    lessonId?: string;
    activityId?: string;
    score?: number;
    passed?: boolean;
    answers?: Record<string, unknown>;
  };

  if (!body.courseId || !body.lessonId || !body.activityId || body.score === undefined || body.passed === undefined) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  const result = await submitAssessmentAttempt({
    userId: user.id,
    courseId: body.courseId,
    lessonId: body.lessonId,
    activityId: body.activityId,
    score: body.score,
    passed: body.passed,
    answers: body.answers ?? {}
  });

  return NextResponse.json(result);
}
