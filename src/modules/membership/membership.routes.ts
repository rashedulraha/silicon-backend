import { Router } from "express";
import { MembershipController } from "./membership.controller.js";

const router = Router();

router.get("/", MembershipController.getMembershipContent);
router.put("/", MembershipController.updateMembershipContent);
router.patch("/", MembershipController.updateMembershipContent);
router.post("/", MembershipController.updateMembershipContent);

export const MembershipRoutes = router;
