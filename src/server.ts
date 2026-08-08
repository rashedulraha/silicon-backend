import { app } from "./app.js";
import prisma from "./lib/prisma.js";

const PORT = process.env.PORT;

async function startServer() {
  try {
    console.log("Connecting to database...");
    // Verify database connectivity
    await prisma.$connect();
    console.log("Database connected successfully.");

    app.listen(PORT, () => {
      console.log(
        `Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`,
      );
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
}

// Global handler for promise rejections outside Express
process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection at:", promise, "reason:", reason);
});

startServer();
