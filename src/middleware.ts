// middleware.ts
import { chain } from '@/middlewares/chain';
import { withI18nMiddleware } from '@/middlewares/withI18nMiddleware';
import { withCookieThemeMiddleware } from '@/middlewares/withCookieThemeMiddleware';

export default chain([withI18nMiddleware, withCookieThemeMiddleware]);

export const config = {
  // Matcher ignoring `/_next/` and `/api/`
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
