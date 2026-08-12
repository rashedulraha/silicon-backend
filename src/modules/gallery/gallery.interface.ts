export interface ICreateGalleryInput {
	title: string;
	category: string;
	badge: string;
	location: string;
	overview: string;
	images: string[];
	features: string[];
	order?: number;
	active?: boolean;
}

export interface IUpdateGalleryInput {
	title?: string;
	category?: string;
	badge?: string;
	location?: string;
	overview?: string;
	images?: string[];
	features?: string[];
	order?: number;
	active?: boolean;
}
