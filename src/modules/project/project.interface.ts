export interface ICreateProjectInput {
	num?: string;
	title: string;
	slug?: string;
	type?: string;
	status?: string;
	location: string;
	description: string;
	images?: string[];
	highlights?: string[];
	demoUrl?: string;
	clientInfo?: string;
	order?: number;
	active?: boolean;
}

export interface IUpdateProjectInput {
	num?: string;
	title?: string;
	slug?: string;
	type?: string;
	status?: string;
	location?: string;
	description?: string;
	images?: string[];
	highlights?: string[];
	demoUrl?: string;
	clientInfo?: string;
	order?: number;
	active?: boolean;
}
