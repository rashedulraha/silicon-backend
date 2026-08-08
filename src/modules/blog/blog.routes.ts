import { Router } from "express";
import { BlogController } from "./blog.controller.js";

const router = Router();

router.get("/", BlogController.getPosts);
router.post("/", BlogController.createPost);
router.post("/import-markdown", BlogController.importMarkdown);
router.put("/:id", BlogController.updatePost);
router.delete("/:id", BlogController.deletePost);

export const BlogRoutes = router;

