import type {
  AdminCommandServiceInterface,
  AdminQueryServiceInterface,
} from "../domain/interfaces/admin-interface.js";
import type { Context } from "hono";

class AdminController {
  private commandService: AdminCommandServiceInterface;
  private queryService: AdminQueryServiceInterface;
  constructor(
    commandService: AdminCommandServiceInterface,
    queryService: AdminQueryServiceInterface
  ) {
    this.commandService = commandService;
    this.queryService = queryService;
  }

  CreateAdmin = async (c: Context) => {
    try {
      const { userName, password } = await c.req.json();
      const result: any = await this.commandService.CreateAdmin(
        userName,
        password
      );

      return c.json(
        {
          data: result,
          message: "Admin created successfully.",
        },
        201
      );
    } catch (error: Error | any) {
      console.log(error.message);
      return c.json({ error: error.message }, 500);
    }
  };
  GetAdmin = async (c: Context) => {
    try {
      const { username, password } = await c.req.json();

      const user = await this.queryService.GetAdmin(username, password);
      if (!user) {
        throw new Error("Admin not found");
      }

      return c.json({ data: user, message: "Admin detail fetched" });
    } catch (error: Error | any) {
      console.log(error);
      return c.json({ error: error.message }, 500);
    }
  };
}

export default AdminController;
