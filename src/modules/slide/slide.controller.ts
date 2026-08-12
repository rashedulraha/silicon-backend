import { Request, Response } from "express";
import { SlideService } from "./slide.service.js";

export class SlideController {
	public static async getSlides(req: Request, res: Response) {
		try {
			const slides = await SlideService.getAllSlides();
			return res.status(200).json({ success: true, slides });
		} catch (err: any) {
			return res.status(500).json({ success: false, message: err.message });
		}
	}

	public static async createSlide(req: Request, res: Response) {
		try {
			const slide = await SlideService.createSlide(req.body);
			return res.status(201).json({ success: true, slide });
		} catch (err: any) {
			return res.status(500).json({ success: false, message: err.message });
		}
	}

	public static async updateSlide(req: Request, res: Response) {
		try {
			const { id } = req.params;
			const slide = await SlideService.updateSlide(id, req.body);
			return res.status(200).json({ success: true, slide });
		} catch (err: any) {
			return res.status(500).json({ success: false, message: err.message });
		}
	}

	public static async deleteSlide(req: Request, res: Response) {
		try {
			const { id } = req.params;
			await SlideService.deleteSlide(id);
			return res
				.status(200)
				.json({ success: true, message: "Slide deleted successfully" });
		} catch (err: any) {
			return res.status(500).json({ success: false, message: err.message });
		}
	}
}
