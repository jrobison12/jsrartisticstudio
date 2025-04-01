import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';
import { config } from 'dotenv';
import { resolve } from 'path';

// Load environment variables from .env.local
config({ path: resolve(__dirname, '../../../.env.local') });

// Create a singleton client instance
let client: postgres.Sql | null = null;

function getClient() {
  // During build time, return null
  if (process.env.NODE_ENV === 'production' && process.env.NEXT_PHASE === 'build') {
    return null;
  }

  if (!client) {
    try {
      if (!process.env.DATABASE_URL) {
        console.warn('DATABASE_URL environment variable is not set');
        return null;
      }

      client = postgres(process.env.DATABASE_URL, {
        ssl: 'require',
        max: 1,
      });
    } catch (error) {
      console.error('Error creating database client:', error);
      return null;
    }
  }
  return client;
}

// Create and export the db instance
const clientInstance = getClient();
export const db = clientInstance ? drizzle(clientInstance, { schema }) : null; 