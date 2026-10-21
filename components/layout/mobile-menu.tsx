'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu } from 'lucide-react';
import { cn } from 'cn';

import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetTitle,
	SheetTrigger,
} from '@/components/ui/sheet';

import { isNavLinkActive, navLinks } from './nav-links';

export function MobileMenu() {
	return (
		<Sheet modal="trap-focus">
			<SheetTrigger
				aria-label="Open menu"
				className="col-start-3 -m-2 justify-self-end p-2 transition-opacity hover:opacity-70 md:hidden"
			>
				<Menu className="size-6" />
			</SheetTrigger>

			<SheetContent side="right" className="px-6 py-16">
				<SheetTitle className="sr-only">Menu</SheetTitle>
				<MobileNav />
			</SheetContent>
		</Sheet>
	);
}

function MobileNav() {
	const pathname = usePathname();

	return (
		<nav>
			<ul className="-mx-3 flex flex-col gap-2 text-lg">
				{navLinks.map(link => {
					const active = isNavLinkActive(link, pathname);

					return (
						<li key={link.href}>
							<SheetClose
								nativeButton={false}
								render={<Link href={link.href} />}
								aria-current={active ? 'page' : undefined}
								className={cn(
									'block rounded-md px-3 py-2 transition-colors',
									active
										? 'bg-secondary text-secondary-foreground'
										: 'hover:bg-muted',
								)}
							>
								{link.label}
							</SheetClose>
						</li>
					);
				})}
			</ul>
		</nav>
	);
}
