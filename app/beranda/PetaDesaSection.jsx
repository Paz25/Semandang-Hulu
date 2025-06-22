export default function PetaDesaSection() {
  return (
    <section className="py-15 px-6 md:px-[100px] bg-stone-50">
      <h2 className="text-2xl font-semibold text-center mb-2 text-[#0a160d]">Peta Desa</h2>
      <p className="text-center text-[#0a160d] mb-10">
        Lihat posisi strategis Desa Semandang Hulu dalam satu tampilan
      </p>
      <div className="rounded overflow-hidden shadow-lg h-150 w-full">
        <iframe
          title="Peta Desa Semandang Hulu"
          width="100%"
          height="100%"
          loading="lazy"
          allowFullScreen
          referrerPolicy="no-referrer-when-downgrade"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31805.61850478113!2d111.855!3d-1.050!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e0511f81e0b18f7%3A0x30b94b51091e4e5!2sSemandang%20Hulu%2C%20Simpang%20Hulu%2C%20Kabupaten%20Ketapang%2C%20Kalimantan%20Bar.!5e0!3m2!1sid!2sid!4v1718963665000!5m2!1sid!2sid"
        ></iframe>
      </div>
    </section>
  );
}
