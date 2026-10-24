import Link from 'next/link';
import { redirect } from 'next/navigation';
import { cn } from 'cn';

import { getOrders, ORDERS_PAGE_SIZE } from '@/lib/api/admin/orders';
import { getToy } from '@/lib/api/toys';
import type { OrderStatus, Toy } from '@/lib/api/types';

import { OrderCard, OrderCardSkeleton } from './order-card';

const SKELETON_COUNT = 3;

const tabs: { status: OrderStatus; label: string }[] = [
	{ status: 'open', label: 'Open' },
	{ status: 'closed', label: 'Closed' },
];

export function parseOrderStatus(value: unknown): OrderStatus {
	return value === 'closed' ? 'closed' : 'open';
}

function ordersHref(status: OrderStatus, page = 1) {
	const params = new URLSearchParams();
	if (status !== 'open') params.set('status', status);
	if (page > 1) params.set('page', String(page));

	return params.size ? `/admin/orders?${params}` : '/admin/orders';
}

export function OrderTabs({ status }: { status: OrderStatus | null }) {
	return (
		<nav aria-label="Order status" className="flex gap-1 border-b">
			{tabs.map(tab => {
				const active = tab.status === status;

				return (
					<Link
						key={tab.status}
						href={ordersHref(tab.status)}
						aria-current={active ? 'page' : undefined}
						className={cn(
							'-mb-px border-b-2 px-4 py-2 font-medium transition-colors',
							active
								? 'border-foreground'
								: 'border-transparent text-muted-foreground hover:text-foreground',
						)}
					>
						{tab.label}
					</Link>
				);
			})}
		</nav>
	);
}

type OrderListProps = {
	status: OrderStatus;
	page: number;
};

export async function OrderList({ status, page }: OrderListProps) {
	const orders = await getOrders({ status, page });
	const toys = await getOrderToys(orders.items.map(order => order.toy_id));
	const totalPages = Math.ceil(orders.total / ORDERS_PAGE_SIZE);

	if (orders.items.length === 0) {
		if (page > 1) redirect(ordersHref(status, Math.max(totalPages, 1)));

		return (
			<p className="py-12 text-center text-muted-foreground">
				{status === 'open'
					? 'No open orders. All done!'
					: 'No closed orders yet.'}
			</p>
		);
	}

	return (
		<div className="flex flex-col gap-6">
			<div className="flex flex-col gap-4">
				{orders.items.map(order => (
					<OrderCard
						key={order.id}
						order={order}
						toy={(order.toy_id && toys.get(order.toy_id)) || null}
					/>
				))}
			</div>

			{totalPages > 1 && (
				<nav
					aria-label="Pagination"
					className="flex items-center justify-between gap-4"
				>
					<PageLink href={page > 1 ? ordersHref(status, page - 1) : null}>
						Previous
					</PageLink>
					<span className="text-sm text-muted-foreground">
						Page {page} of {totalPages}
					</span>
					<PageLink
						href={page < totalPages ? ordersHref(status, page + 1) : null}
					>
						Next
					</PageLink>
				</nav>
			)}
		</div>
	);
}

async function getOrderToys(toyIds: (string | null)[]) {
	const ids = [...new Set(toyIds.filter(id => id !== null))];
	const toys = await Promise.all(ids.map(id => getToy(id)));

	return new Map(
		toys.filter((toy): toy is Toy => toy !== null).map(toy => [toy.id, toy]),
	);
}

function PageLink({
	href,
	children,
}: {
	href: string | null;
	children: string;
}) {
	const className = 'rounded-md border px-4 py-2 font-medium';

	if (!href) {
		return (
			<span aria-disabled="true" className={cn(className, 'opacity-40')}>
				{children}
			</span>
		);
	}

	return (
		<Link href={href} className={cn(className, 'hover:bg-muted')}>
			{children}
		</Link>
	);
}

export function OrderListSkeleton() {
	return (
		<div className="flex flex-col gap-4">
			{Array.from({ length: SKELETON_COUNT }, (_, i) => (
				<OrderCardSkeleton key={i} />
			))}
		</div>
	);
}
