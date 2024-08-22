// middlewares/withCookieThemeMiddleware.ts
import { NextResponse } from 'next/server';
import type { NextFetchEvent, NextRequest } from 'next/server';

import { CustomMiddleware } from './chain';

export function withCookieThemeMiddleware(middleware: CustomMiddleware) {
  return async (
    request: NextRequest,
    event: NextFetchEvent,
    response: NextResponse
  ) => {
    const cookieTheme = request.cookies.get('theme')?.value;

    if (!cookieTheme) {
      const response = NextResponse.next();
      response.cookies.set({
        name: 'theme',
        value: 'dark',
        path: '/',
        maxAge: 31536000,
      });
      return response;
    }

    return middleware(request, event, response);
  };
}
