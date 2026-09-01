import { Request, Response } from "express";
import { BlogService } from "./blog.service.js";

export const BlogController = {
	async getAllPosts(req: Request, res: Response) {
		try {
			const posts = await BlogService.getAllPosts();
			return res.status(200).json({
				success: true,
				posts,
				data: posts,
			});
		} catch (error: any) {
			return res.status(500).json({
				success: false,
				message: error.message || "Failed to fetch blog posts",
			});
		}
	},

	async getPostBySlug(req: Request, res: Response) {
		try {
			const slug = String(req.params.slug || "");
			const post = await BlogService.getPostBySlug(slug);
			if (!post) {
				return res.status(404).json({
					success: false,
					message: "Blog post not found",
				});
			}
			return res.status(200).json({
				success: true,
				post,
				data: post,
			});
		} catch (error: any) {
			return res.status(500).json({
				success: false,
				message: error.message || "Failed to fetch blog post",
			});
		}
	},

	async createPost(req: Request, res: Response) {
		try {
			const post = await BlogService.createPost(req.body);
			return res.status(201).json({
				success: true,
				message: "Blog post created successfully",
				post,
			});
		} catch (error: any) {
			return res.status(500).json({
				success: false,
				message: error.message || "Failed to create blog post",
			});
		}
	},
};
