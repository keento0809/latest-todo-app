import {
  integer,
  text,
  boolean,
  pgTable,
  timestamp,
} from "drizzle-orm/pg-core";

export const todo = pgTable("todo", {
  id: integer("id").primaryKey(),
  title: text("title").notNull(),
  isCompleted: boolean("isCompleted").default(false).notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date()),
});
