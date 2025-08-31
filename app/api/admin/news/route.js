import db from "@/lib/db";
import { verifyTokenFromCookie } from "@/lib/auth";
import { writeFile } from "fs/promises";
import path from "path";

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

    const formData = await req.formData();
    const title = formData.get("title");
    const content = formData.get("content");
    const date = formData.get("date");
    const header_img = formData.get("header_img");

    if (!title || !content || !date || !header_img) {
      return new Response(
        JSON.stringify({ error: "Semua field wajib diisi" }),
        { status: 400 }
      );
    }

    // Simpan file
    const bytes = await header_img.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const filename = `${Date.now()}-${header_img.name.replace(/\s/g, "_")}`;
    const filepath = path.join(process.cwd(), "public/uploads", filename);
    await writeFile(filepath, buffer);

    const imageUrl = `/uploads/${filename}`;

    // Simpan ke DB
    await db.query(
      "INSERT INTO news (title, content, date, header_img) VALUES ($1, $2, $3, $4)",
      [title, content, date, imageUrl]
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
