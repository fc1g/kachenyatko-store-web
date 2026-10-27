import { Suspense } from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { PlusIcon } from 'lucide-react';

import { ToyList, ToyListSkeleton } from '@/components/admin/toys/toy-list';
import { parsePage } from '@/components/catalog/catalog-params';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
	title: 'Toys',
};

export default function ToysPage({ searchParams }: PageProps<'/admin/toys'>) {
	return (
		<div className="flex flex-col gap-6">
			<div className="flex items-center justify-between gap-4">
				<h1 className="text-3xl font-bold">Toys</h1>
				<Button
					nativeButton={false}
					render={<Link href="/admin/toys/new" />}
					size="lg"
					className="px-4"
				>
					<PlusIcon />
					New toy
				</Button>
			</div>

			<Suspense fallback={<ToyListSkeleton />}>
				{searchParams.then(({ page }) => {
					const toysPage = parsePage(page);

					return (
						<Suspense key={toysPage} fallback={<ToyListSkeleton />}>
							<ToyList page={toysPage} />
						</Suspense>
					);
				})}
			</Suspense>
		</div>
	);
}
