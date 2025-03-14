import adminCommandService from "../services/admin-command.js";
import adminQueryService from "../services/admin-queries.js";
import { adminSchema } from "../utils/validatorSchema.js";
import type { Context } from "hono";
import { Hono } from "hono";
import { HTTPException } from "hono/http-exception";
import { zValidator } from "@hono/zod-validator";

const adminRoute = new Hono({ strict: false })
  .post(
    "/signup",
    zValidator("json", adminSchema, (result, c) => {
      if (!result.success) {
        throw new HTTPException(400, {
          message: result.error.errors[0].message,
        });
      }
    }),
    async (c: Context): Promise<Response> => {
      try {
        const { email, password } = await c.req.json();
        const result: any = await adminCommandService.CreateAdmin(
          email,
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
        throw new HTTPException(error.status, { message: error.message });
      }
    }
  )
  .post("/login", async (c: Context): Promise<Response> => {
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
  });

export default adminRoute;
