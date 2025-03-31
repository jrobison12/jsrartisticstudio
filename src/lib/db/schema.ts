import { sql } from 'drizzle-orm';
import { text, timestamp, integer, pgTable } from 'drizzle-orm/pg-core';

export const pageViews = pgTable('page_views', {
  id: integer('id').primaryKey(),
  pagePath: text('page_path').notNull(),
  timestamp: timestamp('timestamp', { withTimezone: true }).defaultNow(),
  userAgent: text('user_agent'),
  ipAddress: text('ip_address'),
  referrer: text('referrer'),
});

export const visitors = pgTable('visitors', {
  id: integer('id').primaryKey(),
  sessionId: text('session_id').notNull(),
  firstVisit: timestamp('first_visit', { withTimezone: true }).defaultNow(),
  lastVisit: timestamp('last_visit', { withTimezone: true }).defaultNow(),
}); 