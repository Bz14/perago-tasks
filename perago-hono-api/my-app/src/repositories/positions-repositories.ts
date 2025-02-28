import { eq, isNull } from "drizzle-orm";
import { db } from "../config/db.js";
import { positions } from "../models/schema.js";
import type {
  Position,
  PositionRepositoryInterface,
} from "../domain/interfaces/position-interface.js";

const GetPositionById = async (id: string | null): Promise<Position> => {
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

const CreatePosition = async (data: {
  name: string;
  description: string;
  parentId: string | null;
}): Promise<Position> => {
  const [position] = await db.insert(positions).values(data).returning({
    id: positions.id,
    name: positions.name,
    description: positions.description,
    parentId: positions.parentId,
  });
  return position;
};

const CheckNullParentPosition = async (): Promise<{ id: string }> => {
  const [position] = await db
    .select({ id: positions.id })
    .from(positions)
    .where(isNull(positions.parentId));
  return position;
};

const GetChildrenPosition = async (
  id: string
): Promise<{ id: string; name: string }[]> => {
  return await db
    .select({ id: positions.id, name: positions.name })
    .from(positions)
    .where(eq(positions.parentId, id));
};

const GetAllPositions = async (): Promise<Position[]> => {
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

const UpdatePosition = async (
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
    .where(eq(positions.id, id))
    .returning({
      id: positions.id,
      name: positions.name,
      description: positions.description,
      parentId: positions.parentId,
    });
  return position;
};

const DeletePositionById = async (
  id: string
): Promise<{ rowCount: number | null }> => {
  const deleteData = await db.delete(positions).where(eq(positions.id, id));
  return { rowCount: deleteData.rowCount };
};

const GetPositionsByParentId = async (parentId: string) => {
  return await db
    .select()
    .from(positions)
    .where(eq(positions.parentId, parentId));
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
};

export default positionRepository;
