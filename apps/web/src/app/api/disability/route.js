import sql from "../../../app/api/utils/sql.js";
import { auth } from "../../../auth.js";

export async function POST(request) {
  try {
    const session = await auth(request);
    if (!session?.user?.id) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const {
      nik,
      full_name,
      birth_place,
      birth_date,
      gender,
      regency,
      disability_type,
      severity,
      alat_bantu,
      status_layanan,
      catatan_layanan,
      phone,
      address,
      latitude,
      longitude,
      kk_number,
      ktp_url,
      kk_url,
    } = body;

    // Ensure table exists and all columns are present (idempotent migrations)
    try {
      await sql`
        CREATE TABLE IF NOT EXISTS disability_data (
          id SERIAL PRIMARY KEY,
          user_id TEXT NOT NULL,
          nik VARCHAR(16) UNIQUE NOT NULL,
          full_name TEXT NOT NULL,
          birth_place TEXT,
          birth_date DATE,
          gender TEXT,
          regency TEXT,
          disability_type TEXT,
          phone TEXT,
          address TEXT,
          kk_number TEXT,
          ktp_url TEXT,
          kk_url TEXT,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
      `;
      // Migrations - add new columns if they don't exist
      const migrations = [
        sql`ALTER TABLE disability_data ADD COLUMN IF NOT EXISTS kk_number TEXT`,
        sql`ALTER TABLE disability_data ADD COLUMN IF NOT EXISTS ktp_url TEXT`,
        sql`ALTER TABLE disability_data ADD COLUMN IF NOT EXISTS kk_url TEXT`,
        sql`ALTER TABLE disability_data ADD COLUMN IF NOT EXISTS severity TEXT`,
        sql`ALTER TABLE disability_data ADD COLUMN IF NOT EXISTS alat_bantu TEXT`,
        sql`ALTER TABLE disability_data ADD COLUMN IF NOT EXISTS status_layanan TEXT DEFAULT 'Belum Terjangkau'`,
        sql`ALTER TABLE disability_data ADD COLUMN IF NOT EXISTS catatan_layanan TEXT`,
        sql`ALTER TABLE disability_data ADD COLUMN IF NOT EXISTS latitude TEXT`,
        sql`ALTER TABLE disability_data ADD COLUMN IF NOT EXISTS longitude TEXT`,
      ];
      await Promise.allSettled(migrations);
    } catch (e) {
      console.error("Error during table setup:", e);
    }

    // Save to database
    const result = await sql`
      INSERT INTO disability_data (
        user_id, nik, full_name, birth_place, birth_date, gender,
        regency, disability_type, severity, alat_bantu, status_layanan,
        catatan_layanan, phone, address, latitude, longitude,
        kk_number, ktp_url, kk_url
      ) VALUES (
        ${session.user.id}, ${nik}, ${full_name},
        ${birth_place || null}, ${birth_date || null},
        ${gender}, ${regency}, ${disability_type},
        ${severity || 'Ringan (Dapat Mandiri)'},
        ${alat_bantu || null},
        ${status_layanan || 'Belum Terjangkau'},
        ${catatan_layanan || null},
        ${phone || null}, ${address},
        ${latitude || null}, ${longitude || null},
        ${kk_number || null}, ${ktp_url || null}, ${kk_url || null}
      ) RETURNING *
    `;

    const savedData = result[0];

    // Non-blocking sync to Google Apps Script
    const appsScriptUrl = process.env.APPS_SCRIPT_URL;
    if (appsScriptUrl) {
      console.log("[Sync] Sending data to Apps Script:", appsScriptUrl);
      fetch(appsScriptUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          source: "sip_dis_dashboard",
          provinsi: "Papua Barat Daya",
          timestamp: new Date().toISOString(),
          user_email: session.user.email,
          ...savedData
        }),
      }).catch(syncError => {
        console.error("Delayed sync with Google Sheets failed:", syncError);
      });
    }

    return Response.json({ data: savedData });
  } catch (error) {
    console.error("Error saving disability data:", error);
    if (error.code === '23505') {
      return Response.json({ error: "NIK sudah terdaftar" }, { status: 400 });
    }
    return Response.json({ error: "Internal Server Error", details: error.message }, { status: 500 });
  }
}

export async function GET(request) {
  try {
    const session = await auth(request);
    if (!session?.user?.id) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const data = await sql`SELECT * FROM disability_data ORDER BY created_at DESC`;
    return Response.json({ data });
  } catch (error) {
    console.error("Error fetching disability data:", error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
