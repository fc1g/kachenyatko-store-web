'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { cn } from 'cn';
import useEmblaCarousel from 'embla-carousel-react';

import {
	Carousel,
	type CarouselApi,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from '@/components/ui/carousel';
import { Skeleton } from '@/components/ui/skeleton';
import type { Toy } from '@/lib/api/types';

export function ToyGallery({ toy }: { toy: Pick<Toy, 'name' | 'images'> }) {
	const { images } = toy;

	const [api, setApi] = useState<CarouselApi>();
	const [selected, setSelected] = useState(0);
	const [thumbsRef, thumbsApi] = useEmblaCarousel({
		dragFree: true,
		containScroll: 'keepSnaps',
	});

	useEffect(() => {
		if (!api) return;

		const onSelect = () => {
			const index = api.selectedScrollSnap();
			setSelected(index);
			thumbsApi?.scrollTo(index);
		};

		api.on('select', onSelect);
		return () => {
			api.off('select', onSelect);
		};
	}, [api, thumbsApi]);

	if (images.length === 0) {
		return <div className="aspect-square rounded-lg bg-muted" />;
	}

	return (
		<div className="flex flex-col gap-4">
			<Carousel setApi={setApi} opts={{ loop: true }}>
				<CarouselContent>
					{images.map((image, i) => (
						<CarouselItem key={image.id}>
							<div className="relative aspect-square overflow-hidden rounded-lg bg-muted">
								<Image
									src={image.url}
									alt={`${toy.name}, photo ${i + 1}`}
									fill
									fetchPriority={i === 0 ? 'high' : undefined}
									sizes="(min-width: 768px) 50vw, 100vw"
									className="object-cover"
								/>
							</div>
						</CarouselItem>
					))}
				</CarouselContent>

				{images.length > 1 && (
					<>
						<CarouselPrevious className="left-3" />
						<CarouselNext className="right-3" />
					</>
				)}
			</Carousel>

			{images.length > 1 && (
				<div ref={thumbsRef} className="overflow-hidden p-1">
					<div className="-ml-3 flex">
						{images.map((image, i) => (
							<div key={image.id} className="min-w-0 shrink-0 basis-1/5 pl-3">
								<button
									type="button"
									onClick={() => api?.scrollTo(i)}
									aria-label={`Show photo ${i + 1}`}
									aria-current={i === selected}
									className={cn(
										'relative block aspect-square w-full overflow-hidden rounded-lg bg-muted transition-opacity',
										i === selected
											? 'ring-2 ring-foreground ring-offset-2'
											: 'opacity-60 hover:opacity-100',
									)}
								>
									<Image
										src={image.url}
										alt=""
										fill
										sizes="(min-width: 768px) 10vw, 20vw"
										className="object-cover"
									/>
								</button>
							</div>
						))}
					</div>
				</div>
			)}
		</div>
	);
}

const THUMBNAILS_COUNT = 5;

export function ToyGallerySkeleton() {
	return (
		<div className="flex flex-col gap-4">
			<Skeleton className="aspect-square rounded-lg" />

			<div className="p-1">
				<div className="-ml-3 flex">
					{Array.from({ length: THUMBNAILS_COUNT }, (_, i) => (
						<div key={i} className="min-w-0 shrink-0 basis-1/5 pl-3">
							<Skeleton className="aspect-square rounded-lg" />
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
