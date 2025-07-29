import db from "@/lib/db";

export async function GET() {
  try {
    const result = await db.query("SELECT * FROM news ORDER BY created_at DESC");
    return Response.json(result.rows);
  } catch (err) {
    console.error("GET /api/news error:", err);
    return new Response(
      JSON.stringify({ message: "Internal Server Error" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}