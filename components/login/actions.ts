'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import { login } from '@/lib/api/auth';
import { toUserMessage } from '@/lib/api/errors';
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
		return {
			error: toUserMessage(error, {
				UNAUTHORIZED: 'Wrong email or password.',
				TOO_MANY_REQUESTS:
					'Too many login attempts. Please wait a minute and try again.',
			}),
			email,
		};
	}

	redirect(next);
}
