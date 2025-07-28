import db from "@/lib/db";
import { verifyTokenFromCookie } from "@/lib/auth";
import bcrypt from "bcryptjs";

// GET all users
export async function GET(req) {
  try {
    verifyTokenFromCookie(req);

    const result = await db.query("SELECT id, name, email FROM users");
    return Response.json(result.rows);
  } catch (err) {
    console.error("GET /api/admin/users error:", err);
    return new Response(
      JSON.stringify({
        message: err.message || "Terjadi kesalahan saat mengambil data pengguna",
      }),
      { status: 401 }
    );
  }
}

// POST new user
export async function POST(req) {
  try {
    verifyTokenFromCookie(req);

    const { name, email, password } = await req.json();
    const hashedPassword = await bcrypt.hash(password, 10);

    await db.query(
      "INSERT INTO users (name, email, password) VALUES ($1, $2, $3)",
      [name, email, hashedPassword]
    );

    return Response.json({ message: "User berhasil ditambahkan" });
  } catch (err) {
    console.error("POST /api/admin/users error:", err);
    return new Response(
      JSON.stringify({
        message: err.message || "Terjadi kesalahan saat menambahkan user",
      }),
      { status: 401 }
    );
  }
}