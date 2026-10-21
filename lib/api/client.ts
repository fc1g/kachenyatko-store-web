import 'server-only';

import axios from 'axios';
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
