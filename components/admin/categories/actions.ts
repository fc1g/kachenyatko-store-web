'use server';

import { updateTag } from 'next/cache';

import {
	createCategory,
	deleteCategory,
	updateCategory,
} from '@/lib/api/admin/categories';
import { toUserMessage } from '@/lib/api/errors';

import {
	type ActionResult,
	type CategoryFormState,
	NAME_MAX_LENGTH,
} from './category-params';

export async function saveCategory(
	_prevState: CategoryFormState,
	formData: FormData,
): Promise<CategoryFormState> {
	const id = String(formData.get('id') ?? '') || null;
	const name = String(formData.get('name') ?? '').trim();

	if (!name) {
		return { status: 'error', error: 'Please enter a category name.', name };
	}

	if (name.length > NAME_MAX_LENGTH) {
		return {
			status: 'error',
			error: `The name must be at most ${NAME_MAX_LENGTH} characters.`,
			name,
		};
	}

	try {
		if (id) {
			await updateCategory(id, { name });
		} else {
			await createCategory({ name });
		}
	} catch (error) {
		console.error('Failed to save category', error);
		return {
			status: 'error',
			error: toUserMessage(error, {
				CONFLICT: 'A category with this name already exists.',
				NOT_FOUND: 'This category no longer exists.',
			}),
			name,
		};
	}

	updateTag('categories');
	if (id) updateTag('toys');

	return { status: 'saved', name: id ? name : '' };
}

export async function removeCategory(id: string): Promise<ActionResult> {
	try {
		await deleteCategory(id);
	} catch (error) {
		console.error('Failed to delete category', error);
		return {
			error: toUserMessage(error, {
				CONFLICT:
					"This category has toys, so it can't be deleted. Move them to another category first.",
				NOT_FOUND: 'This category has already been deleted.',
			}),
		};
	}

	updateTag('categories');
	return {};
}
