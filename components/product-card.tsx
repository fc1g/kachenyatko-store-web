import Image from 'next/image';
import Link from 'next/link';
import { cn } from 'cn';

import { Skeleton } from '@/components/ui/skeleton';
import type { Toy } from '@/lib/api/types';
import { brandBgClasses, type BrandColor } from '@/lib/brand-colors';

type Orientation = 'vertical' | 'horizontal';

type ProductCardProps = {
	toy: Pick<Toy, 'id' | 'name' | 'description' | 'images'>;
	color: BrandColor;
	orientation?: Orientation;
};

function cardClassName(color: BrandColor, orientation: Orientation) {
	return cn(
		'flex flex-col gap-6 rounded-lg p-6 shadow-sm',
		orientation === 'horizontal' && 'sm:flex-row',
		brandBgClasses[color],
	);
}

function imageClassName(orientation: Orientation) {
	return cn(
		'relative aspect-square shrink-0 overflow-hidden rounded-lg bg-white/40',
		orientation === 'horizontal' && 'sm:aspect-4/3 sm:w-1/2',
	);
}

export function ProductCard({
	toy,
	color,
	orientation = 'vertical',
}: ProductCardProps) {
	const image = toy.images.at(0);
	const horizontal = orientation === 'horizontal';

	return (
		<Link
			href={`/toys/${toy.id}`}
			className={cn(
				cardClassName(color, orientation),
				'transition-transform hover:-translate-y-1',
			)}
		>
			<div className={imageClassName(orientation)}>
				{image && (
					<Image
						src={image.url}
						alt={toy.name}
						fill
						sizes={
							horizontal
								? '(min-width: 640px) 50vw, 100vw'
								: '(min-width: 768px) 33vw, 100vw'
						}
						className="object-cover"
					/>
				)}
			</div>

			<div className="flex flex-col gap-3">
				<h3 className="text-xl font-semibold md:text-2xl">{toy.name}</h3>
				<p
					className={cn(
						'text-base',
						horizontal ? 'line-clamp-6' : 'line-clamp-3',
					)}
				>
					{toy.description}
				</p>
			</div>
		</Link>
	);
}

export function ProductCardSkeleton({
	color,
	orientation = 'vertical',
}: Omit<ProductCardProps, 'toy'>) {
	return (
		<div aria-hidden="true" className={cardClassName(color, orientation)}>
			<Skeleton className={imageClassName(orientation)} />

			<div className="flex flex-1 flex-col gap-3">
				<Skeleton className="h-7 w-3/4 bg-white/40 md:h-8" />
				<div className="flex flex-col gap-1">
					<Skeleton className="h-5 bg-white/40" />
					<Skeleton className="h-5 bg-white/40" />
					<Skeleton className="h-5 w-2/3 bg-white/40" />
				</div>
			</div>
		</div>
	);
}
