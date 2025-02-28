import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql",
  schema: "./src/models",
  dbCredentials: {
    url: process.env.DB_URL!,
  },
});
