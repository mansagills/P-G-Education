import { NextResponse } from 'next/server';
import { submitSimulationResult } from '@/lib/progress/actions';
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
    scenarioKey?: string;
    score?: number;
    outcome?: string;
    state?: Record<string, unknown>;
  };

  if (!body.courseId || !body.lessonId || !body.activityId || body.score === undefined || !body.outcome) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  const result = await submitSimulationResult({
    userId: user.id,
    courseId: body.courseId,
    lessonId: body.lessonId,
    activityId: body.activityId,
    scenarioKey: body.scenarioKey ?? 'default',
    score: body.score,
    outcome: body.outcome,
    state: body.state ?? {}
  });

  return NextResponse.json(result);
}
