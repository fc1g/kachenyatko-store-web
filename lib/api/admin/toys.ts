import 'server-only';

import type { Toy, ToyImage } from '../types';

import { adminRequest } from './client';

export type ToyInput = {
	name: string;
	category_name: string;
	description: string;
	size: string;
	materials: string;
};

export function createToy(input: ToyInput) {
	return adminRequest<Toy>('POST', '/toys', { body: input });
}

export function updateToy(id: string, input: ToyInput) {
	return adminRequest<Toy>('PUT', `/toys/${encodeURIComponent(id)}`, {
		body: input,
	});
}

export function deleteToy(id: string) {
	return adminRequest<void>('DELETE', `/toys/${encodeURIComponent(id)}`);
}

export function uploadToyImage(toyId: string, file: File) {
	const body = new FormData();
	body.append('images', file, file.name);

	return adminRequest<ToyImage[]>(
		'POST',
		`/toys/${encodeURIComponent(toyId)}/images`,
		{ body },
	);
}

export function deleteToyImage(toyId: string, imageId: string) {
	return adminRequest<void>(
		'DELETE',
		`/toys/${encodeURIComponent(toyId)}/images/${encodeURIComponent(imageId)}`,
	);
}
