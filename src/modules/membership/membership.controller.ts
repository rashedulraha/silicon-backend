import { Request, Response } from "express";
import { MembershipService } from "./membership.service.js";

export class MembershipController {
	public static async getMembershipContent(req: Request, res: Response) {
		try {
			const content = await MembershipService.getMembershipContent();
			return res.status(200).json({ success: true, content });
		} catch (err: any) {
			return res.status(500).json({ success: false, message: err.message });
		}
	}

	public static async updateMembershipContent(req: Request, res: Response) {
		try {
			const content = await MembershipService.updateMembershipContent(req.body);
			return res.status(200).json({ success: true, content });
		} catch (err: any) {
			return res.status(500).json({ success: false, message: err.message });
		}
	}
}
