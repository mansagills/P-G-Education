import { NextResponse } from 'next/server';
import { enrollInCourse } from '@/lib/progress/actions';
import { createSupabaseServerClient } from '@/lib/supabase/server';

export async function POST(request: Request) {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { courseId } = (await request.json()) as { courseId?: string };

  if (!courseId) {
    return NextResponse.json({ error: 'courseId is required' }, { status: 400 });
  }

  await enrollInCourse(user.id, courseId);
  return NextResponse.json({ ok: true });
}
