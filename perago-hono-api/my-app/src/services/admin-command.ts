import type {
  AdminRepositoryInterface,
  AdminCommandServiceInterface,
} from "../domain/interfaces/admin-interface.js";

import { HTTPException } from "hono/http-exception";
import adminRepository from "../repositories/admin-repository.js";

import bcrypt from "bcrypt";

const CreateAdmin = async (
  email: string,
  password: string
): Promise<{ email: string; id: string }> => {
  try {
    const existingUser = await adminRepository.getAdminByEmail(email);
    if (existingUser) {
      throw new HTTPException(400, { message: "Admin already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser: any = await adminRepository.createAdmin(
      email,
      hashedPassword
    );
    return newUser;
  } catch (error: Error | any) {
    throw new HTTPException(error.status, { message: error.message });
  }
};

const adminCommandService: AdminCommandServiceInterface = {
  CreateAdmin,
};

export default adminCommandService;
