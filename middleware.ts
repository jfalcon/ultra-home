import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { SESSION_COOKIE_NAME, SLUG_DASHBOARD } from '@/app/constants';
import type { NextRequest } from 'next/server';
import createMiddleware from 'next-intl/middleware';
import { routing } from '@/i18n';

const protectedRoutes = [`/${SLUG_DASHBOARD}`];
const i18nMiddleware = createMiddleware(routing);

////////////////////////////////////////////////////////////////////////////////////////////////////

async function authMiddleware(request: NextRequest, response: NextResponse) {
  const { pathname } = request.nextUrl;

  // in a production app we would validate this cookie
  const cookieStore = await cookies();
  const hasSession = cookieStore.has(SESSION_COOKIE_NAME);

  const isProtected = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  if (isProtected && !hasSession) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  // allow access to other pages
  return response;
}

////////////////////////////////////////////////////////////////////////////////////////////////////

export default async function middleware(request: NextRequest) {
  const response = i18nMiddleware(request);

  if (response && !response.ok) {
    // response not in the range 200-299 (usually a redirect)
    // no need to execute the auth middleware
    return response;
  }

  return await authMiddleware(request, response);
}

////////////////////////////////////////////////////////////////////////////////////////////////////

export const config = {
  // match all pathnames except for
  // - … if they start with `/api`, `/trpc`, `/_next` or `/_vercel`
  // - … the ones containing a dot (e.g. `favicon.ico`)
  matcher: '/((?!api|trpc|_next|_vercel|.*\\..*).*)'
};

////////////////////////////////////////////////////////////////////////////////////////////////////
