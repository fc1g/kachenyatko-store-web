import { Suspense } from 'react';

import { ProductCard, ProductCardSkeleton } from '@/components/product-card';
import { SectionMessage } from '@/components/section-message';
import { getBestsellers } from '@/lib/api/toys';
import type { BrandColor } from '@/lib/brand-colors';

const COUNT = 3;
const colors: BrandColor[] = ['yellow', 'pink', 'blue'];

export function Bestsellers() {
	return (
		<section id="bestsellers" className="py-12 md:py-16">
			<div className="mx-auto max-w-7xl px-4 md:px-12">
				<h2 className="text-center text-[2.5rem]/tight font-bold">
					Bestsellers
				</h2>

				<div className="mt-10 grid gap-6 md:grid-cols-3">
					<Suspense fallback={<BestsellersSkeleton />}>
						<BestsellersList />
					</Suspense>
				</div>
			</div>
		</section>
	);
}

async function BestsellersList() {
	const toys = await getBestsellers(COUNT);

	if (!toys) {
		return (
			<SectionMessage>
				Couldn&apos;t load bestsellers. Please try again later.
			</SectionMessage>
		);
	}

	if (toys.length === 0) {
		return (
			<SectionMessage>
				Our toys are on their way. Check back soon!
			</SectionMessage>
		);
	}

	return toys.map((toy, i) => (
		<ProductCard key={toy.id} toy={toy} color={colors[i % colors.length]} />
	));
}

function BestsellersSkeleton() {
	return Array.from({ length: COUNT }, (_, i) => (
		<ProductCardSkeleton key={i} color={colors[i % colors.length]} />
	));
}
