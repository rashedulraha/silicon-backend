export interface ITrustMetric {
	value: string;
	label: string;
}

export interface ISpecItem {
	num: string;
	title: string;
	desc: string;
}

export interface ICategoryItem {
	title: string;
	tag: string;
	desc: string;
	features: string[];
}

export interface IAmenityItem {
	title: string;
	desc: string;
	tag: string;
	icon?: string;
}

export interface IProximityItem {
	category: string;
	items: { name: string; dist: string }[];
}

export interface IRoadmapStep {
	step: string;
	title: string;
	desc: string;
}

export interface IProjectsContentData {
	id?: string;
	heroTitle?: string;
	heroSubtitle?: string;
	heroDesc?: string;
	trustMetrics?: ITrustMetric[];
	spotlightBadge?: string;
	spotlightTitle?: string;
	spotlightDesc?: string;
	spotlightTag?: string;
	spotlightBoxTitle?: string;
	spotlightBoxDesc?: string;
	spotlightLocation?: string;
	spotlightBadge2?: string;
	specs?: ISpecItem[];
	categories?: ICategoryItem[];
	amenities?: IAmenityItem[];
	proximities?: IProximityItem[];
	roadmap?: IRoadmapStep[];
	ctaBadge?: string;
	ctaTitle?: string;
	ctaDesc?: string;
	ctaHotline?: string;
	ctaEmail?: string;
	ctaOffice?: string;
}
