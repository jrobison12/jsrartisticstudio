import { NextResponse } from 'next/server';
import { query as db } from '@/lib/db/node-client';
import { cookies } from 'next/headers';

export const runtime = 'nodejs';

interface AnalyticsData {
  totalViews: number;
  uniqueVisitors: number;
  viewsByPage: Array<{ page_path: string; count: number }>;
  recentActivity: Array<{ page_path: string; timestamp: Date; session_id: string }>;
}

// Default empty analytics data
const defaultAnalyticsData: AnalyticsData = {
  totalViews: 0,
  uniqueVisitors: 0,
  viewsByPage: [],
  recentActivity: []
};

export const dynamic = 'force-dynamic';

export async function GET() {
  const analyticsData = {
    totalViews: 0,
    viewsByPage: [] as { url: string; views: number }[],
    recentActivity: [] as { timestamp: string; url: string; userAgent: string }[],
  };

  try {
    // Get total page views
    const totalViewsResult = await db(`
      SELECT COUNT(*) as count FROM page_views
    `);
    analyticsData.totalViews = Number(totalViewsResult.rows[0]?.count || 0);

    // Get views by page
    const viewsByPageResult = await db(`
      SELECT page_path as url, COUNT(*) as views
      FROM page_views
      GROUP BY page_path
      ORDER BY views DESC
      LIMIT 10
    `);
    analyticsData.viewsByPage = viewsByPageResult.rows.map(row => ({
      url: row.url as string,
      views: Number(row.views)
    }));

    // Get recent activity
    const recentActivityResult = await db(`
      SELECT 
        timestamp::text as timestamp,
        page_path as url,
        user_agent as "userAgent"
      FROM page_views
      ORDER BY timestamp DESC
      LIMIT 10
    `);
    analyticsData.recentActivity = recentActivityResult.rows.map(row => ({
      timestamp: row.timestamp as string,
      url: row.url as string,
      userAgent: row.userAgent as string
    }));

    return NextResponse.json(analyticsData);
  } catch (error) {
    console.error('Error fetching analytics:', error);
    return NextResponse.json(
      { error: 'Failed to fetch analytics data', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
} 