import db from "@/lib/db";
import { verifyTokenFromCookie } from "@/lib/auth";

export async function PUT(req, { params }) {
  try {
    verifyTokenFromCookie(req);

    const { id } = params;
    const { title, content, date, header_img } = await req.json();

    if (!title || !content || !date) {
      return new Response(JSON.stringify({ message: "Data tidak lengkap" }), {
        status: 400,
      });
    }

    await db.query(
      "UPDATE news SET title = $1, content = $2, date = $3, header_img = $4 WHERE id = $5",
      [title, content, date, header_img, id]
    );

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

    await db.query("DELETE FROM news WHERE id = $1", [id]);

    return Response.json({ message: "Berita berhasil dihapus" });
  } catch (err) {
    console.error("DELETE /api/admin/news/[id] error:", err);
    return new Response(
      JSON.stringify({ message: err.message || "Gagal menghapus berita" }),
      { status: 500 }
    );
  }
}