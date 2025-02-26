import { eq, and } from "drizzle-orm";
import { db } from "../config/db.js";
import { admin } from "../models/schema.js";
import type { AdminRepositoryInterface } from "../domain/interfaces/admin-interface.js";

class AdminRepositories implements AdminRepositoryInterface {
  constructor() {}

  GetAdmin = async (userName: string, password: string) => {
    return db
      .select()
      .from(admin)
      .where(and(eq(admin.username, userName), eq(admin.password, password)));
  };

  CreateAdmin = async (userName: string, password: string) => {
    return await db
      .insert(admin)
      .values({ username: userName, password })
      .returning();
  };
}

export default AdminRepositories;
