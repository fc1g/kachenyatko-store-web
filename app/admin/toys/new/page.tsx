import type { Metadata } from 'next';

import { ToyForm } from '@/components/admin/toys/toy-form';
import { getCategories } from '@/lib/api/categories';

export const metadata: Metadata = {
	title: 'New toy',
};

export default async function NewToyPage() {
	const categories = await getCategories();

	return (
		<div className="flex max-w-2xl flex-col gap-6">
			<div className="flex flex-col gap-2">
				<h1 className="text-3xl font-bold">New toy</h1>
				<p className="text-muted-foreground">
					You can add photos right after the toy is created.
				</p>
			</div>

			<ToyForm categories={categories} />
		</div>
	);
}
