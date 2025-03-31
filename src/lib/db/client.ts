import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schema from './schema';
import { config } from 'dotenv';
import { resolve } from 'path';

// Load environment variables from .env.local
config({ path: resolve(__dirname, '../../../.env.local') });

// Create a singleton pool instance
let pool: Pool | null = null;

function getPool() {
  if (!process.env.DATABASE_URL) {
    // During build time, return a mock pool
    if (process.env.NODE_ENV === 'production' && process.env.NEXT_PHASE === 'build') {
      return {
        query: async () => ({ rows: [] }),
        execute: async () => ({ rows: [] }),
        end: async () => {},
      } as unknown as Pool;
    }
    throw new Error('DATABASE_URL environment variable is not set');
  }
  
  if (!pool) {
    pool = new Pool({
      connectionString: process.env.DATABASE_URL,
    });
  }
  return pool;
}

// Create and export the db instance
export const db = drizzle(getPool(), { schema }); 