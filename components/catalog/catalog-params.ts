export const LIMIT_OPTIONS = [3, 6, 9] as const;
export const DEFAULT_LIMIT = 9;
export const MAX_PAGE = 10_000;

type SearchParamValue = string | string[] | null | undefined;

export function parsePage(value: SearchParamValue) {
	const page = Number(value);
	return Number.isInteger(page) && page > 0 ? page : 1;
}

export function parseLimit(value: SearchParamValue) {
	const limit = Number(value);
	return LIMIT_OPTIONS.find(option => option === limit) ?? DEFAULT_LIMIT;
}

export function catalogHref(
	path: string,
	{ page = 1, limit = DEFAULT_LIMIT }: { page?: number; limit?: number },
) {
	const params = new URLSearchParams();
	if (page > 1) params.set('page', String(page));
	if (limit !== DEFAULT_LIMIT) params.set('limit', String(limit));

	return params.size ? `${path}?${params}` : path;
}
