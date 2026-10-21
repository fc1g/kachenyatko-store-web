'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from 'cn';

import { isNavLinkActive, navLinks } from './nav-links';

export function HeaderNav() {
	return <HeaderNavList pathname={usePathname()} />;
}

export function HeaderNavList({ pathname }: { pathname: string | null }) {
	return (
		<ul className="flex items-center gap-4 text-sm lg:gap-8">
			{navLinks.map(link => {
				const active = isNavLinkActive(link, pathname);

				return (
					<li key={link.href}>
						<Link
							href={link.href}
							aria-current={active ? 'page' : undefined}
							className={cn(
								'block rounded-md px-3 py-1.5 transition-colors',
								active
									? 'bg-secondary text-secondary-foreground'
									: 'hover:bg-white/10',
							)}
						>
							{link.label}
						</Link>
					</li>
				);
			})}
		</ul>
	);
}
