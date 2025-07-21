export async function POST() {
  return new Response(JSON.stringify({ message: "Logout berhasil" }), {
    status: 200,
    headers: {
      "Set-Cookie": "token=; Path=/; HttpOnly; Max-Age=0"
    }
  });
}
