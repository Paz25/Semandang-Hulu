import db from "@/lib/db";
import { verifyTokenFromCookie } from "@/lib/auth";
import bcrypt from "bcryptjs";

export async function GET(req) {
  try {
    verifyTokenFromCookie(req);

    const [users] = await db.query("SELECT id, name, email FROM users");
    return Response.json(users);

  } catch (err) {
    return new Response(JSON.stringify({ message: err.message }), { status: 401 });
  }
}

export async function POST(req) {
  try {
    verifyToken(req);

    const { name, email, password } = await req.json();
    const hashedPassword = await bcrypt.hash(password, 10);

    await db.query("INSERT INTO users (name, email, password) VALUES (?, ?, ?)", [
      name,
      email,
      hashedPassword,
    ]);

    return Response.json({ message: "User berhasil ditambahkan" });

  } catch (err) {
    return new Response(JSON.stringify({ message: err.message }), { status: 401 });
  }
}