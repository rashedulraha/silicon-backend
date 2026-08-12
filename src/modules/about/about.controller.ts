import { Request, Response } from "express";
import { AboutService } from "./about.service.js";

export class AboutController {
	public static async getAboutContent(req: Request, res: Response) {
		try {
			const content = await AboutService.getAboutContent();
			return res.status(200).json({ success: true, content });
		} catch (err: any) {
			return res.status(500).json({ success: false, message: err.message });
		}
	}

	public static async updateAboutContent(req: Request, res: Response) {
		try {
			const content = await AboutService.updateAboutContent(req.body);
			return res.status(200).json({ success: true, content });
		} catch (err: any) {
			return res.status(500).json({ success: false, message: err.message });
		}
	}
}
