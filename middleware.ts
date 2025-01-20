import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Check if the user is authenticated via cookies
  const isAuthenticated = request.cookies.get('isAuthenticated')?.value === 'true';
  const isLoginPage = request.nextUrl.pathname === '/login';

  if (!isAuthenticated && !isLoginPage) {
    // Redirect unauthenticated users to the login page
    return NextResponse.redirect(new URL('/login', request.url));
  }

  if (isAuthenticated && isLoginPage) {
    // Redirect authenticated users away from the login page to the dashboard
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  // Allow access to the requested page
  return NextResponse.next();
}

export const config = {
  matcher: [
    // Apply middleware to all pages except API routes and static files
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
