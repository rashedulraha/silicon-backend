import { Router } from "express";
import { ContactController } from "./contact.controller.js";

const router = Router();

router.get("/", ContactController.getContactInfo);
router.put("/", ContactController.updateContactInfo);
router.post("/", ContactController.updateContactInfo);

export const ContactRoutes = router;
