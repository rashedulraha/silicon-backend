import prisma from "../../lib/prisma.js";
import { SeedService } from "../seed/seed.service.js";
import {
	ICreatePropertyInput,
	IUpdatePropertyInput,
} from "./property.interface.js";

export class PropertyService {
	public static async getAllProperties() {
		await SeedService.ensureSeedData();
		return await prisma.property.findMany({
			orderBy: { createdAt: "desc" },
		});
	}

	public static async createProperty(data: ICreatePropertyInput) {
		const slug = data.title
			? data.title
					.toLowerCase()
					.replace(/[^a-z0-9]+/g, "-")
					.replace(/(^-|-$)+/g, "") +
				"-" +
				Date.now().toString().slice(-4)
			: "property-" + Date.now();

		return await prisma.property.create({
			data: {
				title: data.title || "New Property",
				slug: slug,
				type: data.type || "plot",
				category: data.category || "residential",
				status: data.status || "available",
				price: Number(data.price) || 0,
				location: data.location || "Dhaka",
				areaSqFt: data.areaSqFt ? Number(data.areaSqFt) : null,
				bedrooms: data.bedrooms ? Number(data.bedrooms) : null,
				bathrooms: data.bathrooms ? Number(data.bathrooms) : null,
				description: data.description || "",
				features: Array.isArray(data.features) ? data.features : [],
				images:
					Array.isArray(data.images) && data.images.length > 0
						? data.images
						: [
								data.image ||
									"https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1200",
							],
				featured: Boolean(data.featured),
			},
		});
	}

	public static async updateProperty(id: string, data: IUpdatePropertyInput) {
		return await prisma.property.update({
			where: { id },
			data: {
				title: data.title,
				type: data.type,
				category: data.category,
				status: data.status,
				price: data.price !== undefined ? Number(data.price) : undefined,
				location: data.location,
				areaSqFt:
					data.areaSqFt !== undefined ? Number(data.areaSqFt) : undefined,
				bedrooms:
					data.bedrooms !== undefined ? Number(data.bedrooms) : undefined,
				bathrooms:
					data.bathrooms !== undefined ? Number(data.bathrooms) : undefined,
				description: data.description,
				features: Array.isArray(data.features) ? data.features : undefined,
				images: Array.isArray(data.images) ? data.images : undefined,
				featured:
					data.featured !== undefined ? Boolean(data.featured) : undefined,
			},
		});
	}

	public static async deleteProperty(id: string) {
		return await prisma.property.delete({
			where: { id },
		});
	}
}
