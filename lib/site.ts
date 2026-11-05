import type { Metadata } from 'next';

if (!process.env.SITE_URL) {
	throw new Error('Missing environment variable: SITE_URL');
}

export const SITE_URL = process.env.SITE_URL;
export const SITE_NAME = 'Kachenyatko';
export const SITE_TITLE = `${SITE_NAME} — Handmade Knitted Toys, Safe for Children`;
export const SITE_DESCRIPTION =
	'Handmade knitted toys: soft, hypoallergenic and safe for children. Pick one from the catalog or order a custom toy.';

export const SITE_IMAGE = {
	url: '/og-image.jpg',
	width: 1200,
	height: 630,
	alt: `${SITE_NAME}: handmade knitted toys`,
};

export const baseOpenGraph = {
	type: 'website',
	locale: 'en_US',
	siteName: SITE_NAME,
} satisfies Metadata['openGraph'];
