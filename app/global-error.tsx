'use client';

import './globals.css';

export default function GlobalError({
	retry,
}: {
	error: unknown;
	retry: () => void;
}) {
	return (
		<html lang="en">
			<body className="flex min-h-svh flex-col items-center justify-center gap-6 px-4 text-center antialiased">
				<h1 className="text-[1.625rem]/tight font-bold md:text-[2.5rem]/tight">
					Something went wrong
				</h1>
				<p className="max-w-xl text-lg md:text-xl">
					We couldn&apos;t load the store. Please try again in a moment.
				</p>
				<button
					type="button"
					onClick={retry}
					className="h-12 rounded-lg bg-primary px-6 text-lg text-primary-foreground"
				>
					Try again
				</button>
			</body>
		</html>
	);
}
