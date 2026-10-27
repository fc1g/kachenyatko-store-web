import Image from 'next/image';
import Link from 'next/link';
import { redirect } from 'next/navigation';

import { AdminPagination } from '@/components/admin/admin-pagination';
import { Skeleton } from '@/components/ui/skeleton';
import { getToys } from '@/lib/api/toys';

export const TOYS_PAGE_SIZE = 20;
const SKELETON_COUNT = 5;

function toysHref(page: number) {
	return page > 1 ? `/admin/toys?page=${page}` : '/admin/toys';
}

export async function ToyList({ page }: { page: number }) {
	const toys = await getToys({
		limit: TOYS_PAGE_SIZE,
		offset: (page - 1) * TOYS_PAGE_SIZE,
	});
	const totalPages = Math.ceil(toys.total / TOYS_PAGE_SIZE);

	if (toys.items.length === 0) {
		if (page > 1) redirect(toysHref(Math.max(totalPages, 1)));

		return (
			<p className="py-12 text-center text-muted-foreground">
				No toys yet. Add the first one!
			</p>
		);
	}

	return (
		<div className="flex flex-col gap-6">
			<ul className="flex flex-col divide-y rounded-lg border">
				{toys.items.map(toy => {
					const image = toy.images.at(0);

					return (
						<li key={toy.id}>
							<Link
								href={`/admin/toys/${toy.id}`}
								className="flex items-center gap-4 p-3 transition-colors hover:bg-muted"
							>
								<span className="relative size-14 shrink-0 overflow-hidden rounded-md bg-muted">
									{image && (
										<Image
											src={image.url}
											alt=""
											fill
											sizes="56px"
											className="object-cover"
										/>
									)}
								</span>
								<span className="flex min-w-0 flex-col">
									<span className="truncate font-semibold">{toy.name}</span>
									<span className="text-sm text-muted-foreground">
										{toy.category.name}
									</span>
								</span>
								{!image && (
									<span className="ml-auto shrink-0 rounded-md bg-pink/40 px-2 py-0.5 text-xs font-semibold">
										No photos
									</span>
								)}
							</Link>
						</li>
					);
				})}
			</ul>

			<AdminPagination page={page} totalPages={totalPages} href={toysHref} />
		</div>
	);
}

export function ToyListSkeleton() {
	return (
		<div
			aria-hidden="true"
			className="flex flex-col divide-y rounded-lg border"
		>
			{Array.from({ length: SKELETON_COUNT }, (_, i) => (
				<div key={i} className="flex items-center gap-4 p-3">
					<Skeleton className="size-14 rounded-md" />
					<div className="flex flex-col gap-2">
						<Skeleton className="h-5 w-40" />
						<Skeleton className="h-4 w-24" />
					</div>
				</div>
			))}
		</div>
	);
}
