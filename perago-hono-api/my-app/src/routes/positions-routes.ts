import AuthMiddleware from "../middlewares/authMiddleware.js";
import type { Context } from "hono";
import { Hono } from "hono";
import { HTTPException } from "hono/http-exception";
import positionCommandService from "../services/positions-commands.js";
import positionQueryService from "../services/positions-queries.js";
import schema from "../utils/validatorSchema.js";
import { zValidator } from "@hono/zod-validator";

const positionsRoute = new Hono({ strict: false })
  .use("*", AuthMiddleware)
  .get("/positions/list", async (c: Context): Promise<Response> => {
    try {
      const userId = c.req.user.id;
      const page = c.req.query("page") || "1";
      const limit = c.req.query("limit") || "4";
      const positions = await positionQueryService.GetPositionsList(
        userId,
        page,
        limit
      );
      return c.json({
        data: positions,
        message: "Positions list fetched",
      });
    } catch (error: Error | any) {
      throw new HTTPException(error.status, { message: error.message });
    }
  })
  .get("/positions", async (c: Context): Promise<Response> => {
    try {
      const userId = c.req.user.id;
      const positions = await positionQueryService.GetAllPositions(userId);
      return c.json({ data: positions, message: "All positions fetched" });
    } catch (error: Error | any) {
      throw new HTTPException(error.status, { message: error.message });
    }
  })
  .get("/position/choices", async (c: Context): Promise<Response> => {
    try {
      const userId = c.req.user.id;
      const positions = await positionQueryService.GetPositionChoices(userId);
      if (positions.length == 0) {
        return c.json({ data: null, message: "No positions found" });
      }
      return c.json({ data: positions, message: "Position choices fetched" });
    } catch (error: Error | any) {
      throw new HTTPException(error.status, { message: error.message });
    }
  })
  .get("/position/:id", async (c: Context): Promise<Response> => {
    try {
      const id = c.req.param("id");
      const userId = c.req.user.id;
      const position = await positionQueryService.GetPositionById(id, userId);
      if (!position) {
        return c.json({ data: null, message: "Position not found" });
      }
      return c.json({ data: position, message: "Position detail fetched" });
    } catch (error: Error | any) {
      throw new HTTPException(error.status, { message: error.message });
    }
  })
  .get("/position/children/:id", async (c: Context): Promise<Response> => {
    try {
      const id = c.req.param("id");
      const userId = c.req.user.id;
      const children: any = await positionQueryService.GetChildrenPositions(
        id,
        userId
      );
      return c.json({ data: children, message: "Children positions fetched." });
    } catch (error: Error | any) {
      throw new HTTPException(error.status, { message: error.message });
    }
  })
  .post(
    "/position",
    zValidator("json", schema, (result, c) => {
      if (!result.success) {
        throw new HTTPException(400, {
          message: result.error.errors[0].message,
        });
      }
    }),
    async (c: Context): Promise<Response> => {
      try {
        const { name, description, parentId } = await c.req.json();
        const user = c.req.user;
        const result = await positionCommandService.CreatePosition(
          user.id,
          name,
          description,
          parentId
        );

        return c.json(
          {
            data: result,
            message: "Position created successfully.",
          },
          201
        );
      } catch (error: Error | any) {
        throw new HTTPException(error.status, { message: error.message });
      }
    }
  )
  .put(
    "/position/:id",
    zValidator("json", schema, (result, c) => {
      if (!result.success) {
        throw new HTTPException(400, {
          message: result.error.errors[0].message,
        });
      }
    }),
    async (c: Context): Promise<Response> => {
      try {
        const id = c.req.param("id");
        const { name, description, parentId } = await c.req.json();
        const userId = c.req.user.id;
        const result = await positionCommandService.UpdatePosition(
          userId,
          id,
          name,
          description,
          parentId
        );

        return c.json({
          data: result,
          message: "Position updated successfully.",
        });
      } catch (error: Error | any) {
        throw new HTTPException(error.status, { message: error.message });
      }
    }
  )
  .delete("/position/:id", async (c: Context): Promise<Response> => {
    try {
      const id = c.req.param("id");
      const userId = c.req.user.id;
      const position = await positionCommandService.DeletePosition(id, userId);
      return c.json({
        data: position,
        message: "Position deleted successfully",
      });
    } catch (error: Error | any) {
      throw new HTTPException(error.status, { message: error.message });
    }
  });

export default positionsRoute;
