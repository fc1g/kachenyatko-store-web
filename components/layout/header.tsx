import { Suspense } from 'react';
import Link from 'next/link';

import { HeaderNav, HeaderNavList } from './header-nav';
import { MobileMenu } from './mobile-menu';

export function Header() {
	return (
		<header className="bg-primary text-primary-foreground">
			<div className="mx-auto grid h-14 max-w-7xl grid-cols-[1fr_auto_1fr] items-center gap-8 px-4 md:px-12">
				<Link href="/" className="justify-self-start text-lg font-medium">
					Kachenyatko
				</Link>

				<nav className="hidden md:block">
					<Suspense fallback={<HeaderNavList pathname={null} />}>
						<HeaderNav />
					</Suspense>
				</nav>

				<MobileMenu />
			</div>
		</header>
	);
}
