'use client';

import { useState, useTransition } from 'react';
import { Trash2Icon } from 'lucide-react';

import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import type { Category } from '@/lib/api/types';

import { removeCategory } from './actions';

export function DeleteCategoryButton({ category }: { category: Category }) {
	const [open, setOpen] = useState(false);
	const [error, setError] = useState<string>();
	const [pending, startTransition] = useTransition();

	function handleOpenChange(next: boolean) {
		setOpen(next);
		if (!next) setError(undefined);
	}

	function handleDelete() {
		startTransition(async () => {
			const { error } = await removeCategory(category.id);
			if (error) {
				setError(error);
			} else {
				setOpen(false);
			}
		});
	}

	return (
		<AlertDialog open={open} onOpenChange={handleOpenChange}>
			<AlertDialogTrigger
				render={
					<Button
						variant="ghost"
						size="icon-lg"
						aria-label={`Delete ${category.name}`}
					/>
				}
			>
				<Trash2Icon />
			</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>
						Delete &ldquo;{category.name}&rdquo;?
					</AlertDialogTitle>
					<AlertDialogDescription>
						Only categories without toys can be deleted. This can&apos;t be
						undone.
					</AlertDialogDescription>
				</AlertDialogHeader>

				{error && (
					<p role="alert" className="text-sm text-error">
						{error}
					</p>
				)}

				<AlertDialogFooter>
					<AlertDialogCancel>Cancel</AlertDialogCancel>
					<AlertDialogAction
						variant="destructive"
						disabled={pending}
						onClick={handleDelete}
					>
						{pending ? 'Deleting...' : 'Delete'}
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}
