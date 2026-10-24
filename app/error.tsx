'use client';

import { DecorativeShape } from '@/components/decorative-shape';
import { Button } from '@/components/ui/button';

export default function Error({
	retry,
}: {
	error: unknown;
	retry: () => void;
}) {
	return (
		<section className="relative overflow-x-clip py-24 md:py-32">
			<DecorativeShape
				color="yellow"
				className="top-10 -left-16 h-24 w-20 md:-left-14 md:h-36 md:w-28"
			/>
			<DecorativeShape
				color="pink"
				className="-top-10 right-[10%] h-20 w-28 md:h-28 md:w-44"
			/>

			<div className="mx-auto flex max-w-7xl flex-col items-center px-4 text-center md:px-12">
				<h1 className="text-[1.625rem]/tight font-bold md:text-[2.5rem]/tight">
					Something went wrong
				</h1>
				<p className="mt-4 max-w-xl text-lg md:text-xl">
					We couldn&apos;t load this page. Please try again in a moment.
				</p>
				<Button onClick={retry} className="mt-8 h-12 px-6 text-lg md:mt-10">
					Try again
				</Button>
			</div>
		</section>
	);
}
