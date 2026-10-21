'use client';

import Link from 'next/link';
import { Menu } from 'lucide-react';

import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetTitle,
	SheetTrigger,
} from '@/components/ui/sheet';

import { navLinks } from './nav-links';

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
				<nav>
					<ul className="flex flex-col gap-6 text-lg">
						{navLinks.map(({ href, label }) => (
							<li key={href}>
								<SheetClose
									nativeButton={false}
									render={<Link href={href} />}
									className="transition-opacity hover:opacity-70"
								>
									{label}
								</SheetClose>
							</li>
						))}
					</ul>
				</nav>
			</SheetContent>
		</Sheet>
	);
}
