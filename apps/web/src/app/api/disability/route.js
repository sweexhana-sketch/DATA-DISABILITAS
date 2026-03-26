import sql from "@/app/api/utils/sql";
import { auth } from "@/auth";

export async function POST(request) {
  try {
    const session = await auth();
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
      phone,
      address,
    } = body;

    // Create table if not exists (simplified for this environment)
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
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
      `;
    } catch (e) {
      console.error("Error creating table:", e);
    }

    // Save to database
    const result = await sql`
      INSERT INTO disability_data (
        user_id, nik, full_name, birth_place, birth_date, gender, 
        regency, disability_type, phone, address
      ) VALUES (
        ${session.user.id}, ${nik}, ${full_name}, ${birth_place || null}, ${birth_date || null},
        ${gender}, ${regency}, ${disability_type}, ${phone || null}, ${address}
      ) RETURNING *
    `;

    const savedData = result[0];

    // Sync to Google Sheets via Apps Script
    const appsScriptUrl = process.env.APPS_SCRIPT_URL;
    if (appsScriptUrl) {
      try {
        await fetch(appsScriptUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            timestamp: new Date().toISOString(),
            ...savedData
          }),
        });
      } catch (syncError) {
        console.error("Failed to sync with Google Sheets:", syncError);
      }
    }

    return Response.json({ data: savedData });
  } catch (error) {
    console.error("Error saving disability data:", error);
    if (error.code === '23505') { // Unique violation
        return Response.json({ error: "NIK sudah terdaftar" }, { status: 400 });
    }
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function GET(request) {
  try {
    const session = await auth();
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
