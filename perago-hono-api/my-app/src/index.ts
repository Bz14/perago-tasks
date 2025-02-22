import { Hono } from "hono";
import { serve } from "@hono/node-server";
import positionsRoute from "./routes/positions-routes.js";

const app = new Hono();

app.route("/api/v1", positionsRoute);

app.onError((error, c) => {
  return c.json({ message: error.message }, 500);
});

app.notFound((c) => {
  return c.json({ message: "Page not found" });
});

serve({ fetch: app.fetch, port: 3000 }, (info) => {
  console.log(`Server is running on http://localhost:${info.port}`);
});
