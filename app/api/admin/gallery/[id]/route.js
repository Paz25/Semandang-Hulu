import db from "@/lib/db";
import { unlink } from "fs/promises";
import path from "path";
import { NextResponse } from "next/server";

export async function DELETE(request) {
  const url = new URL(request.url);
  const idParam = url.pathname.split("/").pop();
  const id = parseInt(idParam);

  if (isNaN(id)) {
    return NextResponse.json({ message: "ID tidak valid" }, { status: 400 });
  }

  try {
    // Ambil data gambar dulu dari DB
    const { rows } = await db.query("SELECT * FROM gallery WHERE id = $1", [id]);
    const result = rows[0];

    if (!result) {
      return NextResponse.json({ message: "Data tidak ditemukan" }, { status: 404 });
    }

    const imagePath = path.join(process.cwd(), "public", result.imageurl);
    await unlink(imagePath).catch((err) => {
      console.warn("Gagal menghapus file:", imagePath, err.message);
    });

    // Hapus dari database
    await db.query("DELETE FROM gallery WHERE id = $1", [id]);

    return NextResponse.json({ message: "Berhasil dihapus" }, { status: 200 });
  } catch (err) {
    console.error("DELETE /gallery error:", err);
    return NextResponse.json({ message: "Gagal menghapus data" }, { status: 500 });
  }
}