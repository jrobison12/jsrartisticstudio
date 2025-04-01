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
  // During build time, return null
  if (process.env.NODE_ENV === 'production' && process.env.NEXT_PHASE === 'build') {
    return null;
  }

  if (!pool) {
    try {
      if (!process.env.DATABASE_URL) {
        console.warn('DATABASE_URL environment variable is not set');
        return null;
      }

      pool = new Pool({
        connectionString: process.env.DATABASE_URL,
      });
    } catch (error) {
      console.error('Error creating database pool:', error);
      return null;
    }
  }
  return pool;
}

// Create and export the db instance
const poolInstance = getPool();
export const db = poolInstance ? drizzle(poolInstance, { schema }) : null; 