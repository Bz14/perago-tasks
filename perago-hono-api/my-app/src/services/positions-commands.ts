import { HTTPException } from "hono/http-exception";

import type {
  Position,
  PositionCommandServiceInterface,
} from "../domain/interfaces/position-interface.js";
import positionRepository from "../repositories/positions-repositories.js";
import checkDescendant from "../utils/checkDescendant.js";

const CreatePosition = async (
  userId: string,
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
      const nullParent = await positionRepository.CheckNullParentPosition(
        userId
      );

      if (nullParent) {
        throw new HTTPException(400, {
          message: "Only one top hierarchy allowed",
        });
      }
    }

    if (parentId) {
      const parent = await positionRepository.GetPositionById(parentId, userId);
      if (!parent) {
        throw new HTTPException(400, {
          message: "Parent position not found",
        });
      }
    }

    const newPosition: Position = await positionRepository.CreatePosition({
      name,
      description,
      parentId: parentId === "" ? null : parentId,
      createdBy: userId,
    });

    return newPosition;
  } catch (error: Error | any) {
    throw new HTTPException(error.status, { message: error.message });
  }
};

const UpdatePosition = async (
  userId: string,
  id: string,
  name: string,
  description: string,
  parentId: string | null
): Promise<Position> => {
  try {
    const pos = await positionRepository.GetPositionById(id, userId);
    if (!pos) {
      throw new HTTPException(404, { message: "Position not found" });
    }

    if (!name) {
      name = pos.name;
    }

    if (!description) {
      description = pos.description;
    }

    if (!parentId) {
      parentId = pos.parentId;
    }

    const positions = await positionRepository.GetAllPositions(userId);
    const childPositions = checkDescendant(positions, id);
    const found = childPositions.find((child) => child === parentId);
    if (found) {
      throw new HTTPException(400, {
        message: "Can not set child as parent",
      });
    }

    if (id == parentId) {
      throw new HTTPException(400, {
        message: "Can not set position as parent of itself",
      });
    }

    const position = await positionRepository.UpdatePosition(
      userId,
      id,
      name,
      description,
      parentId
    );
    return position;
  } catch (error: Error | any) {
    throw new Error(error);
  }
};

const DeletePosition = async (
  id: string,
  userId: string
): Promise<Position> => {
  try {
    const pos = await positionRepository.GetPositionById(id, userId);
    if (!pos) {
      throw new HTTPException(404, { message: "Position not found" });
    }
    const children = await positionRepository.GetChildrenPosition(id, userId);
    if (children.length > 0) {
      throw new HTTPException(400, {
        message: "Position has children. Delete children first",
      });
    }
    const _ = await positionRepository.DeletePositionById(id, userId);
    return pos;
  } catch (error: Error | any) {
    throw new HTTPException(error.status, { message: error.message });
  }
};

const positionCommandService: PositionCommandServiceInterface = {
  CreatePosition,
  UpdatePosition,
  DeletePosition,
};

export default positionCommandService;
