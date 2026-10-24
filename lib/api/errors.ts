import type { ApiErrorCode } from './types';

const DEFAULT_MESSAGE = 'Something went wrong. Please try again later.';
const INVALID_MESSAGE = 'Please check the form and try again.';

export class ApiError extends Error {
	constructor(
		readonly status: number,
		readonly code: ApiErrorCode | undefined,
		message: string | undefined,
	) {
		super(message || `API request failed with status ${status}`);
		this.name = 'ApiError';
	}
}

export function toUserMessage(
	error: unknown,
	messages: Partial<Record<ApiErrorCode, string>> = {},
) {
	if (!(error instanceof ApiError) || !error.code) return DEFAULT_MESSAGE;

	const message = messages[error.code];
	if (message) return message;

	return error.code === 'INVALID'
		? error.message || INVALID_MESSAGE
		: DEFAULT_MESSAGE;
}
