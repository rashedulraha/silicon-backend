import { Router } from "express";
import { AuthRoutes } from "../modules/auth/auth.routes.js";
import { PropertyRoutes } from "../modules/property/property.routes.js";
import { SlideRoutes } from "../modules/slide/slide.routes.js";
import { SettingRoutes } from "../modules/setting/setting.routes.js";
import { LeadRoutes } from "../modules/lead/lead.routes.js";
import { BlogRoutes } from "../modules/blog/blog.routes.js";
import { GalleryRoutes } from "../modules/gallery/gallery.routes.js";

const router = Router();

const moduleRoutes = [
  { path: "/auth", route: AuthRoutes },
  { path: "/properties", route: PropertyRoutes },
  { path: "/slides", route: SlideRoutes },
  { path: "/settings", route: SettingRoutes },
  { path: "/leads", route: LeadRoutes },
  { path: "/blog", route: BlogRoutes },
  { path: "/gallery", route: GalleryRoutes },
];

moduleRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

export const AppRouter = router;


