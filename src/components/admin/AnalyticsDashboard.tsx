'use client';

import { useEffect, useState } from 'react';

interface AnalyticsData {
  totalViews: number;
  uniqueVisitors: number;
  viewsByPage: Array<{ page_path: string; count: number }>;
  recentActivity: Array<{ page_path: string; timestamp: Date; session_id: string }>;
}

export function AnalyticsDashboard() {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const response = await fetch('/api/admin/analytics');
        if (!response.ok) {
          throw new Error('Failed to fetch analytics data');
        }
        const analyticsData = await response.json();
        setData(analyticsData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
    // Refresh data every 5 minutes
    const interval = setInterval(fetchAnalytics, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="p-4 bg-[#f4f1ea] rounded-md">
        <p className="text-[#2c392c]">Loading analytics data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-red-50 rounded-md">
        <p className="text-red-600">Error: {error}</p>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="p-4 bg-[#f4f1ea] rounded-md">
        <p className="text-[#2c392c]">No analytics data available</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Overview Stats */}
      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 bg-[#f4f1ea] rounded-md">
          <p className="text-sm text-[#2c392c]/60">Total Views</p>
          <p className="text-2xl font-medium text-[#2c392c]">{data.totalViews}</p>
        </div>
        <div className="p-4 bg-[#f4f1ea] rounded-md">
          <p className="text-sm text-[#2c392c]/60">Unique Visitors</p>
          <p className="text-2xl font-medium text-[#2c392c]">{data.uniqueVisitors}</p>
        </div>
      </div>

      {/* Top Pages */}
      <div>
        <h3 className="text-lg font-medium text-[#2c392c] mb-2">Top Pages</h3>
        <div className="space-y-2">
          {data.viewsByPage.map((page) => (
            <div key={page.page_path} className="flex justify-between items-center">
              <span className="text-[#2c392c]/80">{page.page_path}</span>
              <span className="text-[#2c392c] font-medium">{page.count}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div>
        <h3 className="text-lg font-medium text-[#2c392c] mb-2">Recent Activity</h3>
        <div className="space-y-2">
          {data.recentActivity.map((activity) => (
            <div key={`${activity.session_id}-${activity.timestamp}`} className="flex justify-between items-center">
              <span className="text-[#2c392c]/80">{activity.page_path}</span>
              <span className="text-sm text-[#2c392c]/60">
                {new Date(activity.timestamp).toLocaleString()}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 