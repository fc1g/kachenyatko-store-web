import { Suspense } from 'react';
import type { Metadata } from 'next';

import { parseLimit, parsePage } from '@/components/catalog/catalog-params';
import {
	CatalogToys,
	CatalogToysSkeleton,
} from '@/components/catalog/catalog-toys';

export const metadata: Metadata = {
	title: 'Catalog',
};

export default function CatalogPage({ searchParams }: PageProps<'/catalog'>) {
	return (
		<Suspense fallback={<CatalogToysSkeleton />}>
			{searchParams.then(({ page, limit }) => (
				<CatalogToys
					page={parsePage(page)}
					limit={parseLimit(limit)}
					basePath="/catalog"
				/>
			))}
		</Suspense>
	);
}
