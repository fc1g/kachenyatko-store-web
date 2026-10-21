import Image from 'next/image';
import Link from 'next/link';
import { cn } from 'cn';

import type { Toy } from '@/lib/api/types';
import { brandBgClasses, type BrandColor } from '@/lib/brand-colors';

type ProductCardProps = {
	toy: Pick<Toy, 'id' | 'name' | 'description' | 'images'>;
	color: BrandColor;
	orientation?: 'vertical' | 'horizontal';
};

export function ProductCard({
	toy,
	color,
	orientation = 'vertical',
}: ProductCardProps) {
	const image = toy.images.toSorted((a, b) => a.position - b.position)[0];
	const horizontal = orientation === 'horizontal';

	return (
		<Link
			href={`/catalog/${toy.id}`}
			className={cn(
				'flex flex-col gap-6 rounded-lg p-6 shadow-sm transition-transform hover:-translate-y-1',
				horizontal && 'sm:flex-row',
				brandBgClasses[color],
			)}
		>
			<div
				className={cn(
					'relative aspect-square shrink-0 overflow-hidden rounded-lg bg-white/40',
					horizontal && 'sm:aspect-4/3 sm:w-1/2',
				)}
			>
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
				<h3 className="text-lg font-semibold">{toy.name}</h3>
				<p
					className={cn(
						'text-sm',
						horizontal ? 'line-clamp-6' : 'line-clamp-3',
					)}
				>
					{toy.description}
				</p>
			</div>
		</Link>
	);
}
