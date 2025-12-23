import React from "react";

const FeatureGrid = () => {
  const features = [
    { icon: "fa-house", title: "Family Rooms", desc: "Create multiple rooms for immediate family or relatives.", color: "blue" },
    { icon: "fa-user-plus", title: "Easy Invites", desc: "Share a simple link to add members instantly.", color: "amber" },
    { icon: "fa-comments", title: "Group Chat", desc: "Send messages and photos to keep everyone informed.", color: "blue" },
    { icon: "fa-map", title: "Live Map View", desc: "Know where everyone is at a single glance.", color: "amber" },
    { icon: "fa-bell", title: "Smart Alerts", desc: "Get notified when family arrives at important places.", color: "blue" },
    { icon: "fa-lock", title: "Private & Secure", desc: "End-to-end encryption ensures your data stays safe.", color: "amber" },
    { icon: "fa-mobile-screen", title: "Works Everywhere", desc: "Access from phone, tablet, or desktop seamlessly.", color: "blue" },
    { icon: "fa-clock-rotate-left", title: "Location History", desc: "Review where family members have been today.", color: "amber" },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4 max-w-7xl mx-auto">
      {features.map((f, i) => (
        <div key={i} className="group bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-slate-100">
          <div className={`w-12 h-12 rounded-xl bg-${f.color}-50 flex items-center justify-center text-${f.color}-500 mb-4 group-hover:bg-${f.color}-100 transition-colors`}>
            <i className={`fa-solid ${f.icon} text-xl`}></i>
          </div>
          <h3 className="text-lg font-bold text-slate-800 mb-2">{f.title}</h3>
          <p className="text-sm text-slate-500 leading-relaxed">{f.desc}</p>
        </div>
      ))}
    </div>
  );
};

export default FeatureGrid;