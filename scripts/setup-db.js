const { Pool } = require('pg');
require('dotenv').config({ path: '.env.local' });

async function setupDatabase() {
  // First connect to default database
  const initialPool = new Pool({
    user: process.env.POSTGRES_USER,
    host: process.env.POSTGRES_HOST,
    database: 'postgres',
    password: process.env.POSTGRES_PASSWORD,
    port: 5432,
  });

  try {
    console.log('Checking database connection...');
    await initialPool.query('SELECT 1');
    console.log('Successfully connected to PostgreSQL');

    // Check if our database exists
    const result = await initialPool.query(
      "SELECT 1 FROM pg_database WHERE datname = $1",
      [process.env.POSTGRES_DATABASE]
    );

    // Create database if it doesn't exist
    if (result.rowCount === 0) {
      console.log(`Creating database: ${process.env.POSTGRES_DATABASE}`);
      await initialPool.query(`CREATE DATABASE "${process.env.POSTGRES_DATABASE}"`);
    }

    // Close initial connection
    await initialPool.end();

    // Connect to our application database
    const appPool = new Pool({
      user: process.env.POSTGRES_USER,
      host: process.env.POSTGRES_HOST,
      database: process.env.POSTGRES_DATABASE,
      password: process.env.POSTGRES_PASSWORD,
      port: 5432,
    });

    // Drop existing table if it exists
    console.log('Dropping existing analytics_events table...');
    await appPool.query('DROP TABLE IF EXISTS analytics_events');

    // Create analytics_events table
    console.log('Creating analytics_events table...');
    await appPool.query(`
      CREATE TABLE analytics_events (
        id SERIAL PRIMARY KEY,
        event_type VARCHAR(50) NOT NULL,
        page_url TEXT NOT NULL,
        session_id VARCHAR(100) NOT NULL,
        user_agent TEXT,
        referrer TEXT,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Verify table structure
    console.log('Verifying table structure...');
    const tableInfo = await appPool.query(`
      SELECT column_name, data_type 
      FROM information_schema.columns 
      WHERE table_name = 'analytics_events'
      ORDER BY ordinal_position
    `);
    console.log('Table structure:', tableInfo.rows);

    // Insert sample data
    console.log('Inserting sample data...');
    await appPool.query(`
      INSERT INTO analytics_events (event_type, page_url, session_id, user_agent, referrer)
      VALUES 
        ('pageview', '/', 'sample-session-1', 'Mozilla/5.0', 'https://google.com'),
        ('pageview', '/gallery', 'sample-session-1', 'Mozilla/5.0', 'https://google.com'),
        ('pageview', '/commissions', 'sample-session-2', 'Mozilla/5.0 Mobile', 'https://twitter.com'),
        ('pageview', '/about', 'sample-session-3', 'Mozilla/5.0 Tablet', 'https://instagram.com')
    `);

    // Verify sample data
    const sampleData = await appPool.query('SELECT * FROM analytics_events');
    console.log('Sample data count:', sampleData.rowCount);

    console.log('Database setup completed successfully!');
    await appPool.end();
  } catch (error) {
    console.error('Error setting up database:', error);
    process.exit(1);
  }
}

setupDatabase(); 