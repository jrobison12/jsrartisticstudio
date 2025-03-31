'use client';

import { useState, useEffect } from 'react';
import { Card } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';

interface AnalyticsData {
  totalPageViews: number;
  pageViews: { url: string; count: number }[];
  deviceTypes: { type: string; count: number }[];
  hourlyDistribution: { hour: number; count: number }[];
  topReferrers: { referrer: string; count: number }[];
  lastUpdated: string | null;
}

export default function AnalyticsPage() {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [setupLoading, setSetupLoading] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch('/api/analytics/data');
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.details || 'Failed to fetch analytics data');
      }
      const analyticsData = await response.json();
      setData(analyticsData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  const setupAnalytics = async () => {
    try {
      setSetupLoading(true);
      setError(null);
      const response = await fetch('/api/analytics/setup');
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.details || 'Failed to setup analytics');
      }
      await fetchData();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to setup analytics');
    } finally {
      setSetupLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-6 text-gray-900">Analytics Dashboard</h1>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-6 text-gray-900">Analytics Dashboard</h1>
        <Card className="p-6 bg-red-50">
          <h2 className="text-xl font-semibold text-red-700 mb-4">Error</h2>
          <p className="text-red-600 mb-4">{error}</p>
          <div className="flex gap-4">
            <Button onClick={fetchData} variant="outline">
              Retry
            </Button>
            <Button 
              onClick={setupAnalytics} 
              disabled={setupLoading}
              variant="default"
            >
              {setupLoading ? 'Setting up...' : 'Initialize Analytics'}
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  if (!data) {
    return null;
  }

  return (
    <div className="p-8 bg-white">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h1>
        <Button onClick={fetchData} variant="outline" size="sm">
          Refresh
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-900">Total Page Views</h2>
          <p className="text-4xl font-bold text-gray-900">{data.totalPageViews}</p>
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-900">Page Views by URL</h2>
          <div className="space-y-2">
            {data.pageViews.map((view) => (
              <div key={view.url} className="flex justify-between">
                <span className="truncate text-gray-700">{view.url}</span>
                <span className="font-semibold text-gray-900">{view.count}</span>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-900">Device Types</h2>
          <div className="space-y-2">
            {data.deviceTypes.map((device) => (
              <div key={device.type} className="flex justify-between">
                <span className="text-gray-700">{device.type}</span>
                <span className="font-semibold text-gray-900">{device.count}</span>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-900">Hourly Distribution</h2>
          <div className="space-y-2">
            {data.hourlyDistribution.map((hour) => (
              <div key={hour.hour} className="flex justify-between">
                <span className="text-gray-700">{`${hour.hour}:00`}</span>
                <span className="font-semibold text-gray-900">{hour.count}</span>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-900">Top Referrers</h2>
          <div className="space-y-2">
            {data.topReferrers.map((referrer) => (
              <div key={referrer.referrer} className="flex justify-between">
                <span className="truncate text-gray-700">{referrer.referrer}</span>
                <span className="font-semibold text-gray-900">{referrer.count}</span>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-900">Last Updated</h2>
          <p className="text-gray-700">{data.lastUpdated ? new Date(data.lastUpdated).toLocaleString() : 'Never'}</p>
        </Card>
      </div>
    </div>
  );
} 