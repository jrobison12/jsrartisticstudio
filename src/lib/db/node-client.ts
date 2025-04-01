import { Pool } from 'pg';

// Create a connection pool
const pool = new Pool({
  user: process.env.POSTGRES_USER || 'postgres',
  password: process.env.POSTGRES_PASSWORD,
  host: process.env.POSTGRES_HOST || 'localhost',
  port: parseInt(process.env.POSTGRES_PORT || '5432'),
  database: process.env.POSTGRES_DATABASE || 'jsrartisticstudio',
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