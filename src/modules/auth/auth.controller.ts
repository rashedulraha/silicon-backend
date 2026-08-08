import { Request, Response } from "express";
import { AuthService } from "./auth.service.js";

export class AuthController {
  public static async login(req: Request, res: Response) {
    const result = await AuthService.login(req.body || {});
    if (result.success) {
      return res.status(200).json(result);
    }
    return res.status(401).json(result);
  }

  public static async getMe(req: Request, res: Response) {
    const result = await AuthService.getMe();
    return res.status(200).json(result);
  }

  public static async logout(req: Request, res: Response) {
    return res.status(200).json({
      success: true,
      message: "Logged out successfully.",
    });
  }
}
