import 'server-only';

import { post } from './client';
import type { Order } from './types';

export type CreateOrderInput = {
	phone: string;
	message: string;
};

export const createToyOrder = (toyId: string, input: CreateOrderInput) =>
	post<Order>(`/toys/${encodeURIComponent(toyId)}/orders`, input);

export const createCustomOrder = (input: CreateOrderInput) =>
	post<Order>('/orders', input);
