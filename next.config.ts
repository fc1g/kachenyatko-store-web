import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
	/* config options here */
	// Lets phones on the local network open the dev server
	allowedDevOrigins: ['192.168.*.*'],
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
