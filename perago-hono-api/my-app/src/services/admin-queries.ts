import type {
  AdminRepositoryInterface,
  AdminQueryServiceInterface,
} from "../domain/interfaces/admin-interface.js";
import bcrypt from "bcrypt";
class AdminQueryService implements AdminQueryServiceInterface {
  private adminRepository: AdminRepositoryInterface;
  constructor(repository: AdminRepositoryInterface) {
    this.adminRepository = repository;
  }

  GetAdmin = async (userName: string, password: string) => {
    try {
      const admin: any = await this.adminRepository.GetAdmin(
        userName,
        password
      );
      const isAdmin = await bcrypt.compare(admin.password, password);
      if (!isAdmin) {
        throw new Error("Invalid username or password");
      }

      return admin;
    } catch (error: Error | any) {
      throw new Error(error.message);
    }
  };
}
export default AdminQueryService;
