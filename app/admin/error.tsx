'use client';

import { Button } from '@/components/ui/button';

export default function AdminError({
	retry,
}: {
	error: unknown;
	retry: () => void;
}) {
	return (
		<div className="flex flex-col items-center gap-4 py-16 text-center">
			<h1 className="text-3xl font-bold">Something went wrong</h1>
			<p className="text-muted-foreground">
				The request failed. Please try again in a moment.
			</p>
			<Button onClick={retry}>Try again</Button>
		</div>
	);
}
