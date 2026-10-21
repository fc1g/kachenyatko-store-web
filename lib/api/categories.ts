import 'server-only';

import { cache } from 'react';

import { get, getOne } from './client';
import type { ToyCategory } from './types';

export const getCategories = cache(() => get<ToyCategory[]>('/categories'));

export const getCategory = cache((slug: string) =>
	getOne<ToyCategory>(`/categories/${encodeURIComponent(slug)}`),
);
