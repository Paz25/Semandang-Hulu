import db from "@/lib/db";
import { notFound } from "next/navigation";
import Image from "next/image";
import Navbar from "@/components/Navbar";

export async function getData(id) {
  const result = await db.query("SELECT * FROM news WHERE id = $1", [id]);

  if (result.rowCount === 0) return null;
  return result.rows[0]; 
}

export default async function DetailBerita({ params }) {
  const berita = await getData(params.id);

  if (!berita) return notFound();

  return (
    <div>
      <Navbar />
      <main className="max-w-3xl mx-auto p-6 pt-20">
        <h1 className="text-2xl font-bold text-[#0a160d] mb-4">
          {berita.title}
        </h1>
        <p className="text-sm text-gray-500 mb-4">
          {new Date(berita.created_at).toLocaleDateString("id-ID", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </p>
        {berita.header_img && (
          <Image
            src={berita.header_img}
            alt={berita.title}
            width={800}
            height={400}
            className="rounded-lg mb-6 object-cover"
          />
        )}
        <div className="text-[#0a160d] leading-relaxed whitespace-pre-line text-justify">
          {berita.content}
        </div>
      </main>
    </div>
  );
}
