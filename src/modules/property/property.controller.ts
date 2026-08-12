import { Request, Response } from "express";
import { PropertyService } from "./property.service.js";

export class PropertyController {
	public static async getProperties(req: Request, res: Response) {
		try {
			const properties = await PropertyService.getAllProperties();
			return res.status(200).json({ success: true, properties });
		} catch (err: any) {
			return res.status(500).json({ success: false, message: err.message });
		}
	}

	public static async createProperty(req: Request, res: Response) {
		try {
			const property = await PropertyService.createProperty(req.body);
			return res.status(201).json({ success: true, property });
		} catch (err: any) {
			return res.status(500).json({ success: false, message: err.message });
		}
	}

	public static async updateProperty(req: Request, res: Response) {
		try {
			const { id } = req.params;
			const property = await PropertyService.updateProperty(id as string, req.body);
			return res.status(200).json({ success: true, property });
		} catch (err: any) {
			return res.status(500).json({ success: false, message: err.message });
		}
	}

	public static async deleteProperty(req: Request, res: Response) {
		try {
			const { id } = req.params;
			await PropertyService.deleteProperty(id as string);
			return res
				.status(200)
				.json({ success: true, message: "Property deleted successfully" });
		} catch (err: any) {
			return res.status(500).json({ success: false, message: err.message });
		}
	}
}
