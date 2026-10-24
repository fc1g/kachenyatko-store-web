import { Suspense } from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { DecorativeShape } from '@/components/decorative-shape';
import { ToyDetails, ToyDetailsSkeleton } from '@/components/toy/toy-details';
import { getToy } from '@/lib/api/toys';
import { baseOpenGraph } from '@/lib/site';

const META_DESCRIPTION_MAX_LENGTH = 160;
const ELLIPSIS = '...';

function truncate(text: string, maxLength: number) {
	if (text.length <= maxLength) return text;
	return text.slice(0, maxLength - ELLIPSIS.length).trimEnd() + ELLIPSIS;
}

export async function generateMetadata({
	params,
}: PageProps<'/toys/[id]'>): Promise<Metadata> {
	const { id } = await params;
	const toy = await getToy(id);
	if (!toy) notFound();

	const image = toy.images.toSorted((a, b) => a.position - b.position)[0];
	const description = truncate(toy.description, META_DESCRIPTION_MAX_LENGTH);

	return {
		title: toy.name,
		description,
		openGraph: {
			...baseOpenGraph,
			title: toy.name,
			description,
			images: image ? [{ url: image.url, alt: toy.name }] : undefined,
		},
	};
}

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
