import { Hono } from "hono";
import OrgController from "../controllers/positions-controller.js";

const positionsRoute = new Hono({ strict: false });

const positionsController = new OrgController();

positionsRoute.post("/positions", positionsController.GetEmployees);
export default positionsRoute;
