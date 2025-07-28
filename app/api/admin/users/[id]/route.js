import db from "@/lib/db";
import bcrypt from "bcryptjs";

export async function PUT(req, { params }) {
  try {
    const { id } = params;
    const { name, email, password } = await req.json();

    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      await db.query(
        "UPDATE users SET name = $1, email = $2, password = $3 WHERE id = $4",
        [name, email, hashedPassword, id]
      );
    } else {
      await db.query(
        "UPDATE users SET name = $1, email = $2 WHERE id = $3",
        [name, email, id]
      );
    }

    return Response.json({ message: "User berhasil diupdate" });
  } catch (err) {
    console.error(err);
    return new Response(
      JSON.stringify({ message: "Gagal mengupdate user" }),
      { status: 500 }
    );
  }
}

export async function DELETE(req, { params }) {
  try {
    const { id } = params;

    await db.query("DELETE FROM users WHERE id = $1", [id]);

    return Response.json({ message: "User berhasil dihapus" });
  } catch (err) {
    console.error(err);
    return new Response(
      JSON.stringify({ message: "Gagal menghapus user" }),
      { status: 500 }
    );
  }
}