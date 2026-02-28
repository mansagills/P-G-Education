import { createSupabaseServerClient } from '@/lib/supabase/server';

export async function getUserRoles(userId: string) {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from('user_roles')
    .select('roles:role_id(slug)')
    .eq('user_id', userId);

  if (error) {
    throw new Error(error.message);
  }

  return (
    data
      ?.map((row) => {
        const role = row.roles as { slug?: string } | null;
        return role?.slug ?? '';
      })
      .filter(Boolean) ?? []
  );
}

export async function isInstructorOrAdmin(userId: string) {
  const roles = await getUserRoles(userId);
  return roles.includes('instructor') || roles.includes('admin');
}
