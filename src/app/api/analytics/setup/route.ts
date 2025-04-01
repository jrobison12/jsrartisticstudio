import { NextResponse } from 'next/server';
import { query as db } from '@/lib/db/node-client';

export const runtime = 'nodejs';

export async function POST(request: Request) {
  try {
    // Create the page_views table if it doesn't exist
    await db(`
      CREATE TABLE IF NOT EXISTS page_views (
        id SERIAL PRIMARY KEY,
        page_path TEXT NOT NULL,
        user_agent TEXT,
        referrer TEXT,
        timestamp TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      )
    `);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error setting up analytics:', error);
    return NextResponse.json(
      { 
        error: 'Failed to set up analytics',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
} 