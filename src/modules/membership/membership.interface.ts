export interface IPathway {
	num: string;
	title: string;
	desc: string;
	tag: string;
}

export interface ITermAndCondition {
	num: string;
	title: string;
	text: string;
	tag: string;
	highlights: string[];
}

export interface IMembershipContent {
	id?: string;
	heroTitle?: string;
	heroDescription?: string;
	formPdfUrl?: string;
	applicationFee?: string;
	landSharePercentage?: string;
	soilElevationHeight?: string;
	offlineNoticeText?: string;
	contactHotline?: string;
	pathways?: string | IPathway[];
	termsAndConditions?: string | ITermAndCondition[];
}
