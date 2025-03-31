import { Pool } from 'pg';

const pool = new Pool({
  user: process.env.POSTGRES_USER,
  host: process.env.POSTGRES_HOST,
  database: process.env.POSTGRES_DATABASE,
  password: process.env.POSTGRES_PASSWORD,
  port: 5432,
});

export async function query(text: string, params?: any[]) {
  try {
    const result = await pool.query(text, params);
    return result;
  } catch (error) {
    console.error('Database error:', error);
    throw new Error('Database operation failed');
  }
}

export async function ensureAnalyticsTable() {
  try {
    // Create table if it doesn't exist
    await query(`
      CREATE TABLE IF NOT EXISTS analytics_events (
        id SERIAL PRIMARY KEY,
        event_type VARCHAR(50) NOT NULL,
        page_url TEXT NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        session_id VARCHAR(100),
        user_agent TEXT,
        device_type VARCHAR(50),
        referrer TEXT,
        duration_seconds INTEGER,
        is_conversion BOOLEAN DEFAULT false
      )
    `);

    // Check if table is empty
    const result = await query('SELECT COUNT(*) as count FROM analytics_events');

    if (result.rows[0].count === '0') {
      // Add sample data with more detailed information
      await query(`
        INSERT INTO analytics_events 
        (event_type, page_url, session_id, user_agent, device_type, referrer, duration_seconds, is_conversion) 
        VALUES 
        ('pageview', '/', 'sample-session-1', 'Mozilla/5.0', 'desktop', 'https://google.com', 120, false),
        ('pageview', '/gallery', 'sample-session-1', 'Mozilla/5.0', 'desktop', 'https://google.com', 300, false),
        ('pageview', '/commission-form', 'sample-session-1', 'Mozilla/5.0', 'desktop', '/', 180, true),
        ('pageview', '/about', 'sample-session-2', 'Mozilla/5.0 Mobile', 'mobile', 'https://facebook.com', 60, false),
        ('pageview', '/gallery', 'sample-session-2', 'Mozilla/5.0 Mobile', 'mobile', '/about', 240, false),
        ('pageview', '/commission-form', 'sample-session-2', 'Mozilla/5.0 Mobile', 'mobile', '/gallery', 150, true),
        ('pageview', '/', 'sample-session-3', 'Mozilla/5.0 iPad', 'tablet', 'https://instagram.com', 90, false),
        ('pageview', '/gallery', 'sample-session-3', 'Mozilla/5.0 iPad', 'tablet', '/', 200, false)
      `);
    }
    return true;
  } catch (error) {
    console.error('Error ensuring analytics table:', error);
    throw error;
  }
} 