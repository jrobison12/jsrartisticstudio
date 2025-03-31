import { config } from 'dotenv';
import { resolve } from 'path';
import { Pool } from 'pg';
import { db } from './index';
import { pageViews, visitors } from './schema';

// Load environment variables from .env.local
config({ path: resolve(__dirname, '../../../.env.local') });

async function createDatabaseIfNotExists() {
  // Connect to default 'postgres' database first
  const adminPool = new Pool({
    user: 'postgres',
    password: process.env.POSTGRES_PASSWORD || '81sturgis',
    host: 'localhost',
    port: 5432,
    database: 'postgres'
  });

  try {
    console.log('Checking if database exists...');
    // Check if database exists
    const result = await adminPool.query(
      "SELECT 1 FROM pg_database WHERE datname = 'jsrartisticstudio'"
    );

    // Create database if it doesn't exist
    if (result.rows.length === 0) {
      console.log('Creating database...');
      await adminPool.query('CREATE DATABASE jsrartisticstudio');
      console.log('Database created successfully');
    } else {
      console.log('Database already exists');
    }
  } catch (error) {
    console.error('Error creating database:', error);
    throw error;
  } finally {
    await adminPool.end();
  }
}

async function createTables() {
  try {
    console.log('Creating page_views table...');
    await db.execute(pageViews);
    console.log('Page_views table created successfully');

    console.log('Creating visitors table...');
    await db.execute(visitors);
    console.log('Visitors table created successfully');
  } catch (error) {
    console.error('Error creating tables:', error);
    throw error;
  }
}

async function migrate() {
  try {
    console.log('Starting database migration...');
    
    // Create database if it doesn't exist
    await createDatabaseIfNotExists();
    
    // Create tables
    await createTables();
    
    console.log('Database migration completed successfully');
    process.exit(0);
  } catch (error) {
    console.error('Migration failed:', error);
    process.exit(1);
  }
}

// Run migration
migrate(); 