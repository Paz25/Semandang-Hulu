import db from "@/lib/db";
import bcrypt from "bcryptjs";

export async function PUT(req, { params }) {
  try {
    const { id } = params;
    const { name, email, password } = await req.json();

    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      await db.query(
        "UPDATE users SET name = ?, email = ?, password = ? WHERE id = ?",
        [name, email, hashedPassword, id]
      );
    } else {
      await db.query(
        "UPDATE users SET name = ?, email = ? WHERE id = ?",
        [name, email, id]
      );
    }

    return Response.json({ message: "User berhasil diupdate" });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ message: "Gagal mengupdate user" }), { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  try {
    const { id } = params;

    await db.query("DELETE FROM users WHERE id = ?", [id]);

    return Response.json({ message: "User berhasil dihapus" });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ message: "Gagal menghapus user" }), { status: 500 });
  }
}