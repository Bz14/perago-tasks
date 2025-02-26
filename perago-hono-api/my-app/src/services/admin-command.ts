import type {
  AdminRepositoryInterface,
  AdminCommandServiceInterface,
} from "../domain/interfaces/admin-interface.js";

import bcrypt from "bcrypt";

class AdminCommandService implements AdminCommandServiceInterface {
  private adminRepository: AdminRepositoryInterface;
  constructor(repository: AdminRepositoryInterface) {
    this.adminRepository = repository;
  }

  CreateAdmin = async (userName: string, password: string) => {
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser: any = await this.adminRepository.CreateAdmin(
        userName,
        hashedPassword
      );
      return newUser;
    } catch (error: Error | any) {
      throw new Error(error.message);
    }
  };
}

export default AdminCommandService;
