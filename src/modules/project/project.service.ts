import prisma from "../../lib/prisma.js";
import {
	ICreateProjectInput,
	IUpdateProjectInput,
} from "./project.interface.js";

const DEFAULT_PROJECTS = [
	{
		num: "01",
		title: "Silicon City (Phase 1 & 2)",
		type: "Ongoing Flagship Township",
		status: "Ongoing",
		location: "Bara Badeshi Mouza, Savar, Dhaka (Mohammadpur Adjacent)",
		description:
			"High-value residential township along the scenic Turag River with ready civic infrastructure, 30ft & 40ft wide internal roads, grand central mosque, and community parks.",
		images: [
			"https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80",
			"https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80",
		],
		highlights: [
			"30ft & 40ft Wide Roads",
			"Turag River Bridge Link",
			"16–18ft Soil Earthwork",
			"100% Legal Ownership",
		],
		demoUrl: "/properties?search=Silicon+City",
		clientInfo: "Silicon Real Estate (Pvt.) Ltd.",
		order: 1,
	},
	{
		num: "02",
		title: "Silicon Heights",
		type: "Upcoming Eco-Friendly Apartments",
		status: "Upcoming",
		location: "Mohammadpur Waterfront Zone, Dhaka",
		description:
			"Premium eco-friendly ready apartment buildings featuring modern security systems, high-speed elevators, backup power, and scenic river-facing balconies.",
		images: [
			"https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80",
		],
		highlights: [
			"Eco-Friendly Architecture",
			"River-Facing Balconies",
			"24/7 Elevator & Security",
			"Modern Community Amenities",
		],
		demoUrl: "/properties?category=apartment",
		clientInfo: "Silicon Real Estate (Pvt.) Ltd.",
		order: 2,
	},
	{
		num: "03",
		title: "Silicon Commercial Center",
		type: "Upcoming Business Complex",
		status: "Upcoming",
		location: "Mohammadpur Beribadh Main Road, Dhaka",
		description:
			"Dedicated business complex featuring retail shops, diagnostic centers, corporate office floors, and commercial banking outlets for high ROI investments.",
		images: [
			"https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
		],
		highlights: [
			"Corporate Banking Outlets",
			"Retail Shopping Hub",
			"Diagnostic & Healthcare Floors",
			"High Commercial Footfall",
		],
		demoUrl: "/properties?category=commercial",
		clientInfo: "Silicon Real Estate (Pvt.) Ltd.",
		order: 3,
	},
	{
		num: "04",
		title: "Silicon Green Valley",
		type: "Completed Residential Block",
		status: "Completed",
		location: "Purbachal Sector Link Zone, Dhaka",
		description:
			"Fully developed and handed-over residential plot sector featuring tree-lined avenues, underground utilities, and 100% boundary demarcation.",
		images: [
			"https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
		],
		highlights: [
			"100% Handover Completed",
			"Tree-Lined Avenues",
			"Underground Utility Lines",
			"Boundary Demarcation Complete",
		],
		demoUrl: "/properties?status=sold",
		clientInfo: "Silicon Real Estate (Pvt.) Ltd.",
		order: 4,
	},
];

export class ProjectService {
	public static async ensureSeedData() {
		const count = await prisma.project.count();
		if (count > 0) return;

		await prisma.project.createMany({
			data: DEFAULT_PROJECTS,
		});
	}

	public static async getAll() {
		await this.ensureSeedData();
		return await prisma.project.findMany({
			where: { active: true },
			orderBy: { order: "asc" },
		});
	}

	public static async getById(id: string) {
		return await prisma.project.findUnique({ where: { id } });
	}

	public static async create(data: ICreateProjectInput) {
		const count = await prisma.project.count();
		return await prisma.project.create({
			data: {
				num: data.num || `0${count + 1}`,
				title: data.title,
				slug: data.slug || data.title.toLowerCase().replace(/\s+/g, "-"),
				type: data.type || "Township Project",
				status: data.status || "Ongoing",
				location: data.location || "Dhaka",
				description: data.description,
				images: data.images || [],
				highlights: data.highlights || [],
				demoUrl: data.demoUrl,
				clientInfo: data.clientInfo,
				order: data.order ?? count + 1,
				active: data.active ?? true,
			},
		});
	}

	public static async update(id: string, data: IUpdateProjectInput) {
		return await prisma.project.update({
			where: { id },
			data: {
				...(data.num && { num: data.num }),
				...(data.title && { title: data.title }),
				...(data.slug && { slug: data.slug }),
				...(data.type && { type: data.type }),
				...(data.status && { status: data.status }),
				...(data.location && { location: data.location }),
				...(data.description && { description: data.description }),
				...(data.images && { images: data.images }),
				...(data.highlights && { highlights: data.highlights }),
				...(data.demoUrl !== undefined && { demoUrl: data.demoUrl }),
				...(data.clientInfo !== undefined && { clientInfo: data.clientInfo }),
				...(data.order !== undefined && { order: data.order }),
				...(data.active !== undefined && { active: data.active }),
			},
		});
	}

	public static async delete(id: string) {
		return await prisma.project.delete({ where: { id } });
	}
}
