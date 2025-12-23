import React from "react";

const Working = () => {
  const steps = [
    { icon: "fa-user-plus", title: "Create Account", desc: "Sign up in seconds with just your email. No credit card required." },
    { icon: "fa-envelope-open-text", title: "Invite Family", desc: "Send invite links to your family. They join with one click." },
    { icon: "fa-comments", title: "Start Chatting", desc: "Share messages, photos, and updates instantly." },
    { icon: "fa-map-location", title: "Track & Connect", desc: "See live locations and stay connected wherever life takes you." },
  ];

  return (
    <div className="py-24 bg-white">
      <div className="mx-auto max-w-4xl px-6 mb-16 text-center">
        <p className="mb-3 text-sm font-bold uppercase tracking-widest text-amber-500">
          How It Works
        </p>
        <h2 className="text-3xl font-extrabold text-slate-900 sm:text-4xl md:text-5xl mb-6">
          Get Started in Minutes
        </h2>
        <p className="mx-auto max-w-2xl text-lg text-slate-500">
          Setting up FamilyFlow is quick and easy. Get connected in four steps.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {steps.map((step, index) => (
          <div key={index} className="flex flex-col items-center text-center relative group">
            {/* Connector Line (Desktop only) */}
            {index !== steps.length - 1 && (
              <div className="hidden lg:block absolute top-10 left-1/2 w-full h-0.5 bg-slate-100 -z-10"></div>
            )}
            
            <div className="w-20 h-20 rounded-2xl bg-white border-2 border-blue-100 flex items-center justify-center text-blue-600 shadow-lg shadow-blue-50 mb-6 group-hover:scale-110 group-hover:border-blue-500 transition-all duration-300">
              <i className={`fa-solid ${step.icon} text-3xl`}></i>
            </div>
            
            <h3 className="text-xl font-bold text-slate-800 mb-2">{step.title}</h3>
            <p className="text-slate-500 text-sm leading-relaxed max-w-xs">{step.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Working;