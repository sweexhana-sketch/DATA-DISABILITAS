import { Pool } from '@neondatabase/serverless';
import dotenv from 'dotenv';
dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

async function test() {
  try {
    console.log('Testing connection to:', process.env.DATABASE_URL?.split('@')[1] || 'URL NOT SET');
    const res = await pool.query('SELECT tablename FROM pg_catalog.pg_tables WHERE schemaname = \'public\'');
    console.log('Tables in public schema:', res.rows.map(r => r.tablename));
    
    const requiredTables = ['auth_users', 'auth_accounts', 'auth_sessions', 'auth_verification_token'];
    for (const table of requiredTables) {
      if (res.rows.some(r => r.tablename === table)) {
        console.log(`✅ Table ${table} exists`);
        const columns = await pool.query(`SELECT column_name FROM information_schema.columns WHERE table_name = '${table}'`);
        console.log(`   Columns in ${table}:`, columns.rows.map(c => c.column_name));
      } else {
        console.log(`❌ Table ${table} is MISSING`);
      }
    }
  } catch (err) {
    console.error('Database test failed:', err);
  } finally {
    await pool.end();
  }
}

test();
