import { Suspense } from 'react';

import { DecorativeShape } from '@/components/decorative-shape';
import { ToyDetails, ToyDetailsSkeleton } from '@/components/toy/toy-details';

export default function ToyPage({ params }: PageProps<'/toys/[id]'>) {
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

			<div className="mx-auto max-w-7xl px-4 md:px-12">
				<Suspense fallback={<ToyDetailsSkeleton />}>
					{params.then(({ id }) => (
						<ToyDetails id={id} />
					))}
				</Suspense>
			</div>
		</section>
	);
}
