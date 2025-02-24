import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";
import config from "./config.js";
import * as schema from "../models/schema.js";

const { Pool } = pg;

const pool = new Pool({
  host: config.DBHost,
  port: parseInt(config.DBPort || ""),
  user: config.DBUser,
  password: config.DBPassword,
  database: config.DBName,
});

export const db = drizzle(pool, { schema });
