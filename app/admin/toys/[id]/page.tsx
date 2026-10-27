import { Suspense } from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ExternalLinkIcon } from 'lucide-react';

import { DeleteToyButton } from '@/components/admin/toys/delete-toy-button';
import { ToyForm } from '@/components/admin/toys/toy-form';
import { ToyImages } from '@/components/admin/toys/toy-images';
import { Skeleton } from '@/components/ui/skeleton';
import { getCategories } from '@/lib/api/categories';
import { getToy } from '@/lib/api/toys';

export async function generateMetadata({
	params,
}: PageProps<'/admin/toys/[id]'>): Promise<Metadata> {
	const { id } = await params;
	const toy = await getToy(id);

	return { title: toy ? `Edit ${toy.name}` : 'Toy' };
}

export default function EditToyPage({ params }: PageProps<'/admin/toys/[id]'>) {
	return (
		<Suspense fallback={<EditToySkeleton />}>
			{params.then(({ id }) => (
				<EditToy id={id} />
			))}
		</Suspense>
	);
}

async function EditToy({ id }: { id: string }) {
	const [toy, categories] = await Promise.all([getToy(id), getCategories()]);
	if (!toy) notFound();

	return (
		<div className="flex max-w-2xl flex-col gap-10">
			<div className="flex flex-wrap items-center justify-between gap-4">
				<h1 className="text-3xl font-bold">{toy.name}</h1>
				<Link
					href={`/toys/${toy.id}`}
					target="_blank"
					className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
				>
					View on site
					<ExternalLinkIcon className="size-4" />
				</Link>
			</div>

			<section className="flex flex-col gap-4">
				<h2 className="text-xl font-semibold">Photos</h2>
				<ToyImages toyId={toy.id} toyName={toy.name} images={toy.images} />
			</section>

			<section className="flex flex-col gap-4">
				<h2 className="text-xl font-semibold">Details</h2>
				<ToyForm toy={toy} categories={categories} />
			</section>

			<section className="flex flex-col items-start gap-4 border-t pt-8">
				<h2 className="text-xl font-semibold">Delete toy</h2>
				<p className="text-muted-foreground">
					Toys that have orders can&apos;t be deleted.
				</p>
				<DeleteToyButton toyId={toy.id} toyName={toy.name} />
			</section>
		</div>
	);
}

function EditToySkeleton() {
	return (
		<div aria-hidden="true" className="flex max-w-2xl flex-col gap-10">
			<Skeleton className="h-9 w-64" />
			<div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">
				{Array.from({ length: 3 }, (_, i) => (
					<Skeleton key={i} className="aspect-square rounded-lg" />
				))}
			</div>
			<div className="flex flex-col gap-6">
				<Skeleton className="h-10" />
				<Skeleton className="h-10" />
				<Skeleton className="h-36" />
			</div>
		</div>
	);
}
