import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET;

export function verifyTokenFromCookie(req) {
  const cookie = req.headers.get("cookie");

  if (!cookie) throw new Error("Tidak ada token");

  const token = cookie
    .split("; ")
    .find((c) => c.startsWith("token="))
    ?.split("=")[1];

  if (!token) throw new Error("Token tidak ditemukan di cookie");

  try {
    return jwt.verify(token, SECRET);
  } catch (err) {
    throw new Error("Token tidak valid");
  }
}