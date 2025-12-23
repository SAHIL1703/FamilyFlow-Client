import React from "react";

const Hero = () => {
  return (
    <div className="w-full pt-16 pb-8 md:pt-24 md:pb-12 text-center px-4">
      {/* Badge */}
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-sm font-semibold mb-8 animate-fade-in-up">
        <i className="fa-solid fa-shield-halved"></i>
        <span>Trusted by 10,000+ families worldwide</span>
      </div>

      {/* Heading */}
      <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-900 mb-6 leading-tight">
        Keep Your Family <br className="hidden md:block" />
        <span className="text-blue-600">Connected</span> & <span className="text-amber-500">Safe</span>
      </h1>

      {/* Description */}
      <p className="max-w-2xl mx-auto text-lg md:text-xl text-slate-500 mb-8 leading-relaxed">
        Create private family rooms, chat in real-time, and see where
        everyone is on the map. Peace of mind in one beautiful app.
      </p>
    </div>
  );
};

export default Hero;