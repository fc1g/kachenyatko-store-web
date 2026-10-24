import type { MetadataRoute } from 'next';

import { getCategories } from '@/lib/api/categories';
import { getToys } from '@/lib/api/toys';
import type { Toy } from '@/lib/api/types';
import { SITE_URL } from '@/lib/site';

const TOYS_PAGE_SIZE = 100;

async function getAllToys() {
	const toys: Toy[] = [];
	let total = Infinity;

	while (toys.length < total) {
		const page = await getToys({
			limit: TOYS_PAGE_SIZE,
			offset: toys.length,
		});
		if (page.items.length === 0) break;

		toys.push(...page.items);
		total = page.total;
	}

	return toys;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const [toys, categories] = await Promise.all([getAllToys(), getCategories()]);
	const url = (path: string) => new URL(path, SITE_URL).href;

	return [
		{ url: url('/'), changeFrequency: 'weekly', priority: 1 },
		{ url: url('/catalog'), changeFrequency: 'weekly', priority: 0.8 },
		{ url: url('/orders/custom'), changeFrequency: 'yearly', priority: 0.5 },
		...categories.map(category => ({
			url: url(`/catalog/${category.slug}`),
			lastModified: category.updated_at,
			priority: 0.7,
		})),
		...toys.map(toy => ({
			url: url(`/toys/${toy.id}`),
			lastModified: toy.updated_at,
			priority: 0.6,
		})),
	];
}
