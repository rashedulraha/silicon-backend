import { prisma } from "../../lib/prisma.js";
import { SeedService } from "../seed/seed.service.js";
import { ICreateBlogInput, IUpdateBlogInput } from "./blog.interface.js";

export class BlogService {
  public static async getAllPosts() {
    await SeedService.ensureSeedData();
    return await prisma.blogPost.findMany({
      orderBy: { publishedAt: "desc" },
    });
  }

  public static async createPost(data: ICreateBlogInput) {
    const slug = data.title
      ? data.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "") + "-" + Date.now().toString().slice(-4)
      : "post-" + Date.now();

    return await prisma.blogPost.create({
      data: {
        title: data.title || "New Article",
        slug: slug,
        excerpt: data.excerpt || "",
        content: data.content || "",
        image: data.image || "https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1200",
        category: data.category || "Company News",
        author: data.author || "Silicon Editorial Team",
      },
    });
  }

  public static async importMarkdown(markdownText: string, categoryOverride?: string) {
    let title = "Imported Documentation";
    let excerpt = "";
    let image = "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200";
    let category = categoryOverride || "TUTORIAL";

    const lines = markdownText.split("\n");
    for (const line of lines) {
      const trimmed = line.trim();
      if (trimmed.startsWith("# ") && title === "Imported Documentation") {
        title = trimmed.replace(/^#\s+/, "").trim();
      } else if (!excerpt && trimmed && !trimmed.startsWith("#") && !trimmed.startsWith("!") && !trimmed.startsWith("[")) {
        excerpt = trimmed;
      }

      // Extract image url if present
      const imgMatch = trimmed.match(/!\[.*?\]\((https?:\/\/[^\s\)]+)\)/i) || trimmed.match(/(https?:\/\/[^\s\)]+\.(?:jpg|jpeg|png|webp))/i);
      if (imgMatch && image.includes("unsplash")) {
        image = imgMatch[1];
      }

      // Extract category if tag present e.g. [TUTORIAL]
      const catMatch = trimmed.match(/\[([A-Z\s]{3,20})\]/);
      if (catMatch && !categoryOverride) {
        category = catMatch[1];
      }
    }

    if (!excerpt) {
      excerpt = markdownText.slice(0, 160).replace(/[#*`_]/g, "") + "...";
    }

    return await this.createPost({
      title,
      excerpt,
      content: markdownText,
      image,
      category,
      author: "Auto Doc Importer",
    });
  }

  public static async updatePost(id: string, data: IUpdateBlogInput) {
    return await prisma.blogPost.update({
      where: { id },
      data: {
        title: data.title,
        excerpt: data.excerpt,
        content: data.content,
        image: data.image,
        category: data.category,
        author: data.author,
      },
    });
  }

  public static async deletePost(id: string) {
    return await prisma.blogPost.delete({
      where: { id },
    });
  }
}

