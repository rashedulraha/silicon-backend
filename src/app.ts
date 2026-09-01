import express, { Request, Response } from "express";
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

// API v1 Routes
app.use("/api/v1/auth", AuthRoutes);
app.use("/api/v1/contact-info", ContactRoutes);
app.use("/api/v1/membership-content", MembershipRoutes);
app.use("/api/v1/membership", MembershipRoutes);
app.use("/api/v1/services", ServiceRoutes);
app.use("/api/v1/service", ServiceRoutes);
app.use("/api/v1/projects", ProjectRoutes);
app.use("/api/v1/project", ProjectRoutes);
app.use("/api/v1/projects-content", ProjectsContentRoutes);
app.use("/api/v1/about-content", AboutRoutes);
app.use("/api/v1/about", AboutRoutes);
app.use("/api/v1/home-content", HomeRoutes);
app.use("/api/v1/home", HomeRoutes);
app.use("/api/v1/settings", SettingRoutes);
app.use("/api/v1/properties", PropertyRoutes);
app.use("/api/v1/leads", LeadRoutes);
app.use("/api/v1/gallery", GalleryRoutes);
app.use("/api/v1/slides", SlideRoutes);

