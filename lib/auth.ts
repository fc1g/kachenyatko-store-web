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

export function safeRedirectPath(value: unknown, fallback = '/') {
	if (typeof value !== 'string') return fallback;
	if (
		!value.startsWith('/') ||
		value.startsWith('//') ||
		value.startsWith('/\\')
	) {
		return fallback;
	}

	return value;
}
