import { Router } from "express";
import { ProjectsContentController } from "./projects-content.controller.js";

const router = Router();

router.get("/", ProjectsContentController.getContent);
router.put("/", ProjectsContentController.updateContent);

export default router;
