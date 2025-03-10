import type { Context } from "hono";
import type { AdminControllerInterface } from "../domain/interfaces/admin-interface.js";
import adminCommandService from "../services/admin-command.js";
import adminQueryService from "../services/admin-queries.js";
import { HTTPException } from "hono/http-exception";

const CreateAdmin = async (c: Context): Promise<Response> => {
  try {
    const { email, password } = await c.req.json();
    const result: any = await adminCommandService.CreateAdmin(email, password);

    return c.json(
      {
        data: result,
        message: "Admin created successfully.",
      },
      201
    );
  } catch (error: Error | any) {
    throw new HTTPException(error.status, { message: error.message });
  }
};

const LoginAdmin = async (c: Context): Promise<Response> => {
  try {
    const { email, password } = await c.req.json();
    const result = await adminQueryService.LoginAdmin(email, password);
    return c.json({
      data: result,
      message: "Admin logged in successfully.",
    });
  } catch (error: Error | any) {
    throw new HTTPException(error.status, { message: error.message });
  }
};

const adminController: AdminControllerInterface = {
  CreateAdmin,
  LoginAdmin,
};

export default adminController;
