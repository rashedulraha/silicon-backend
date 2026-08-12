import prisma from "../../lib/prisma.js";
import {
  ICreateServiceInput,
  IUpdateServiceInput,
} from "./service.interface.js";

const DEFAULT_SERVICES = [
  {
    num: "01",
    title: "Residential Plot Sales",
    tag: "Primary Plot Allotments",
    description:
      "We offer legally verified, risk-free, and register-ready residential plots of various sizes. Every plot is selected with high consideration for premium communication layouts, eco-friendly zoning, and unmatched future asset appreciation.",
    benefits: [
      "100% risk-free land investment",
      "Dispute-free ownership with instant registry readiness",
      "Located in high-growth suburban zones next to central Dhaka",
    ],
    order: 1,
  },
  {
    num: "02",
    title: "Planned Residential Projects",
    tag: "Modern Housing Township",
    description:
      "We implement highly modern housing communities like 'Silicon City,' blending state-of-the-art urban architecture with natural serenity. Our township plans incorporate essential civil facilities to elevate the standards of living.",
    benefits: [
      "Grand Central Mosque and block-based mosques",
      "Lush green playgrounds, parks, and dedicated Football and Cricket fields",
      "Planned spaces for modern School, College, Hospital, and Local Markets",
    ],
    order: 2,
  },
  {
    num: "03",
    title: "Land Acquisition & Development",
    tag: "Soil Earthwork & Elevation",
    description:
      "We handle strategic land scouting, absolute deed clearance, and professional land development. Our expert engineering team executes systematic soil filling to prepare solid elevated ground for permanent home construction.",
    benefits: [
      "Earth-filling up to a safe height of 16 to 18 feet",
      "Developing wide internal roads of 30 feet and 40 feet within the blocks",
      "Adhering strictly to structural safety guidelines and community development blueprints",
    ],
    order: 3,
  },
  {
    num: "04",
    title: "Legal Documentation & Registration",
    tag: "Deed Vetting & Title Search",
    description:
      "Navigating property laws in Bangladesh can be challenging. Our specialized legal and documentation team provides full-scale assistance to verify deed history, ensure flawless title ownership, and complete hassle-free registration.",
    benefits: [
      "In-depth deed vetting and title search history clearance",
      "Hassle-free registry and official mutation processing",
      "Securing official clearance certificates (NOC) and legal safety",
    ],
    order: 4,
  },
  {
    num: "05",
    title: "Real Estate Investment Consultancy",
    tag: "High ROI Property Advisory",
    description:
      "We provide personalized property advisory services to match your exact budget, housing requirements, and long-term financial goals. Our expert insights ensure you buy property that guarantees maximum security and high return-on-investment (ROI).",
    benefits: [
      "Optimizing budget models for land buying",
      "Guiding first-time land buyers through complex property regulations",
      "Identifying high-ROI land segments within our projects",
    ],
    order: 5,
  },
  {
    num: "06",
    title: "Easy Installment Facility",
    tag: "Flexible Payment Schemes",
    description:
      "To make your dream address a reality, we offer flexible and hassle-free payment schemes. Our installment packages are designed carefully to ease your financial burden, allowing you to invest gradually without stress.",
    benefits: [
      "Low initial deposit/booking fees",
      "Planned financial management with custom monthly or quarterly installments",
      "No hidden charges, ensuring 100% transparency",
    ],
    order: 6,
  },
  {
    num: "07",
    title: "Dedicated Post-Sales Support",
    tag: "Demarcation & Utility Setup",
    description:
      "Our commitment to you does not end at property booking. We provide continuous assistance throughout physical plot demarcation, boundary wall setups, and utility connection planning.",
    benefits: [
      "Physical demarcation of your plot boundaries on site",
      "Coordination for shared boundary wall constructions",
      "Sincere and rapid customer dispute resolution by a professional desk",
    ],
    order: 7,
  },
];

export class ServiceService {
  public static async ensureSeedData() {
    const count = await prisma.service.count();
    if (count > 0) return;

    await prisma.service.createMany({
      data: DEFAULT_SERVICES,
    });
  }

  public static async getAll() {
    await this.ensureSeedData();
    return await prisma.service.findMany({
      where: { active: true },
      orderBy: { order: "asc" },
    });
  }

  public static async getById(id: string) {
    return await prisma.service.findUnique({ where: { id } });
  }

  public static async create(data: ICreateServiceInput) {
    const count = await prisma.service.count();
    return await prisma.service.create({
      data: {
        num: data.num || `0${count + 1}`,
        title: data.title,
        tag: data.tag || "Core Service",
        description: data.description,
        icon: data.icon,
        imageUrl: data.imageUrl,
        pricing: data.pricing,
        benefits: data.benefits || [],
        order: data.order ?? count + 1,
        active: data.active ?? true,
      },
    });
  }

  public static async update(id: string, data: IUpdateServiceInput) {
    return await prisma.service.update({
      where: { id },
      data: {
        ...(data.num && { num: data.num }),
        ...(data.title && { title: data.title }),
        ...(data.tag && { tag: data.tag }),
        ...(data.description && { description: data.description }),
        ...(data.icon !== undefined && { icon: data.icon }),
        ...(data.imageUrl !== undefined && { imageUrl: data.imageUrl }),
        ...(data.pricing !== undefined && { pricing: data.pricing }),
        ...(data.benefits && { benefits: data.benefits }),
        ...(data.order !== undefined && { order: data.order }),
        ...(data.active !== undefined && { active: data.active }),
      },
    });
  }

  public static async delete(id: string) {
    return await prisma.service.delete({ where: { id } });
  }
}
