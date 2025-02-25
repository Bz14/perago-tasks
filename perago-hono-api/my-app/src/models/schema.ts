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

export default positions;
