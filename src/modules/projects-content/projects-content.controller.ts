import { Request, Response } from "express";
import { ProjectsContentService } from "./projects-content.service.js";

export class ProjectsContentController {
	public static async getContent(req: Request, res: Response) {
		try {
			const content = await ProjectsContentService.getContent();
			return res.json({
				success: true,
				content,
			});
		} catch (error: any) {
			console.error("[ProjectsContentController.getContent] Error:", error);
			return res.status(500).json({
				success: false,
				message: error.message || "Failed to fetch projects content",
			});
		}
	}

	public static async updateContent(req: Request, res: Response) {
		try {
			const updated = await ProjectsContentService.updateContent(req.body);
			return res.json({
				success: true,
				message: "Projects content updated successfully",
				content: updated,
			});
		} catch (error: any) {
			console.error("[ProjectsContentController.updateContent] Error:", error);
			return res.status(500).json({
				success: false,
				message: error.message || "Failed to update projects content",
			});
		}
	}
}
