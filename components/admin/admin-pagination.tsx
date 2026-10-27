import Link from 'next/link';
import { cn } from 'cn';

type AdminPaginationProps = {
	page: number;
	totalPages: number;
	href: (page: number) => string;
};

export function AdminPagination({
	page,
	totalPages,
	href,
}: AdminPaginationProps) {
	if (totalPages <= 1) return null;

	return (
		<nav
			aria-label="Pagination"
			className="flex items-center justify-between gap-4"
		>
			<PageLink href={page > 1 ? href(page - 1) : null}>Previous</PageLink>
			<span className="text-sm text-muted-foreground">
				Page {page} of {totalPages}
			</span>
			<PageLink href={page < totalPages ? href(page + 1) : null}>Next</PageLink>
		</nav>
	);
}

function PageLink({
	href,
	children,
}: {
	href: string | null;
	children: string;
}) {
	const className = 'rounded-md border px-4 py-2 font-medium';

	if (!href) {
		return (
			<span aria-disabled="true" className={cn(className, 'opacity-40')}>
				{children}
			</span>
		);
	}

	return (
		<Link href={href} className={cn(className, 'hover:bg-muted')}>
			{children}
		</Link>
	);
}
