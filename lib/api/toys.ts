import 'server-only';

import { cache } from 'react';

import { get, getOne } from './client';
import type { Paginated, Toy } from './types';

type GetToysParams = {
	limit?: number;
	offset?: number;
	category?: string;
};

export const getToys = (params: GetToysParams = {}) =>
	get<Paginated<Toy>>('/toys', params);

export const getBestsellers = (limit: number) =>
	get<Toy[]>('/toys/bestsellers', { limit });

export const getToy = cache((id: string) =>
	getOne<Toy>(`/toys/${encodeURIComponent(id)}`),
);
