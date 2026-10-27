import 'server-only';

import type { Category } from '../types';

import { adminRequest } from './client';

export type CategoryInput = {
	name: string;
};

export function createCategory(input: CategoryInput) {
	return adminRequest<Category>('POST', '/categories', { body: input });
}

export function updateCategory(id: string, input: CategoryInput) {
	return adminRequest<Category>(
		'PUT',
		`/categories/${encodeURIComponent(id)}`,
		{ body: input },
	);
}

export function deleteCategory(id: string) {
	return adminRequest<void>('DELETE', `/categories/${encodeURIComponent(id)}`);
}
