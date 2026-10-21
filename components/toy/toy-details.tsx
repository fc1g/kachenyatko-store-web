import { notFound } from 'next/navigation';

import { Skeleton } from '@/components/ui/skeleton';
import { getToy } from '@/lib/api/toys';

import { RelatedToys, RelatedToysSkeleton } from './related-toys';
import { ToyBreadcrumbs } from './toy-breadcrumbs';
import { ToyDescription } from './toy-description';
import { ToyGallery } from './toy-gallery';

export async function ToyDetails({ id }: { id: string }) {
	const toy = await getToy(id);
	if (!toy) notFound();

	const specifications = [
		{ label: 'Size', value: toy.size },
		{ label: 'Material', value: toy.materials },
	];

	return (
		<div className="flex flex-col gap-8">
			<ToyBreadcrumbs toy={toy} />

			<article className="grid gap-10 md:grid-cols-2">
				<ToyGallery toy={toy} />

				<div className="flex flex-col gap-10">
					<h1 className="text-[2.5rem]/tight font-bold">{toy.name}</h1>

					<section className="flex flex-col gap-4">
						<h2 className="text-2xl font-semibold">Description</h2>
						<ToyDescription>{toy.description}</ToyDescription>
					</section>

					<section className="flex flex-col gap-4">
						<h2 className="text-2xl font-semibold">Product specifications</h2>
						<dl className="grid grid-cols-[10rem_1fr] gap-y-3">
							{specifications.map(({ label, value }) => (
								<div key={label} className="contents">
									<dt>{label}:</dt>
									<dd className="font-medium">{value}</dd>
								</div>
							))}
						</dl>
					</section>
				</div>
			</article>

			<RelatedToys toy={toy} />
		</div>
	);
}

export function ToyDetailsSkeleton() {
	return (
		<div aria-hidden="true" className="flex flex-col gap-8">
			<Skeleton className="h-5 w-64" />

			<div className="grid gap-10 md:grid-cols-2">
				<Skeleton className="aspect-square rounded-lg" />

				<div className="flex flex-col gap-10">
					<Skeleton className="h-12 w-3/4" />
					<div className="flex flex-col gap-4">
						<Skeleton className="h-8 w-40" />
						<Skeleton className="h-6" />
						<Skeleton className="h-6" />
						<Skeleton className="h-6 w-2/3" />
					</div>
					<div className="flex flex-col gap-3">
						<Skeleton className="h-8 w-64" />
						<Skeleton className="h-6 w-1/2" />
						<Skeleton className="h-6 w-1/2" />
					</div>
				</div>
			</div>

			<RelatedToysSkeleton />
		</div>
	);
}
