export interface IBlogPost {
	id?: string;
	title: string;
	slug: string;
	excerpt: string;
	content: string;
	image: string;
	category?: string;
	author?: string;
	publishedAt?: Date;
}
