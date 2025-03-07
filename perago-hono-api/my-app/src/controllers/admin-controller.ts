import type { Context } from "hono";
import type { AdminControllerInterface } from "../domain/interfaces/admin-interface.js";
import adminCommandService from "../services/admin-command.js";
import adminQueryService from "../services/admin-queries.js";

const CreateAdmin = async (c: Context): Promise<Response> => {
  try {
    const { userName, password } = await c.req.json();
    const result: any = await adminCommandService.CreateAdmin(
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
    return c.json({ error: error.message }, 500);
  }
};

const GetAdmin = async (c: Context): Promise<Response> => {
  try {
    const { username, password } = await c.req.json();

    const user = await adminQueryService.GetAdmin(username, password);
    if (!user) {
      throw new Error("Admin not found");
    }

    return c.json({ data: user, message: "Admin detail fetched" });
  } catch (error: Error | any) {
    return c.json({ error: error.message }, 500);
  }
};

const adminController: AdminControllerInterface = {
  CreateAdmin,
  GetAdmin,
};

export default adminController;
