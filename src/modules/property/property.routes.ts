import { Router } from "express";
import { PropertyController } from "./property.controller.js";

const router = Router();

router.get("/", PropertyController.getProperties);
router.post("/", PropertyController.createProperty);
router.put("/:id", PropertyController.updateProperty);
router.delete("/:id", PropertyController.deleteProperty);

export const PropertyRoutes = router;
