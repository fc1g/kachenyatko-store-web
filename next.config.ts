import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
	/* config options here */
	// Lets phones on the local network open the dev server
	allowedDevOrigins: ['192.168.*.*'],
	images: {
		remotePatterns: [
			new URL('https://pub-6091cee1104040dea51a588c1a50513b.r2.dev/**'),
		],
	},
	experimental: {
		agentFeedback: true,
	},
	cacheComponents: true,
	partialPrefetching: true,
	turbopack: {
		rules: {
			'*.css': {
				loaders: ['@tailwindcss/turbopack'],
				as: '*.css',
			},
		},
	},
};

export default nextConfig;
