import { eq } from "drizzle-orm";
import { db } from "../config/db.js";
import { admin } from "../models/schema.js";
import type { AdminRepositoryInterface } from "../domain/interfaces/admin-interface.js";

const createAdmin = async (
  email: string,
  password: string
): Promise<{ email: string; id: string }> => {
  const [newAdmin] = await db

    .insert(admin)
    .values({ email, password })
    .returning({ email: admin.email, id: admin.id });
  return newAdmin;
};

const getAdminByEmail = async (
  email: string
): Promise<{ id: string; email: string; password: string }> => {
  const [newAdmin] = await db
    .select({ id: admin.id, email: admin.email, password: admin.password })
    .from(admin)
    .where(eq(admin.email, email));
  return newAdmin;
};

const adminRepository: AdminRepositoryInterface = {
  createAdmin,
  getAdminByEmail,
};

export default adminRepository;
