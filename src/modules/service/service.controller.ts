import { Request, Response } from "express";
import { ServiceService } from "./service.service.js";

export class ServiceController {
	public static async getAll(req: Request, res: Response) {
		try {
			const services = await ServiceService.getAll();
			return res.status(200).json({ success: true, services });
		} catch (err: any) {
			return res.status(500).json({ success: false, message: err.message });
		}
	}

	public static async getById(req: Request, res: Response) {
		try {
			const { id } = req.params;
			const service = await ServiceService.getById(id as string);
			if (!service)
				return res
					.status(404)
					.json({ success: false, message: "Service not found" });
			return res.status(200).json({ success: true, service });
		} catch (err: any) {
			return res.status(500).json({ success: false, message: err.message });
		}
	}

	public static async create(req: Request, res: Response) {
		try {
			const service = await ServiceService.create(req.body);
			return res.status(201).json({ success: true, service });
		} catch (err: any) {
			return res.status(500).json({ success: false, message: err.message });
		}
	}

	public static async update(req: Request, res: Response) {
		try {
			const { id } = req.params;
			const service = await ServiceService.update(id as string, req.body);
			return res.status(200).json({ success: true, service });
		} catch (err: any) {
			return res.status(500).json({ success: false, message: err.message });
		}
	}

	public static async delete(req: Request, res: Response) {
		try {
			const { id } = req.params;
			await ServiceService.delete(id as string);
			return res
				.status(200)
				.json({ success: true, message: "Service deleted successfully" });
		} catch (err: any) {
			return res.status(500).json({ success: false, message: err.message });
		}
	}
}
