import { Router } from "express";
import { AuthController } from "./auth.controller.js";

const router = Router();

router.post("/login", AuthController.login);
router.get("/me", AuthController.getMe);
router.post("/logout", AuthController.logout);

export const AuthRoutes = router;
