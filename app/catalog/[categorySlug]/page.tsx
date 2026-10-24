import { Suspense } from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { parseLimit, parsePage } from '@/components/catalog/catalog-params';
import {
	CatalogToys,
	CatalogToysSkeleton,
} from '@/components/catalog/catalog-toys';
import { getCategory } from '@/lib/api/categories';

export async function generateMetadata({
	params,
}: PageProps<'/catalog/[categorySlug]'>): Promise<Metadata> {
	const { categorySlug } = await params;
	const category = await getCategory(categorySlug);
	if (!category) notFound();

	return {
		title: category.name,
		alternates: { canonical: `/catalog/${category.slug}` },
	};
}

export default function CategoryPage({
	params,
	searchParams,
}: PageProps<'/catalog/[categorySlug]'>) {
	return (
		<Suspense fallback={<CatalogToysSkeleton />}>
			{Promise.all([params, searchParams]).then(
				([{ categorySlug }, { page, limit }]) => (
					<CategoryToys
						slug={categorySlug}
						page={parsePage(page)}
						limit={parseLimit(limit)}
					/>
				),
			)}
		</Suspense>
	);
}

type CategoryToysProps = {
	slug: string;
	page: number;
	limit: number;
};

async function CategoryToys({ slug, page, limit }: CategoryToysProps) {
	const category = await getCategory(slug);
	if (!category) notFound();

	return (
		<CatalogToys
			category={slug}
			page={page}
			limit={limit}
			basePath={`/catalog/${slug}`}
		/>
	);
}
