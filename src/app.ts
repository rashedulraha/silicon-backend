import express, { Request, Response } from "express";
import cors from "cors";

export const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Root Route
app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: "Silicon Real Estate Backend API is running successfully!",
  });
});
