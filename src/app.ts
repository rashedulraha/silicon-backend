import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

import authRoutes from "./modules/auth/auth.routes";
import propertyRoutes from "./modules/properties/properties.routes";
import {
  userRouter as inquiryRoutes,
  adminRouter as adminInquiryRoutes,
} from "./modules/inquiries/inquiries.routes";
import { errorHandler } from "./middleware/error.middleware";

const app = express();

// Global Middlewares
app.use(helmet());
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:3000",
    credentials: true, // CRITICAL: allows secure cookies to pass through CORS
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "Cookie"],
  }),
);

app.use(express.json());
app.use(cookieParser());

// Request logging in development mode
if (process.env.NODE_ENV === "development") {
  app.use((req: Request, res: Response, next: NextFunction) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
    next();
  });
}

// API Routes mounting
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/properties", propertyRoutes);
app.use("/api/v1/inquiries", inquiryRoutes);
app.use("/api/v1/admin/inquiries", adminInquiryRoutes);

// Base Health Check
app.get("/health", (req: Request, res: Response) => {
  res.status(200).json({ status: "ok", timestamp: new Date() });
});

app.use("/",(req:Request,res:Response)=>{
    res.status(200).json({
        success:true, message:"Hello root route"
    })
})
// Global Error Handler
app.use(errorHandler);

export default app;
