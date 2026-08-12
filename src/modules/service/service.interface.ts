export interface ICreateServiceInput {
	num?: string;
	title: string;
	tag: string;
	description: string;
	icon?: string;
	imageUrl?: string;
	pricing?: string;
	benefits: string[];
	order?: number;
	active?: boolean;
}

export interface IUpdateServiceInput {
	num?: string;
	title?: string;
	tag?: string;
	description?: string;
	icon?: string;
	imageUrl?: string;
	pricing?: string;
	benefits?: string[];
	order?: number;
	active?: boolean;
}
