import React from "react";

const Hero = () => {
  return (
    <div className="mx-auto max-w-4xl px-6 py-20 text-center">
      {/* Subtitle / Eyebrow Text */}
      <p className="mb-3 text-lg font-bold uppercase tracking-wider text-blue-500">
        Features
      </p>

      {/* Main Heading */}
      <h2 className="mb-6 text-3xl font-extrabold leading-tight text-gray-900 sm:text-4xl md:text-5xl">
        Everything Your Family Needs
      </h2>

      {/* Description */}
      <p className="mx-auto max-w-2xl text-lg text-gray-500">
        FamilyFlow brings together all the tools your family needs to stay
        connected, coordinated, and safe in one beautiful app.
      </p>
    </div>
  );
};

export default Hero;
