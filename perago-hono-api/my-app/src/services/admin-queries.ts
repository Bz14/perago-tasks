import bcrypt from "bcrypt";
import adminRepository from "../repositories/admin-repository.js";
import type { AdminQueryServiceInterface } from "../domain/interfaces/admin-interface.js";
import { HTTPException } from "hono/http-exception";
import { sign } from "hono/jwt";

const LoginAdmin = async (
  email: string,
  password: string
): Promise<{ accessToken: string; email: string; id: string }> => {
  try {
    const admin = await adminRepository.getAdminByEmail(email);
    if (!admin) {
      throw new HTTPException(404, { message: "Admin not found." });
    }
    const match = await bcrypt.compare(password, admin.password);
    if (!match) {
      throw new HTTPException(401, { message: "Invalid credentials." });
    }
    if (!process.env.JWT_SECRET) {
      throw new HTTPException(500, { message: "JWT_SECRET is not defined." });
    }
    const token = await sign({ id: admin.id }, process.env.JWT_SECRET);
    return { accessToken: token, email: admin.email, id: admin.id };
  } catch (error: Error | any) {
    throw new HTTPException(error.status, { message: error.message });
  }
};
const adminQueryService: AdminQueryServiceInterface = {
  LoginAdmin,
};

export default adminQueryService;
