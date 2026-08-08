import { ILoginPayload, IAuthResponse } from "./auth.interface.js";

export class AuthService {
  private static getAdminCredentials() {
    return {
      email: process.env.ADMIN_EMAIL || "info@siliconrealestatepvtltd.com",
      password: process.env.ADMIN_PASSWORD || "SiliconReal2026!",
    };
  }

  public static async login(payload: ILoginPayload): Promise<IAuthResponse> {
    const { email, password } = payload;
    const { email: adminEmail, password: adminPassword } = this.getAdminCredentials();

    if (email && email.trim() === adminEmail && password === adminPassword) {
      return {
        success: true,
        message: "Authentication successful.",
        user: {
          id: "admin-1",
          name: "Silicon Admin",
          email: adminEmail,
          role: "admin",
        },
        token: "silicon-admin-jwt-token-2026",
      };
    }

    return {
      success: false,
      message: "Invalid email address or password. Please try again.",
    };
  }

  public static async getMe(): Promise<IAuthResponse> {
    const { email: adminEmail } = this.getAdminCredentials();
    return {
      success: true,
      user: {
        id: "admin-1",
        name: "Silicon Admin",
        email: adminEmail,
        role: "admin",
      },
    };
  }
}
