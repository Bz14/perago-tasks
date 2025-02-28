import { eq, isNull, or } from "drizzle-orm";
import { db } from "../config/db.js";
import { positions } from "../models/schema.js";
import type {
  PositionRepositoryInterface,
  Position,
} from "../domain/interfaces/position-interface.js";

class PositionRepositories implements PositionRepositoryInterface {
  constructor() {}

  GetPositionById = async (id: string | null): Promise<Position> => {
    const [position] = await db
      .select({
        id: positions.id,
        name: positions.name,
        description: positions.description,
        parentId: positions.parentId,
      })
      .from(positions)
      .where(id === null ? isNull(positions.id) : eq(positions.id, id));
    return position;
  };

  CreatePosition = async (data: {
    name: string;
    description: string;
    parentId: string | null;
  }): Promise<{
    id: string;
    name: string;
    description: string;
    parentId: string | null;
  }> => {
    const [position] = await db.insert(positions).values(data).returning({
      id: positions.id,
      name: positions.name,
      description: positions.description,
      parentId: positions.parentId,
    });
    return position;
  };

  CheckNullParentPosition = async (): Promise<{ id: string }> => {
    const [position] = await db
      .select({ id: positions.id })
      .from(positions)
      .where(isNull(positions.parentId));
    return position;
  };

  GetChildPosition = async (id: string) => {
    return await db.select().from(positions).where(eq(positions.parentId, id));
  };

  GetAllPositions = async (): Promise<
    {
      id: string;
      name: string;
      description: string;
      parentId: string | null;
    }[]
  > => {
    const allPositions = await db
      .select({
        id: positions.id,
        name: positions.name,
        description: positions.description,
        parentId: positions.parentId,
      })
      .from(positions);
    return allPositions;
  };

  UpdatePosition = async (
    id: string,
    name: string,
    description: string
  ): Promise<{
    id: string;
    name: string;
    description: string;
    parentId: string | null;
  }> => {
    const [position] = await db
      .update(positions)
      .set({ name, description })
      .where(eq(positions.id, id))
      .returning({
        id: positions.id,
        name: positions.name,
        description: positions.description,
        parentId: positions.parentId,
      });
    return position;
  };

  DeletePositionById = async (
    id: string
  ): Promise<{ rowCount: number | null }> => {
    const deleteData = await db.delete(positions).where(eq(positions.id, id));
    return { rowCount: deleteData.rowCount };
  };

  GetPositionsByParentId = async (parentId: string) => {
    return await db
      .select()
      .from(positions)
      .where(eq(positions.parentId, parentId));
  };
}

export default PositionRepositories;
