// prisma/seed.ts

import "dotenv/config";
import { PrismaClient, Prisma } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

const connectionString = process.env.DATABASE_URL;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);

const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("🌱 Striking Neon Database with official production seed data...");

  // ১. ডুপ্লিকেট এন্ট্রি এড়াতে আগের ডেটা ক্লিন করা
  await prisma.property.deleteMany();

  // ২. আপনার properties.json ও projects.json ফাইল থেকে সংগৃহীত পিক্সেল-পারফেক্ট ডেটা অ্যারে
  const propertiesData: Prisma.PropertyCreateManyInput[] = [
    {
      title: "Silicon Orchard - Premium Residential Plots",
      slug: "silicon-orchard-premium-residential-plots",
      description: "Premium ready-to-build residential plots in a master-planned community near Iqbal Road, Mohammadpur. Features RAJUK-approved boundaries, 30ft wide internal roads, and utilities ready for immediate connection.",
      price: new Prisma.Decimal(4800000.00),
      address: "Block A, Iqbal Road, Mohammadpur",
      city: "Dhaka",
      bedrooms: 0,
      bathrooms: 0,
      areaSqFt: 2160,
      parkingSpaces: 0,
      hasPool: false,
      hasGarden: false,
      status: "available", // আপনার স্কিমার ছোট হাতের enum এর সাথে মিল রেখে
      images: [
        "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=80",
        "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=800&q=80"
      ],
      yearBuilt: 2025
    },
    {
      title: "Silicon Commercial Square - Commercial Plots",
      slug: "silicon-commercial-square-plots",
      description: "Prime commercial plot with high ROI potential located in Uttara Sector 18. Perfect for high-rise commercial complexes, corporate offices, or retail outlets with excellent transportation link.",
      price: new Prisma.Decimal(21000000.00),
      address: "Sector 18, Main Road, Uttara",
      city: "Dhaka",
      bedrooms: 0,
      bathrooms: 0,
      areaSqFt: 3600,
      parkingSpaces: 0,
      hasPool: false,
      hasGarden: false,
      status: "available",
      images: [
        "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80",
        "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80"
      ],
      yearBuilt: 2025
    },
    {
      title: "Silicon Royal Heights - Ready Flat",
      slug: "silicon-royal-heights-ready-flat",
      description: "Spacious and luxurious ready-to-move apartment in Mirpur DOHS. Designed with premium marble flooring, imported fittings, and a grand balcony with open views.",
      price: new Prisma.Decimal(13500000.00),
      address: "Road 12, Mirpur DOHS",
      city: "Dhaka",
      bedrooms: 3,
      bathrooms: 3,
      areaSqFt: 1850,
      parkingSpaces: 1, // 'garage': 1 থেকে ম্যাপ করা হয়েছে
      hasPool: false,
      hasGarden: false,
      status: "available",
      images: [
        "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80",
        "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80"
      ],
      yearBuilt: 2024
    },
    {
      title: "Silicon Green Valley - Land Investment",
      slug: "silicon-green-valley-land-investment",
      description: "Strategic land investment opportunity in Purbachal Bypass. High-appreciation zone with rapid infrastructure development. Secure ownership with transparent paperwork.",
      price: new Prisma.Decimal(3200000.00),
      address: "Adjacent to 180ft Bypass Road, Purbachal",
      city: "Dhaka",
      bedrooms: 0,
      bathrooms: 0,
      areaSqFt: 2880,
      parkingSpaces: 0,
      hasPool: false,
      hasGarden: false,
      status: "available",
      images: [
        "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=80"
      ],
      yearBuilt: 2025
    },
    {
      title: "Silicon Vista - Exclusive Gulshan Penthouse",
      slug: "silicon-vista-exclusive-gulshan-penthouse",
      description: "An ultra-luxurious penthouse in Gulshan 2 offering unmatched city skyline views, private elevator access, private terrace garden, and smart automated security.",
      price: new Prisma.Decimal(42000000.00),
      address: "Road 72, Gulshan 2",
      city: "Dhaka",
      bedrooms: 4,
      bathrooms: 4,
      areaSqFt: 3400,
      parkingSpaces: 2, // 'garage': 2 থেকে ম্যাপ করা হয়েছে
      hasPool: false,
      hasGarden: true, // terrace garden থেকে ট্রু করা হয়েছে
      status: "available",
      images: [
        "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80",
        "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80"
      ],
      yearBuilt: 2025
    },
    {
      title: "Silicon City Mohammadpur",
      slug: "silicon-city-mohammadpur",
      description: "A premium residential complex in the heart of Mohammadpur offering modern apartments with world-class amenities. Strategically located near top schools, hospitals, and commercial hubs.",
      price: new Prisma.Decimal(4500000.00),
      address: "2/3 (2nd Floor), Block A, Iqbal Road, Mohammadpur",
      city: "Dhaka",
      bedrooms: 3,
      bathrooms: 3,
      areaSqFt: 1450,
      parkingSpaces: 1,
      hasPool: false,
      hasGarden: true,
      status: "pending", // projects.json এ এটি ongoing ছিল, আপনার স্কিমার ভ্যালু অনুযায়ী 'pending' করা হয়েছে
      images: ["https://placehold.co/800x600?text=Silicon+City+Mohammadpur"],
      yearBuilt: 2026
    },
    {
      title: "Silicon Heights Uttara",
      slug: "silicon-heights-uttara",
      description: "An upcoming luxury high-rise in Uttara's most sought-after sector, featuring spacious units with panoramic city views and smart-home technology. Expected handover in Q4 2026.",
      price: new Prisma.Decimal(6800000.00),
      address: "Uttara Sector 10",
      city: "Dhaka",
      bedrooms: 3,
      bathrooms: 3,
      areaSqFt: 1650,
      parkingSpaces: 1,
      hasPool: true,
      hasGarden: true,
      status: "available", // upcoming ডেটাকে 'available' করা হয়েছে
      images: ["https://placehold.co/800x600?text=Silicon+Heights+Uttara"],
      yearBuilt: 2026
    },
    {
      title: "Silicon Square Mirpur",
      slug: "silicon-square-mirpur",
      description: "A successfully delivered mid-rise residential project in Mirpur DOHS with 120 units, landscaped gardens, and 24/7 security. All units are now occupied by satisfied homeowners.",
      price: new Prisma.Decimal(3800000.00),
      address: "Mirpur DOHS",
      city: "Dhaka",
      bedrooms: 2,
      bathrooms: 2,
      areaSqFt: 1150,
      parkingSpaces: 1,
      hasPool: false,
      hasGarden: true,
      status: "sold", // completed ডেটাকে 'sold' করা হয়েছে
      images: ["https://placehold.co/800x600?text=Silicon+Square+Mirpur"],
      yearBuilt: 2025
    }
  ];

  // প্রিজমা ডাটাবেজে টাইপ সেফ উপায়ে ডেটা পুশ
  await prisma.property.createMany({
    data: propertiesData as any,
  });

  console.log("✅ Magnificent! All official business data has been successfully synchronized and seeded into Neon DB!");
}

main()
  .catch((e) => {
    console.error("❌ Seeding intercepted by error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });