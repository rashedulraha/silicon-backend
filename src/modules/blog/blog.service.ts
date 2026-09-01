import prisma from "../../lib/prisma.js";
import { IBlogPost } from "./blog.interface.js";

const DEFAULT_POSTS: IBlogPost[] = [
	{
		title: "Turag River Bridge Processing Underway for Silicon City",
		slug: "turag-river-bridge-processing",
		excerpt:
			"Direct bridge connectivity from Mohammadpur Beribadh to Silicon City will reduce commute times to central Dhaka to just 10 minutes.",
		content:
			"Silicon Real Estate has initiated developmental works and administrative processing for the proposed bridge link over the Turag River. This dedicated bridge will connect Mohammadpur Beribadh directly with Silicon City, ensuring seamless and congestion-free commuting for township residents.",
		image:
			"https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=1200",
		category: "Infrastructure",
		author: "Silicon Editorial",
	},
	{
		title: "RAJUK Extended Masterplan Compliance Certified",
		slug: "rajuk-extended-masterplan-compliance",
		excerpt:
			"Silicon Real Estate secures full planning alignment with RAJUK's eco-township development guidelines.",
		content:
			"Our engineering and legal divisions have completed comprehensive alignment with RAJUK's extended Dhaka masterplan. Silicon City features 16-18ft high elevation earthwork, 30ft and 40ft wide internal concrete roads, and clear legal title mutation records.",
		image:
			"https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200",
		category: "Legal & Regulatory",
		author: "Legal Cell",
	},
	{
		title: "Block A Handover Ceremony & Ready Registration Drive",
		slug: "block-a-handover-ceremony",
		excerpt:
			"Over 150 plot owners received instant registration deeds during Silicon Real Estate's annual customer appreciation day.",
		content:
			"Silicon Real Estate celebrated a major milestone by handing over demarcated plots and completed mutation deeds to over 150 valued clients in Block A, reaffirming our commitment to transparency and legal security.",
		image:
			"https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1200",
		category: "Events",
		author: "PR Division",
	},
];

export const BlogService = {
	async getAllPosts() {
		try {
			const posts = await prisma.blogPost.findMany({
				orderBy: { publishedAt: "desc" },
			});
			if (!posts || posts.length === 0) {
				return DEFAULT_POSTS;
			}
			return posts;
		} catch (error) {
			console.error("[BlogService] Error fetching blog posts, using defaults:", error);
			return DEFAULT_POSTS;
		}
	},

	async getPostBySlug(slug: string) {
		try {
			const post = await prisma.blogPost.findUnique({
				where: { slug },
			});
			if (!post) {
				return DEFAULT_POSTS.find((p) => p.slug === slug) || null;
			}
			return post;
		} catch (error) {
			console.error("[BlogService] Error fetching post by slug:", error);
			return DEFAULT_POSTS.find((p) => p.slug === slug) || null;
		}
	},

	async createPost(data: IBlogPost) {
		return await prisma.blogPost.create({
			data: {
				title: data.title,
				slug: data.slug || data.title.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
				excerpt: data.excerpt || "",
				content: data.content || "",
				image: data.image || "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=1200",
				category: data.category || "Company News",
				author: data.author || "Silicon Editorial",
			},
		});
	},

	async updatePost(id: string, data: Partial<IBlogPost>) {
		return await prisma.blogPost.update({
			where: { id },
			data,
		});
	},

	async deletePost(id: string) {
		return await prisma.blogPost.delete({
			where: { id },
		});
	},
};
