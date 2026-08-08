import express, { Request, Response } from "express";
import cors from "cors";
import { AppRouter } from "./routes/index.js";
import { SeedService } from "./modules/seed/seed.service.js";

export const app = express();

// Middlewares
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Root Health Check Route
app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: "Silicon Real Estate Modular Backend API is running successfully with PostgreSQL & Prisma!",
  });
});

// Trigger Auto-Seeding asynchronously on server startup
SeedService.ensureSeedData();

// Mount central router under both /api/v1 and root for seamless client compatibility
app.use("/api/v1", AppRouter);
app.use("/", AppRouter);
