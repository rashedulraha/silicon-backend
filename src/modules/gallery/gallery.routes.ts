import { Router } from "express";
import { GalleryController } from "./gallery.controller.js";

const router = Router();

router.get("/", GalleryController.getAll);
router.get("/:id", GalleryController.getById);
router.post("/", GalleryController.create);
router.put("/:id", GalleryController.update);
router.delete("/:id", GalleryController.delete);

export const GalleryRoutes = router;
