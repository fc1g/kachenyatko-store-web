import Link from 'next/link';
import { ExternalLinkIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { getCategories } from '@/lib/api/categories';

import { CategoryForm } from './category-form';
import { DeleteCategoryButton } from './delete-category-button';

export async function CategoryList() {
	const categories = await getCategories();

	if (categories.length === 0) {
		return (
			<p className="py-12 text-center text-muted-foreground">
				No categories yet. Add the first one above!
			</p>
		);
	}

	return (
		<ul className="flex flex-col divide-y rounded-lg border">
			{categories.map(category => (
				<li key={category.id} className="flex items-start gap-2 p-3">
					<CategoryForm category={category} className="flex-1" />
					<Button
						nativeButton={false}
						render={
							<Link
								href={`/catalog/${category.slug}`}
								target="_blank"
								aria-label={`View ${category.name} on site`}
							/>
						}
						variant="ghost"
						size="icon-lg"
						className="mt-0.5"
					>
						<ExternalLinkIcon />
					</Button>
					<div className="mt-0.5">
						<DeleteCategoryButton category={category} />
					</div>
				</li>
			))}
		</ul>
	);
}
