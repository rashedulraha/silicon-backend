import { Router } from "express";
import { ServiceController } from "./service.controller.js";

const router = Router();

router.get("/", ServiceController.getAll);
router.get("/:id", ServiceController.getById);
router.post("/", ServiceController.create);
router.put("/:id", ServiceController.update);
router.delete("/:id", ServiceController.delete);

export const ServiceRoutes = router;
