import { Router } from "express";
import { SlideController } from "./slide.controller.js";

const router = Router();

router.get("/", SlideController.getSlides);
router.post("/", SlideController.createSlide);
router.put("/:id", SlideController.updateSlide);
router.delete("/:id", SlideController.deleteSlide);

export const SlideRoutes = router;
