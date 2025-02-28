import { uuid } from "drizzle-orm/pg-core";
import type {
  PositionRepositoryInterface,
  PositionCommandServiceInterface,
  Position,
} from "../domain/interfaces/position-interface.js";

import { HTTPException } from "hono/http-exception";
class PositionCommandService implements PositionCommandServiceInterface {
  private positionRepository: PositionRepositoryInterface;
  constructor(repository: PositionRepositoryInterface) {
    this.positionRepository = repository;
  }

  CreatePosition = async (
    name: string,
    description: string,
    parentId: string | null
  ): Promise<Position> => {
    try {
      if (!name) {
        throw new HTTPException(400, { message: "Name is required" });
      }
      if (!description) {
        throw new HTTPException(400, { message: "Description is required" });
      }

      if (!parentId) {
        const nullParent =
          await this.positionRepository.CheckNullParentPosition();

        if (nullParent) {
          throw new HTTPException(400, {
            message: "Only one top hierarchy allowed",
          });
        }
      }

      if (parentId) {
        const parent = await this.positionRepository.GetPositionById(parentId);
        if (!parent) {
          throw new HTTPException(400, {
            message: "Parent position not found",
          });
        }
      }

      const newPosition: any = await this.positionRepository.CreatePosition({
        name,
        description,
        parentId,
      });

      return newPosition;
    } catch (error: Error | any) {
      throw new HTTPException(error.status, { message: error.message });
    }
  };

  UpdatePosition = async (id: string, name: string, description: string) => {
    try {
      const pos: any = await this.positionRepository.GetPositionById(id);
      if (!pos) {
        throw new Error("Position not found.");
      }

      if (!name) {
        name = pos.name;
      }

      if (!description) {
        description = pos.description;
      }
      const position = await this.positionRepository.UpdatePosition(
        id,
        name,
        description
      );
      console.log(position);
      return position;
    } catch (error: Error | any) {
      throw new Error(error);
    }
  };

  DeletePosition = async (id: string): Promise<Position> => {
    try {
      const pos = await this.positionRepository.GetPositionById(id);
      if (!pos) {
        throw new HTTPException(404, { message: "Position not found" });
      }
      const children = await this.positionRepository.GetChildrenPosition(id);
      if (children.length > 0) {
        throw new HTTPException(400, {
          message: "Position has children. Delete children first",
        });
      }
      const _ = await this.positionRepository.DeletePositionById(id);
      return pos;
    } catch (error: Error | any) {
      throw new HTTPException(error.status, { message: error.message });
    }
  };
}

export default PositionCommandService;
