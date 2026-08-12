import prisma from "../../lib/prisma.js";
import { IHomeContentData } from "./home.interface.js";

const DEFAULT_HOME_CONTENT = {
	heroBadge: "FEATURED REAL ESTATE INVENTORY",
	heroTitle: "Prime Registered Land & Property Listings",
	heroSubtitle: "Silicon Real Estate (Pvt.) Ltd.",
	heroDesc:
		"Hand-picked, 100% legally verified residential & commercial plots in Dhaka. Managed live via database.",
	heroCtaText: "EXPLORE PROJECTS",
	heroCtaLink: "/projects",
	trackRecordTitle: "Proven Trust & Excellence in Numbers",
	trackRecordDesc:
		"Over a decade of ethical land development, legally verified ownership, and planned community building.",
	trustCounters: [
		{
			value: "10+",
			label: "Years of Professional Experience & Ethics",
			detail: "10+ Years Dedicated Service",
		},
		{
			value: "1000+",
			label: "Happy Clients Secured Future Address",
			detail: "1,000+ Plot Allotments",
		},
		{
			value: "15+",
			label: "Completed & Ongoing Development Projects",
			detail: "15+ Flagship Townships",
		},
		{
			value: "100%",
			label: "Legally Sound Deed Registries Completed",
			detail: "100% Legal Ownership",
		},
	],
	accreditations: [
		"RAJUK Compliant Planning",
		"REHAB Member Organization",
		"ISO 9001:2015 Certified Management",
		"Government Authorized Land Developer",
		"100% Legal Ownership Clearance Certified",
	],
	ctaTitle: "Ready to Secure Your Plot in Silicon City?",
	ctaDesc:
		"Schedule a physical site visit with free transport from our Mohammadpur corporate office.",
	ctaButtonText: "SCHEDULE SITE VISIT",
	ctaButtonLink: "/contact?type=visit",
};

export class HomeService {
	public static async getHomeContent() {
		let content = await prisma.homeContent.findFirst();
		if (!content) {
			content = await prisma.homeContent.create({
				data: DEFAULT_HOME_CONTENT,
			});
		}
		return content;
	}

	public static async updateHomeContent(data: IHomeContentData) {
		let existing = await prisma.homeContent.findFirst();
		if (!existing) {
			return await prisma.homeContent.create({
				data: {
					...DEFAULT_HOME_CONTENT,
					...data,
				},
			});
		}

		return await prisma.homeContent.update({
			where: { id: existing.id },
			data: {
				...(data.heroBadge && { heroBadge: data.heroBadge }),
				...(data.heroTitle && { heroTitle: data.heroTitle }),
				...(data.heroSubtitle && { heroSubtitle: data.heroSubtitle }),
				...(data.heroDesc && { heroDesc: data.heroDesc }),
				...(data.heroCtaText && { heroCtaText: data.heroCtaText }),
				...(data.heroCtaLink && { heroCtaLink: data.heroCtaLink }),
				...(data.trackRecordTitle && { trackRecordTitle: data.trackRecordTitle }),
				...(data.trackRecordDesc && { trackRecordDesc: data.trackRecordDesc }),
				...(data.trustCounters !== undefined && { trustCounters: data.trustCounters }),
				...(data.accreditations !== undefined && { accreditations: data.accreditations }),
				...(data.ctaTitle && { ctaTitle: data.ctaTitle }),
				...(data.ctaDesc && { ctaDesc: data.ctaDesc }),
				...(data.ctaButtonText && { ctaButtonText: data.ctaButtonText }),
				...(data.ctaButtonLink && { ctaButtonLink: data.ctaButtonLink }),
			},
		});
	}
}
