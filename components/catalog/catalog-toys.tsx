import { type ReactNode, Suspense } from 'react';
import { notFound } from 'next/navigation';

import { ProductCard, ProductCardSkeleton } from '@/components/product-card';
import { SectionMessage } from '@/components/section-message';
import { getToys } from '@/lib/api/toys';
import type { BrandColor } from '@/lib/brand-colors';

import { CatalogPagination } from './catalog-pagination';

const PAGE_SIZE = 9;

const colors: BrandColor[] = [
	'pink',
	'blue',
	'yellow',
	'blue',
	'pink',
	'yellow',
	'yellow',
	'blue',
	'pink',
];

export function parsePage(value: string | string[] | undefined) {
	const page = Number(value);
	return Number.isInteger(page) && page > 0 ? page : 1;
}

type CatalogToysProps = {
	page: number;
	basePath: string;
	category?: string;
};

export function CatalogToys(props: CatalogToysProps) {
	return (
		<Suspense key={props.page} fallback={<CatalogToysSkeleton />}>
			<CatalogToysList {...props} />
		</Suspense>
	);
}

async function CatalogToysList({ page, basePath, category }: CatalogToysProps) {
	const result = await getToys({
		limit: PAGE_SIZE,
		offset: (page - 1) * PAGE_SIZE,
		category,
	});

	if (!result) {
		return (
			<SectionMessage>
				Couldn&apos;t load toys. Please try again later.
			</SectionMessage>
		);
	}

	if (result.items.length === 0) {
		if (page > 1) notFound();
		return <SectionMessage>No toys here yet. Check back soon!</SectionMessage>;
	}

	return (
		<div className="flex flex-col gap-10">
			<ToysGrid>
				{result.items.map((toy, i) => (
					<ProductCard
						key={toy.id}
						toy={toy}
						color={colors[i % colors.length]}
					/>
				))}
			</ToysGrid>

			<CatalogPagination
				page={page}
				totalPages={Math.ceil(result.total / PAGE_SIZE)}
				basePath={basePath}
			/>
		</div>
	);
}

export function CatalogToysSkeleton() {
	return (
		<ToysGrid>
			{Array.from({ length: PAGE_SIZE }, (_, i) => (
				<ProductCardSkeleton key={i} color={colors[i % colors.length]} />
			))}
		</ToysGrid>
	);
}

function ToysGrid({ children }: { children: ReactNode }) {
	return (
		<div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">{children}</div>
	);
}
