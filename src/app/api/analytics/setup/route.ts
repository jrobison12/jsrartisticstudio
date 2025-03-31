import { NextResponse } from 'next/server';
import { Pool } from 'pg';

let pool: Pool | null = null;

async function getPool() {
  if (!pool) {
    try {
      // First connect to postgres database
      const initialPool = new Pool({
        user: process.env.POSTGRES_USER,
        host: process.env.POSTGRES_HOST,
        database: 'postgres',
        password: process.env.POSTGRES_PASSWORD,
        port: 5432,
      });

      // Check if our database exists
      const result = await initialPool.query(
        "SELECT 1 FROM pg_database WHERE datname = $1",
        [process.env.POSTGRES_DATABASE]
      );

      // If database doesn't exist, create it
      if (result.rowCount === 0) {
        console.log('Creating database:', process.env.POSTGRES_DATABASE);
        await initialPool.query(`CREATE DATABASE "${process.env.POSTGRES_DATABASE}"`);
      }

      // Close the initial connection
      await initialPool.end();

      // Create a new pool connected to our application database
      pool = new Pool({
        user: process.env.POSTGRES_USER,
        host: process.env.POSTGRES_HOST,
        database: process.env.POSTGRES_DATABASE,
        password: process.env.POSTGRES_PASSWORD,
        port: 5432,
      });

      // Test the connection
      await pool.query('SELECT 1');
      console.log('Successfully connected to database:', process.env.POSTGRES_DATABASE);
    } catch (error) {
      console.error('Failed to connect to database:', error);
      if (pool) {
        await pool.end();
      }
      pool = null;
      throw error;
    }
  }
  return pool;
}

export async function GET() {
  try {
    console.log('Starting analytics setup...');
    const pool = await getPool();

    // Drop the existing table if it exists
    console.log('Dropping existing analytics_events table...');
    await pool.query('DROP TABLE IF EXISTS analytics_events');

    // Create the analytics_events table
    console.log('Creating analytics_events table...');
    await pool.query(`
      CREATE TABLE analytics_events (
        id SERIAL PRIMARY KEY,
        event_type VARCHAR(50) NOT NULL,
        page_url TEXT NOT NULL,
        session_id VARCHAR(100) NOT NULL,
        user_agent TEXT,
        referrer TEXT,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Verify table creation
    console.log('Verifying table structure...');
    const tableInfo = await pool.query(`
      SELECT column_name, data_type 
      FROM information_schema.columns 
      WHERE table_name = 'analytics_events'
      ORDER BY ordinal_position
    `);
    console.log('Table structure:', tableInfo.rows);

    // Insert sample data
    console.log('Inserting sample data...');
    await pool.query(`
      INSERT INTO analytics_events (event_type, page_url, session_id, user_agent, referrer)
      VALUES 
        ('pageview', '/', 'sample-session-1', 'Mozilla/5.0', 'https://google.com'),
        ('pageview', '/gallery', 'sample-session-1', 'Mozilla/5.0', 'https://google.com'),
        ('pageview', '/commissions', 'sample-session-2', 'Mozilla/5.0 Mobile', 'https://twitter.com'),
        ('pageview', '/about', 'sample-session-3', 'Mozilla/5.0 Tablet', 'https://instagram.com')
    `);

    // Verify sample data
    console.log('Verifying sample data...');
    const sampleData = await pool.query('SELECT * FROM analytics_events');
    console.log('Sample data count:', sampleData.rowCount);

    return NextResponse.json({ 
      success: true, 
      message: 'Analytics table created and initialized successfully',
      tableStructure: tableInfo.rows,
      sampleDataCount: sampleData.rowCount
    });
  } catch (error) {
    console.error('Error setting up analytics:', error);
    return NextResponse.json(
      { 
        error: 'Failed to setup analytics',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
} 