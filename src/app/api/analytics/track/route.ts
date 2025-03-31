import { NextResponse } from 'next/server';
import { Pool } from 'pg';

let pool: Pool | null = null;

async function getPool() {
  if (!pool) {
    pool = new Pool({
      user: process.env.POSTGRES_USER,
      host: process.env.POSTGRES_HOST,
      database: 'postgres', // Connect to default database first
      password: process.env.POSTGRES_PASSWORD,
      port: 5432,
    });

    try {
      // Check if our database exists
      const result = await pool.query(
        "SELECT 1 FROM pg_database WHERE datname = $1",
        [process.env.POSTGRES_DATABASE]
      );

      // If database doesn't exist, create it
      if (result.rowCount === 0) {
        // We need to use template1 because we can't create a database while connected to it
        await pool.query(`CREATE DATABASE ${process.env.POSTGRES_DATABASE}`);
      }

      // Close the connection to postgres database
      await pool.end();

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
    } catch (error) {
      console.error('Failed to connect to database:', error);
      if (pool) {
        await pool.end();
      }
      pool = null;
      throw new Error('Database connection failed');
    }
  }
  return pool;
}

export async function POST(request: Request) {
  try {
    const pool = await getPool();

    // First, check if the analytics_events table exists
    const tableExists = await pool.query(`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_schema = 'public' 
        AND table_name = 'analytics_events'
      )
    `);

    if (!tableExists.rows[0].exists) {
      return NextResponse.json(
        { 
          error: 'Analytics table not found',
          details: 'Please initialize the analytics system first'
        },
        { status: 404 }
      );
    }
    
    const body = await request.json();
    
    // Get request information
    const userAgent = request.headers.get('user-agent') || '';
    const referrer = request.headers.get('referer') || '';
    const path = body.path || referrer || '/';
    
    // Use existing session ID or generate new one
    const sessionId = body.sessionId || Math.random().toString(36).substring(2);

    // Record the page view
    await pool.query(
      'INSERT INTO analytics_events (event_type, page_url, session_id, user_agent, referrer) VALUES ($1, $2, $3, $4, $5)',
      ['pageview', path, sessionId, userAgent, referrer]
    );

    return NextResponse.json({ 
      success: true,
      sessionId: body.sessionId ? undefined : sessionId // Only send back if it's new
    });
  } catch (error) {
    console.error('Error tracking analytics:', error);
    return NextResponse.json(
      { 
        error: 'Failed to track analytics',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
} 