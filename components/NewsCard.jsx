"use client";

import Image from "next/image";
import Link from "next/link";

export default function NewsCard({ id, title, content, date, header_img }) {
  function formatTanggal(dateString) {
    const options = {
      weekday: "long",
      day: "2-digit",
      month: "long",
      year: "numeric",
    };

    return new Date(dateString).toLocaleDateString("id-ID", options);
  }

  return (
    <div className="w-full bg-white border rounded-xl overflow-hidden shadow-md transform transition-all duration-700 ease-out cursor-pointer hover:scale-[1.02]">
      <Image
        src={header_img || "/images/news/no-image.jpg"}
        alt={title}
        width={600}
        height={400}
        className="w-full h-48 object-cover"
      />

      <div className="p-6">
        <p className="text-sm text-gray-500 mb-1 text-[#0a160d]">
          {formatTanggal(date)}
        </p>
        <h3 className="text-lg font-semibold text-black mb-2">{title}</h3>

        <p className="text-gray-700 text-sm line-clamp-3">{content}</p>

        <Link
          href={`/warta/${id}`}
          className="text-[#97A202] mt-3 inline-block text-sm font-semibold hover:underline"
        >
          Baca selengkapnya →
        </Link>
      </div>
    </div>
  );
}
