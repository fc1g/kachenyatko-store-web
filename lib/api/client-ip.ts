import 'server-only';

import { headers } from 'next/headers';

const CLIENT_IP_HEADER = 'CF-Connecting-IP';

export async function clientIPHeaders(): Promise<Record<string, string>> {
	const ip = (await headers()).get(CLIENT_IP_HEADER);
	return ip ? { [CLIENT_IP_HEADER]: ip } : {};
}
