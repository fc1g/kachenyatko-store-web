import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Dog } from 'lucide-react';

import farmerFrog from '@/public/farmer-frog.png';
import { Button } from '@/components/ui/button';

export function CustomOrder() {
	return (
		<section id="custom-order" className="py-12 md:py-16">
			<div className="mx-auto flex max-w-5xl items-center gap-10 px-4 md:px-12 lg:gap-12">
				<Image
					src={farmerFrog}
					alt=""
					sizes="(min-width: 1024px) 224px, 176px"
					className="hidden w-44 shrink-0 rotate-15 md:block lg:w-56"
				/>

				<div className="flex flex-1 flex-col gap-6">
					<div className="flex items-center gap-4 md:gap-6">
						<Dog className="size-12 shrink-0" />
						<h2 className="text-[2.5rem]/tight font-bold">Custom orders</h2>
					</div>
					<p className="text-lg/[1.4] font-medium">
						Have a toy in mind that isn&apos;t in our catalog? We&apos;ll knit
						it just for you. Timing depends on how detailed it is, and
						we&apos;ll stay in touch the whole way so it turns out exactly as
						you imagined.
					</p>
					<Button
						nativeButton={false}
						render={<Link href="/orders/custom" />}
						className="mt-2 h-12 self-start px-6 text-lg"
					>
						Order
						<ArrowRight className="size-5" />
					</Button>
				</div>
			</div>
		</section>
	);
}
