import { NextResponse } from 'next/server';
import { db } from '@/lib/db/client';
import { sql } from 'drizzle-orm';

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

export const dynamic = 'force-dynamic';

export async function GET() {
  // During build time or when db is not available, return static data
  if (process.env.NODE_ENV === 'production' && process.env.NEXT_PHASE === 'build' || !db) {
    return NextResponse.json(defaultAnalyticsData);
  }

  try {
    // Test database connection first
    try {
      await db.execute(sql`SELECT 1`);
    } catch (error) {
      console.error('Database connection test failed:', error);
      return NextResponse.json(defaultAnalyticsData);
    }

    // Get total page views
    const totalViewsResult = await db.execute<{ count: number }>(sql`
      SELECT COUNT(*) as count FROM page_views
    `);
    const totalViews = Number(totalViewsResult.rows[0]?.count || 0);

    // Get page views by URL
    const pageViewsResult = await db.execute<{ url: string; count: number }>(sql`
      SELECT page_path as url, COUNT(*) as count
      FROM page_views
      GROUP BY page_path
      ORDER BY count DESC
      LIMIT 10
    `);

    // Get device type distribution
    const deviceStatsResult = await db.execute<{ type: string; count: number }>(sql`
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
    const hourlyStatsResult = await db.execute<{ hour: number; count: number }>(sql`
      SELECT 
        EXTRACT(HOUR FROM timestamp) as hour,
        COUNT(*) as count
      FROM page_views
      GROUP BY hour
      ORDER BY hour
    `);

    // Get top referrers
    const referrerStatsResult = await db.execute<{ referrer: string; count: number }>(sql`
      SELECT 
        COALESCE(referrer, 'Direct') as referrer,
        COUNT(*) as count
      FROM page_views
      GROUP BY referrer
      ORDER BY count DESC
      LIMIT 5
    `);

    // Get last updated timestamp
    const lastUpdatedResult = await db.execute<{ last_updated: Date }>(sql`
      SELECT MAX(timestamp) as last_updated FROM page_views
    `);

    return NextResponse.json({
      totalPageViews: totalViews,
      pageViews: pageViewsResult.rows,
      deviceTypes: deviceStatsResult.rows,
      hourlyDistribution: hourlyStatsResult.rows,
      topReferrers: referrerStatsResult.rows,
      lastUpdated: lastUpdatedResult.rows[0]?.last_updated?.toISOString() || null
    });
  } catch (error) {
    console.error('Error fetching analytics:', error);
    return NextResponse.json(defaultAnalyticsData);
  }
} 