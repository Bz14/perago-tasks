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
  try {
    const decoded = await verify(token, config.JWTSecret);
    c.req.user = decoded;
  } catch (err: Error | any) {
    console.log("Err", err, token);
    throw new HTTPException(401, {
      message: "Invalid or expired token. Please login again.",
    });
  }
  await next();
};

export default AuthMiddleware;
