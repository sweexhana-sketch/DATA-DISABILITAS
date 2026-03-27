import sql from "../../../../app/api/utils/sql.js";
import { auth } from "../../../../auth.js";

export async function POST(request) {
  try {
    const session = await auth(request);
    
    // Optional: add admin check if needed, for now just check for valid session 
    // to allow the user to trigger their own sync if they are authorized
    if (!session?.user?.id) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const appsScriptUrl = process.env.APPS_SCRIPT_URL;
    if (!appsScriptUrl) {
      return Response.json({ error: "APPS_SCRIPT_URL not configured" }, { status: 400 });
    }

    // Fetch ALL records
    const allData = await sql`SELECT * FROM disability_data`;
    
    console.log(`[SyncAll] Syncing ${allData.length} records to Apps Script...`);

    // We send them as a batch if possible, or one by one. 
    // Apps Script usually handles POST better as one-by-one or a specific batch format.
    // For simplicity and reliability on Vercel, we'll send a batch array.
    
    const response = await fetch(appsScriptUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        source: "admin_sync_all",
        timestamp: new Date().toISOString(),
        count: allData.length,
        records: allData
      }),
    });

    if (!response.ok) {
      throw new Error(`Apps Script returned ${response.status}`);
    }

    return Response.json({ 
        message: `Successfully synced ${allData.length} records`,
        count: allData.length 
    });
  } catch (error) {
    console.error("Error in Sync All:", error);
    return Response.json({ error: error.message }, { status: 500 });
  }
}
