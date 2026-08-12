import { Router } from "express";
import { AboutController } from "./about.controller.js";

const router = Router();

router.get("/", AboutController.getAboutContent);
router.put("/", AboutController.updateAboutContent);
router.patch("/", AboutController.updateAboutContent);

export const AboutRoutes = router;
