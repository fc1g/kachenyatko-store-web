export const NAME_MAX_LENGTH = 100;

export type CategoryFormState =
	| { status: 'idle' }
	| { status: 'saved'; name: string }
	| { status: 'error'; error: string; name: string };

export type ActionResult = { error?: string };
