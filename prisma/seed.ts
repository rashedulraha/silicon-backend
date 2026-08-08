import { prisma } from "../src/lib/prisma.js";

async function main() {
	console.log("Seeding database...");

	// 1. Site Settings
	await prisma.siteSettings.upsert({
		where: { id: "global" },
		update: {},
		create: {
			id: "global",
			email: "info@siliconrealestatepvtltd.com",
			phone: "+880 1711-000000",
			hotline: "16222",
			address: "Level 12, Silicon Tower, Mohammadpur Beribadh Link Road, Dhaka 1207",
			facebookUrl: "https://facebook.com/siliconrealestate",
			youtubeUrl: "https://youtube.com/siliconrealestate",
			aboutSummary: "Silicon Real Estate Pvt. Ltd. is a premier land developer building modern eco-townships.",
			mission: "To deliver legally verified, flood-protected, planned residential plots for every family.",
			vision: "To become Bangladesh's most trusted eco-friendly township real estate company.",
		},
	});

	// 2. Hero Slides
	await prisma.slide.deleteMany();
	await prisma.slide.createMany({
		data: [
			{
				id: "slide-1",
				badge: "Silicon City Township",
				title: "Your Trusted Partner in Land Investment",
				subtitle:
					"Meticulously planned, eco-friendly residential plots with 30ft & 40ft wide avenues adjacent to Mohammadpur, Dhaka.",
				image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1920&q=80",
				link: "/projects",
				active: true,
				order: 1,
			},
			{
				id: "slide-2",
				badge: "Dispute-Free Land",
				title: "A Secure Home for Future Generations",
				subtitle:
					"100% legally sound land deeds with immediate registration, RAJUK masterplan compliance, and flood-proof elevation.",
				image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1920&q=80",
				link: "/projects",
				active: true,
				order: 2,
			},
			{
				id: "slide-3",
				badge: "Natural Riverfront Living",
				title: "Experience Peaceful Eco Township Living",
				subtitle:
					"Located next to the scenic Turag River with green parks, central mosque, schools, and 24/7 security services.",
				image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1920&q=80",
				link: "/about#amenities",
				active: true,
				order: 3,
			},
		],
	});

	// 3. Properties / Land Plots Inventory
	await prisma.property.deleteMany();
	await prisma.property.createMany({
		data: [
			{
				id: "prop-1",
				title: "Silicon City Block-A Prime Corner Plot",
				slug: "silicon-city-block-a-corner-plot",
				type: "plot",
				category: "residential",
				status: "available",
				price: 3500000,
				location: "Block A, Silicon City, Savar Link Road",
				areaSqFt: 2160,
				bedrooms: 0,
				bathrooms: 0,
				description:
					"3 Katha south-facing corner plot on a 40ft wide avenue road. Ready for immediate registration.",
				features: ["40ft Avenue Road", "South Facing", "Ready Registration", "Soil Elevated"],
				images: [
					"https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1200",
					"https://images.unsplash.com/photo-1524813686514-a57563d77965?q=80&w=1200",
				],
				featured: true,
			},
			{
				id: "prop-2",
				title: "Turag Riverfront Scenic Residential Plot",
				slug: "turag-riverfront-scenic-plot",
				type: "plot",
				category: "luxury",
				status: "available",
				price: 5200000,
				location: "Riverview Zone, Silicon City",
				areaSqFt: 3600,
				bedrooms: 0,
				bathrooms: 0,
				description:
					"5 Katha luxury riverfront plot directly adjacent to the Turag River green belt.",
				features: ["River View", "50ft Main Avenue", "Utility Lines Ready", "Green Belt Park"],
				images: [
					"https://images.unsplash.com/photo-1588880331179-bc9b93a8cb5e?q=80&w=1200",
				],
				featured: true,
			},
			{
				id: "prop-3",
				title: "Commercial Plot on Main Expressway Link",
				slug: "commercial-plot-expressway-link",
				type: "commercial",
				category: "commercial",
				status: "available",
				price: 12000000,
				location: "Expressway Entry, Silicon City",
				areaSqFt: 7200,
				bedrooms: 0,
				bathrooms: 0,
				description:
					"10 Katha prime commercial plot suitable for shopping centers, banks, or corporate offices.",
				features: ["Main Highway Frontage", "High ROI", "Corner Location", "Commercial Zone"],
				images: [
					"https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=1200",
				],
				featured: true,
			},
		],
	});

	// 4. Company News & Blog Posts
	await prisma.blogPost.deleteMany();
	await prisma.blogPost.createMany({
		data: [
			{
				id: "news-1",
				title: "Turag River Bridge Processing Underway for Silicon City",
				slug: "turag-river-bridge-processing",
				excerpt:
					"Direct bridge connectivity from Mohammadpur Beribadh to Silicon City will reduce commute times to central Dhaka to just 10 minutes.",
				content:
					"We are thrilled to announce that government infrastructure approvals for the direct Turag River link bridge are advancing rapidly. This bridge will connect Mohammadpur directly to Silicon City.",
				image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=1200",
				category: "Infrastructure",
				author: "Silicon Editorial",
			},
			{
				id: "news-2",
				title: "RAJUK Extended Masterplan Compliance Certified",
				slug: "rajuk-extended-masterplan-compliance",
				excerpt:
					"Silicon Real Estate secures full planning alignment with RAJUK's eco-township development guidelines.",
				content:
					"Silicon City has officially completed structural and environmental compliance reviews with RAJUK town planning authorities.",
				image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200",
				category: "Legal & Regulatory",
				author: "Legal Cell",
			},
			{
				id: "news-3",
				title: "Block A Handover Ceremony & Ready Registration Drive",
				slug: "block-a-handover-ceremony",
				excerpt:
					"Over 150 plot owners received instant registration deeds during Silicon Real Estate's annual customer appreciation day.",
				content:
					"More than 150 families celebrated receiving instant sub-registry deeds during our annual Block A Handover festival.",
				image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1200",
				category: "Events",
				author: "PR Division",
			},
		],
	});

	console.log("Database seeded successfully!");
}

main()
	.catch((e) => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
