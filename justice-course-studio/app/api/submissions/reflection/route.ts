import { NextResponse } from 'next/server';
import { submitReflection } from '@/lib/progress/actions';
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
    content?: string;
  };

  if (!body.courseId || !body.lessonId || !body.activityId || !body.content?.trim()) {
    return NextResponse.json({ error: 'courseId, lessonId, activityId and content are required' }, { status: 400 });
  }

  const result = await submitReflection({
    userId: user.id,
    courseId: body.courseId,
    lessonId: body.lessonId,
    activityId: body.activityId,
    content: body.content
  });

  return NextResponse.json(result);
}
