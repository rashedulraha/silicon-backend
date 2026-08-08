import { Request, Response } from "express";
import { BlogService } from "./blog.service.js";

export class BlogController {
  public static async getPosts(req: Request, res: Response) {
    try {
      const posts = await BlogService.getAllPosts();
      return res.status(200).json({ success: true, posts });
    } catch (err: any) {
      return res.status(500).json({ success: false, message: err.message });
    }
  }

  public static async createPost(req: Request, res: Response) {
    try {
      const post = await BlogService.createPost(req.body);
      return res.status(201).json({ success: true, post });
    } catch (err: any) {
      return res.status(500).json({ success: false, message: err.message });
    }
  }

  public static async importMarkdown(req: Request, res: Response) {
    try {
      const { markdown, category } = req.body;
      const post = await BlogService.importMarkdown(markdown, category);
      return res.status(201).json({ success: true, post });
    } catch (err: any) {
      return res.status(500).json({ success: false, message: err.message });
    }
  }

  public static async updatePost(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const post = await BlogService.updatePost(id, req.body);
      return res.status(200).json({ success: true, post });
    } catch (err: any) {
      return res.status(500).json({ success: false, message: err.message });
    }
  }

  public static async deletePost(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await BlogService.deletePost(id);
      return res.status(200).json({ success: true, message: "Blog post deleted" });
    } catch (err: any) {
      return res.status(500).json({ success: false, message: err.message });
    }
  }
}
