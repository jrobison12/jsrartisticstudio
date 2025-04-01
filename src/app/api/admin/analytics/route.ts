import { NextResponse } from 'next/server';
import { db } from '@/lib/db/client';
import { sql } from 'drizzle-orm';
import { cookies } from 'next/headers';

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

// Configure runtime
export const runtime = 'edge';

export async function GET() {
  // During build time or when db is not available, return static data
  if (process.env.NODE_ENV === 'production' && process.env.NEXT_PHASE === 'build') {
    return NextResponse.json(defaultAnalyticsData);
  }

  if (!db) {
    return NextResponse.json(defaultAnalyticsData);
  }

  try {
    // Verify admin authentication
    const cookieStore = cookies();
    const authToken = cookieStore.get('auth_token');
    if (authToken?.value !== process.env.ADMIN_TOKEN) {
      console.error('Unauthorized access attempt to analytics');
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Initialize response with default data
    const analyticsData: AnalyticsData = { ...defaultAnalyticsData };

    // Get total page views
    try {
      const totalViewsResult = await db.execute(sql`
        SELECT COUNT(*) as count FROM page_views
      `);
      analyticsData.totalViews = Number(totalViewsResult.rows[0]?.count || 0);
    } catch (error) {
      console.error('Error fetching total views:', error);
    }

    // Get unique visitors
    try {
      const uniqueVisitorsResult = await db.execute(sql`
        SELECT COUNT(*) as count FROM visitors
      `);
      analyticsData.uniqueVisitors = Number(uniqueVisitorsResult.rows[0]?.count || 0);
    } catch (error) {
      console.error('Error fetching unique visitors:', error);
    }

    // Get views by page
    try {
      const viewsByPage = await db.execute(sql`
        SELECT page_path, COUNT(*) as count
        FROM page_views
        GROUP BY page_path
        ORDER BY count DESC
        LIMIT 10
      `);
      analyticsData.viewsByPage = viewsByPage.rows.map(row => ({
        page_path: row.page_path as string,
        count: Number(row.count)
      }));
    } catch (error) {
      console.error('Error fetching views by page:', error);
    }

    // Get recent activity
    try {
      const recentActivity = await db.execute(sql`
        SELECT pv.page_path, pv.timestamp, v.session_id
        FROM page_views pv
        LEFT JOIN visitors v ON v.session_id = pv.session_id
        ORDER BY pv.timestamp DESC
        LIMIT 20
      `);
      analyticsData.recentActivity = recentActivity.rows.map(row => ({
        page_path: row.page_path as string,
        timestamp: new Date(row.timestamp as string),
        session_id: row.session_id as string
      }));
    } catch (error) {
      console.error('Error fetching recent activity:', error);
    }

    return NextResponse.json(analyticsData);
  } catch (error) {
    console.error('Analytics fetch error:', error);
    return NextResponse.json(defaultAnalyticsData);
  }
} 