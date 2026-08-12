import prisma from "../src/lib/prisma.js";
import bcrypt from "bcryptjs";

async function main() {
	console.log("Seeding database...");

	// 1. Admin Account
	const defaultAdminEmail = process.env.ADMIN_EMAIL || "info@siliconrealestatepvtltd.com";
	const defaultAdminPassword = process.env.ADMIN_PASSWORD || "SiliconReal2026!";
	const hashedPassword = await bcrypt.hash(defaultAdminPassword, 12);

	await prisma.admin.upsert({
		where: { email: defaultAdminEmail },
		update: {
			passwordHash: hashedPassword,
		},
		create: {
			email: defaultAdminEmail,
			passwordHash: hashedPassword,
			role: "admin",
		},
	});

	// 2. Site Settings
	await prisma.siteSettings.upsert({
		where: { id: "global" },
		update: {
			email: "info@siliconrealestatepvtltd.com",
			phone: "+880 1711-000000",
			hotline: "16222",
			address: "Level 12, Silicon Tower, Mohammadpur Beribadh Link Road, Dhaka 1207",
			facebookUrl: "https://facebook.com/siliconrealestate",
			youtubeUrl: "https://youtube.com/siliconrealestate",
			aboutSummary: "Silicon Real Estate Pvt. Ltd. is a premier land developer building modern eco-townships in Mohammadpur, Dhaka.",
			mission: "To deliver legally verified, flood-protected, planned residential plots with 30ft & 40ft internal road networks for every family.",
			vision: "To become Bangladesh's most trusted eco-friendly township real estate company offering sustainable urban living.",
		},
		create: {
			id: "global",
			email: "info@siliconrealestatepvtltd.com",
			phone: "+880 1711-000000",
			hotline: "16222",
			address: "Level 12, Silicon Tower, Mohammadpur Beribadh Link Road, Dhaka 1207",
			facebookUrl: "https://facebook.com/siliconrealestate",
			youtubeUrl: "https://youtube.com/siliconrealestate",
			aboutSummary: "Silicon Real Estate Pvt. Ltd. is a premier land developer building modern eco-townships in Mohammadpur, Dhaka.",
			mission: "To deliver legally verified, flood-protected, planned residential plots with 30ft & 40ft internal road networks for every family.",
			vision: "To become Bangladesh's most trusted eco-friendly township real estate company offering sustainable urban living.",
		},
	});

	// 3. Leadership & Team Members
	await prisma.teamMember.deleteMany();
	await prisma.teamMember.createMany({
		data: [
			{
				id: "team-1",
				name: "Md. Ahmed Kabir",
				role: "Chairman",
				speech: "At Silicon Real Estate, our founding ethos rests upon uncompromising integrity, legal transparency, and visionary urban planning. For decades, land acquisition in Dhaka has been fraught with complexity and uncertainty. We established Silicon City in Mohammadpur to redefine real estate standards—delivering flood-proof, eco-friendly townships backed by dispute-free land deeds. Every avenue, park, and plot we layout is designed to foster a secure, thriving community for generations to come. We invite you to invest in a legacy built on trust and infrastructure excellence.",
				image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=800&q=80",
				order: 1,
			},
			{
				id: "team-2",
				name: "Engr. Rashedul Islam",
				role: "Managing Director",
				speech: "Engineering perfection and RAJUK-compliant master planning are the cornerstones of Silicon Real Estate's development strategy. In Silicon City, we have engineered wide 30ft and 40ft internal road networks, integrated drainage systems, elevated soil levels above historic floodlines, and dedicated green spaces. Our technical commitment ensures that every homeowner receives instant sub-registry deeds alongside ready utility connections. We are not just selling land; we are constructing the sustainable smart township framework of future Dhaka.",
				image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=800&q=80",
				order: 2,
			},
		],
	});

	// 4. Hero Slides
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

	// 5. Properties / Land Plots Inventory
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
				location: "Block A, Silicon City, Mohammadpur Link Road, Dhaka",
				areaSqFt: 2160,
				bedrooms: 0,
				bathrooms: 0,
				description:
					"3 Katha south-facing corner plot on a 40ft wide avenue road inside Silicon City, Mohammadpur. Ready for immediate registration.",
				features: ["40ft Avenue Road", "South Facing", "Ready Registration", "Soil Elevated", "30ft & 40ft Road Network"],
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
				location: "Riverview Zone, Silicon City, Mohammadpur",
				areaSqFt: 3600,
				bedrooms: 0,
				bathrooms: 0,
				description:
					"5 Katha luxury riverfront plot directly adjacent to the Turag River green belt with 30ft internal access road.",
				features: ["River View", "50ft Main Avenue", "30ft Internal Road", "Utility Lines Ready", "Green Belt Park"],
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
				location: "Expressway Entry, Silicon City, Mohammadpur",
				areaSqFt: 7200,
				bedrooms: 0,
				bathrooms: 0,
				description:
					"10 Katha prime commercial plot suitable for shopping centers, banks, or corporate offices along the main 40ft avenue.",
				features: ["Main Highway Frontage", "40ft Avenue Road", "High ROI", "Corner Location", "Commercial Zone"],
				images: [
					"https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=1200",
				],
				featured: true,
			},
		],
	});

	// 6. Company News & Blog Posts
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
					"We are thrilled to announce that government infrastructure approvals for the direct Turag River link bridge are advancing rapidly. This bridge will connect Mohammadpur directly to Silicon City, featuring 30ft and 40ft road networks throughout the township.",
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
					"Silicon City has officially completed structural and environmental compliance reviews with RAJUK town planning authorities in Mohammadpur, Dhaka.",
				image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200",
				category: "Legal & Regulatory",
				author: "Legal Cell",
			},
		],
	});

	// 7. Gallery Items
	await prisma.galleryItem.deleteMany();
	await prisma.galleryItem.createMany({
		data: [
			{
				id: "gal-1",
				title: "Silicon City Avenue Construction",
				category: "Infrastructure",
				badge: "Infrastructure",
				location: "Mohammadpur, Dhaka",
				overview: "Laying 30ft and 40ft wide RCC paved avenues across Block A and B.",
				images: [
					"https://images.unsplash.com/photo-1541888946425-d0fbb186a5b7?auto=format&fit=crop&w=1200&q=80"
				],
				features: ["40ft Avenue", "Storm Drainage", "LED Streetlights"],
				order: 1,
				active: true,
			},
			{
				id: "gal-2",
				title: "Turag Riverfront Greenbelt",
				category: "Project",
				badge: "Eco Project",
				location: "Silicon City, Dhaka",
				overview: "Scenic riverfront walkway and tree-lined embankment parks.",
				images: [
					"https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80"
				],
				features: ["River View Walkway", "Parks", "Children Play Zone"],
				order: 2,
				active: true,
			},
			{
				id: "gal-3",
				title: "Silicon Tower Headquarters",
				category: "Office",
				badge: "Headquarters",
				location: "Mohammadpur Beribadh, Dhaka",
				overview: "State-of-the-art administrative center and customer hospitality lounge.",
				images: [
					"https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80"
				],
				features: ["Customer Lounge", "Legal Advisory Cell", "VR Tour Suite"],
				order: 3,
				active: true,
			},
			{
				id: "gal-4",
				title: "Block A Customer Registration Handover",
				category: "Handover",
				badge: "Handover",
				location: "Mohammadpur, Dhaka",
				overview: "Immediate land deed sub-registry handing over to premier plot owners.",
				images: [
					"https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1200&q=80"
				],
				features: ["Instant Deed Registration", "Dispute-Free Guarantee", "Boundary Marking"],
				order: 4,
				active: true,
			},
		],
	});

	console.log("Database seeded successfully with Silicon Real Estate v2 Ground Truth!");
}

main()
	.catch((e) => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
