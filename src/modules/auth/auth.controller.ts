import { Request, Response } from "express";
import { authService } from "./auth.service.js";

const login = (req: Request, res: Response) => {
	const result = authService.login;
	res.status(200).json({ data: result });
};

export const AuthLoginController = {
	login,
};
