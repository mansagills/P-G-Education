import { NextResponse } from 'next/server';
import { completeActivity } from '@/lib/progress/actions';
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
    status?: 'completed' | 'submitted' | 'passed' | 'failed';
    score?: number;
    response?: Record<string, unknown>;
  };

  if (!body.courseId || !body.lessonId || !body.activityId) {
    return NextResponse.json({ error: 'courseId, lessonId, and activityId are required' }, { status: 400 });
  }

  const result = await completeActivity({
    userId: user.id,
    courseId: body.courseId,
    activityId: body.activityId,
    status: body.status,
    score: body.score,
    response: body.response
  });

  return NextResponse.json(result);
}
