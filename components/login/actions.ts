'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import { login } from '@/lib/api/auth';
import { getErrorMessage, getErrorStatus } from '@/lib/api/client';
import { ACCESS_TOKEN_COOKIE, safeRedirectPath } from '@/lib/auth';

export type LoginFormState = {
	error?: string;
	email?: string;
};

export async function loginAction(
	_prevState: LoginFormState,
	formData: FormData,
): Promise<LoginFormState> {
	const email = String(formData.get('email') ?? '').trim();
	const password = String(formData.get('password') ?? '');
	const next = safeRedirectPath(formData.get('next'));

	if (!email || !password) {
		return { error: 'Please enter your email and password.', email };
	}

	try {
		const session = await login({ email, password });

		(await cookies()).set(ACCESS_TOKEN_COOKIE, session.accessToken, {
			httpOnly: true,
			secure: process.env.NODE_ENV === 'production',
			sameSite: 'lax',
			path: '/',
			maxAge: session.maxAge,
		});
	} catch (error) {
		console.error('Login failed', error);
		return { error: toUserMessage(error), email };
	}

	redirect(next);
}

function toUserMessage(error: unknown) {
	switch (getErrorStatus(error)) {
		case 401:
			return 'Wrong email or password.';
		case 429:
			return 'Too many login attempts. Please wait a minute and try again.';
		case 400:
			return getErrorMessage(error) ?? 'Please check the form and try again.';
		default:
			return 'Something went wrong. Please try again later.';
	}
}
