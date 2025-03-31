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

export async function GET() {
  try {
    // Verify admin authentication
    const cookieStore = await cookies();
    const authToken = cookieStore.get('auth_token');
    if (authToken?.value !== process.env.ADMIN_TOKEN) {
      console.error('Unauthorized access attempt to analytics');
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Test database connection first
    try {
      await db.execute(sql`SELECT 1`);
    } catch (error) {
      console.error('Database connection test failed:', error);
      return NextResponse.json(
        { error: 'Database connection failed. Please check database configuration.' },
        { status: 500 }
      );
    }

    // Initialize default response
    const analyticsData: AnalyticsData = {
      totalViews: 0,
      uniqueVisitors: 0,
      viewsByPage: [],
      recentActivity: []
    };

    // Get total page views
    try {
      const totalViewsResult = await db.execute<{ count: number }>(sql`
        SELECT COUNT(*) as count FROM page_views
      `);
      analyticsData.totalViews = Number(totalViewsResult.rows[0]?.count || 0);
    } catch (error) {
      console.error('Error fetching total views:', error);
    }

    // Get unique visitors
    try {
      const uniqueVisitorsResult = await db.execute<{ count: number }>(sql`
        SELECT COUNT(*) as count FROM visitors
      `);
      analyticsData.uniqueVisitors = Number(uniqueVisitorsResult.rows[0]?.count || 0);
    } catch (error) {
      console.error('Error fetching unique visitors:', error);
    }

    // Get views by page
    try {
      const viewsByPage = await db.execute<{ page_path: string; count: number }>(sql`
        SELECT page_path, COUNT(*) as count
        FROM page_views
        GROUP BY page_path
        ORDER BY count DESC
        LIMIT 10
      `);
      analyticsData.viewsByPage = viewsByPage.rows;
    } catch (error) {
      console.error('Error fetching views by page:', error);
    }

    // Get recent activity
    try {
      const recentActivity = await db.execute<{ page_path: string; timestamp: Date; session_id: string }>(sql`
        SELECT pv.page_path, pv.timestamp, v.session_id
        FROM page_views pv
        LEFT JOIN visitors v ON v.session_id = pv.session_id
        ORDER BY pv.timestamp DESC
        LIMIT 20
      `);
      analyticsData.recentActivity = recentActivity.rows;
    } catch (error) {
      console.error('Error fetching recent activity:', error);
    }

    return NextResponse.json(analyticsData);
  } catch (error) {
    console.error('Analytics fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch analytics data. Please try again later.' },
      { status: 500 }
    );
  }
} 