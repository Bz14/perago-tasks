import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql", // 'mysql' | 'sqlite' | 'turso'
  schema: "./src/models",
  dbCredentials: {
    url: "postgres://eyu:postgre@localhost:5432/orga_structure",
  },
});
