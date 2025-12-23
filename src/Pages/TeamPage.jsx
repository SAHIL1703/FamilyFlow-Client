import React from "react";
import Navbar from "../components/LandingPageComponent/Navbar";
import Footer from "../components/LandingPageComponent/Footer";

const TeamPage = () => {
  const teamMembers = [
    { name: "Sarah Jenkins", role: "CEO & Co-Founder", img: "https://i.pravatar.cc/300?img=5", bio: "Former safety engineer obsessed with bringing families closer." },
    { name: "David Chen", role: "CTO", img: "https://i.pravatar.cc/300?img=11", bio: "Full-stack wizard ensuring our maps are real-time, all the time." },
    { name: "Emily Ross", role: "Head of Design", img: "https://i.pravatar.cc/300?img=9", bio: "Believes that safety apps should be beautiful and easy to use." },
    { name: "Michael Okonjo", role: "Lead Developer", img: "https://i.pravatar.cc/300?img=8", bio: "Specialist in geolocation services and battery optimization." },
    { name: "Anita Patel", role: "Community Manager", img: "https://i.pravatar.cc/300?img=20", bio: "The voice behind our support and community outreach." },
    { name: "James Wilson", role: "Security Specialist", img: "https://i.pravatar.cc/300?img=33", bio: "Ensures your data remains encrypted and private." },
  ];

  return (
    <div className="bg-white min-h-screen font-sans">
      <Navbar />

      {/* Header */}
      <div className="pt-20 pb-12 text-center px-4 max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6">
          Meet the <span className="text-amber-500">Family</span> Behind FamilyFlow
        </h1>
        <p className="text-xl text-slate-500">
          We are a diverse group of parents, engineers, and designers passionate about family safety.
        </p>
      </div>

      {/* Team Grid */}
      <div className="max-w-7xl mx-auto px-6 pb-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <div key={index} className="group bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300">
              {/* Image Header */}
              <div className="h-32 bg-gradient-to-r from-blue-500 to-indigo-600 relative">
                 <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2">
                    <img 
                        src={member.img} 
                        alt={member.name} 
                        className="w-24 h-24 rounded-full border-4 border-white object-cover shadow-md"
                    />
                 </div>
              </div>
              
              {/* Content */}
              <div className="pt-16 pb-8 px-6 text-center">
                <h3 className="text-xl font-bold text-slate-900">{member.name}</h3>
                <p className="text-amber-600 font-medium text-sm mb-4">{member.role}</p>
                <p className="text-slate-500 text-sm leading-relaxed mb-6">"{member.bio}"</p>
                
                {/* Social Icons */}
                <div className="flex justify-center gap-4">
                    <button className="text-slate-400 hover:text-blue-600 transition-colors"><i className="fa-brands fa-linkedin text-xl"></i></button>
                    <button className="text-slate-400 hover:text-sky-500 transition-colors"><i className="fa-brands fa-twitter text-xl"></i></button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Hiring CTA */}
      <div className="bg-slate-50 border-t border-slate-200 py-16 text-center">
         <h2 className="text-2xl font-bold text-slate-800 mb-4">Want to join the team?</h2>
         <p className="text-slate-500 mb-8">We are always looking for talented individuals to join our mission.</p>
         <button className="px-6 py-3 border-2 border-slate-800 text-slate-800 font-bold rounded-full hover:bg-slate-800 hover:text-white transition-all">
            View Open Positions
         </button>
      </div>

      <Footer />
    </div>
  );
};

export default TeamPage;