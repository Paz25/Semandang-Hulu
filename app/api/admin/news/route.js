import db from "@/lib/db";
import { verifyTokenFromCookie } from "@/lib/auth";

export async function GET(req) {
  try {
    verifyTokenFromCookie(req);

    const result = await db.query(
      "SELECT * FROM news ORDER BY created_at DESC"
    );
    return Response.json(result.rows);
  } catch (err) {
    console.error("GET /api/admin/news error:", err);
    return new Response(
      JSON.stringify({ message: err.message || "Gagal mengambil data berita" }),
      { status: 401 }
    );
  }
}

export async function POST(req) {
  try {
    verifyTokenFromCookie(req);

    const { title, content, date, header_img } = await req.json();

    // Validasi semua input
    if (!title || !content || !date || !header_img) {
      return new Response(
        JSON.stringify({ message: "Semua field wajib diisi" }),
        { status: 400 }
      );
    }

    await db.query(
      "INSERT INTO news (title, content, date, header_img) VALUES ($1, $2, $3, $4)",
      [title, content, date, header_img]
    );

    return Response.json({ message: "Berita berhasil ditambahkan" });
  } catch (err) {
    console.error("POST /api/admin/news error:", err);
    return new Response(
      JSON.stringify({ message: err.message || "Gagal menambahkan berita" }),
      { status: 500 }
    );
  }
}