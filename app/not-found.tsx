import type { Metadata } from 'next';
import Link from 'next/link';

import { DecorativeShape } from '@/components/decorative-shape';
import { ShopShell } from '@/components/layout/shop-shell';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
	title: 'Page not found',
};

export default function NotFound() {
	return (
		<ShopShell>
			<section className="relative overflow-x-clip py-24 md:py-32">
				<DecorativeShape
					color="yellow"
					className="top-10 -left-16 h-24 w-20 md:-left-14 md:h-36 md:w-28"
				/>
				<DecorativeShape
					color="blue"
					className="-right-10 bottom-8 h-28 w-24 rotate-12 md:right-[6%] md:h-40 md:w-32"
				/>
				<DecorativeShape
					color="pink"
					className="-top-10 right-[10%] h-20 w-28 md:h-28 md:w-44"
				/>

				<div className="mx-auto flex max-w-7xl flex-col items-center px-4 text-center md:px-12">
					<p className="text-[6rem]/none font-extrabold md:text-[10rem]/none">
						404
					</p>
					<h1 className="mt-6 text-[1.625rem]/tight font-bold md:text-[2.5rem]/tight">
						This page has wandered off
					</h1>
					<p className="mt-4 max-w-xl text-lg md:text-xl">
						The page you&apos;re looking for doesn&apos;t exist or has been
						moved. Let&apos;s find you something cuddly instead.
					</p>
					<Button
						nativeButton={false}
						render={<Link href="/" />}
						className="mt-8 h-12 px-6 text-lg md:mt-10"
					>
						Back to home
					</Button>
				</div>
			</section>
		</ShopShell>
	);
}
