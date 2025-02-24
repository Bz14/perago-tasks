import type Position from "../domain/Entities/position-entity.js";
import { eq } from "drizzle-orm";
import { db } from "../config/db.js";
import positions from "../models/schema.js";
import type { PositionRepositoryInterface } from "../domain/interfaces/position-interface.js";

class PositionRepositories implements PositionRepositoryInterface {
  constructor() {}

  GetPositionById = async (id: string) => {
    const [position] = await db
      .select()
      .from(positions)
      .where(eq(positions.id, id));
    return position || null;
  };

  CreatePosition = async (data: {
    id: string | null;
    name: string;
    description: string | null;
    parentId: string | null;
  }) => {
    try {
      const [position] = await db.insert(positions).values(data).returning();
      return position;
    } catch (error: Error | any) {
      throw new Error(error.message);
    }
  };
}

export default PositionRepositories;
