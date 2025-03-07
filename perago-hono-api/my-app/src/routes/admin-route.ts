import { Hono } from "hono";
import adminController from "../controllers/admin-controller.js";

const adminRoute = new Hono({ strict: false })
  .post("/auth", adminController.GetAdmin)
  .post("/auth/create", adminController.CreateAdmin);

export default adminRoute;
