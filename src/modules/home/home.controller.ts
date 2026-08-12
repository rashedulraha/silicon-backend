import { Request, Response } from "express";
import { HomeService } from "./home.service.js";

export class HomeController {
	public static async getHomeContent(req: Request, res: Response) {
		try {
			const content = await HomeService.getHomeContent();
			return res.status(200).json({ success: true, content });
		} catch (err: any) {
			return res.status(500).json({ success: false, message: err.message });
		}
	}

	public static async updateHomeContent(req: Request, res: Response) {
		try {
			const content = await HomeService.updateHomeContent(req.body);
			return res.status(200).json({ success: true, content });
		} catch (err: any) {
			return res.status(500).json({ success: false, message: err.message });
		}
	}
}
