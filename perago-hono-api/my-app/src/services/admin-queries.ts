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

  GetAdmin = async (username: string, password: string) => {
    try {
      const [admin]: any = await this.adminRepository.GetAdmin(username);
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
}
export default AdminQueryService;
