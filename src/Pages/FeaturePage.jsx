import React from "react";
import Navbar from "../components/LandingPageComponent/Navbar";
import Footer from "../components/LandingPageComponent/Footer";

const FeaturePage = () => {
  const features = [
    {
      title: "Real-Time Location Tracking",
      desc: "Never worry about where your family members are. Our GPS tracking updates in real-time, providing precise location data on a shared family map. Privacy controls allow members to pause sharing when needed.",
      icon: "fa-map-location-dot",
      color: "blue",
      imgPlaceholder: "bg-blue-100",
    },
    {
      title: "Smart Geofencing Alerts",
      desc: "Set up safe zones like 'Home', 'School', or 'Work'. Receive instant notifications on your device the moment a family member enters or leaves these designated areas.",
      icon: "fa-bell",
      color: "amber",
      imgPlaceholder: "bg-amber-100",
    },
    {
      title: "Private Family Chat",
      desc: "A secure, encrypted messaging space just for your family. Share photos, send voice notes, and coordinate plans without leaving the app. It's like WhatsApp, but strictly for your inner circle.",
      icon: "fa-comments",
      color: "blue",
      imgPlaceholder: "bg-blue-100",
    },
    {
      title: "Location History",
      desc: "Review movement history for the past 30 days. Helpful for retracing steps if a phone is lost, or understanding your family's daily routines better.",
      icon: "fa-clock-rotate-left",
      color: "amber",
      imgPlaceholder: "bg-amber-100",
    },
  ];

  return (
    <div className="bg-white min-h-screen font-sans text-slate-900">
      <Navbar />

      {/* Hero Section */}
      <div className="bg-slate-50 py-20 text-center px-4">
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6">
          Powerful Features for <span className="text-blue-600">Modern Families</span>
        </h1>
        <p className="max-w-2xl mx-auto text-lg text-slate-500">
          Discover the tools designed to keep your loved ones safe and connected, no matter the distance.
        </p>
      </div>

      {/* Detailed Features List */}
      <div className="max-w-7xl mx-auto px-6 py-16 space-y-24">
        {features.map((feature, index) => (
          <div 
            key={index} 
            className={`flex flex-col md:flex-row items-center gap-12 ${index % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}
          >
            {/* Text Side */}
            <div className="flex-1 space-y-6">
              <div className={`w-14 h-14 rounded-2xl bg-${feature.color}-100 flex items-center justify-center text-${feature.color}-600`}>
                <i className={`fa-solid ${feature.icon} text-2xl`}></i>
              </div>
              <h2 className="text-3xl font-bold text-slate-800">{feature.title}</h2>
              <p className="text-lg text-slate-500 leading-relaxed">{feature.desc}</p>
              <button className={`text-${feature.color}-600 font-bold hover:underline flex items-center gap-2`}>
                Learn more <i className="fa-solid fa-arrow-right"></i>
              </button>
            </div>

            {/* Visual Side (Placeholder for Screenshot) */}
            <div className="flex-1 w-full">
              <div className={`w-full aspect-video rounded-3xl shadow-xl ${feature.imgPlaceholder} border-4 border-white flex items-center justify-center relative overflow-hidden group`}>
                <i className={`fa-solid ${feature.icon} text-9xl opacity-20 group-hover:scale-110 transition-transform duration-500`}></i>
                {/* Simulated UI Element */}
                <div className="absolute bottom-6 left-6 right-6 bg-white/90 backdrop-blur p-4 rounded-xl shadow-sm">
                    <div className="h-2 w-1/3 bg-slate-200 rounded mb-2"></div>
                    <div className="h-2 w-2/3 bg-slate-200 rounded"></div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="bg-blue-600 py-20 px-4 text-center mt-12">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to get started?</h2>
        <button className="px-8 py-4 bg-white text-blue-600 font-bold rounded-xl shadow-lg hover:bg-slate-50 transition-colors">
          Download FamilyFlow
        </button>
      </div>

      <Footer />
    </div>
  );
};

export default FeaturePage;