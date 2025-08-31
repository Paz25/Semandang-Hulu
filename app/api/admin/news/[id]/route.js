import db from "@/lib/db";
import { verifyTokenFromCookie } from "@/lib/auth";
import { writeFile } from "fs/promises";
import path from "path";

export async function PUT(req, { params }) {
  try {
    verifyTokenFromCookie(req);
    const { id } = params;

    const formData = await req.formData();
    const title = (formData.get("title") || "").toString().trim();
    const content = (formData.get("content") || "").toString().trim();
    const date = (formData.get("date") || "").toString().trim();
    const headerImgField = formData.get("header_img");

    if (!id || !title || !content || !date) {
      return new Response(
        JSON.stringify({
          message: "ID, judul, konten, dan tanggal wajib diisi",
        }),
        { status: 400 }
      );
    }

    let shouldUpdateImage = false;
    let imageUrl = null;

    if (headerImgField) {
      if (typeof headerImgField === "string") {
        const s = headerImgField.toString().trim();
        if (s !== "") {
          shouldUpdateImage = true;
          imageUrl = s;
        }
      } else {
        const bytes = await headerImgField.arrayBuffer();
        const buffer = Buffer.from(bytes);
        const filename = `${Date.now()}-${headerImgField.name.replace(
          /\s/g,
          "_"
        )}`;
        const filepath = path.join(process.cwd(), "public/uploads", filename);
        await writeFile(filepath, buffer);
        imageUrl = `/uploads/${filename}`;
        shouldUpdateImage = true;
      }
    }

    const setClauses = [];
    const paramsArr = [];
    let idx = 1;

    setClauses.push(`title = $${idx++}`);
    paramsArr.push(title);

    setClauses.push(`content = $${idx++}`);
    paramsArr.push(content);

    setClauses.push(`date = $${idx++}`);
    paramsArr.push(date);

    if (shouldUpdateImage) {
      setClauses.push(`header_img = $${idx++}`);
      paramsArr.push(imageUrl);
    }

    if (setClauses.length === 0) {
      return new Response(JSON.stringify({ message: "Tidak ada perubahan." }), {
        status: 400,
      });
    }

    const query = `UPDATE news SET ${setClauses.join(", ")} WHERE id = $${idx}`;
    paramsArr.push(id);

    const result = await db.query(query, paramsArr);

    if (result.rowCount === 0) {
      return new Response(
        JSON.stringify({ message: "Berita tidak ditemukan" }),
        { status: 404 }
      );
    }

    return Response.json({ message: "Berita berhasil diperbarui" });
  } catch (err) {
    console.error("PUT /api/admin/news/[id] error:", err);
    return new Response(
      JSON.stringify({ message: err.message || "Gagal memperbarui berita" }),
      { status: 500 }
    );
  }
}

export async function DELETE(req, { params }) {
  try {
    verifyTokenFromCookie(req);
    const { id } = params;

    if (!id) {
      return new Response(JSON.stringify({ message: "ID wajib diisi" }), {
        status: 400,
      });
    }

    const result = await db.query("DELETE FROM news WHERE id = $1", [id]);

    if (result.rowCount === 0) {
      return new Response(
        JSON.stringify({ message: "Berita tidak ditemukan" }),
        { status: 404 }
      );
    }

    return Response.json({ message: "Berita berhasil dihapus" });
  } catch (err) {
    console.error("DELETE /api/admin/news/[id] error:", err);
    return new Response(
      JSON.stringify({ message: err.message || "Gagal menghapus berita" }),
      { status: 500 }
    );
  }
}
