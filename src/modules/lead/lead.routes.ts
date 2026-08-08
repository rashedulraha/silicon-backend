import { Router } from "express";
import { LeadController } from "./lead.controller.js";

const router = Router();

router.get("/", LeadController.getLeads);
router.post("/", LeadController.createLead);
router.put("/:id", LeadController.updateLead);

export const LeadRoutes = router;
