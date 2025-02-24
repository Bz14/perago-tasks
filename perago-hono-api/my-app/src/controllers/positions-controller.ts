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
}

export default PositionController;
