import 'server-only';

import { ApiError } from './errors';
import type { ApiErrorBody } from './types';

const API_URL = process.env.API_URL;
if (!API_URL) {
	throw new Error('Missing environment variable: API_URL');
}

type Query = Record<string, string | number | undefined>;

export type RequestOptions = {
	query?: Query;
	body?: unknown;
	headers?: Record<string, string>;
};

export async function request<T>(
	method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE',
	path: string,
	{ query, body, headers }: RequestOptions = {},
) {
	const url = new URL(API_URL + path);
	for (const [key, value] of Object.entries(query ?? {})) {
		if (value !== undefined) url.searchParams.set(key, String(value));
	}

	const response = await fetch(url, {
		method,
		headers:
			body === undefined
				? headers
				: { ...headers, 'Content-Type': 'application/json' },
		body: body === undefined ? undefined : JSON.stringify(body),
	});

	if (!response.ok) {
		const error = await readJson<Partial<ApiErrorBody>>(response);
		throw new ApiError(response.status, error?.code, error?.message);
	}

	return { data: (await readJson<T>(response)) as T, response };
}

async function readJson<T>(response: Response): Promise<T | undefined> {
	try {
		return (await response.json()) as T;
	} catch {
		return undefined;
	}
}

export async function get<T>(path: string, query?: Query): Promise<T> {
	const { data } = await request<T>('GET', path, { query });
	return data;
}

export async function getOne<T>(path: string): Promise<T | null> {
	try {
		return await get<T>(path);
	} catch (error) {
		if (error instanceof ApiError && error.status === 404) return null;
		throw error;
	}
}

export async function post<T>(path: string, body: unknown): Promise<T> {
	const { data } = await request<T>('POST', path, { body });
	return data;
}

export async function postWithCookies<T>(path: string, body: unknown) {
	const { data, response } = await request<T>('POST', path, { body });
	return { data, cookies: response.headers.getSetCookie() };
}
