import { Suspense } from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { DecorativeShape } from '@/components/decorative-shape';
import { ToyOrder, ToyOrderSkeleton } from '@/components/order/toy-order';
import { getToy } from '@/lib/api/toys';

export async function generateMetadata({
	params,
}: PageProps<'/toys/[id]/order'>): Promise<Metadata> {
	const { id } = await params;
	const toy = await getToy(id);
	if (!toy) notFound();

	return {
		title: `Order ${toy.name}`,
		robots: { index: false },
	};
}

export default function OrderPage({ params }: PageProps<'/toys/[id]/order'>) {
	return (
		<section className="relative overflow-x-clip py-12 md:py-16">
			<DecorativeShape
				color="yellow"
				className="top-16 -left-16 h-24 w-20 md:top-10 md:-left-14 md:h-32 md:w-24"
			/>
			<DecorativeShape
				color="pink"
				className="-top-10 right-[8%] h-20 w-28 md:h-28 md:w-44"
			/>

			<div className="mx-auto max-w-2xl px-4 md:px-12">
				<Suspense fallback={<ToyOrderSkeleton />}>
					{params.then(({ id }) => (
						<ToyOrder id={id} />
					))}
				</Suspense>
			</div>
		</section>
	);
}
