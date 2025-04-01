import { NextResponse } from 'next/server';
import { query as db, testConnection } from '@/lib/db/node-client';

export const runtime = 'nodejs';

interface AnalyticsData {
  totalPageViews: number;
  pageViews: { url: string; count: number }[];
  deviceTypes: { type: string; count: number }[];
  hourlyDistribution: { hour: number; count: number }[];
  topReferrers: { referrer: string; count: number }[];
  lastUpdated: string | null;
}

// Default empty analytics data
const defaultAnalyticsData: AnalyticsData = {
  totalPageViews: 0,
  pageViews: [],
  deviceTypes: [],
  hourlyDistribution: [],
  topReferrers: [],
  lastUpdated: null
};

export async function GET() {
  try {
    // Test database connection first
    const isConnected = await testConnection();
    if (!isConnected) {
      console.error('Database connection failed');
      return NextResponse.json(
        { error: 'Database connection failed', details: 'Could not connect to the database. Please check your database configuration.' },
        { status: 503 }
      );
    }

    // Get total page views
    const totalViewsResult = await db('SELECT COUNT(*) as count FROM page_views');
    const totalViews = Number(totalViewsResult.rows[0]?.count || 0);

    // Get page views by URL
    const pageViewsResult = await db(`
      SELECT page_path as url, COUNT(*) as count
      FROM page_views
      GROUP BY page_path
      ORDER BY count DESC
      LIMIT 10
    `);

    // Get device type distribution
    const deviceStatsResult = await db(`
      SELECT 
        CASE 
          WHEN LOWER(user_agent) LIKE '%mobile%' THEN 'Mobile'
          WHEN LOWER(user_agent) LIKE '%tablet%' OR LOWER(user_agent) LIKE '%ipad%' THEN 'Tablet'
          ELSE 'Desktop'
        END as type,
        COUNT(*) as count
      FROM page_views
      GROUP BY 
        CASE 
          WHEN LOWER(user_agent) LIKE '%mobile%' THEN 'Mobile'
          WHEN LOWER(user_agent) LIKE '%tablet%' OR LOWER(user_agent) LIKE '%ipad%' THEN 'Tablet'
          ELSE 'Desktop'
        END
      ORDER BY count DESC
    `);

    // Get hourly distribution
    const hourlyStatsResult = await db(`
      SELECT 
        EXTRACT(HOUR FROM timestamp)::integer as hour,
        COUNT(*) as count
      FROM page_views
      GROUP BY hour
      ORDER BY hour
    `);

    // Get top referrers
    const referrerStatsResult = await db(`
      SELECT 
        COALESCE(referrer, 'Direct') as referrer,
        COUNT(*) as count
      FROM page_views
      GROUP BY referrer
      ORDER BY count DESC
      LIMIT 5
    `);

    // Get last updated timestamp
    const lastUpdatedResult = await db(`
      SELECT MAX(timestamp)::text as last_updated FROM page_views
    `);

    // Transform the results to match the expected types
    return NextResponse.json({
      totalPageViews: totalViews,
      pageViews: pageViewsResult.rows.map(row => ({
        url: row.url as string,
        count: Number(row.count)
      })),
      deviceTypes: deviceStatsResult.rows.map(row => ({
        type: row.type as string,
        count: Number(row.count)
      })),
      hourlyDistribution: hourlyStatsResult.rows.map(row => ({
        hour: Number(row.hour),
        count: Number(row.count)
      })),
      topReferrers: referrerStatsResult.rows.map(row => ({
        referrer: row.referrer as string,
        count: Number(row.count)
      })),
      lastUpdated: lastUpdatedResult.rows[0]?.last_updated as string || null
    });
  } catch (error) {
    console.error('Error fetching analytics:', error);
    return NextResponse.json(
      { error: 'Failed to fetch analytics data', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
} 