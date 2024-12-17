import {
  timestamp,
  pgTable,
  text,
  serial,
  varchar,
  integer,
} from "drizzle-orm/pg-core";

export const ContactSubmissions = pgTable("ContactSubmissions", {
  id: serial("id").primaryKey(),
  firstName: text("firstName"),
  lastName: text("lastName"),
  email: text("email").notNull(),
  message: text("message"),
  createdAt: timestamp("createdAt").defaultNow(),
});

export const NewsletterSubscriptions = pgTable("NewsletterSubscriptions", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  createdAt: timestamp("createdAt").defaultNow(),
});

export const categories = pgTable("categories", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 50 }).notNull(),
});

export const blogs = pgTable("blogs", {
  id: serial("id").primaryKey(),
  categoryId: integer("category_id").references(() => categories.id),
  name: text("name").notNull(),
  description: text("description").notNull(),
  rawUrl: text("raw_url").notNull(),
  image: text("image").notNull(),
});

export const schema = {
  ContactSubmissions,
  NewsletterSubscriptions,
  categories,
  blogs,
};
