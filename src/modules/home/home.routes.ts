import { Router } from "express";
import { HomeController } from "./home.controller.js";

const router = Router();

router.get("/", HomeController.getHomeContent);
router.put("/", HomeController.updateHomeContent);
router.patch("/", HomeController.updateHomeContent);

export const HomeRoutes = router;
