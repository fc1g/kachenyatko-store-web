import 'server-only';

import axios, { isAxiosError } from 'axios';
import { unstable_rethrow } from 'next/navigation';

if (!process.env.API_URL) {
	throw new Error('Missing environment variable: API_URL');
}

const api = axios.create({
	baseURL: process.env.API_URL,
	adapter: 'fetch',
});

export async function get<T>(path: string, params?: object): Promise<T | null> {
	try {
		const { data } = await api.get<T>(path, { params });
		return data;
	} catch (error) {
		unstable_rethrow(error);
		console.error(`GET ${path} failed`, error);
		return null;
	}
}

export async function getOne<T>(path: string): Promise<T | null> {
	try {
		const { data } = await api.get<T>(path);
		return data;
	} catch (error) {
		if (isAxiosError(error) && error.response?.status === 404) return null;
		throw error;
	}
}

export async function post<T>(path: string, body: unknown): Promise<T> {
	const { data } = await api.post<T>(path, body);
	return data;
}

export async function postWithCookies<T>(path: string, body: unknown) {
	const response = await api.post<T>(path, body);
	const setCookie = [response.headers['set-cookie'] ?? []].flat().join(', ');

	return { data: response.data, setCookie };
}

export function getErrorStatus(error: unknown) {
	return isAxiosError(error) ? error.response?.status : undefined;
}

export function getErrorMessage(error: unknown) {
	return isAxiosError<{ message?: string }>(error)
		? error.response?.data?.message
		: undefined;
}
