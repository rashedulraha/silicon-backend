import prisma from "../../lib/prisma.js";
import { SeedService } from "../seed/seed.service.js";
import { ICreateSlideInput, IUpdateSlideInput } from "./slide.interface.js";

export class SlideService {
	public static async getAllSlides() {
		await SeedService.ensureSeedData();
		return await prisma.slide.findMany({
			orderBy: { order: "asc" },
		});
	}

	public static async createSlide(data: ICreateSlideInput) {
		return await prisma.slide.create({
			data: {
				title: data.title || "New Slide",
				subtitle: data.subtitle || "",
				image:
					data.image ||
					"https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1600",
				badge: data.badge || "FEATURED",
				link: data.link || "/projects",
				active: data.active !== undefined ? Boolean(data.active) : true,
				order: data.order ? Number(data.order) : 0,
			},
		});
	}

	public static async updateSlide(id: string, data: IUpdateSlideInput) {
		return await prisma.slide.update({
			where: { id },
			data: {
				title: data.title,
				subtitle: data.subtitle,
				image: data.image,
				badge: data.badge,
				link: data.link,
				active: data.active !== undefined ? Boolean(data.active) : undefined,
				order: data.order !== undefined ? Number(data.order) : undefined,
			},
		});
	}

	public static async deleteSlide(id: string) {
		return await prisma.slide.delete({
			where: { id },
		});
	}
}
