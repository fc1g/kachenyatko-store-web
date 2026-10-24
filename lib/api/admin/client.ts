import 'server-only';

import { cache } from 'react';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import { ACCESS_TOKEN_COOKIE, LOGIN_PATH } from '@/lib/auth';

import { request, type RequestOptions } from '../client';
import { ApiError } from '../errors';
import type { User } from '../types';

type Method = Parameters<typeof request>[0];

export async function adminRequest<T>(
	method: Method,
	path: string,
	options: RequestOptions = {},
) {
	const token = (await cookies()).get(ACCESS_TOKEN_COOKIE)?.value;
	if (!token) redirect(LOGIN_PATH);

	try {
		const { data } = await request<T>(method, path, {
			...options,
			headers: {
				...options.headers,
				Cookie: `${ACCESS_TOKEN_COOKIE}=${token}`,
			},
		});
		return data;
	} catch (error) {
		if (error instanceof ApiError && error.status === 401) {
			redirect(LOGIN_PATH);
		}
		throw error;
	}
}

export const getCurrentUser = cache(() => adminRequest<User>('GET', '/me'));
