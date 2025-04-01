import { Pool } from 'pg';

// Create a connection pool
const pool = new Pool({
  connectionString: process.env.POSTGRES_URL || process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' 
    ? { rejectUnauthorized: false } 
    : process.env.POSTGRES_URL?.includes('localhost') 
      ? false 
      : { rejectUnauthorized: false }
});

// Test the database connection
export async function testConnection() {
  try {
    const result = await pool.query('SELECT 1');
    console.log('Database connection successful');
    return true;
  } catch (error) {
    console.error('Database connection test failed:', error);
    return false;
  }
}

// Helper function to execute SQL queries
export async function query(text: string, params?: any[]) {
  return pool.query(text, params);
}

// Cleanup function to close the pool
export async function cleanup() {
  try {
    await pool.end();
    console.log('Database pool has ended');
  } catch (error) {
    console.error('Error closing database pool:', error);
  }
} 