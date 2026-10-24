export type ToyCategory = {
	id: string;
	name: string;
	slug: string;
};

export type Category = ToyCategory & {
	created_at: string;
	updated_at: string;
};

export type ToyImage = {
	id: string;
	toy_id: string;
	url: string;
	position: number;
	created_at: string;
	updated_at: string;
};

export type Toy = {
	id: string;
	name: string;
	description: string;
	materials: string;
	size: string;
	category: ToyCategory;
	images: ToyImage[];
	created_at: string;
	updated_at: string;
};

export type Paginated<T> = {
	items: T[];
	total: number;
};

export type OrderStatus = 'open' | 'closed';

export type Order = {
	id: string;
	toy_id: string | null;
	phone: string;
	message: string | null;
	details: string | null;
	status: OrderStatus;
	created_at: string;
	updated_at: string;
};

export type ApiErrorCode =
	| 'INVALID'
	| 'UNAUTHORIZED'
	| 'FORBIDDEN'
	| 'NOT_FOUND'
	| 'CONFLICT'
	| 'PAYLOAD_TOO_LARGE'
	| 'TOO_MANY_REQUESTS'
	| 'INTERNAL';

export type ApiErrorBody = {
	code: ApiErrorCode;
	message: string;
};

export type User = {
	id: string;
	email: string;
	created_at: string;
	updated_at: string;
};
