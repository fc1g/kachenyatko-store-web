'use server';

import { getErrorMessage, getErrorStatus } from '@/lib/api/client';
import { createCustomOrder, createToyOrder } from '@/lib/api/orders';

import {
	MESSAGE_MAX_LENGTH,
	normalizePhone,
	type OrderFormState,
} from './order-params';

export async function createOrder(
	toyId: string | null,
	_prevState: OrderFormState,
	formData: FormData,
): Promise<OrderFormState> {
	const values = {
		phone: String(formData.get('phone') ?? '').trim(),
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

	if (!toyId && !values.message) {
		return {
			status: 'error',
			field: 'message',
			error: "Please tell us a little about the toy you'd like.",
			values,
		};
	}

	if (values.message.length > MESSAGE_MAX_LENGTH) {
		return {
			status: 'error',
			field: 'message',
			error: `Please keep the description under ${MESSAGE_MAX_LENGTH} characters.`,
			values,
		};
	}

	const input = { phone, message: values.message };

	try {
		await (toyId ? createToyOrder(toyId, input) : createCustomOrder(input));
	} catch (error) {
		console.error('Failed to create order', error);
		return { status: 'error', error: toUserMessage(error), values };
	}

	return { status: 'success' };
}

function toUserMessage(error: unknown) {
	switch (getErrorStatus(error)) {
		case 404:
			return 'This toy is no longer available.';
		case 400:
			return getErrorMessage(error) ?? 'Please check the form and try again.';
		default:
			return 'Something went wrong. Please try again later.';
	}
}
