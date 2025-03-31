import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schema from './schema';
import { config } from 'dotenv';
import { resolve } from 'path';

// Load environment variables from .env.local
config({ path: resolve(__dirname, '../../../.env.local') });

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL environment variable is not set');
}

// Create a singleton pool instance
let pool: Pool;

export function getPool() {
  if (!pool) {
    pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: process.env.NODE_ENV === 'production' ? {
        rejectUnauthorized: false
      } : undefined
    });

    // Log connection errors
    pool.on('error', (err) => {
      console.error('Unexpected error on idle client', err);
      process.exit(-1);
    });

    // Test the connection
    pool.connect()
      .then(() => console.log('Database connected successfully'))
      .catch((err) => {
        console.error('Failed to connect to the database:', err);
        process.exit(-1);
      });
  }
  return pool;
}

// Initialize the pool
const dbPool = getPool();

// Export the drizzle instance
export const db = drizzle(dbPool, { schema }); 