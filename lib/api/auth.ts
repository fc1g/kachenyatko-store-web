import 'server-only';

import { ACCESS_TOKEN_COOKIE, getTokenExpiry } from '@/lib/auth';

import { postWithCookies } from './client';
import { clientIPHeaders } from './client-ip';
import type { User } from './types';

export type LoginInput = {
	email: string;
	password: string;
};

export type Session = {
	user: User;
	accessToken: string;
	maxAge: number;
};

const ACCESS_TOKEN_PATTERN = new RegExp(`^${ACCESS_TOKEN_COOKIE}=([^;]+)`);

export async function login(input: LoginInput): Promise<Session> {
	const { data, cookies } = await postWithCookies<User>(
		'/login',
		input,
		await clientIPHeaders(),
	);

	const accessToken = cookies
		.map(cookie => cookie.match(ACCESS_TOKEN_PATTERN)?.[1])
		.find(Boolean);
	const exp = accessToken ? getTokenExpiry(accessToken) : null;

	if (!accessToken || !exp) {
		throw new Error('Login response has no valid access token cookie');
	}

	const maxAge = exp - Math.floor(Date.now() / 1000);
	return { user: data, accessToken, maxAge };
}
