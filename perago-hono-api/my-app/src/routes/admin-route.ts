import { Hono } from "hono";
import AdminController from "../controllers/admin-controller.js";
import AdminCommandService from "../services/admin-command.js";
import AdminQueryService from "../services/admin-queries.js";
import AdminRepositories from "../repositories/admin-repository.js";

const adminRepositories = new AdminRepositories();
const adminCommandService = new AdminCommandService(adminRepositories);
const adminQueryService = new AdminQueryService(adminRepositories);
const adminController = new AdminController(
  adminCommandService,
  adminQueryService
);

const adminRoute = new Hono({ strict: false });

adminRoute.get("/auth", adminController.GetAdmin);

adminRoute.post("/auth", adminController.CreateAdmin);

export default adminRoute;
