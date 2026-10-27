'use server';

import { updateTag } from 'next/cache';
import { redirect } from 'next/navigation';

import {
	createToy,
	deleteToy,
	deleteToyImage,
	updateToy,
	uploadToyImage,
} from '@/lib/api/admin/toys';
import { toUserMessage } from '@/lib/api/errors';

import {
	type ActionResult,
	MAX_IMAGES,
	TOY_FIELDS,
	type ToyField,
	type ToyFormState,
	type ToyValues,
	validateImage,
} from './toy-params';

function invalidateToys() {
	updateTag('toys');
	updateTag('categories');
}

export async function saveToy(
	_prevState: ToyFormState,
	formData: FormData,
): Promise<ToyFormState> {
	const toyId = String(formData.get('id') ?? '') || null;
	const values = Object.fromEntries(
		Object.keys(TOY_FIELDS).map(field => [
			field,
			String(formData.get(field) ?? '').trim(),
		]),
	) as ToyValues;

	for (const [field, { label, maxLength }] of Object.entries(TOY_FIELDS)) {
		const value = values[field as ToyField];
		if (!value || value.length > maxLength) {
			return {
				status: 'error',
				field: field as ToyField,
				error: value
					? `${label} must be at most ${maxLength} characters.`
					: `Please fill in the ${label.toLowerCase()}.`,
				values,
			};
		}
	}

	let createdId: string | undefined;
	try {
		if (toyId) {
			await updateToy(toyId, values);
		} else {
			createdId = (await createToy(values)).id;
		}
	} catch (error) {
		console.error('Failed to save toy', error);
		return {
			status: 'error',
			error: toUserMessage(error, {
				NOT_FOUND: 'This toy no longer exists.',
			}),
			values,
		};
	}

	invalidateToys();
	if (createdId) redirect(`/admin/toys/${createdId}`);

	return { status: 'saved', values };
}

export async function removeToy(toyId: string): Promise<ActionResult> {
	try {
		await deleteToy(toyId);
	} catch (error) {
		console.error('Failed to delete toy', error);
		return {
			error: toUserMessage(error, {
				CONFLICT:
					"This toy has orders, so it can't be deleted. Its orders keep a link to it.",
				NOT_FOUND: 'This toy has already been deleted.',
			}),
		};
	}

	invalidateToys();
	redirect('/admin/toys');
}

export async function addToyImage(
	toyId: string,
	formData: FormData,
): Promise<ActionResult> {
	const file = formData.get('image');
	if (!(file instanceof File)) return { error: 'Please choose an image.' };

	const error = validateImage(file);
	if (error) return { error };

	try {
		await uploadToyImage(toyId, file);
	} catch (error) {
		console.error('Failed to upload toy image', error);
		return {
			error: `${file.name}: ${toUserMessage(error, {
				CONFLICT: `the toy already has ${MAX_IMAGES} photos.`,
				PAYLOAD_TOO_LARGE: 'the image is too large.',
			})}`,
		};
	}

	invalidateToys();
	return {};
}

export async function removeToyImage(
	toyId: string,
	imageId: string,
): Promise<ActionResult> {
	try {
		await deleteToyImage(toyId, imageId);
	} catch (error) {
		console.error('Failed to delete toy image', error);
		return { error: toUserMessage(error) };
	}

	invalidateToys();
	return {};
}
