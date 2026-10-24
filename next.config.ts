import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
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
	async redirects() {
		return [
			{ source: '/admin', destination: '/admin/orders', permanent: false },
		];
	},
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
