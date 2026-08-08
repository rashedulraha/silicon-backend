import { prisma } from "../../lib/prisma.js";
import { SeedService } from "../seed/seed.service.js";
import { IUpdateSettingsInput } from "./setting.interface.js";

export class SettingService {
  public static async getSettings() {
    await SeedService.ensureSeedData();
    let settings = await prisma.siteSettings.findUnique({
      where: { id: "global" },
    });
    if (!settings) {
      settings = await prisma.siteSettings.create({
        data: {
          id: "global",
          email: "info@siliconrealestatepvtltd.com",
          phone: "+880 1711-000000",
          hotline: "16789",
          address: "Silicon Real Estate Tower, Level 8, Purbachal Main Expressway, Dhaka-1229",
          facebookUrl: "https://facebook.com",
          youtubeUrl: "https://youtube.com",
          aboutSummary: "Silicon Real Estate (Pvt.) Ltd. is a premier land developer in Dhaka dedicated to eco-friendly planned townships and legally sound plot registration.",
          mission: "To provide dispute-free, RAJUK-compliant, planned residential & commercial land plots for every family in Bangladesh.",
          vision: "To become Bangladesh's most trusted real estate developer through transparent documentation, planned infrastructure, and ethical service.",
        },
      });
    }
    return settings;
  }

  public static async updateSettings(data: IUpdateSettingsInput) {
    return await prisma.siteSettings.upsert({
      where: { id: "global" },
      update: {
        email: data.email,
        phone: data.phone,
        hotline: data.hotline,
        address: data.address,
        facebookUrl: data.facebookUrl,
        youtubeUrl: data.youtubeUrl,
        aboutSummary: data.aboutSummary,
        mission: data.mission,
        vision: data.vision,
      },
      create: {
        id: "global",
        email: data.email || "info@siliconrealestatepvtltd.com",
        phone: data.phone || "+880 1711-000000",
        hotline: data.hotline || "16789",
        address: data.address || "Silicon Real Estate Tower, Level 8, Purbachal Main Expressway, Dhaka-1229",
        facebookUrl: data.facebookUrl,
        youtubeUrl: data.youtubeUrl,
        aboutSummary: data.aboutSummary || "Silicon Real Estate (Pvt.) Ltd. is a premier land developer in Dhaka.",
        mission: data.mission || "Dispute-free, RAJUK-compliant planned residential land plots.",
        vision: data.vision || "Bangladesh's most trusted real estate developer.",
      },
    });
  }
}

