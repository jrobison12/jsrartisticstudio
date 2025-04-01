import { NextResponse } from 'next/server';
import { db } from '@/lib/db/client';
import { sql } from 'drizzle-orm';

export const dynamic = 'force-dynamic';

export async function GET() {
  // During build time or when db is not available, return success
  if (process.env.NODE_ENV === 'production' && process.env.NEXT_PHASE === 'build' || !db) {
    return NextResponse.json({ status: 'ok', message: 'Analytics setup skipped during build' });
  }

  try {
    console.log('Starting analytics setup...');

    // Test database connection first
    try {
      await db.execute(sql`SELECT 1`);
    } catch (error) {
      console.error('Database connection test failed:', error);
      return NextResponse.json({ 
        status: 'error',
        message: 'Database connection failed'
      }, { status: 500 });
    }

    // Drop existing tables
    try {
      await db.execute(sql`DROP TABLE IF EXISTS page_views`);
      await db.execute(sql`DROP TABLE IF EXISTS visitors`);
    } catch (error) {
      console.error('Error dropping tables:', error);
    }

    // Create tables
    await db.execute(sql`
      CREATE TABLE IF NOT EXISTS page_views (
        id SERIAL PRIMARY KEY,
        page_path TEXT NOT NULL,
        timestamp TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        user_agent TEXT,
        ip_address TEXT,
        referrer TEXT,
        session_id TEXT
      )
    `);

    await db.execute(sql`
      CREATE TABLE IF NOT EXISTS visitors (
        id SERIAL PRIMARY KEY,
        session_id TEXT NOT NULL,
        first_visit TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        last_visit TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Insert sample data
    await db.execute(sql`
      INSERT INTO visitors (session_id) VALUES 
      ('sample-session-1'),
      ('sample-session-2'),
      ('sample-session-3')
    `);

    await db.execute(sql`
      INSERT INTO page_views (page_path, user_agent, referrer, session_id) VALUES 
      ('/', 'Mozilla/5.0', 'https://google.com', 'sample-session-1'),
      ('/gallery', 'Mozilla/5.0', 'https://google.com', 'sample-session-1'),
      ('/about', 'Mozilla/5.0 Mobile', 'https://twitter.com', 'sample-session-2'),
      ('/contact', 'Mozilla/5.0 Tablet', 'https://instagram.com', 'sample-session-3')
    `);

    return NextResponse.json({ 
      status: 'ok',
      message: 'Analytics setup completed successfully'
    });
  } catch (error) {
    console.error('Error setting up analytics:', error);
    return NextResponse.json({ 
      status: 'error',
      message: 'Failed to set up analytics'
    }, { status: 500 });
  }
} 