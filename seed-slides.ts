/// <reference types="node" />
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const PHOTO_IDS = [
  "1486325212027-8081e485255e",
  "1487958449943-2429e8be8625",
  "1600585154340-be6161a56a0c",
  "1600607687939-ce8a6c25118c",
  "1600566753086-00f18fb6b3ea",
  "1580587771525-78b9dba3b914",
  "1518780664697-55e3ad937233",
  "1449844908441-8829872d2607",
];

async function main() {
  console.log("Seeding dummy slides...");

  // Clear existing slides to avoid duplicates if user wants a fresh start with the new dummy images
  await prisma.slide.deleteMany();

  const slides = PHOTO_IDS.map((id, index) => ({
    title: `Premium Real Estate Plot ${index + 1}`,
    subtitle: "Experience luxury living with top-tier verified properties.",
    image: `https://images.unsplash.com/photo-${id}?w=600&h=800&fit=crop&q=80`,
    badge: index % 2 === 0 ? "FEATURED" : "PREMIUM",
    link: "/projects",
    active: true,
    order: index + 1,
  }));

  await prisma.slide.createMany({
    data: slides,
  });

  console.log("Successfully seeded 8 dummy slides!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
