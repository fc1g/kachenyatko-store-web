import 'server-only';

import { cacheLife, cacheTag } from 'next/cache';

import { get, getOne } from './client';
import type { Paginated, Toy } from './types';

type GetToysParams = {
	limit?: number;
	offset?: number;
	category?: string;
};

export async function getToys(params: GetToysParams = {}) {
	'use cache';
	cacheLife('hours');
	cacheTag('toys');

	return get<Paginated<Toy>>('/toys', params);
}

export async function getBestsellers(limit: number) {
	'use cache';
	cacheLife('minutes');
	cacheTag('toys');

	return get<Paginated<Toy>>('/toys/bestsellers', { limit });
}

export async function getToy(id: string) {
	'use cache';
	cacheLife('hours');
	cacheTag('toys', `toy:${id}`);

	return getOne<Toy>(`/toys/${encodeURIComponent(id)}`);
}
