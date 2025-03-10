import { HTTPException } from "hono/http-exception";
import { Hono } from "hono";
import adminController from "../controllers/admin-controller.js";
import { zValidator } from "@hono/zod-validator";
import { adminSchema } from "../utils/validatorSchema.js";

const adminRoute = new Hono({ strict: false })
  .post(
    "/auth/login",
    zValidator("json", adminSchema, (result, c) => {
      if (!result.success) {
        throw new HTTPException(400, {
          message: result.error.errors[0].message,
        });
      }
    }),
    adminController.LoginAdmin
  )
  .post("/auth/login", adminController.LoginAdmin);

export default adminRoute;
