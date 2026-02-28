import { createClient } from '@supabase/supabase-js';

const BUCKET_NAME = 'course-assets';

function createServiceRoleClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceRoleKey) {
    throw new Error('Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY');
  }

  return createClient(url, serviceRoleKey);
}

export async function uploadAssetToStorage(path: string, file: File) {
  const supabase = createServiceRoleClient();
  const { error } = await supabase.storage.from(BUCKET_NAME).upload(path, file, {
    upsert: true,
    contentType: file.type
  });

  if (error) {
    throw error;
  }

  return { bucket: BUCKET_NAME, path };
}
