import { Hono } from "hono";
import { serve } from "@hono/node-server";
import positionsRoute from "./routes/positions-routes.js";
import adminRoute from "./routes/admin-route.js";
import config from "./config/config.js";
import { cors } from "hono/cors";
import { HTTPException } from "hono/http-exception";

const app = new Hono();

app.use(cors({ origin: "*" }));

app.route("/api/v1/auth", adminRoute);
app.route("/api/v1", positionsRoute);

app.onError((error, c) => {
  if (error instanceof HTTPException) {
    return c.json({ message: error.message }, error.status);
  }
  return c.json({ message: error.message }, 500);
});

app.notFound((c) => {
  return c.json({ message: "Page not found" }, 404);
});

serve({ fetch: app.fetch, port: parseInt(config.PORT || "") }, (info) => {
  console.log(`Server is running on http://localhost:${info.port}`);
});
