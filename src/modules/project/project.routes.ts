import { Router } from "express";
import { ProjectController } from "./project.controller.js";

const router = Router();

router.get("/", ProjectController.getAll);
router.get("/:id", ProjectController.getById);
router.post("/", ProjectController.create);
router.put("/:id", ProjectController.update);
router.delete("/:id", ProjectController.delete);

export const ProjectRoutes = router;
