import type {
  AdminRepositoryInterface,
  AdminCommandServiceInterface,
} from "../domain/interfaces/admin-interface.js";

import adminRepository from "../repositories/admin-repository.js";

import bcrypt from "bcrypt";

const CreateAdmin = async (userName: string, password: string) => {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser: any = await adminRepository.CreateAdmin(
      userName,
      hashedPassword
    );
    return newUser;
  } catch (error: Error | any) {
    throw new Error(error.message);
  }
};

const adminCommandService: AdminCommandServiceInterface = {
  CreateAdmin,
};

export default adminCommandService;
