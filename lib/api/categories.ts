import 'server-only';

import { cacheLife, cacheTag } from 'next/cache';

import { get, getOne } from './client';
import type { Category, Paginated } from './types';

const CATEGORIES_LIMIT = 100;

export async function getCategories(): Promise<Category[]> {
	'use cache';
	cacheLife('hours');
	cacheTag('categories');

	const page = await get<Paginated<Category>>('/categories', {
		limit: CATEGORIES_LIMIT,
	});
	return page.items;
}

export async function getCategory(slug: string) {
	'use cache';
	cacheLife('hours');
	cacheTag('categories');

	return getOne<Category>(`/categories/${encodeURIComponent(slug)}`);
}
