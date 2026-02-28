import { redirect } from 'next/navigation';
import { requireUser } from '@/lib/auth/session';
import { isInstructorOrAdmin } from '@/lib/auth/roles';

export async function requireStudentAccess() {
  return requireUser();
}

export async function requireInstructorAccess() {
  const user = await requireUser();
  const ok = await isInstructorOrAdmin(user.id);

  if (!ok) {
    redirect('/dashboard');
  }

  return user;
}
