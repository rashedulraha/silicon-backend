import prisma from "../../lib/prisma.js";
import {
  ICreateGalleryInput,
  IUpdateGalleryInput,
} from "./gallery.interface.js";

export class GalleryService {
  public static async ensureSeedData() {
    const count = await prisma.galleryItem.count();
    if (count > 0) return;

    await prisma.galleryItem.createMany({
      data: [
        {
          title: "Aerial View of Silicon City Layout",
          category: "project",
          badge: "SILICON CITY PROJECT",
          location: "Bara Badeshi Mouza, Savar",
          overview:
            "Scenic drone view of the planned residential blocks of Silicon City next to the Turag River. Our master plan ensures every block has green spaces, proper drainage, and direct road connectivity.",
          images: [
            "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1600&q=80",
            "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1600&q=80",
            "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80",
          ],
          features: [
            "Master Planned Layout",
            "Green Zones Included",
            "Flood Protected",
            "RAJUK Compliant",
          ],
          order: 1,
        },
        {
          title: "Earth-Filling Work in Progress (Phase 2)",
          category: "project",
          badge: "SITE PROGRESS",
          location: "Phase 2 Development Zone",
          overview:
            "Heavy machinery conducting professional soil development up to 16–18 feet height. All soil filling follows RAJUK and structural engineering specifications.",
          images: [
            "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1600&q=80",
            "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1600&q=80",
          ],
          features: [
            "16–18 Feet Soil Elevation",
            "Heavy Machinery",
            "Flood Proof Design",
            "Phase 2 Active",
          ],
          order: 2,
        },
        {
          title: "Proposed Bridge over Turag River",
          category: "infrastructure",
          badge: "INFRASTRUCTURE",
          location: "Turag River Bridge Point",
          overview:
            "Architectural design of the direct Turag River bridge connecting Silicon City with Mohammadpur Beribadh, reducing commute times to just 10 minutes.",
          images: [
            "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1600&q=80",
            "https://images.unsplash.com/photo-1586348943529-beaae6c28db9?auto=format&fit=crop&w=1600&q=80",
          ],
          features: [
            "Direct Bridge Access",
            "10 Min to Mohammadpur",
            "Government Approved",
            "Under Processing",
          ],
          order: 3,
        },
        {
          title: "40-Feet Wide Internal Road Network",
          category: "infrastructure",
          badge: "INFRASTRUCTURE",
          location: "Main Avenue Road, Silicon City",
          overview:
            "Meticulously developed spacious internal concrete roads for easy vehicle movement. All roads are 40ft wide with proper drainage systems and underground utility lines.",
          images: [
            "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=80",
            "https://images.unsplash.com/photo-1508873696983-2df515122519?auto=format&fit=crop&w=1600&q=80",
          ],
          features: [
            "40ft Wide Roads",
            "Underground Utilities",
            "Concrete Roads",
            "Drainage System",
          ],
          order: 4,
        },
        {
          title: "Silicon Real Estate Corporate Front Desk",
          category: "office",
          badge: "CORPORATE OFFICE",
          location: "Iqbal Road, Mohammadpur, Dhaka-1207",
          overview:
            "Elegant reception area at our main branch. Our professional team is available 6 days a week to guide you through every step of your land purchase journey.",
          images: [
            "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1600&q=80",
            "https://images.unsplash.com/photo-1517502884422-41eaead166d4?auto=format&fit=crop&w=1600&q=80",
          ],
          features: [
            "Professional Advisory Team",
            "Legal Deed Verification",
            "6 Days Open",
            "Free Consultation",
          ],
          order: 5,
        },
        {
          title: "Plot Demarcation and Handover Ceremony",
          category: "handovers",
          badge: "CLIENT HANDOVERS",
          location: "Silicon City Site",
          overview:
            "Silicon Real Estate team executing hassle-free plot demarcation and physical handover to happy investors. Over 150 families have received their deed certificates through our transparent process.",
          images: [
            "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1600&q=80",
            "https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=1600&q=80",
          ],
          features: [
            "150+ Handovers Done",
            "Instant Registration",
            "Mutation Issued",
            "Transparent Process",
          ],
          order: 6,
        },
      ],
    });
  }

  public static async getAll() {
    await this.ensureSeedData();
    return await prisma.galleryItem.findMany({
      where: { active: true },
      orderBy: { order: "asc" },
    });
  }

  public static async getById(id: string) {
    return await prisma.galleryItem.findUnique({ where: { id } });
  }

  public static async create(data: ICreateGalleryInput) {
    const count = await prisma.galleryItem.count();
    return await prisma.galleryItem.create({
      data: {
        title: data.title,
        category: data.category || "project",
        badge: data.badge || "PROJECT",
        location: data.location || "",
        overview: data.overview || "",
        images: data.images || [],
        features: data.features || [],
        order: data.order ?? count + 1,
        active: data.active ?? true,
      },
    });
  }

  public static async update(id: string, data: IUpdateGalleryInput) {
    return await prisma.galleryItem.update({
      where: { id },
      data: {
        title: data.title,
        category: data.category,
        badge: data.badge,
        location: data.location,
        overview: data.overview,
        images: data.images,
        features: data.features,
        order: data.order,
        active: data.active,
      },
    });
  }

  public static async delete(id: string) {
    return await prisma.galleryItem.delete({ where: { id } });
  }
}
