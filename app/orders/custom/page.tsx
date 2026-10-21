import type { Metadata } from 'next';

import { DecorativeShape } from '@/components/decorative-shape';
import { OrderForm } from '@/components/order/order-form';

export const metadata: Metadata = {
	title: 'Custom order',
};

export default function CustomOrderPage() {
	return (
		<section className="relative overflow-x-clip py-12 md:py-16">
			<DecorativeShape
				color="yellow"
				className="top-16 -left-16 h-24 w-20 md:top-10 md:-left-14 md:h-32 md:w-24"
			/>
			<DecorativeShape
				color="pink"
				className="-top-10 right-[8%] h-20 w-28 md:h-28 md:w-44"
			/>

			<div className="mx-auto flex max-w-2xl flex-col gap-8 px-4 md:px-12">
				<div className="flex flex-col gap-4">
					<h1 className="text-[2.5rem]/tight font-extrabold">
						Dream it, we&apos;ll make it
					</h1>
					<p className="text-lg">
						Every toy is unique in its own way, and yours can be truly one of a
						kind. Tell us what you have in mind, and we&apos;re here to help
						bring it to life. Once you send the request, we&apos;ll reach out on
						a messenger at the phone number you leave, so don&apos;t worry about
						getting every detail right now: we&apos;ll work it all out together.
						Thank you for your trust!
					</p>
				</div>

				<OrderForm />
			</div>
		</section>
	);
}
