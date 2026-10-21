import 'server-only';

import { isAxiosError } from 'axios';

import { api, get } from './client';
import type { Toy } from './types';

type GetToysParams = {
	limit?: number;
	offset?: number;
	category?: string;
};

export const getToys = (params: GetToysParams = {}) =>
	get<Toy[]>('/toys', params);

export const getBestsellers = (limit: number) =>
	get<Toy[]>('/toys/bestsellers', { limit });

export async function getToy(id: string) {
	try {
		const { data } = await api.get<Toy>(`/toys/${encodeURIComponent(id)}`);
		return data;
	} catch (error) {
		if (isAxiosError(error) && error.response?.status === 404) return null;
		throw error;
	}
}
