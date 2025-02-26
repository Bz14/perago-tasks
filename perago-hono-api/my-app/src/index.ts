import { Hono } from "hono";
import { serve } from "@hono/node-server";
import positionsRoute from "./routes/positions-routes.js";
import adminRoute from "./routes/admin-route.js";
import config from "./config/config.js";
import { cors } from "hono/cors";

const app = new Hono();

app.use(cors({ origin: "*" }));

app.route("/api/v1", positionsRoute);
app.route("/api/v1", adminRoute);

// app.onError((error, c) => {
//   return c.json({ message: error.message }, 500);
// });

app.notFound((c) => {
  return c.json({ message: "Page not found" });
});

serve({ fetch: app.fetch, port: parseInt(config.PORT || "") }, (info) => {
  console.log(`Server is running on http://localhost:${info.port}`);
});
