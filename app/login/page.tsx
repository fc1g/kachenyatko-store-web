import { Suspense } from 'react';
import type { Metadata } from 'next';

import { DecorativeShape } from '@/components/decorative-shape';
import { LoginForm } from '@/components/login/login-form';
import { safeRedirectPath } from '@/lib/auth';

export const metadata: Metadata = {
	title: 'Log in',
	robots: { index: false },
};

export default function LoginPage({ searchParams }: PageProps<'/login'>) {
	return (
		<section className="relative overflow-x-clip py-16 md:py-24">
			<DecorativeShape
				color="yellow"
				className="top-16 -left-16 h-24 w-20 md:top-10 md:-left-14 md:h-32 md:w-24"
			/>
			<DecorativeShape
				color="pink"
				className="-top-10 right-[8%] h-20 w-28 md:h-28 md:w-44"
			/>

			<div className="mx-auto flex max-w-md flex-col gap-8 px-4">
				<div className="flex flex-col gap-2">
					<h1 className="text-[2.5rem]/tight font-extrabold">Welcome back</h1>
					<p className="text-lg text-muted-foreground">
						Log in to manage the store.
					</p>
				</div>

				<Suspense fallback={<LoginForm />}>
					{searchParams.then(({ next }) => (
						<LoginForm next={safeRedirectPath(next)} />
					))}
				</Suspense>
			</div>
		</section>
	);
}
