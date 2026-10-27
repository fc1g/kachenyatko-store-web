'use client';

import { type ChangeEvent, useState, useTransition } from 'react';
import Image from 'next/image';
import { ImagePlusIcon, Trash2Icon } from 'lucide-react';
import { cn } from 'cn';

import { Button } from '@/components/ui/button';
import type { ToyImage } from '@/lib/api/types';

import { addToyImage, removeToyImage } from './actions';
import { IMAGE_TYPES, MAX_IMAGES, validateImage } from './toy-params';

type ToyImagesProps = {
	toyId: string;
	toyName: string;
	images: ToyImage[];
};

export function ToyImages({ toyId, toyName, images }: ToyImagesProps) {
	const [errors, setErrors] = useState<string[]>([]);
	const [progress, setProgress] = useState<string | null>(null);
	const [deletingId, setDeletingId] = useState<string | null>(null);
	const [pending, startTransition] = useTransition();

	const remaining = MAX_IMAGES - images.length;

	function handleFiles(event: ChangeEvent<HTMLInputElement>) {
		const files = Array.from(event.target.files ?? []);
		event.target.value = '';

		const problems = files.map(validateImage).filter(error => error !== null);
		let valid = files.filter(file => validateImage(file) === null);

		if (valid.length > remaining) {
			problems.push(
				`A toy can have at most ${MAX_IMAGES} photos, so only ${remaining} more can be added.`,
			);
			valid = valid.slice(0, remaining);
		}

		setErrors(problems);
		if (valid.length === 0) return;

		startTransition(async () => {
			for (const [i, file] of valid.entries()) {
				setProgress(`Uploading ${i + 1} of ${valid.length}...`);

				const formData = new FormData();
				formData.append('image', file);

				const { error } = await addToyImage(toyId, formData);
				if (error) setErrors(prev => [...prev, error]);
			}
			setProgress(null);
		});
	}

	function handleDelete(imageId: string) {
		setErrors([]);
		setDeletingId(imageId);

		startTransition(async () => {
			const { error } = await removeToyImage(toyId, imageId);
			if (error) setErrors([error]);
			setDeletingId(null);
		});
	}

	return (
		<div className="flex flex-col gap-4">
			<ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">
				{images.map((image, i) => (
					<li
						key={image.id}
						className={cn(
							'relative aspect-square overflow-hidden rounded-lg bg-muted',
							deletingId === image.id && 'opacity-50',
						)}
					>
						<Image
							src={image.url}
							alt={`${toyName}, photo ${i + 1}`}
							fill
							sizes="(min-width: 768px) 20vw, 50vw"
							className="object-cover"
						/>
						{i === 0 && (
							<span className="absolute top-2 left-2 rounded-md bg-white/90 px-2 py-0.5 text-xs font-semibold">
								Cover
							</span>
						)}
						<Button
							type="button"
							variant="secondary"
							size="icon"
							aria-label={`Delete photo ${i + 1}`}
							disabled={pending}
							onClick={() => handleDelete(image.id)}
							className="absolute top-2 right-2"
						>
							<Trash2Icon />
						</Button>
					</li>
				))}

				{remaining > 0 && (
					<li>
						<label
							className={cn(
								'flex aspect-square cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed text-sm text-muted-foreground transition-colors hover:bg-muted has-focus-visible:ring-3 has-focus-visible:ring-ring/50',
								pending && 'pointer-events-none opacity-50',
							)}
						>
							<ImagePlusIcon className="size-6" />
							{progress ?? 'Add photos'}
							<input
								type="file"
								accept={IMAGE_TYPES.join(',')}
								multiple
								disabled={pending}
								onChange={handleFiles}
								className="sr-only"
							/>
						</label>
					</li>
				)}
			</ul>

			<p className="text-sm text-muted-foreground">
				Up to {MAX_IMAGES} photos, JPEG, PNG or WebP, 5 MB each. The first photo
				is the cover. New photos are added at the end.
			</p>

			{errors.length > 0 && (
				<ul role="alert" className="flex flex-col gap-1 text-sm text-error">
					{errors.map((error, i) => (
						<li key={i}>{error}</li>
					))}
				</ul>
			)}
		</div>
	);
}
