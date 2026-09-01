import "dotenv/config";
import { app } from "./app.js";
import prisma from "./lib/prisma.js";

const PORT = Number(process.env.PORT) || 8000;

async function startServer() {
	try {
		console.log("Connecting to database...");
		// Verify database connectivity
		await prisma.$connect();
		console.log("Database connected successfully.");

		// Ensure seed data and admin account exist
		try {
			const { SeedService } = await import("./modules/seed/seed.service.js");
			await SeedService.ensureSeedData();
		} catch (seedErr) {
			console.error("Error during initial data seeding:", seedErr);
		}

		app.listen(PORT, "0.0.0.0", () => {
			console.log(
				`Server is running in ${process.env.NODE_ENV || "production"} mode on port ${PORT}`,
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
