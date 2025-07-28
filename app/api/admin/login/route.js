import db from "@/lib/db";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET;

export async function POST(req) {
  try {
    const { email, password } = await req.json();

    const result = await db.query("SELECT * FROM users WHERE email = $1", [email]);

    if (result.rows.length === 0) {
      return new Response(JSON.stringify({ message: "Email tidak ditemukan" }), { status: 401 });
    }

    const user = result.rows[0];
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return new Response(JSON.stringify({ message: "Password salah" }), { status: 401 });
    }

    const token = jwt.sign({ id: user.id, email: user.email }, SECRET, { expiresIn: "2h" });

    return new Response(JSON.stringify({ message: "Login berhasil" }), {
      status: 200,
      headers: {
        "Set-Cookie": `token=${token}; Path=/; HttpOnly; SameSite=Strict; Max-Age=7200`
      }
    });

  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ message: "Terjadi kesalahan" }), { status: 500 });
  }
}