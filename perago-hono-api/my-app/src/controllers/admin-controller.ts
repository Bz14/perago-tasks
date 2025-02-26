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
          message: "Position created successfully.",
        },
        201
      );
    } catch (error: Error | any) {
      console.log(error.message);
      return c.json({ error: error.message }, 500);
    }
  };
  GetAdmin = async (c: Context) => {
    console.log("here");
    try {
      const body = await c.req.json();
      if (!body || !body.userName || !body.password) {
        throw new Error("Invalid request body");
      }
      const { userName, password } = body;
      console.log("here", userName, password);
      const user = await this.queryService.GetAdmin(userName, password);
      if (!user) {
        throw new Error("User not found");
      }

      return c.json({ data: user, message: "Position detail fetched" });
    } catch (error: Error | any) {
      console.log(error.message);
      return c.json({ error: error.message });
    }
  };
}

export default AdminController;
