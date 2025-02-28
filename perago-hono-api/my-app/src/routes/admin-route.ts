import { Hono } from "hono";
import adminController from "../controllers/admin-controller.js";

const adminRoute = new Hono({ strict: false });

adminRoute.post("/auth", adminController.GetAdmin);

adminRoute.post("/auth/create", adminController.CreateAdmin);

export default adminRoute;
