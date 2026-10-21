export type ToyCategory = {
	id: string;
	name: string;
	slug: string;
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

export type Order = {
	id: string;
	toy_id: string | null;
	phone: string;
	message: string;
	status: 'open' | 'closed';
	created_at: string;
	updated_at: string;
};
