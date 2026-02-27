import { NextResponse } from 'next/server';
import { uploadAssetToStorage } from '@/lib/supabase/storage';

const ALLOWED_TYPES = new Set([
  'application/pdf',
  'application/vnd.openxmlformats-officedocument.presentationml.presentation',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'text/markdown',
  'image/jpeg',
  'image/png',
  'video/mp4',
  'audio/mpeg',
  'audio/wav'
]);

export async function POST(request: Request) {
  const formData = await request.formData();
  const file = formData.get('asset');
  const courseId = String(formData.get('courseId') ?? '').trim();

  if (!courseId) {
    return NextResponse.json({ error: 'courseId is required' }, { status: 400 });
  }

  if (!(file instanceof File)) {
    return NextResponse.json({ error: 'asset file is required' }, { status: 400 });
  }

  if (!ALLOWED_TYPES.has(file.type)) {
    return NextResponse.json({ error: `Unsupported file type: ${file.type}` }, { status: 400 });
  }

  try {
    const path = `${courseId}/${Date.now()}-${file.name}`;
    await uploadAssetToStorage(path, file);

    return NextResponse.json({ message: 'Upload successful', storagePath: path }, { status: 200 });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Upload failed';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
