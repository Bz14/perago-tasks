import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql", // 'mysql' | 'sqlite' | 'turso'
  schema: "./src/models",
  dbCredentials: {
    url: process.env.DB_URL!,
  },
});
