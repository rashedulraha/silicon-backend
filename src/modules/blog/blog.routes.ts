import { Router } from "express";
import { BlogController } from "./blog.controller.js";

const router = Router();

router.get("/", BlogController.getAllPosts);
router.get("/:slug", BlogController.getPostBySlug);
router.post("/", BlogController.createPost);

export const BlogRoutes = router;
