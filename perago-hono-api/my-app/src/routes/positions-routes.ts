import { Hono } from "hono";
import positionsController from "../controllers/positions-controller.js";

const positionsRoute = new Hono({ strict: false })
  .get("/positions", positionsController.GetAllPositions)
  .get("/position/choices", positionsController.GetPositionChoices)
  .get("/position/:id", positionsController.GetPositionById)
  .get("/position/children/:id", positionsController.GetPositionChildren)
  .post("/position", positionsController.CreatePosition)
  .put("/position/:id", positionsController.UpdatePosition)
  .delete("/position/:id", positionsController.DeletePosition);

export default positionsRoute;
