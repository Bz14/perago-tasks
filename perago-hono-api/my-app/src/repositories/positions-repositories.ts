import { db } from "../config/db.js";
import { eq, isNull, and } from "drizzle-orm";
import { positions } from "../models/schema.js";
import type {
  Position,
  PositionRepositoryInterface,
} from "../domain/interfaces/position-interface.js";

const GetPositionById = async (
  id: string | null,
  userId: string
): Promise<Position> => {
  const [position] = await db
    .select({
      id: positions.id,
      name: positions.name,
      description: positions.description,
      parentId: positions.parentId,
    })
    .from(positions)
    .where(
      id === null
        ? and(isNull(positions.id), eq(positions.createdBy, userId))
        : and(eq(positions.id, id), eq(positions.createdBy, userId))
    );
  return position;
};

const CreatePosition = async (data: {
  name: string;
  description: string;
  parentId: string | null;
  createdBy: string;
}): Promise<Position> => {
  const [position] = await db.insert(positions).values(data).returning({
    id: positions.id,
    name: positions.name,
    description: positions.description,
    parentId: positions.parentId,
  });
  return position;
};

const CheckNullParentPosition = async (
  userId: string
): Promise<{ id: string }> => {
  const [position] = await db
    .select({ id: positions.id })
    .from(positions)
    .where(and(isNull(positions.parentId), eq(positions.createdBy, userId)));
  return position;
};

const GetChildrenPosition = async (
  id: string,
  userId: string
): Promise<{ id: string; name: string }[]> => {
  return await db
    .select({ id: positions.id, name: positions.name })
    .from(positions)
    .where(and(eq(positions.parentId, id), eq(positions.createdBy, userId)));
};

const GetAllPositions = async (userId: string): Promise<Position[]> => {
  const allPositions = await db
    .select({
      id: positions.id,
      name: positions.name,
      description: positions.description,
      parentId: positions.parentId,
    })
    .from(positions)
    .where(eq(positions.createdBy, userId));
  return allPositions;
};

const UpdatePosition = async (
  userId: string,
  id: string,
  name: string,
  description: string,
  parentId: string | null
): Promise<{
  id: string;
  name: string;
  description: string;
  parentId: string | null;
}> => {
  const [position] = await db
    .update(positions)
    .set({ name, description, parentId })
    .where(and(eq(positions.id, id), eq(positions.createdBy, userId)))
    .returning({
      id: positions.id,
      name: positions.name,
      description: positions.description,
      parentId: positions.parentId,
    });
  return position;
};

const DeletePositionById = async (
  id: string,
  userId: string
): Promise<{ rowCount: number | null }> => {
  const deleteData = await db
    .delete(positions)
    .where(and(eq(positions.id, id), eq(positions.createdBy, userId)));
  return { rowCount: deleteData.rowCount };
};

const GetPositionsByParentId = async (parentId: string) => {
  return await db
    .select()
    .from(positions)
    .where(eq(positions.parentId, parentId));
};

const GetPositionsList = async (
  userId: string,
  page: number,
  limit: number
): Promise<{ id: string; name: string }[]> => {
  return await db
    .select({ id: positions.id, name: positions.name })
    .from(positions)
    .where(eq(positions.createdBy, userId))
    .limit(limit)
    .offset((page - 1) * limit);
};

const positionRepository: PositionRepositoryInterface = {
  GetPositionById,
  CreatePosition,
  CheckNullParentPosition,
  GetChildrenPosition,
  GetAllPositions,
  UpdatePosition,
  DeletePositionById,
  GetPositionsByParentId,
  GetPositionsList,
};

export default positionRepository;
