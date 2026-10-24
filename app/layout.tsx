import type { Metadata } from 'next';
import './globals.css';
import { Inter } from 'next/font/google';
import { cn } from 'cn';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import {
	baseOpenGraph,
	SITE_DESCRIPTION,
	SITE_NAME,
	SITE_URL,
} from '@/lib/site';
import { Providers } from './providers';

const inter = Inter({
	subsets: ['latin', 'cyrillic'],
	variable: '--font-sans',
});

export const metadata: Metadata = {
	title: {
		default: SITE_NAME,
		template: `%s | ${SITE_NAME}`,
	},
	description: SITE_DESCRIPTION,
	applicationName: SITE_NAME,
	metadataBase: new URL(SITE_URL),
	openGraph: {
		...baseOpenGraph,
		title: SITE_NAME,
		description: SITE_DESCRIPTION,
	},
	twitter: {
		card: 'summary_large_image',
		title: SITE_NAME,
		description: SITE_DESCRIPTION,
	},
};

export default function RootLayout({ children }: LayoutProps<'/'>) {
	return (
		<html
			lang="en"
			data-scroll-behavior="smooth"
			className={cn(
				'h-full scroll-smooth antialiased motion-reduce:scroll-auto',
				'font-sans',
				inter.variable,
			)}
		>
			<body className="flex min-h-full flex-col">
				<Providers>
					<Header />
					<main className="flex-1">{children}</main>
					<Footer />
				</Providers>
			</body>
		</html>
	);
}
