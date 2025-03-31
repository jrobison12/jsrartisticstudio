import { sql } from 'drizzle-orm';
import { text, timestamp, integer } from 'drizzle-orm/pg-core';

export const pageViews = sql`
  CREATE TABLE IF NOT EXISTS page_views (
    id SERIAL PRIMARY KEY,
    page_path TEXT NOT NULL,
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    user_agent TEXT,
    ip_address TEXT,
    referrer TEXT
  )
`;

export const visitors = sql`
  CREATE TABLE IF NOT EXISTS visitors (
    id SERIAL PRIMARY KEY,
    session_id TEXT NOT NULL,
    first_visit TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    last_visit TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    total_views INTEGER DEFAULT 1
  )
`; 