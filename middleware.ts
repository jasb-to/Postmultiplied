import { clerkMiddleware } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export default clerkMiddleware(async (auth, req: NextRequest) => {
  // Get the pathname
  const pathname = req.nextUrl.pathname;
  
  // Public routes that don't require auth
  const publicRoutes = [
    '/',
    '/pricing',
    '/how-it-works',
    '/privacy',
    '/terms',
    '/contact',
    '/gallery',
    '/sign-in',
    '/sign-up',
  ];

  // Check if route is public
  const isPublicRoute = publicRoutes.includes(pathname) || pathname.startsWith('/api/webhooks');
  
  // Protect dashboard routes
  if (pathname.startsWith('/dashboard') && !isPublicRoute) {
    const authObj = await auth();
    if (!authObj.userId) {
      const signInUrl = new URL('/sign-in', req.url);
      return NextResponse.redirect(signInUrl);
    }
  }
});

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)', '/dashboard(.*)'],
};
