import { Suspense } from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeftIcon } from 'lucide-react';

import {
	OrderCard,
	OrderCardSkeleton,
} from '@/components/admin/orders/order-card';
import { getOrder } from '@/lib/api/admin/orders';
import { getToy } from '@/lib/api/toys';

export const metadata: Metadata = {
	title: 'Order',
};

export default function OrderPage({ params }: PageProps<'/admin/orders/[id]'>) {
	return (
		<div className="flex flex-col gap-6">
			<Link
				href="/admin/orders"
				className="flex items-center gap-2 self-start text-muted-foreground hover:text-foreground"
			>
				<ArrowLeftIcon className="size-4" />
				All orders
			</Link>

			<Suspense fallback={<OrderCardSkeleton />}>
				{params.then(({ id }) => (
					<OrderDetails id={id} />
				))}
			</Suspense>
		</div>
	);
}

async function OrderDetails({ id }: { id: string }) {
	const order = await getOrder(id);
	if (!order) notFound();

	const toy = order.toy_id ? await getToy(order.toy_id) : null;

	return <OrderCard order={order} toy={toy} />;
}
