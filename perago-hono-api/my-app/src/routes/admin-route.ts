import { Hono } from "hono";
import adminController from "../controllers/admin-controller.js";

const adminRoute = new Hono({ strict: false })
  .post("/auth/signup", adminController.CreateAdmin)
  .post("/auth/login", adminController.LoginAdmin);

export default adminRoute;
