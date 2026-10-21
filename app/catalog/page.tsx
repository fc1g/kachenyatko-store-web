import { Suspense } from 'react';
import type { Metadata } from 'next';

import {
	CatalogToys,
	CatalogToysSkeleton,
	parsePage,
} from '@/components/catalog/catalog-toys';

export const metadata: Metadata = {
	title: 'Catalog',
};

export default function CatalogPage({ searchParams }: PageProps<'/catalog'>) {
	return (
		<Suspense fallback={<CatalogToysSkeleton />}>
			{searchParams.then(({ page }) => (
				<CatalogToys page={parsePage(page)} basePath="/catalog" />
			))}
		</Suspense>
	);
}
