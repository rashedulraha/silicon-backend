import { Request, Response } from "express";
import { GalleryService } from "./gallery.service.js";

export class GalleryController {
  public static async getAll(req: Request, res: Response) {
    try {
      const items = await GalleryService.getAll();
      return res.status(200).json({ success: true, items });
    } catch (err: any) {
      return res.status(500).json({ success: false, message: err.message });
    }
  }

  public static async getById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const item = await GalleryService.getById(id);
      if (!item) return res.status(404).json({ success: false, message: "Gallery item not found" });
      return res.status(200).json({ success: true, item });
    } catch (err: any) {
      return res.status(500).json({ success: false, message: err.message });
    }
  }

  public static async create(req: Request, res: Response) {
    try {
      const item = await GalleryService.create(req.body);
      return res.status(201).json({ success: true, item });
    } catch (err: any) {
      return res.status(500).json({ success: false, message: err.message });
    }
  }

  public static async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const item = await GalleryService.update(id, req.body);
      return res.status(200).json({ success: true, item });
    } catch (err: any) {
      return res.status(500).json({ success: false, message: err.message });
    }
  }

  public static async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await GalleryService.delete(id);
      return res.status(200).json({ success: true, message: "Gallery item deleted successfully" });
    } catch (err: any) {
      return res.status(500).json({ success: false, message: err.message });
    }
  }
}
