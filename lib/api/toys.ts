import 'server-only';

import { get } from './client';
import type { Toy } from './types';

export const getToys = (limit: number) => get<Toy[]>('/toys', { limit });

export const getBestsellers = (limit: number) =>
	get<Toy[]>('/toys/bestsellers', { limit });
