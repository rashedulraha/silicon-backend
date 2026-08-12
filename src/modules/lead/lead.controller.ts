import { Request, Response } from "express";
import { LeadService } from "./lead.service.js";

export class LeadController {
	public static async getLeads(req: Request, res: Response) {
		try {
			const leads = await LeadService.getAllLeads();
			return res.status(200).json({ success: true, leads });
		} catch (err: any) {
			return res.status(500).json({ success: false, message: err.message });
		}
	}

	public static async createLead(req: Request, res: Response) {
		try {
			const lead = await LeadService.createLead(req.body);
			return res.status(201).json({ success: true, lead });
		} catch (err: any) {
			return res.status(500).json({ success: false, message: err.message });
		}
	}

	public static async updateLead(req: Request, res: Response) {
		try {
			const { id } = req.params;
			const lead = await LeadService.updateLead(id as string, req.body);
			return res.status(200).json({ success: true, lead });
		} catch (err: any) {
			return res.status(500).json({ success: false, message: err.message });
		}
	}
}
