import { ProductCard } from '@/components/product-card';
import { mockToys } from '@/lib/api/mock';

export function NewProducts() {
	const toys = mockToys(2);

	return (
		<section id="new-products" className="py-12 md:py-16">
			<div className="mx-auto max-w-7xl px-4 md:px-12">
				<h2 className="text-center text-[2.5rem]/tight font-bold">
					New products
				</h2>

				<div className="mt-10 grid gap-6 lg:grid-cols-2">
					{toys.map(toy => (
						<ProductCard
							key={toy.id}
							toy={toy}
							color="pink"
							orientation="horizontal"
						/>
					))}
				</div>
			</div>
		</section>
	);
}
