import { Suspense, type ReactNode } from 'react';

import { ErrorBoundary } from '@/components/error-boundary';
import { ProductCard, ProductCardSkeleton } from '@/components/product-card';
import { getToys } from '@/lib/api/toys';
import type { Toy } from '@/lib/api/types';
import type { BrandColor } from '@/lib/brand-colors';

const COUNT = 4;
const colors: BrandColor[] = ['pink', 'blue', 'yellow'];

export function RelatedToys({ toy }: { toy: Pick<Toy, 'id' | 'category'> }) {
	return (
		<ErrorBoundary fallback={null}>
			<Suspense fallback={<RelatedToysSkeleton />}>
				<RelatedToysList toy={toy} />
			</Suspense>
		</ErrorBoundary>
	);
}

async function RelatedToysList({ toy }: { toy: Pick<Toy, 'id' | 'category'> }) {
	const toys = await getToys({
		limit: COUNT + 1,
		category: toy.category.slug,
	});
	const related = toys.items.filter(t => t.id !== toy.id).slice(0, COUNT);

	if (!related.length) return null;

	return (
		<RelatedToysSection>
			{related.map((t, i) => (
				<ProductCard key={t.id} toy={t} color={colors[i % colors.length]} />
			))}
		</RelatedToysSection>
	);
}

export function RelatedToysSkeleton() {
	return (
		<RelatedToysSection>
			{Array.from({ length: COUNT }, (_, i) => (
				<ProductCardSkeleton key={i} color={colors[i % colors.length]} />
			))}
		</RelatedToysSection>
	);
}

function RelatedToysSection({ children }: { children: ReactNode }) {
	return (
		<section className="mt-8 flex flex-col gap-8">
			<h2 className="text-[2rem]/tight font-bold">Other products</h2>
			<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">{children}</div>
		</section>
	);
}
