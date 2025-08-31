import db from "@/lib/db";
import { writeFile, mkdir } from "fs/promises";
import { existsSync } from "fs";
import path from "path";

export async function GET() {
  try {
    const { rows } = await db.query(
      "SELECT * FROM gallery ORDER BY created_at DESC"
    );
    return Response.json(rows);
  } catch (err) {
    console.error("GET /api/admin/gallery error:", err);
    return new Response(
      JSON.stringify({ message: "Gagal mengambil data gallery" }),
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    const formData = await req.formData();
    const title = formData.get("title");
    const image = formData.get("image");

    if (!title || !image) {
      return Response.json(
        { message: "Judul dan gambar wajib diisi." },
        { status: 400 }
      );
    }

    const bytes = await image.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // pastikan folder uploads/gallery ada
    const uploadDir = path.join(process.cwd(), "public/uploads/gallery");
    if (!existsSync(uploadDir)) {
      await mkdir(uploadDir, { recursive: true });
    }

    const filename = `${Date.now()}-${image.name.replace(/\s/g, "_")}`;
    const filepath = path.join(uploadDir, filename);
    await writeFile(filepath, buffer);

    const imageUrl = `/uploads/gallery/${filename}`;

    // Simpan ke database (pakai db.query)
    await db.query("INSERT INTO gallery (title, imageUrl) VALUES ($1, $2)", [
      title,
      imageUrl,
    ]);

    return Response.json({ message: "Gambar berhasil ditambahkan." });
  } catch (error) {
    console.error("Gallery Upload Error:", error);
    return Response.json(
      { message: "Terjadi kesalahan saat mengunggah gambar." },
      { status: 500 }
    );
  }
}
