import { Pool, neonConfig } from '@neondatabase/serverless';
import ws from 'ws';

neonConfig.webSocketConstructor = ws;

export async function GET() {
  if (!process.env.DATABASE_URL) {
    return Response.json({ error: 'DATABASE_URL not set' }, { status: 500 });
  }

  const pool = new Pool({ connectionString: process.env.DATABASE_URL });

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

    const tables = await pool.query(
      "SELECT table_name FROM information_schema.tables WHERE table_schema = 'public'"
    );

    return Response.json({
      status: 'success',
      message: 'Auth tables initialized!',
      tables: tables.rows.map(r => r.table_name)
    });
  } catch (err) {
    return Response.json({ status: 'error', message: err.message }, { status: 500 });
  } finally {
    await pool.end();
  }
}
