'use server';

import { toUserMessage } from '@/lib/api/errors';
import { createCustomOrder, createToyOrder } from '@/lib/api/orders';

import {
	DETAILS_MAX_LENGTH,
	MESSAGE_MAX_LENGTH,
	normalizePhone,
	type OrderFormState,
} from './order-params';

export async function createOrder(
	_prevState: OrderFormState,
	formData: FormData,
): Promise<OrderFormState> {
	const toyId = String(formData.get('toyId') ?? '') || null;
	const values = {
		phone: String(formData.get('phone') ?? '').trim(),
		details: String(formData.get('details') ?? '').trim(),
		message: String(formData.get('message') ?? '').trim(),
	};

	const phone = normalizePhone(values.phone);
	if (!phone) {
		return {
			status: 'error',
			field: 'phone',
			error: 'Please enter a valid phone number, e.g. +380 67 123 45 67.',
			values,
		};
	}

	if (!toyId && !values.details) {
		return {
			status: 'error',
			field: 'details',
			error: "Please tell us a little about the toy you'd like.",
			values,
		};
	}

	if (values.details.length > DETAILS_MAX_LENGTH) {
		return {
			status: 'error',
			field: 'details',
			error: `Please keep the description under ${DETAILS_MAX_LENGTH} characters.`,
			values,
		};
	}

	if (values.message.length > MESSAGE_MAX_LENGTH) {
		return {
			status: 'error',
			field: 'message',
			error: `Please keep the comment under ${MESSAGE_MAX_LENGTH} characters.`,
			values,
		};
	}

	const input = {
		phone,
		details: values.details || undefined,
		message: values.message || undefined,
	};

	try {
		await (toyId ? createToyOrder(toyId, input) : createCustomOrder(input));
	} catch (error) {
		console.error('Failed to create order', error);
		return {
			status: 'error',
			error: toUserMessage(error, {
				NOT_FOUND: 'This toy is no longer available.',
				TOO_MANY_REQUESTS:
					"You've placed a lot of orders in a short time. Please try again in a few minutes.",
			}),
			values,
		};
	}

	return { status: 'success' };
}
