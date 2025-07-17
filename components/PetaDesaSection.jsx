"use client";

import React from "react";

const PetaDesaSection = ({ getAnimationClass }) => {
  return (
    <div
      id="peta-frame"
      data-animate
      className={`w-full h-[500px] rounded-lg shadow-lg overflow-hidden transition-all duration-800 ease-out ${getAnimationClass(
        "peta-frame"
      )}`}
      style={{
        minHeight: "300px",
        transitionDelay: "400ms",
      }}
    >
      <iframe
        src="/map.html"
        title="Peta Desa Semandang Hulu"
        width="100%"
        height="100%"
        style={{ border: "none" }}
        allowFullScreen=""
        loading="lazy"
      ></iframe>
    </div>
  );
};

export default PetaDesaSection;
