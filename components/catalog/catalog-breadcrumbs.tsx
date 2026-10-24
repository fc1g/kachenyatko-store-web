'use client';

import { use } from 'react';
import Link from 'next/link';
import { useSelectedLayoutSegment } from 'next/navigation';

import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import type { ToyCategory } from '@/lib/api/types';

type CatalogBreadcrumbsProps = {
	categories?: Promise<ToyCategory[]>;
};

export function CatalogBreadcrumbs({ categories }: CatalogBreadcrumbsProps) {
	const slug = useSelectedLayoutSegment();
	const category =
		slug && categories ? use(categories).find(c => c.slug === slug) : undefined;

	return (
		<Breadcrumb>
			<BreadcrumbList>
				<BreadcrumbItem>
					<BreadcrumbLink render={<Link href="/" />}>Store</BreadcrumbLink>
				</BreadcrumbItem>
				<BreadcrumbSeparator />
				<BreadcrumbItem>
					{category ? (
						<BreadcrumbLink render={<Link href="/catalog" />}>
							Catalog
						</BreadcrumbLink>
					) : (
						<BreadcrumbPage>Catalog</BreadcrumbPage>
					)}
				</BreadcrumbItem>
				{category && (
					<>
						<BreadcrumbSeparator />
						<BreadcrumbItem>
							<BreadcrumbPage>{category.name}</BreadcrumbPage>
						</BreadcrumbItem>
					</>
				)}
			</BreadcrumbList>
		</Breadcrumb>
	);
}
