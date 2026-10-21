import { type NextRequest, NextResponse } from 'next/server';

import { ACCESS_TOKEN_COOKIE, isTokenExpired, LOGIN_PATH } from '@/lib/auth';

export function proxy(request: NextRequest) {
	const token = request.cookies.get(ACCESS_TOKEN_COOKIE)?.value;
	if (token && !isTokenExpired(token)) return NextResponse.next();

	const { pathname, search } = request.nextUrl;
	const loginUrl = new URL(LOGIN_PATH, request.url);
	loginUrl.searchParams.set('next', pathname + search);

	const response = NextResponse.redirect(loginUrl);
	if (token) response.cookies.delete(ACCESS_TOKEN_COOKIE);

	return response;
}

export const config = {
	matcher: '/admin/:path*',
};
