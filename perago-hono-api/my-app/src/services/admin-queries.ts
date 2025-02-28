import bcrypt from "bcrypt";
import adminRepository from "../repositories/admin-repository.js";
import type { AdminQueryServiceInterface } from "../domain/interfaces/admin-interface.js";

const GetAdmin = async (username: string, password: string) => {
  try {
    const [admin]: any = await adminRepository.GetAdmin(username);
    if (!admin) {
      throw new Error("Admin not found");
    }

    const isAdmin = await bcrypt.compare(password, admin.password);
    if (!isAdmin) {
      throw new Error("Invalid username or password");
    }

    return {
      id: admin.id,
      userName: admin.username,
    };
  } catch (error: Error | any) {
    throw new Error(error.message);
  }
};
const adminQueryService: AdminQueryServiceInterface = {
  GetAdmin,
};

export default adminQueryService;
