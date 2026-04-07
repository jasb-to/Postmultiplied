import { authMiddleware } from '@clerk/nextjs';
import { NextResponse } from 'next/server';

export default authMiddleware({
  publicRoutes: [
    '/',
    '/pricing',
    '/how-it-works',
    '/privacy',
    '/terms',
    '/contact',
    '/gallery',
    '/api/webhooks/stripe',
    '/sign-in',
    '/sign-up',
  ],
  ignoredRoutes: ['/api/webhooks'],
  async afterAuth(auth, req) {
    // Protect dashboard routes
    if (!auth.userId && req.nextUrl.pathname.startsWith('/dashboard')) {
      const signInUrl = new URL('/sign-in', req.url);
      return NextResponse.redirect(signInUrl);
    }
  },
});

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)', '/dashboard(.*)'],
};
