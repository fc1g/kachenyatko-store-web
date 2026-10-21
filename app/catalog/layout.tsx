import { Suspense } from 'react';

import { CatalogBreadcrumbs } from '@/components/catalog/catalog-breadcrumbs';
import {
	CategoryFilter,
	CategoryFilterSkeleton,
} from '@/components/catalog/category-filter';
import { DecorativeShape } from '@/components/decorative-shape';
import { Skeleton } from '@/components/ui/skeleton';
import { getCategories } from '@/lib/api/categories';

export default function CatalogLayout({ children }: LayoutProps<'/catalog'>) {
	const categories = getCategories();

	return (
		<section className="relative overflow-x-clip py-12 md:py-16">
			<DecorativeShape
				color="yellow"
				className="top-6 -left-16 h-24 w-20 md:-left-14 md:h-32 md:w-24"
			/>
			<DecorativeShape
				color="pink"
				className="-top-10 right-[8%] h-20 w-28 md:h-28 md:w-44"
			/>

			<div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 md:px-12">
				<Suspense fallback={<Skeleton className="h-5 w-40" />}>
					<CatalogBreadcrumbs categories={categories} />
				</Suspense>

				<h1 className="text-[2.5rem]/tight font-extrabold md:text-[3.5rem]/tight">
					Catalog
				</h1>

				<div className="grid items-start gap-8 lg:grid-cols-[18rem_1fr]">
					<Suspense fallback={<CategoryFilterSkeleton />}>
						<CategoryFilter categories={categories} />
					</Suspense>
					{children}
				</div>
			</div>
		</section>
	);
}
