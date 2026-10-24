import type { MetadataRoute } from 'next';

import { ADMIN_PATH, LOGIN_PATH } from '@/lib/auth';
import { SITE_URL } from '@/lib/site';

export default function robots(): MetadataRoute.Robots {
	return {
		rules: {
			userAgent: '*',
			allow: '/',
			disallow: [ADMIN_PATH, LOGIN_PATH, '/toys/*/order'],
		},
		sitemap: new URL('/sitemap.xml', SITE_URL).href,
	};
}
