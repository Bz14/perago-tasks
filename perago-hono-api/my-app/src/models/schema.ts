import { pgTable, uuid, varchar, text, timestamp } from "drizzle-orm/pg-core";

const positions = pgTable("positions", {
  id: uuid().primaryKey().defaultRandom(),
  name: varchar({ length: 255 }).notNull(),
  description: text().notNull(),
  createdAt: timestamp().notNull().defaultNow(),
  parentId: uuid("parent_id").references((): any => positions.id, {
    onDelete: "cascade",
  }),
});

export const admin = pgTable("admin", {
  id: uuid().primaryKey().defaultRandom(),
  username: varchar({ length: 255 }).notNull().unique(),
  password: varchar({ length: 255 }).notNull(),
  createdAt: timestamp().notNull().defaultNow(),
});

export default positions;
