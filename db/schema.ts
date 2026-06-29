import { pgTable, text, timestamp, boolean, integer, uuid } from "drizzle-orm/pg-core";
export * from "@blawness/admin-kit/schema";

export const members = pgTable("members", {
  id:        uuid("id").primaryKey().defaultRandom(),
  name:      text("name").notNull(),
  slug:      text("slug").notNull().unique(),
  position:  text("position").notNull(),
  division:  text("division").notNull(),
  level:     integer("level").notNull(),
  parentId:  uuid("parent_id"),
  photoUrl:  text("photo_url"),
  bio:       text("bio"),
  isActive:  boolean("is_active").notNull().default(true),
  sortOrder: integer("sort_order").notNull().default(0),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const contactMessages = pgTable("contact_messages", {
  id:          uuid("id").primaryKey().defaultRandom(),
  senderName:  text("sender_name").notNull(),
  senderEmail: text("sender_email").notNull(),
  subject:     text("subject").notNull(),
  message:     text("message").notNull(),
  createdAt:   timestamp("created_at").defaultNow(),
});
