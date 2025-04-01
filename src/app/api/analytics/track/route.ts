import { NextResponse } from 'next/server';
import { query as db } from '@/lib/db/node-client';

export const runtime = 'nodejs';

export async function POST(request: Request) {
  try {
    // First, check if the page_views table exists
    const { rows: [{ exists }] } = await db(`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_schema = 'public' 
        AND table_name = 'page_views'
      )
    `);

    if (!exists) {
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

    // Record the page view
    await db(
      'INSERT INTO page_views (page_path, user_agent, referrer, timestamp) VALUES ($1, $2, $3, NOW())',
      [path, userAgent, referrer]
    );

    return NextResponse.json({ success: true });
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