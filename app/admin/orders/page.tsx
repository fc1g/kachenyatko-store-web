import { Suspense } from 'react';
import type { Metadata } from 'next';

import {
	OrderList,
	OrderListSkeleton,
	OrderTabs,
	parseOrderStatus,
} from '@/components/admin/orders/order-list';
import { parsePage } from '@/components/catalog/catalog-params';

export const metadata: Metadata = {
	title: 'Orders',
};

export default function OrdersPage({
	searchParams,
}: PageProps<'/admin/orders'>) {
	return (
		<div className="flex flex-col gap-6">
			<h1 className="text-3xl font-bold">Orders</h1>

			<Suspense
				fallback={
					<>
						<OrderTabs status={null} />
						<OrderListSkeleton />
					</>
				}
			>
				{searchParams.then(({ status, page }) => {
					const orderStatus = parseOrderStatus(status);
					const orderPage = parsePage(page);

					return (
						<>
							<OrderTabs status={orderStatus} />
							<Suspense
								key={`${orderStatus}-${orderPage}`}
								fallback={<OrderListSkeleton />}
							>
								<OrderList status={orderStatus} page={orderPage} />
							</Suspense>
						</>
					);
				})}
			</Suspense>
		</div>
	);
}
