"use client"; 

import React from "react";

const PetaDesaSection = () => {
  return (
    <section className="py-15 px-6 md:px-[100px] bg-stone-50">
      <h2 className="text-2xl font-semibold mb-2 text-[#0a160d] text-center">
        Peta Desa Semandang Hulu
      </h2>
      <p className="text-center text-[#0a160d] mb-10">
        Lokasi geografis Desa Semandang Hulu dan batas-batas wilayahnya.
      </p>
      <div
        className="w-full h-[500px] rounded-lg shadow-lg overflow-hidden" // Set a height for the map container
        style={{ minHeight: "300px" }} // Ensure a minimum height for mobile
      >
        <iframe
          src="/map.html" // Path to your map HTML file in the public directory
          title="Peta Desa Semandang Hulu"
          width="100%"
          height="100%"
          style={{ border: "none" }} // Remove iframe border
          allowFullScreen="" // Allow fullscreen if needed
          loading="lazy" // Improve loading performance
        ></iframe>
      </div>
    </section>
  );
};

export default PetaDesaSection;
