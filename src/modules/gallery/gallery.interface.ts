export interface ICreateGalleryInput {
	title: string;
	category: string;
	badge: string;
	location: string;
	overview: string;
	images: string[];
	features: string[];
	videoUrl?: string;
	type?: string; // image | video
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
	videoUrl?: string;
	type?: string;
	order?: number;
	active?: boolean;
}
