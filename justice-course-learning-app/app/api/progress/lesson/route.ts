import { NextResponse } from 'next/server';
import { completeLesson } from '@/lib/progress/actions';
import { createSupabaseServerClient } from '@/lib/supabase/server';

export async function POST(request: Request) {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = (await request.json()) as { courseId?: string; lessonId?: string };

  if (!body.courseId || !body.lessonId) {
    return NextResponse.json({ error: 'courseId and lessonId are required' }, { status: 400 });
  }

  const result = await completeLesson({ userId: user.id, courseId: body.courseId, lessonId: body.lessonId });

  return NextResponse.json(result);
}
