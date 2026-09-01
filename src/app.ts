import express, { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import { AuthRoutes } from "./modules/auth/auth.routes.js";
import { ContactRoutes } from "./modules/contact/contact.routes.js";
import { MembershipRoutes } from "./modules/membership/membership.routes.js";
import { ServiceRoutes } from "./modules/service/service.routes.js";
import { ProjectRoutes } from "./modules/project/project.routes.js";
import { AboutRoutes } from "./modules/about/about.routes.js";
import { HomeRoutes } from "./modules/home/home.routes.js";
import { SettingRoutes } from "./modules/setting/setting.routes.js";
import { PropertyRoutes } from "./modules/property/property.routes.js";
import { LeadRoutes } from "./modules/lead/lead.routes.js";
import { GalleryRoutes } from "./modules/gallery/gallery.routes.js";
import { SlideRoutes } from "./modules/slide/slide.routes.js";
import ProjectsContentRoutes from "./modules/projects-content/projects-content.routes.js";
import { BlogRoutes } from "./modules/blog/blog.routes.js";

dotenv.config();

export const app = express();


// 1. Explicit top-level CORS header injection & preflight OPTIONS interceptor
app.use((req: Request, res: Response, next: NextFunction) => {
	const origin = req.headers.origin;
	if (origin) {
		res.setHeader("Access-Control-Allow-Origin", origin);
	} else {
		res.setHeader("Access-Control-Allow-Origin", "*");
	}
	res.setHeader("Access-Control-Allow-Credentials", "true");
	res.setHeader(
		"Access-Control-Allow-Methods",
		"GET, POST, PUT, PATCH, DELETE, OPTIONS, HEAD",
	);
	res.setHeader(
		"Access-Control-Allow-Headers",
		"Origin, X-Requested-With, Content-Type, Accept, Authorization, Cookie, Set-Cookie, x-access-token, Cache-Control, Pragma",
	);
	res.setHeader(
		"Access-Control-Expose-Headers",
		"Set-Cookie, Authorization, Content-Disposition",
	);
	res.setHeader("Access-Control-Max-Age", "86400");

	// Immediate 204 response for preflight OPTIONS
	if (req.method === "OPTIONS") {
		return res.sendStatus(204);
	}

	next();
});

// 2. Standard CORS package middleware
app.use(
	cors({
		origin: (origin, callback) => {
			callback(null, true);
		},
		credentials: true,
		methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS", "HEAD"],
		allowedHeaders: [
			"Origin",
			"X-Requested-With",
			"Content-Type",
			"Accept",
			"Authorization",
			"Cookie",
			"Set-Cookie",
			"x-access-token",
			"Cache-Control",
			"Pragma",
		],
		exposedHeaders: ["Set-Cookie", "Authorization", "Content-Disposition"],
		optionsSuccessStatus: 204,
	}),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Root Health Check Route
app.get("/", (req: Request, res: Response) => {
	res.status(200).json({
		success: true,
		message:
			"Silicon Real Estate Modular Backend API is running successfully with PostgreSQL & Prisma!",
		environment: process.env.NODE_ENV || "production",
	});
});

// Health check endpoint
app.get("/health", (req: Request, res: Response) => {
	res.status(200).json({
		status: "healthy",
		timestamp: new Date().toISOString(),
	});
});

// Mount Routes Helper for /api/v1, /api, and root prefixes
const mountRoutes = (prefix: string) => {
	app.use(`${prefix}/auth`, AuthRoutes);
	app.use(`${prefix}/contact-info`, ContactRoutes);
	app.use(`${prefix}/membership-content`, MembershipRoutes);
	app.use(`${prefix}/membership`, MembershipRoutes);
	app.use(`${prefix}/services`, ServiceRoutes);
	app.use(`${prefix}/service`, ServiceRoutes);
	app.use(`${prefix}/projects`, ProjectRoutes);
	app.use(`${prefix}/project`, ProjectRoutes);
	app.use(`${prefix}/projects-content`, ProjectsContentRoutes);
	app.use(`${prefix}/about-content`, AboutRoutes);
	app.use(`${prefix}/about`, AboutRoutes);
	app.use(`${prefix}/home-content`, HomeRoutes);
	app.use(`${prefix}/home`, HomeRoutes);
	app.use(`${prefix}/settings`, SettingRoutes);
	app.use(`${prefix}/properties`, PropertyRoutes);
	app.use(`${prefix}/leads`, LeadRoutes);
	app.use(`${prefix}/gallery`, GalleryRoutes);
	app.use(`${prefix}/slides`, SlideRoutes);
	app.use(`${prefix}/blog`, BlogRoutes);
	app.use(`${prefix}/posts`, BlogRoutes);
};

mountRoutes("/api/v1");
mountRoutes("/api");
mountRoutes("");

// 404 JSON Fallback with CORS headers preserved
app.use((req: Request, res: Response) => {
	const origin = req.headers.origin;
	if (origin) {
		res.setHeader("Access-Control-Allow-Origin", origin);
		res.setHeader("Access-Control-Allow-Credentials", "true");
	}
	res.status(404).json({
		success: false,
		message: `API Route not found: ${req.method} ${req.originalUrl}`,
	});
});

// Global Error Handler
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
	const origin = req.headers.origin;
	if (origin) {
		res.setHeader("Access-Control-Allow-Origin", origin);
		res.setHeader("Access-Control-Allow-Credentials", "true");
	}
	console.error("[Global Error Handler]:", err);
	res.status(err.status || 500).json({
		success: false,
		message: err.message || "Internal Server Error",
	});
});
