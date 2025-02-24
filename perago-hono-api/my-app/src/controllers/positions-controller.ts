import type {
  PositionCommandServiceInterface,
  PositionQueryServiceInterface,
} from "../domain/interfaces/position-interface.js";

import type { Context } from "hono";
import Position from "../domain/Entities/position-entity.js";

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
          data: {
            id: result.id,
            name: result.name,
            description: result.description,
            parentId: result.parentId,
          },
          message: "Position created successfully.",
        },
        201
      );
    } catch (error: Error | any) {
      return c.json({ error: error.message }, 500);
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
      return c.json({ error: error.message });
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
      return c.json({ error: error.message });
    }
  };
}

export default PositionController;
