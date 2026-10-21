import Link from 'next/link';

import { MobileMenu } from './mobile-menu';
import { navLinks } from './nav-links';

export function Header() {
	return (
		<header className="bg-primary text-primary-foreground">
			<div className="mx-auto grid h-14 max-w-7xl grid-cols-[1fr_auto_1fr] items-center gap-8 px-4 md:px-12">
				<Link href="/" className="justify-self-start text-lg font-medium">
					Kachenyatko
				</Link>

				<nav className="hidden md:block">
					<ul className="flex items-center gap-10 text-sm lg:gap-14">
						{navLinks.map(({ href, label }) => (
							<li key={href}>
								<Link
									href={href}
									className="transition-opacity hover:opacity-70"
								>
									{label}
								</Link>
							</li>
						))}
					</ul>
				</nav>

				<MobileMenu />
			</div>
		</header>
	);
}
