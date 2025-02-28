import { Hono } from "hono";
import positionsController from "../controllers/positions-controller.js";

const positionsRoute = new Hono({ strict: false });

positionsRoute.get("/positions", positionsController.GetAllPositions);
positionsRoute.get("/position/choices", positionsController.GetPositionChoices);
positionsRoute.get("/position/:id", positionsController.GetPositionById);
positionsRoute.get(
  "/position/children/:id",
  positionsController.GetPositionChildren
);
positionsRoute.post("/position", positionsController.CreatePosition);
positionsRoute.put("/position/:id", positionsController.UpdatePosition);
positionsRoute.delete("/position/:id", positionsController.DeletePosition);

export default positionsRoute;
