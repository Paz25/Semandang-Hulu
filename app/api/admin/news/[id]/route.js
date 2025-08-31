import { writeFile, mkdir, unlink } from "fs/promises";
import { existsSync } from "fs";
import path from "path";
import db from "@/lib/db";
import { verifyTokenFromCookie } from "@/lib/auth";
import { NextResponse } from "next/server";

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

    if (headerImgField && typeof headerImgField !== "string") {
      // Ambil gambar lama dari DB
      const oldRes = await db.query(
        "SELECT header_img FROM news WHERE id = $1",
        [id]
      );
      if (oldRes.rowCount > 0 && oldRes.rows[0].header_img) {
        const oldPath = path.join(
          process.cwd(),
          "public",
          oldRes.rows[0].header_img
        );
        await unlink(oldPath).catch((err) => {
          console.warn("Gagal menghapus file lama:", oldPath, err.message);
        });
      }

      // Pastikan folder uploads/news ada
      const uploadDir = path.join(process.cwd(), "public/uploads/news");
      if (!existsSync(uploadDir)) {
        await mkdir(uploadDir, { recursive: true });
      }

      // Simpan gambar baru
      const bytes = await headerImgField.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const filename = `${Date.now()}-${headerImgField.name.replace(
        /\s/g,
        "_"
      )}`;
      const filepath = path.join(uploadDir, filename);
      await writeFile(filepath, buffer);

      imageUrl = `/uploads/news/${filename}`;
      shouldUpdateImage = true;
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

    const resSelect = await db.query(
      "SELECT header_img FROM news WHERE id = $1",
      [id]
    );

    if (resSelect.rowCount === 0) {
      return new Response(
        JSON.stringify({ message: "Berita tidak ditemukan" }),
        { status: 404 }
      );
    }

    const headerImg = resSelect.rows[0].header_img;

    if (headerImg) {
      const filePath = path.join(process.cwd(), "public", headerImg);
      await unlink(filePath).catch((err) => {
        console.warn("Gagal menghapus file:", filePath, err.message);
      });
    }

    await db.query("DELETE FROM news WHERE id = $1", [id]);

    return NextResponse.json({ message: "Berhasil dihapus" }, { status: 200 });
  } catch (err) {
    console.error("DELETE /api/admin/news/[id] error:", err);
    return new Response(
      JSON.stringify({ message: err.message || "Gagal menghapus berita" }),
      { status: 500 }
    );
  }
}
