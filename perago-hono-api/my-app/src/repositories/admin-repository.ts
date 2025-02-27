import { eq } from "drizzle-orm";
import { db } from "../config/db.js";
import { admin } from "../models/schema.js";
import type { AdminRepositoryInterface } from "../domain/interfaces/admin-interface.js";

class AdminRepositories implements AdminRepositoryInterface {
  constructor() {}

  GetAdmin = async (username: string) => {
    return db.select().from(admin).where(eq(admin.username, username));
  };

  CreateAdmin = async (userName: string, password: string) => {
    return await db
      .insert(admin)
      .values({ username: userName, password })
      .returning();
  };
}

export default AdminRepositories;
