import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const { rows } = await db.query(
      "SELECT * FROM gallery ORDER BY created_at"
    );
    return NextResponse.json(rows, { status: 200 });
  } catch (err) {
    console.error("GET /api/gallery error:", err);
    return NextResponse.json(
      { message: "Gagal mengambil data galeri" },
      { status: 500 }
    );
  }
}
