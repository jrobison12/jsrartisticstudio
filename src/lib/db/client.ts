import { sql } from '@vercel/postgres';

export async function testConnection() {
  try {
    const result = await sql`SELECT 1`;
    console.log('Database connection test successful');
    return true;
  } catch (error) {
    console.error('Database connection test failed:', error);
    return false;
  }
}

// Export the sql function as db for consistency
export const db = sql;

// Cleanup function to close the database connection
export async function cleanup() {
  try {
    await sql.end();
  } catch (error) {
    console.error('Error closing database connection:', error);
  }
}

// Configure SSL based on environment
if (process.env.POSTGRES_URL?.includes('localhost')) {
  process.env.POSTGRES_SSL = 'false';
} else {
  process.env.POSTGRES_SSL = 'true';
} 