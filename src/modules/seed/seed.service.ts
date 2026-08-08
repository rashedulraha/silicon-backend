import prisma from "../../lib/prisma.js";

export class SeedService {
  public static async ensureSeedData() {
    try {
      const propCount = await prisma.property.count();
      if (propCount === 0) {
        await prisma.property.createMany({
          data: [
            {
              title: "Silicon City Prime Plot A-1",
              slug: "silicon-city-prime-plot-a1",
              type: "plot",
              category: "residential",
              status: "available",
              price: 4500000,
              location: "Block A, Silicon City, Purbachal Expressway, Dhaka",
              areaSqFt: 2178, // 3 katha approx
              description:
                "Ready-to-register residential plot with legally verified ownership history and eco-friendly zoning.",
              features: [
                "3 Katha",
                "30ft Wide Road",
                "Ready Registration",
                "Gas & Electricity Utility Connection",
              ],
              images: [
                "https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1200",
              ],
              featured: true,
            },
            {
              title: "Silicon Lake View Plot B-4",
              slug: "silicon-lake-view-plot-b4",
              type: "plot",
              category: "residential",
              status: "available",
              price: 7500000,
              location: "Block B, Lake View Block, Silicon City, Dhaka",
              areaSqFt: 3630, // 5 katha
              description:
                "Premium lakefront plot with scenic natural surroundings and quick access to 300ft Purbachal Expressway.",
              features: [
                "5 Katha",
                "Lakefront",
                "Security Post",
                "High Land Level",
              ],
              images: [
                "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=1200",
              ],
              featured: true,
            },
            {
              title: "Executive Commercial Avenue Plot C-2",
              slug: "executive-commercial-avenue-plot-c2",
              type: "plot",
              category: "commercial",
              status: "available",
              price: 18000000,
              location: "Main Avenue, Block C, Silicon City, Dhaka",
              areaSqFt: 7260, // 10 katha
              description:
                "Prime main road corner commercial plot suitable for shopping centers, banks, or corporate towers.",
              features: [
                "10 Katha",
                "60ft Main Avenue Road",
                "Corner Plot",
                "Commercial License Approved",
              ],
              images: [
                "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200",
              ],
              featured: false,
            },
          ],
        });
        console.log(
          "[SeedService] Successfully seeded properties into PostgreSQL.",
        );
      }

      const slideCount = await prisma.slide.count();
      if (slideCount === 0) {
        await prisma.slide.createMany({
          data: [
            {
              title: "Silicon City Purbachal Expressway",
              subtitle:
                "100% Legally Verified, Risk-Free, and Ready-to-Register Land Plots",
              image:
                "https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1600",
              badge: "FEATURED PROJECT",
              link: "/projects",
              active: true,
              order: 1,
            },
            {
              title: "Modern Eco-Friendly Planned Living",
              subtitle:
                "Eco-Zoning, Wide Communication Avenues & 24/7 Security",
              image:
                "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=1600",
              badge: "SMART INFRASTRUCTURE",
              link: "/properties",
              active: true,
              order: 2,
            },
          ],
        });
        console.log(
          "[SeedService] Successfully seeded slides into PostgreSQL.",
        );
      }

      const settingsCount = await prisma.siteSettings.count();
      if (settingsCount === 0) {
        await prisma.siteSettings.create({
          data: {
            id: "global",
            email: "info@siliconrealestatepvtltd.com",
            phone: "+880 1711-000000",
            hotline: "16789",
            address:
              "Silicon Real Estate Tower, Level 8, Purbachal Main Expressway, Dhaka-1229",
            facebookUrl: "https://facebook.com",
            youtubeUrl: "https://youtube.com",
            aboutSummary:
              "Silicon Real Estate (Pvt.) Ltd. is a premier land developer in Dhaka dedicated to eco-friendly planned townships and legally sound plot registration.",
            mission:
              "To provide dispute-free, RAJUK-compliant, planned residential & commercial land plots for every family in Bangladesh.",
            vision:
              "To become Bangladesh's most trusted real estate developer through transparent documentation, planned infrastructure, and ethical service.",
          },
        });
        console.log(
          "[SeedService] Successfully seeded site settings into PostgreSQL.",
        );
      }

      const galleryCount = await prisma.galleryItem.count();
      if (galleryCount === 0) {
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
                "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=1600&q=80",
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
                "https://images.unsplash.com/photo-1590674899484-d5640e854abe?auto=format&fit=crop&w=1600&q=80",
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
        console.log(
          "[SeedService] Successfully seeded gallery items into PostgreSQL.",
        );
      }
    } catch (err) {
      console.error("[SeedService] Error seeding PostgreSQL:", err);
    }
  }
}
