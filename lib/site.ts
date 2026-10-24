import type { Metadata } from 'next';

if (!process.env.SITE_URL) {
	throw new Error('Missing environment variable: SITE_URL');
}

export const SITE_URL = process.env.SITE_URL;
export const SITE_NAME = 'Kachenyatko';
export const SITE_DESCRIPTION =
	'Handmade knitted toys: soft, hypoallergenic and safe for children. Choose a toy from the catalog or order a custom one made just for you.';

export const baseOpenGraph = {
	type: 'website',
	locale: 'en_US',
	siteName: SITE_NAME,
} satisfies Metadata['openGraph'];
