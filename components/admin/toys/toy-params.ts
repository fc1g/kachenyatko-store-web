export const TOY_FIELDS = {
	name: { label: 'Name', maxLength: 100 },
	category_name: { label: 'Category', maxLength: 100 },
	description: { label: 'Description', maxLength: 2000 },
	size: { label: 'Size', maxLength: 50 },
	materials: { label: 'Materials', maxLength: 255 },
} as const;

export type ToyField = keyof typeof TOY_FIELDS;
export type ToyValues = Record<ToyField, string>;

export const MAX_IMAGES = 5;
export const MAX_IMAGE_SIZE = 5 * 1024 * 1024;
export const IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

export type ToyFormState =
	| { status: 'idle' }
	| { status: 'saved'; values: ToyValues }
	| { status: 'error'; error: string; field?: ToyField; values: ToyValues };

export type ActionResult = { error?: string };

export function validateImage(file: File) {
	if (!IMAGE_TYPES.includes(file.type)) {
		return `${file.name}: only JPEG, PNG and WebP images are supported.`;
	}
	if (file.size > MAX_IMAGE_SIZE) {
		return `${file.name}: the image must be at most 5 MB.`;
	}
	return null;
}
