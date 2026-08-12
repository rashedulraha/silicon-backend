import { Request, Response } from "express";
import { ProjectService } from "./project.service.js";

export class ProjectController {
	public static async getAll(req: Request, res: Response) {
		try {
			const projects = await ProjectService.getAll();
			return res.status(200).json({ success: true, projects });
		} catch (err: any) {
			return res.status(500).json({ success: false, message: err.message });
		}
	}

	public static async getById(req: Request, res: Response) {
		try {
			const { id } = req.params;
			const project = await ProjectService.getById(id as string);
			if (!project)
				return res
					.status(404)
					.json({ success: false, message: "Project not found" });
			return res.status(200).json({ success: true, project });
		} catch (err: any) {
			return res.status(500).json({ success: false, message: err.message });
		}
	}

	public static async create(req: Request, res: Response) {
		try {
			const project = await ProjectService.create(req.body);
			return res.status(201).json({ success: true, project });
		} catch (err: any) {
			return res.status(500).json({ success: false, message: err.message });
		}
	}

	public static async update(req: Request, res: Response) {
		try {
			const { id } = req.params;
			const project = await ProjectService.update(id as string, req.body);
			return res.status(200).json({ success: true, project });
		} catch (err: any) {
			return res.status(500).json({ success: false, message: err.message });
		}
	}

	public static async delete(req: Request, res: Response) {
		try {
			const { id } = req.params;
			await ProjectService.delete(id as string);
			return res
				.status(200)
				.json({ success: true, message: "Project deleted successfully" });
		} catch (err: any) {
			return res.status(500).json({ success: false, message: err.message });
		}
	}
}
