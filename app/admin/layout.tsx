import { Suspense } from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';

import { AdminNav, AdminNavList } from '@/components/admin/admin-nav';
import { logoutAction } from '@/components/login/actions';
import { Button } from '@/components/ui/button';
import { getCurrentUser } from '@/lib/api/admin/client';
import { getOpenOrdersCount } from '@/lib/api/admin/orders';
import { SITE_NAME } from '@/lib/site';

export const metadata: Metadata = {
	title: {
		default: `${SITE_NAME} Admin`,
		template: `%s | ${SITE_NAME} Admin`,
	},
	robots: { index: false },
};

export default function AdminLayout({ children }: LayoutProps<'/admin'>) {
	const ordersBadge = (
		<Suspense fallback={null}>
			<OpenOrdersBadge />
		</Suspense>
	);

	return (
		<>
			<header className="bg-primary text-primary-foreground">
				<div className="mx-auto flex max-w-5xl flex-wrap items-center gap-x-6 gap-y-2 px-4 py-3 md:px-8">
					<nav aria-label="Admin">
						<Suspense
							fallback={
								<AdminNavList pathname={null} ordersBadge={ordersBadge} />
							}
						>
							<AdminNav ordersBadge={ordersBadge} />
						</Suspense>
					</nav>

					<div className="ml-auto flex items-center gap-2">
						<Suspense fallback={null}>
							<CurrentUserEmail />
						</Suspense>
						<Button
							nativeButton={false}
							render={<Link href="/" />}
							variant="ghost"
							className="hover:bg-white/10 hover:text-primary-foreground"
						>
							View site
						</Button>
						<form action={logoutAction}>
							<Button type="submit" variant="secondary">
								Log out
							</Button>
						</form>
					</div>
				</div>
			</header>

			<main className="mx-auto w-full max-w-5xl flex-1 px-4 py-8 md:px-8">
				{children}
			</main>
		</>
	);
}

async function OpenOrdersBadge() {
	const count = await getOpenOrdersCount();
	if (count === 0) return null;

	return (
		<span className="rounded-full bg-pink px-2 text-xs/5 font-semibold text-black">
			{count}
		</span>
	);
}

async function CurrentUserEmail() {
	const user = await getCurrentUser();

	return (
		<span className="hidden text-sm opacity-70 sm:inline">{user.email}</span>
	);
}
