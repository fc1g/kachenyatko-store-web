import 'server-only';

import { isUuid } from '@/lib/uuid';

import { ApiError } from '../errors';
import type { Order, OrderStatus, Paginated } from '../types';

import { adminRequest } from './client';

export const ORDERS_PAGE_SIZE = 10;

export function getOrders({
	status,
	page,
}: {
	status: OrderStatus;
	page: number;
}) {
	return adminRequest<Paginated<Order>>('GET', '/orders', {
		query: {
			status,
			limit: ORDERS_PAGE_SIZE,
			offset: (page - 1) * ORDERS_PAGE_SIZE,
		},
	});
}

export async function getOpenOrdersCount() {
	const page = await adminRequest<Paginated<Order>>('GET', '/orders', {
		query: { status: 'open', limit: 1 },
	});
	return page.total;
}

export async function getOrder(id: string) {
	if (!isUuid(id)) return null;

	try {
		return await adminRequest<Order>('GET', `/orders/${id}`);
	} catch (error) {
		if (error instanceof ApiError && error.status === 404) return null;
		throw error;
	}
}

export function updateOrderStatus(id: string, status: OrderStatus) {
	return adminRequest<Order>(
		'PATCH',
		`/orders/${encodeURIComponent(id)}/status`,
		{
			body: { status },
		},
	);
}
