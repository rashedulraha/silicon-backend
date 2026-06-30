"use strict";
// prisma/seed.ts
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function main() {
    console.log("🌱 Seeding database with strict Prisma input typing...");
    await prisma.property.deleteMany();
    const propertiesData = [
        {
            title: "Silicon City Mohammadpur",
            slug: "silicon-city-mohammadpur",
            description: "A premium residential complex in the heart of Mohammadpur offering modern apartments with world-class amenities. Strategically located near top schools, hospitals, and commercial hubs.",
            price: new client_1.Prisma.Decimal(4500000.0),
            address: "Ring Road, Mohammadpur",
            city: "Dhaka",
            bedrooms: 3,
            bathrooms: 3,
            areaSqFt: 1350,
            status: "available",
            parkingSpaces: 1,
            hasPool: false,
            hasGarden: true,
            images: ["https://placehold.co/800x600?text=Silicon+City+Mohammadpur"],
        },
        {
            title: "Silicon Heights Uttara",
            slug: "silicon-heights-uttara",
            description: "An upcoming luxury high-rise in Uttara's most sought-after sector, featuring spacious units with panoramic city views and smart-home technology. Expected handover in Q4 2026.",
            price: new client_1.Prisma.Decimal(6800000.0),
            address: "Road 12, Sector 10, Uttara",
            city: "Dhaka",
            bedrooms: 4,
            bathrooms: 4,
            areaSqFt: 1850,
            status: "available",
            parkingSpaces: 2,
            hasPool: true,
            hasGarden: true,
            images: ["https://placehold.co/800x600?text=Silicon+Heights+Uttara"],
        },
        {
            title: "Silicon Square Mirpur",
            slug: "silicon-square-mirpur",
            description: "A successfully delivered mid-rise residential project in Mirpur DOHS with 120 units, landscaped gardens, and 24/7 security. All units are now occupied by satisfied homeowners.",
            price: new client_1.Prisma.Decimal(3800000.0),
            address: "Avenue 3, Mirpur DOHS",
            city: "Dhaka",
            bedrooms: 3,
            bathrooms: 2,
            areaSqFt: 1200,
            status: "sold",
            parkingSpaces: 1,
            hasPool: false,
            hasGarden: false,
            images: ["https://placehold.co/800x600?text=Silicon+Square+Mirpur"],
        },
        {
            title: "Silicon Garden Bashundhara",
            slug: "silicon-garden-bashundhara",
            description: "A flagship mixed-use development in Bashundhara Residential Area featuring premium apartments, rooftop gardens, and a ground-floor retail concourse. Construction is currently at 60% completion.",
            price: new client_1.Prisma.Decimal(8200000.0),
            address: "Block I, Bashundhara R/A",
            city: "Dhaka",
            bedrooms: 4,
            bathrooms: 4,
            areaSqFt: 2200,
            status: "available",
            parkingSpaces: 2,
            hasPool: false,
            hasGarden: true,
            images: ["https://placehold.co/800x600?text=Silicon+Garden+Bashundhara"],
        },
        {
            title: "Silicon Vista Gulshan",
            slug: "silicon-vista-gulshan",
            description: "An ultra-premium boutique tower in the diplomatic enclave of Gulshan 2, offering only 24 exclusive residences with private terraces and concierge services. Pre-sales now open.",
            price: new client_1.Prisma.Decimal(12500000.0),
            address: "Madani Avenue, Gulshan 2",
            city: "Dhaka",
            bedrooms: 4,
            bathrooms: 5,
            areaSqFt: 3100,
            status: "pending",
            parkingSpaces: 3,
            hasPool: true,
            hasGarden: true,
            images: ["https://placehold.co/800x600?text=Silicon+Vista+Gulshan"],
        },
    ];
    await prisma.property.createMany({
        data: propertiesData,
    });
    console.log("✅ All project data successfully seeded into Neon DB!");
}
main()
    .catch((e) => {
    console.error("❌ Error seeding data:", e);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
});
//# sourceMappingURL=seed.js.map