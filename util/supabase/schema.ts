import { pgTable, serial, text, timestamp, json, smallint, integer, boolean } from "drizzle-orm/pg-core";

export const customers= pgTable("customers", {
  id: serial("id").primaryKey(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull(),
  name: text("name").notNull(),
  streetName: text("street_name").notNull(),
  streetNr: text("street_nr").notNull(),
  postalCode: text("postal_code").notNull(),
  city: text("city").notNull(),
  country: text("country").notNull(),
  email: text("email").notNull(),
  amount: integer("amount").notNull(),
  isPayed: boolean("is_payed").notNull(),
  isShipped: boolean("is_shipped").notNull(),
  payedAt: timestamp("payed_at", { withTimezone: true }),
  shippedAt: timestamp("shipped_at", { withTimezone: true }),
});

export const interest = pgTable('interest', {
  id: serial('id').primaryKey(),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull(),
  amount: smallint('amount').notNull(),
  email: text('email').notNull(),
});