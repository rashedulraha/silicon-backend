import express, { Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import { AuthRoutes } from "./modules/auth/auth.routes.js";

export const app = express();

// Middlewares
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
dotenv.config();

// Root Health Check Route
app.get("/", (req: Request, res: Response) => {
	res.status(200).json({
		success: true,
		message:
			"Silicon Real Estate Modular Backend API is running successfully with PostgreSQL & Prisma!",
	});
});

app.use("/api/v1/auth", AuthRoutes);
app.use("/api/v1/auth", () => {});
