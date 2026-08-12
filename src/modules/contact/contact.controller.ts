import { Request, Response } from "express";
import { ContactService } from "./contact.service.js";

export class ContactController {
	public static async getContactInfo(req: Request, res: Response) {
		try {
			const contactInfo = await ContactService.getContactInfo();
			return res.status(200).json({ success: true, contactInfo });
		} catch (err: any) {
			return res.status(500).json({ success: false, message: err.message });
		}
	}

	public static async updateContactInfo(req: Request, res: Response) {
		try {
			const contactInfo = await ContactService.updateContactInfo(req.body);
			return res.status(200).json({ success: true, contactInfo });
		} catch (err: any) {
			return res.status(500).json({ success: false, message: err.message });
		}
	}
}
