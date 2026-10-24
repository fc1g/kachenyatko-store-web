import { type ReactNode, Suspense } from 'react';
import { notFound } from 'next/navigation';

import { ErrorBoundary } from '@/components/error-boundary';
import { ProductCard, ProductCardSkeleton } from '@/components/product-card';
import { SectionMessage } from '@/components/section-message';
import { getToys } from '@/lib/api/toys';
import type { BrandColor } from '@/lib/brand-colors';

import { DEFAULT_LIMIT, MAX_PAGE } from './catalog-params';
import { CatalogPagination } from './catalog-pagination';

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

type CatalogToysProps = {
	page: number;
	limit: number;
	basePath: string;
	category?: string;
};

export function CatalogToys(props: CatalogToysProps) {
	return (
		<ErrorBoundary
			fallback={
				<SectionMessage>
					Couldn&apos;t load toys. Please try again later.
				</SectionMessage>
			}
		>
			<Suspense
				key={`${props.page}-${props.limit}`}
				fallback={<CatalogToysSkeleton count={props.limit} />}
			>
				<CatalogToysList {...props} />
			</Suspense>
		</ErrorBoundary>
	);
}

async function CatalogToysList({
	page,
	limit,
	basePath,
	category,
}: CatalogToysProps) {
	if (page > MAX_PAGE) notFound();

	const result = await getToys({
		limit,
		offset: (page - 1) * limit,
		category,
	});

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
				limit={limit}
				totalPages={Math.ceil(result.total / limit)}
				basePath={basePath}
			/>
		</div>
	);
}

export function CatalogToysSkeleton({ count = DEFAULT_LIMIT }) {
	return (
		<ToysGrid>
			{Array.from({ length: count }, (_, i) => (
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
