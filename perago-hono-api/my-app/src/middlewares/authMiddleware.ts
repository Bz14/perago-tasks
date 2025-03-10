import { HTTPException } from "hono/http-exception";
import type { Context } from "hono";
import { verify, decode } from "hono/jwt";
import config from "../config/config.js";

declare module "hono" {
  interface HonoRequest {
    user?: any;
  }
}

const AuthMiddleware = async (c: Context, next: any) => {
  const auth = c.req.header("Authorization");
  if (!auth) {
    throw new HTTPException(401, { message: "Unauthorized" });
  }

  const [bearer, token] = auth.split(" ");
  if (bearer !== "Bearer") {
    throw new HTTPException(401, { message: "Unauthorized" });
  }
  const decoded = await verify(token, config.JWTSecret);
  if (!decoded) {
    throw new HTTPException(401, { message: "Unauthorized" });
  }
  console.log(decode);
  c.req.user = decoded;

  await next();
};

export default AuthMiddleware;
