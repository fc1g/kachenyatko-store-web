'use client';

import type { ReactNode } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from 'cn';

const links = [
	{ href: '/admin/orders', label: 'Orders' },
	{ href: '/admin/toys', label: 'Toys' },
	{ href: '/admin/categories', label: 'Categories' },
];

type AdminNavProps = {
	ordersBadge?: ReactNode;
};

export function AdminNav(props: AdminNavProps) {
	return <AdminNavList pathname={usePathname()} {...props} />;
}

export function AdminNavList({
	pathname,
	ordersBadge,
}: AdminNavProps & { pathname: string | null }) {
	return (
		<ul className="flex items-center gap-1">
			{links.map(({ href, label }) => {
				const active =
					pathname !== null &&
					(pathname === href || pathname.startsWith(`${href}/`));

				return (
					<li key={href}>
						<Link
							href={href}
							aria-current={active ? 'page' : undefined}
							className={cn(
								'flex items-center gap-2 rounded-md px-3 py-1.5 transition-colors',
								active
									? 'bg-secondary text-secondary-foreground'
									: 'hover:bg-white/10',
							)}
						>
							{label}
							{href === '/admin/orders' && ordersBadge}
						</Link>
					</li>
				);
			})}
		</ul>
	);
}
