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

export async function GET() {
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

    // Get total page views
    const totalViewsResult = await pool.query(
      'SELECT COUNT(*) as total FROM analytics_events WHERE event_type = $1',
      ['pageview']
    );
    const totalViews = parseInt(totalViewsResult.rows[0].total) || 0;

    // Get page views by URL
    const pageViewsResult = await pool.query(`
      SELECT page_url, COUNT(*) as count
      FROM analytics_events
      WHERE event_type = 'pageview'
      GROUP BY page_url
      ORDER BY count DESC
      LIMIT 10
    `);

    // Get device type distribution
    const deviceStatsResult = await pool.query(`
      SELECT 
        CASE 
          WHEN LOWER(user_agent) LIKE '%mobile%' THEN 'Mobile'
          WHEN LOWER(user_agent) LIKE '%tablet%' OR LOWER(user_agent) LIKE '%ipad%' THEN 'Tablet'
          ELSE 'Desktop'
        END as type,
        COUNT(*) as count
      FROM analytics_events
      GROUP BY 
        CASE 
          WHEN LOWER(user_agent) LIKE '%mobile%' THEN 'Mobile'
          WHEN LOWER(user_agent) LIKE '%tablet%' OR LOWER(user_agent) LIKE '%ipad%' THEN 'Tablet'
          ELSE 'Desktop'
        END
      ORDER BY count DESC
    `);

    // Get hourly distribution
    const hourlyStatsResult = await pool.query(`
      SELECT 
        EXTRACT(HOUR FROM created_at) as hour,
        COUNT(*) as count
      FROM analytics_events
      GROUP BY hour
      ORDER BY hour
    `);

    // Get top referrers
    const referrerStatsResult = await pool.query(`
      SELECT 
        COALESCE(referrer, 'Direct') as referrer,
        COUNT(*) as count
      FROM analytics_events
      GROUP BY referrer
      ORDER BY count DESC
      LIMIT 5
    `);

    // Get last updated timestamp
    const lastUpdatedResult = await pool.query(
      'SELECT MAX(created_at) as last_updated FROM analytics_events'
    );

    return NextResponse.json({
      totalPageViews: totalViews,
      pageViews: pageViewsResult.rows.map(row => ({
        url: row.page_url,
        count: parseInt(row.count)
      })),
      deviceTypes: deviceStatsResult.rows.map(row => ({
        type: row.type,
        count: parseInt(row.count)
      })),
      hourlyDistribution: hourlyStatsResult.rows.map(row => ({
        hour: parseInt(row.hour),
        count: parseInt(row.count)
      })),
      topReferrers: referrerStatsResult.rows.map(row => ({
        referrer: row.referrer,
        count: parseInt(row.count)
      })),
      lastUpdated: lastUpdatedResult.rows[0].last_updated
        ? new Date(lastUpdatedResult.rows[0].last_updated).toISOString()
        : null
    });
  } catch (error) {
    console.error('Error fetching analytics:', error);
    return NextResponse.json(
      { 
        error: 'Failed to fetch analytics data',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
} 