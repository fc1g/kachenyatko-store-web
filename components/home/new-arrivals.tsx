import { Suspense } from 'react';

import { ProductCard, ProductCardSkeleton } from '@/components/product-card';
import { SectionMessage } from '@/components/section-message';
import { getToys } from '@/lib/api/toys';

const COUNT = 2;

export function NewArrivals() {
	return (
		<section id="new-arrivals" className="py-12 md:py-16">
			<div className="mx-auto max-w-7xl px-4 md:px-12">
				<h2 className="text-center text-[2.5rem]/tight font-bold">
					New arrivals
				</h2>

				<div className="mt-10 grid gap-6 lg:grid-cols-2">
					<Suspense fallback={<NewArrivalsSkeleton />}>
						<NewArrivalsList />
					</Suspense>
				</div>
			</div>
		</section>
	);
}

async function NewArrivalsList() {
	const toys = (await getToys({ limit: COUNT }))?.items;

	if (!toys) {
		return (
			<SectionMessage>
				Couldn&apos;t load new arrivals. Please try again later.
			</SectionMessage>
		);
	}

	if (toys.length === 0) {
		return (
			<SectionMessage>
				New toys are on their way. Check back soon!
			</SectionMessage>
		);
	}

	return toys.map(toy => (
		<ProductCard key={toy.id} toy={toy} color="pink" orientation="horizontal" />
	));
}

function NewArrivalsSkeleton() {
	return Array.from({ length: COUNT }, (_, i) => (
		<ProductCardSkeleton key={i} color="pink" orientation="horizontal" />
	));
}
