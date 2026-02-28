import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const protectedPrefixes = ['/dashboard', '/learn', '/profile', '/instructor'];

function hasSupabaseAuthCookie(request: NextRequest) {
  return request.cookies
    .getAll()
    .some((cookie) => cookie.name.includes('-auth-token') || cookie.name.startsWith('sb-'));
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isProtected = protectedPrefixes.some((prefix) => pathname.startsWith(prefix));

  if (!isProtected) {
    return NextResponse.next();
  }

  if (hasSupabaseAuthCookie(request)) {
    return NextResponse.next();
  }

  const signInUrl = new URL('/auth/sign-in', request.url);
  signInUrl.searchParams.set('redirectTo', pathname);
  return NextResponse.redirect(signInUrl);
}

export const config = {
  matcher: ['/dashboard/:path*', '/learn/:path*', '/profile/:path*', '/instructor/:path*']
};
