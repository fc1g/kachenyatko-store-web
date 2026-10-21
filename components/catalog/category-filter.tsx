'use client';

import { use } from 'react';
import Link from 'next/link';
import { useSearchParams, useSelectedLayoutSegment } from 'next/navigation';
import { CheckIcon, ChevronDownIcon } from 'lucide-react';
import { cn } from 'cn';

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuLinkItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Skeleton } from '@/components/ui/skeleton';
import type { ToyCategory } from '@/lib/api/types';

import { catalogHref, parseLimit } from './catalog-params';

const SKELETON_ITEMS_COUNT = 5;

type FilterItem = {
	href: string;
	label: string;
	active: boolean;
};

type CategoryFilterProps = {
	categories: Promise<ToyCategory[] | null>;
};

export function CategoryFilter({ categories }: CategoryFilterProps) {
	const list = use(categories);
	const activeSlug = useSelectedLayoutSegment();
	const limit = parseLimit(useSearchParams().get('limit'));

	const items: FilterItem[] = [
		{
			href: catalogHref('/catalog', { limit }),
			label: 'All toys',
			active: activeSlug === null,
		},
		...(list ?? []).map(category => ({
			href: catalogHref(`/catalog/${category.slug}`, { limit }),
			label: category.name,
			active: category.slug === activeSlug,
		})),
	];

	return (
		<>
			<CategoryDropdown items={items} />
			<CategoryList items={items} />
		</>
	);
}

// Small screens: the list would push the toys too far down
function CategoryDropdown({ items }: { items: FilterItem[] }) {
	const active = items.find(item => item.active) ?? items[0];

	return (
		<div className="lg:hidden">
			<DropdownMenu>
				<DropdownMenuTrigger className="flex h-11 w-full items-center justify-between gap-2 rounded-lg bg-blue/25 px-4 font-medium">
					{active.label}
					<ChevronDownIcon className="size-4 shrink-0" />
				</DropdownMenuTrigger>
				<DropdownMenuContent>
					{items.map(item => (
						<DropdownMenuLinkItem
							key={item.href}
							closeOnClick
							render={<Link href={item.href} />}
							aria-current={item.active ? 'page' : undefined}
							className="justify-between px-3 py-2 text-base"
						>
							{item.label}
							{item.active && <CheckIcon />}
						</DropdownMenuLinkItem>
					))}
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	);
}

function CategoryList({ items }: { items: FilterItem[] }) {
	return (
		<nav
			aria-label="Categories"
			className="hidden min-h-80 rounded-lg bg-blue/25 p-3 lg:block"
		>
			<ul className="flex flex-col gap-1">
				{items.map(item => (
					<li key={item.href}>
						<Link
							href={item.href}
							aria-current={item.active ? 'page' : undefined}
							className={cn(
								'block rounded-md px-3 py-2 transition-colors',
								item.active
									? 'bg-primary font-medium text-primary-foreground'
									: 'hover:bg-blue/30',
							)}
						>
							{item.label}
						</Link>
					</li>
				))}
			</ul>
		</nav>
	);
}

export function CategoryFilterSkeleton() {
	return (
		<div aria-hidden="true">
			<Skeleton className="h-11 rounded-lg lg:hidden" />

			<div className="hidden min-h-80 flex-col gap-1 rounded-lg bg-blue/25 p-3 lg:flex">
				{Array.from({ length: SKELETON_ITEMS_COUNT }, (_, i) => (
					<Skeleton key={i} className="h-10 bg-white/50" />
				))}
			</div>
		</div>
	);
}
