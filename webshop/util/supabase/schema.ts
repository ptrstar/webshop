import { pgTable, serial, text, timestamp, json } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  streetName: text("street_name").notNull(),
  streetNr: text("street_nr").notNull(),
  zip: text("zip").notNull(),
  city: text("city").notNull(),
  country: text("country").notNull(),
  payment: json("payment"),
});
