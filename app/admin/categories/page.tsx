import type { Metadata } from 'next';

import { CategoryForm } from '@/components/admin/categories/category-form';
import { CategoryList } from '@/components/admin/categories/category-list';

export const metadata: Metadata = {
	title: 'Categories',
};

export default function CategoriesPage() {
	return (
		<div className="flex max-w-2xl flex-col gap-8">
			<div className="flex flex-col gap-2">
				<h1 className="text-3xl font-bold">Categories</h1>
				<p className="text-muted-foreground">
					Renaming a category also changes its link on the site. Categories that
					have toys can&apos;t be deleted.
				</p>
			</div>

			<section className="flex flex-col gap-3">
				<h2 className="text-xl font-semibold">New category</h2>
				<CategoryForm />
			</section>

			<section className="flex flex-col gap-3">
				<h2 className="text-xl font-semibold">All categories</h2>
				<CategoryList />
			</section>
		</div>
	);
}
