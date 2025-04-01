import { Pool } from 'pg';

// Skip database connection during build
const isBuildTime = process.env.NEXT_PHASE === 'build';

// Create a mock pool for build time
const mockPool = {
  query: async () => ({ rows: [] }),
  end: async () => {},
  on: () => {},
  off: () => {},
  removeListener: () => {},
  removeAllListeners: () => {},
};

// Create the actual pool for runtime
const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
  ssl: process.env.NODE_ENV === 'production' 
    ? {
        rejectUnauthorized: false,
        ca: process.env.POSTGRES_CA_CERT,
      }
    : process.env.POSTGRES_URL?.includes('localhost') 
      ? false 
      : { rejectUnauthorized: false },
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

// Export the appropriate pool based on environment
export const db = isBuildTime ? mockPool : pool;

// Helper function to execute SQL queries
export async function query(text: string, params?: any[]) {
  if (isBuildTime) return { rows: [] };
  return pool.query(text, params);
}

// Test database connection
export async function testConnection() {
  if (isBuildTime) return true;
  try {
    await pool.query('SELECT 1');
    console.log('Database connection successful');
    return true;
  } catch (error) {
    console.error('Database connection test failed:', error);
    return false;
  }
}

// Cleanup function
export async function cleanup() {
  if (isBuildTime) return;
  try {
    await pool.end();
  } catch (error) {
    console.error('Error closing database connection:', error);
  }
}

// Handle application shutdown
process.on('SIGTERM', cleanup);
process.on('SIGINT', cleanup); 