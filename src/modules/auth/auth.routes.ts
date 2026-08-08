import { Router } from "express";
import { AuthLoginController } from "./auth.controller.js";

const router = Router();

router.post("/login", AuthLoginController.login);

export const AuthRoutes = router;
export default router;
