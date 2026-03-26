// init-db.js - Run this script to initialize the Auth.js database schema
// Usage: node --experimental-vm-modules init-db.js
// Or:    DATABASE_URL="your_connection_string" node init-db.js

import { Pool, neonConfig } from '@neondatabase/serverless';
import ws from 'ws';

neonConfig.webSocketConstructor = ws;

const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) {
  console.error('❌ ERROR: DATABASE_URL environment variable is not set!');
  console.error('Run with: $env:DATABASE_URL="postgresql://..." ; node init-db.js');
  process.exit(1);
}

console.log('Connecting to DB at:', DATABASE_URL.split('@')[1] || 'UNKNOWN');

const pool = new Pool({ connectionString: DATABASE_URL });

async function migrate() {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS auth_users (
        id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
        name text,
        email text UNIQUE,
        "emailVerified" timestamp with time zone,
        image text
      );

      CREATE TABLE IF NOT EXISTS auth_accounts (
        id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
        "userId" uuid REFERENCES auth_users(id) ON DELETE CASCADE,
        type text NOT NULL,
        provider text NOT NULL,
        "providerAccountId" text NOT NULL,
        refresh_token text,
        access_token text,
        expires_at bigint,
        token_type text,
        scope text,
        id_token text,
        session_state text,
        password text,
        UNIQUE(provider, "providerAccountId")
      );

      CREATE TABLE IF NOT EXISTS auth_sessions (
        id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
        expires timestamp with time zone NOT NULL,
        "sessionToken" text UNIQUE NOT NULL,
        "userId" uuid REFERENCES auth_users(id) ON DELETE CASCADE
      );

      CREATE TABLE IF NOT EXISTS auth_verification_token (
        identifier text NOT NULL,
        token text NOT NULL,
        expires timestamp with time zone NOT NULL,
        PRIMARY KEY (identifier, token)
      );
    `);

    console.log('✅ SUCCESS: All Auth.js tables created!');

    const result = await pool.query(
      "SELECT table_name FROM information_schema.tables WHERE table_schema = 'public'"
    );
    console.log('Tables in database:', result.rows.map(r => r.table_name));
  } catch (err) {
    console.error('❌ MIGRATION FAILED:', err.message);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

migrate();
