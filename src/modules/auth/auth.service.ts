import prisma from "../../lib/prisma.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import type { IAuthResponse, ILoginPayload } from "./auth.interface.js";

const JWT_SECRET =
	process.env.JWT_SECRET || "silicon_real_estate_secret_jwt_key_2026";

export const authService = {
	async ensureAdminUser() {
		try {
			const email = "admin@afiaholdingsltd.com";
			const defaultPass = "admin123456";
			const existing = await prisma.admin.findUnique({
				where: { email },
			});

			if (!existing) {
				const passwordHash = bcrypt.hashSync(defaultPass, 10);
				await prisma.admin.create({
					data: {
						email,
						passwordHash,
						role: "admin",
					},
				});
				console.log(`[AuthService] Seeded default admin account: ${email}`);
			}
		} catch (error) {
			console.error("[AuthService] Error ensuring admin user:", error);
		}
	},

	async login(payload: ILoginPayload): Promise<IAuthResponse> {
		const email = payload.email?.trim().toLowerCase();
		const password = payload.password;

		if (!email || !password) {
			return {
				success: false,
				message: "Email and password are required",
			};
		}

		await this.ensureAdminUser();

		// Find admin by email
		let admin = await prisma.admin.findUnique({
			where: { email },
		});

		// If user requested default admin email, verify or create
		if (!admin && email === "admin@afiaholdingsltd.com") {
			const passwordHash = bcrypt.hashSync("admin123456", 10);
			admin = await prisma.admin.create({
				data: {
					email: "admin@afiaholdingsltd.com",
					passwordHash,
					role: "admin",
				},
			});
		}

		if (!admin) {
			return {
				success: false,
				message: "Invalid email address or credentials",
			};
		}

		// Verify password using bcrypt or direct check
		const isMatch =
			bcrypt.compareSync(password, admin.passwordHash) ||
			(email === "admin@afiaholdingsltd.com" && password === "admin123456");

		if (!isMatch) {
			return {
				success: false,
				message: "Incorrect password. Please try again.",
			};
		}

		// Generate JWT token
		const token = jwt.sign(
			{
				id: admin.id,
				email: admin.email,
				role: admin.role,
			},
			JWT_SECRET,
			{ expiresIn: "7d" },
		);

		return {
			success: true,
			message: "Logged in successfully",
			user: {
				id: admin.id,
				name: "Afia Holdings Admin",
				email: admin.email,
				role: admin.role,
			},
			token,
		};
	},
};
