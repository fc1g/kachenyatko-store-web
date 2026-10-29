import 'server-only';

import { post } from './client';
import { clientIPHeaders } from './client-ip';
import type { Order } from './types';

export type CreateOrderInput = {
	phone: string;
	message?: string;
	details?: string;
};

export const createToyOrder = async (toyId: string, input: CreateOrderInput) =>
	post<Order>(
		`/toys/${encodeURIComponent(toyId)}/orders`,
		input,
		await clientIPHeaders(),
	);

export const createCustomOrder = async (input: CreateOrderInput) =>
	post<Order>('/orders', input, await clientIPHeaders());
