import { Router } from "express";
import { SettingController } from "./setting.controller.js";

const router = Router();

router.get("/", SettingController.getSettings);
router.put("/", SettingController.updateSettings);

export const SettingRoutes = router;
