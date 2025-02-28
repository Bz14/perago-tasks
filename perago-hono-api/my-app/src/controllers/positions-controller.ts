import type {
  PositionCommandServiceInterface,
  PositionQueryServiceInterface,
} from "../domain/interfaces/position-interface.js";

import type { Context } from "hono";
import { HTTPException } from "hono/http-exception";

class PositionController {
  private commandService: PositionCommandServiceInterface;
  private queryService: PositionQueryServiceInterface;
  constructor(
    commandService: PositionCommandServiceInterface,
    queryService: PositionQueryServiceInterface
  ) {
    this.commandService = commandService;
    this.queryService = queryService;
  }

  CreatePosition = async (c: Context) => {
    try {
      const { name, description, parentId } = await c.req.json();
      const result: any = await this.commandService.CreatePosition(
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
  };

  GetPositionById = async (c: Context) => {
    try {
      const id = c.req.param("id");
      const position = await this.queryService.GetPositionById(id);
      if (!position) {
        return c.json({ data: null, message: "Position not found" });
      }
      return c.json({ data: position, message: "Position detail fetched" });
    } catch (error: Error | any) {
      throw new Error(error.message);
    }
  };

  GetPositionChildren = async (c: Context) => {
    try {
      const id = c.req.param("id");
      const children: any = await this.queryService.GetChildrenPositions(id);
      if (children.length == 0) {
        return c.json({ data: null, message: "No children positions found" });
      }
      return c.json({ data: children, message: "Children positions fetched." });
    } catch (error: Error | any) {
      return c.json({ error: error.message }, 500);
    }
  };

  GetAllPositions = async (c: Context) => {
    try {
      const positions: any = await this.queryService.GetAllPositions();
      if (positions.length == 0) {
        return c.json({ data: null, message: "Positions not found" });
      }
      return c.json({ data: positions, message: "All positions fetched" });
    } catch (error: Error | any) {
      return c.json({ error: error.message }, 500);
    }
  };

  UpdatePosition = async (c: Context) => {
    try {
      const id = c.req.param("id");
      const { name, description }: any = await c.req.json();
      const result: any = await this.commandService.UpdatePosition(
        id,
        name,
        description
      );

      return c.json({
        data: {
          id: result[0].id,
          name: result[0].name,
          description: result[0].description,
        },
        message: "Position updated successfully.",
      });
    } catch (error: Error | any) {
      return c.json({ error: error.message }, 500);
    }
  };

  DeletePosition = async (c: Context) => {
    try {
      const id = c.req.param("id");
      const position = await this.commandService.DeletePosition(id);
      return c.json({
        data: position,
        message: "Position deleted successfully",
      });
    } catch (error: Error | any) {
      console.log(error);
      return c.json({ error: error.message }, 500);
    }
  };

  GetPositionChoices = async (c: Context) => {
    try {
      const positions: any = await this.queryService.GetPositionChoices();
      if (positions.length == 0) {
        return c.json({ data: null, message: "No positions found" });
      }
      return c.json({ data: positions, message: "Position choices fetched" });
    } catch (error: Error | any) {
      return c.json({ error: error.message }, 500);
    }
  };
}

export default PositionController;
