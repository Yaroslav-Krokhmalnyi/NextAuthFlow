import { NextRequest, NextResponse } from 'next/server';

const privateRoutes = ['/profile', '/notes'];
const publicRoutes = ['/sign-in', '/sign-up'];

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const accessToken = request.cookies.get('accessToken')?.value;

  const isPrivate = privateRoutes.some((r) => pathname.startsWith(r));
  const isPublic = publicRoutes.some((r) => pathname.startsWith(r));

  if (isPrivate && !accessToken) {
    return NextResponse.redirect(new URL('/sign-in', request.url));
  }

  if (isPublic && accessToken) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/profile/:path*', '/notes/:path*', '/sign-in', '/sign-up'],
};
