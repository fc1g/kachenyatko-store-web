export const ACCESS_TOKEN_COOKIE = 'access_token';

export const LOGIN_PATH = '/login';
export const ADMIN_PATH = '/admin';

export function getTokenExpiry(token: string) {
	try {
		const payload = token.split('.')[1];
		const json = atob(payload.replace(/-/g, '+').replace(/_/g, '/'));
		const { exp } = JSON.parse(json) as { exp?: unknown };

		return typeof exp === 'number' ? exp : null;
	} catch {
		return null;
	}
}

export function isTokenExpired(token: string) {
	const exp = getTokenExpiry(token);
	return exp === null || exp * 1000 <= Date.now();
}

const REDIRECT_BASE = 'http://local';

export function safeRedirectPath(value: unknown, fallback = '/') {
	if (typeof value !== 'string' || !value.startsWith('/')) return fallback;

	try {
		const url = new URL(value, REDIRECT_BASE);
		if (url.origin !== REDIRECT_BASE) return fallback;

		return url.pathname + url.search + url.hash;
	} catch {
		return fallback;
	}
}
