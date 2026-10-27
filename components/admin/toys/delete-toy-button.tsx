'use client';

import { useState, useTransition } from 'react';

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

import { removeToy } from './actions';

export function DeleteToyButton({
	toyId,
	toyName,
}: {
	toyId: string;
	toyName: string;
}) {
	const [error, setError] = useState<string>();
	const [pending, startTransition] = useTransition();

	function handleDelete() {
		startTransition(async () => {
			const result = await removeToy(toyId);
			setError(result?.error);
		});
	}

	return (
		<AlertDialog onOpenChange={open => !open && setError(undefined)}>
			<AlertDialogTrigger render={<Button variant="destructive" size="lg" />}>
				Delete toy
			</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Delete &ldquo;{toyName}&rdquo;?</AlertDialogTitle>
					<AlertDialogDescription>
						The toy and all its photos will be removed from the site. This
						can&apos;t be undone.
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
