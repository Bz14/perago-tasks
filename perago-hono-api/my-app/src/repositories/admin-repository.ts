import { eq } from "drizzle-orm";
import { db } from "../config/db.js";
import { admin } from "../models/schema.js";
import type { AdminRepositoryInterface } from "../domain/interfaces/admin-interface.js";

const GetAdmin = async (
  username: string
): Promise<{ username: string; id: string }> => {
  const [newAdmin] = await db
    .select({ username: admin.username, id: admin.id })
    .from(admin)
    .where(eq(admin.username, username));
  return newAdmin;
};

const CreateAdmin = async (
  userName: string,
  password: string
): Promise<{ username: string; id: string }> => {
  const [newAdmin] = await db

    .insert(admin)
    .values({ username: userName, password })
    .returning({ username: admin.username, id: admin.id });
  return newAdmin;
};

const adminRepository: AdminRepositoryInterface = {
  GetAdmin,
  CreateAdmin,
};

export default adminRepository;
