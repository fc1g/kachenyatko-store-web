export const DETAILS_MAX_LENGTH = 2000;
export const MESSAGE_MAX_LENGTH = 500;

const E164_PATTERN = /^\+[1-9]\d{7,14}$/;

const LOCAL_UA_PATTERN = /^0\d{9}$/;
const UA_WITHOUT_PLUS_PATTERN = /^380\d{9}$/;

export function normalizePhone(value: string) {
	const phone = value.replace(/[\s()-]/g, '');

	if (LOCAL_UA_PATTERN.test(phone)) return `+38${phone}`;
	if (UA_WITHOUT_PLUS_PATTERN.test(phone)) return `+${phone}`;
	return E164_PATTERN.test(phone) ? phone : null;
}

export type OrderFormState =
	| { status: 'idle' }
	| { status: 'success' }
	| {
			status: 'error';
			error: string;
			field?: 'phone' | 'details' | 'message';
			values: { phone: string; details: string; message: string };
	  };
