import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
	allowedDevOrigins: ['192.168.*.*'],
	images: {
		remotePatterns: [
			new URL('https://images.fc1g-lab.dev/**'),
		],
	},
	experimental: {
		agentFeedback: true,
		serverActions: {
			bodySizeLimit: '6mb',
		},
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
