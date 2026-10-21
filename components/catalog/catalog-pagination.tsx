import { ArrowLeftIcon, ArrowRightIcon } from 'lucide-react';
import { cn } from 'cn';

import {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
} from '@/components/ui/pagination';

import { catalogHref } from './catalog-params';

// Pages shown on each side of the current one before collapsing into "..."
const SIBLINGS = 1;

type CatalogPaginationProps = {
	page: number;
	limit: number;
	totalPages: number;
	basePath: string;
};

export function CatalogPagination({
	page,
	limit,
	totalPages,
	basePath,
}: CatalogPaginationProps) {
	if (totalPages <= 1) return null;

	const href = (n: number) => catalogHref(basePath, { page: n, limit });

	return (
		<Pagination>
			<PaginationContent className="gap-2">
				{page > 1 && (
					<PaginationItem>
						<PaginationLink href={href(page - 1)} aria-label="Previous page">
							<ArrowLeftIcon />
						</PaginationLink>
					</PaginationItem>
				)}

				{getPageItems(page, totalPages).map((item, i) =>
					item === 'ellipsis' ? (
						<PaginationItem key={`ellipsis-${i}`}>
							<PaginationEllipsis />
						</PaginationItem>
					) : (
						<PaginationItem key={item}>
							<PaginationLink
								href={href(item)}
								isActive={item === page}
								className={cn(
									'rounded-full',
									item === page && 'border-0 bg-yellow hover:bg-yellow',
								)}
							>
								{item}
							</PaginationLink>
						</PaginationItem>
					),
				)}

				{page < totalPages && (
					<PaginationItem>
						<PaginationLink href={href(page + 1)} aria-label="Next page">
							<ArrowRightIcon />
						</PaginationLink>
					</PaginationItem>
				)}
			</PaginationContent>
		</Pagination>
	);
}

function getPageItems(page: number, totalPages: number) {
	const items: (number | 'ellipsis')[] = [];
	let start = Math.max(2, page - SIBLINGS);
	let end = Math.min(totalPages - 1, page + SIBLINGS);

	if (start === 3) start = 2;
	if (end === totalPages - 2) end = totalPages - 1;

	items.push(1);
	if (start > 2) items.push('ellipsis');
	for (let n = start; n <= end; n++) items.push(n);
	if (end < totalPages - 1) items.push('ellipsis');
	items.push(totalPages);

	return items;
}
