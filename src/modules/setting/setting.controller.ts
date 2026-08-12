import { Request, Response } from "express";
import { SettingService } from "./setting.service.js";

export class SettingController {
	public static async getSettings(req: Request, res: Response) {
		try {
			const settings = await SettingService.getSettings();
			return res.status(200).json({ success: true, settings });
		} catch (err: any) {
			return res.status(500).json({ success: false, message: err.message });
		}
	}

	public static async updateSettings(req: Request, res: Response) {
		try {
			const settings = await SettingService.updateSettings(req.body);
			return res.status(200).json({ success: true, settings });
		} catch (err: any) {
			return res.status(500).json({ success: false, message: err.message });
		}
	}
}
