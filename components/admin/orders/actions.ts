'use server';

import { refresh } from 'next/cache';

import { updateOrderStatus } from '@/lib/api/admin/orders';
import type { OrderStatus } from '@/lib/api/types';

export async function setOrderStatus(id: string, status: OrderStatus) {
	await updateOrderStatus(id, status);
	refresh();
}
