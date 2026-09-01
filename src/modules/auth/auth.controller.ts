import { Request, Response } from "express";
import { authService } from "./auth.service.js";

const login = async (req: Request, res: Response) => {
	try {
		const { email, password } = req.body;
		const result = await authService.login({ email, password });

		if (!result.success) {
			return res.status(401).json(result);
		}

		return res.status(200).json(result);
	} catch (error: any) {
		console.error("Login controller error:", error);
		return res.status(500).json({
			success: false,
			message:
				error.message || "An unexpected error occurred during authentication",
		});
	}
};

export const AuthLoginController = {
	login,
};
