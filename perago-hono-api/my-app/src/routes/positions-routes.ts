import { Hono } from "hono";
import { HTTPException } from "hono/http-exception";
import positionsController from "../controllers/positions-controller.js";
import { zValidator } from "@hono/zod-validator";
import schema from "../utils/validatorSchema.js";

const positionsRoute = new Hono({ strict: false })
  .get("/positions/list", positionsController.GetPositionsList)
  .get("/positions", positionsController.GetAllPositions)
  .get("/position/choices", positionsController.GetPositionChoices)
  .get("/position/:id", positionsController.GetPositionById)
  .get("/position/children/:id", positionsController.GetPositionChildren)
  .post(
    "/position",
    zValidator("json", schema, (result, c) => {
      if (!result.success) {
        throw new HTTPException(400, { message: result.error.message });
      }
    }),
    positionsController.CreatePosition
  )
  .put(
    "/position/:id",
    zValidator("json", schema, (result, c) => {
      if (!result.success) {
        throw new HTTPException(400, { message: result.error.message });
      }
    }),
    positionsController.UpdatePosition
  )
  .delete("/position/:id", positionsController.DeletePosition);

export default positionsRoute;
