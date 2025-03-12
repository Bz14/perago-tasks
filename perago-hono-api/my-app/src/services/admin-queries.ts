import bcrypt from "bcrypt";
import { HTTPException } from "hono/http-exception";
import { sign } from "hono/jwt";

import adminRepository from "../repositories/admin-repository.js";
import type { AdminQueryServiceInterface } from "../domain/interfaces/admin-interface.js";
import config from "../config/config.js";

const LoginAdmin = async (
  email: string,
  password: string
): Promise<{ accessToken: string }> => {
  try {
    const admin = await adminRepository.getAdminByEmail(email);
    if (!admin) {
      throw new HTTPException(404, { message: "Admin not found." });
    }
    const match = await bcrypt.compare(password, admin.password);
    if (!match) {
      throw new HTTPException(401, { message: "Invalid credentials." });
    }

    const token = await sign(
      { id: admin.id, exp: Math.floor(Date.now() / 1000) + 60 * 1000 },
      config.JWTSecret
    );
    return { accessToken: token };
  } catch (error: Error | any) {
    throw new HTTPException(error.status, { message: error.message });
  }
};
const adminQueryService: AdminQueryServiceInterface = {
  LoginAdmin,
};

export default adminQueryService;
