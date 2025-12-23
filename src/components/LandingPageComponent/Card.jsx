import React from "react";

const Card = () => {
  // Highlights Section (3 Items)
  const items = [
    {
      title: "Family Rooms",
      desc: "Create private spaces for your family groups. Invite members with a simple secure link.",
      icon: "fa-house-chimney-window",
      color: "blue",
    },
    {
      title: "Real-time Chat",
      desc: "Instant messaging keeps everyone in the loop, no matter where they are in the world.",
      icon: "fa-comments",
      color: "amber",
    },
    {
      title: "Live Location",
      desc: "See your family's location on the map in real-time for ultimate peace of mind.",
      icon: "fa-map-location-dot",
      color: "blue",
    },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 pb-20">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {items.map((item, idx) => (
          <div key={idx} className={`group p-8 rounded-3xl bg-white border border-${item.color}-50 shadow-xl shadow-slate-200/50 hover:-translate-y-2 hover:shadow-2xl transition-all duration-300`}>
            <div className={`w-14 h-14 rounded-2xl bg-${item.color}-50 flex items-center justify-center text-${item.color}-500 mb-6 group-hover:scale-110 transition-transform`}>
              <i className={`fa-solid ${item.icon} text-2xl`}></i>
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-3">{item.title}</h3>
            <p className="text-slate-500 leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Card;