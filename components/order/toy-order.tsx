import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { Skeleton } from '@/components/ui/skeleton';
import { getToy } from '@/lib/api/toys';

import { OrderForm } from './order-form';

export async function ToyOrder({ id }: { id: string }) {
	const toy = await getToy(id);
	if (!toy) notFound();

	const image = toy.images.at(0);

	return (
		<div className="flex flex-col gap-8">
			<div className="flex flex-col gap-4">
				<h1 className="text-[2.5rem]/tight font-extrabold">
					Let&apos;s make it yours
				</h1>
				<p className="text-lg">
					Once you place the order, we&apos;ll reach out to you on a messenger
					at the phone number you leave. So don&apos;t worry if you miss
					something now: we&apos;ll have time to talk everything through. Thank
					you for your trust!
				</p>
			</div>

			<Link
				href={`/toys/${toy.id}`}
				className="flex items-center gap-4 self-start rounded-lg bg-muted p-3 pr-6 transition-colors hover:bg-secondary"
			>
				<div className="relative size-16 shrink-0 overflow-hidden rounded-md bg-white">
					{image && (
						<Image
							src={image.url}
							alt=""
							fill
							sizes="64px"
							className="object-cover"
						/>
					)}
				</div>
				<div className="flex flex-col">
					<span className="text-sm text-muted-foreground">
						{toy.category.name}
					</span>
					<span className="text-lg font-semibold">{toy.name}</span>
				</div>
			</Link>

			<OrderForm toyId={toy.id} />
		</div>
	);
}

export function ToyOrderSkeleton() {
	return (
		<div aria-hidden="true" className="flex flex-col gap-8">
			<div className="flex flex-col gap-4">
				<Skeleton className="h-12 w-3/4" />
				<Skeleton className="h-6" />
				<Skeleton className="h-6" />
				<Skeleton className="h-6 w-2/3" />
			</div>
			<Skeleton className="h-22 w-64 rounded-lg" />
			<div className="flex flex-col gap-6">
				<Skeleton className="h-11" />
				<Skeleton className="h-32" />
				<Skeleton className="h-12 w-36" />
			</div>
		</div>
	);
}
