import Link from 'next/link';
import { getOptionalUser } from '@/lib/auth/session';

const publicLinks = [
  { href: '/', label: 'Home' },
  { href: '/courses', label: 'Courses' }
] as const;

const studentLinks = [
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/profile', label: 'Profile' },
  { href: '/instructor', label: 'Instructor' }
] as const;

export async function TopNav() {
  const user = await getOptionalUser();

  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-6 py-4">
        <p className="text-lg font-semibold text-brand-700">JusticeCourse Learning</p>
        <nav className="flex flex-wrap items-center gap-2 text-sm">
          {publicLinks.map((link) => (
            <Link key={link.href} href={link.href} className="rounded px-2 py-1 hover:bg-slate-100">
              {link.label}
            </Link>
          ))}
          {user
            ? studentLinks.map((link) => (
                <Link key={link.href} href={link.href} className="rounded px-2 py-1 hover:bg-slate-100">
                  {link.label}
                </Link>
              ))
            : null}
        </nav>
      </div>
    </header>
  );
}
