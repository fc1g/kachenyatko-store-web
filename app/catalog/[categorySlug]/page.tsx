import { Suspense } from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import {
	CatalogToys,
	CatalogToysSkeleton,
	parsePage,
} from '@/components/catalog/catalog-toys';
import { getCategory } from '@/lib/api/categories';

export async function generateMetadata({
	params,
}: PageProps<'/catalog/[categorySlug]'>): Promise<Metadata> {
	const { categorySlug } = await params;
	const category = await getCategory(categorySlug);
	if (!category) notFound();

	return { title: category.name };
}

export default function CategoryPage({
	params,
	searchParams,
}: PageProps<'/catalog/[categorySlug]'>) {
	return (
		<Suspense fallback={<CatalogToysSkeleton />}>
			{Promise.all([params, searchParams]).then(
				([{ categorySlug }, { page }]) => (
					<CategoryToys slug={categorySlug} page={parsePage(page)} />
				),
			)}
		</Suspense>
	);
}

async function CategoryToys({ slug, page }: { slug: string; page: number }) {
	const category = await getCategory(slug);
	if (!category) notFound();

	return (
		<CatalogToys category={slug} page={page} basePath={`/catalog/${slug}`} />
	);
}
