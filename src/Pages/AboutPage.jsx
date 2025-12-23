import React from "react";
import Navbar from "../components/LandingPageComponent/Navbar";
import Footer from "../components/LandingPageComponent/Footer";

const AboutPage = () => {
  return (
    <div className="bg-white min-h-screen font-sans">
      <Navbar />

      {/* Hero */}
      <div className="relative py-24 bg-slate-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-blue-600/20 z-0"></div>
        <div className="relative z-10 max-w-4xl mx-auto text-center px-6">
          <p className="text-amber-500 font-bold tracking-widest uppercase mb-4">Our Mission</p>
          <h1 className="text-4xl md:text-6xl font-extrabold mb-8 leading-tight">
            Bridging distances, <br /> strengthening bonds.
          </h1>
          <p className="text-xl text-slate-300 leading-relaxed">
            We believe that technology should bring families closer together, providing peace of mind without compromising privacy.
          </p>
        </div>
      </div>

      {/* Story Section */}
      <div className="max-w-5xl mx-auto px-6 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
             <img 
               src="https://images.unsplash.com/photo-1511895426328-dc8714191300?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
               alt="Family walking" 
               className="rounded-3xl shadow-2xl"
             />
          </div>
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-slate-800">Why we built FamilyFlow</h2>
            <p className="text-slate-600 leading-relaxed">
              In a world that is increasingly digital, it's ironic that families often feel more disconnected. We noticed that existing tracking apps were either too intrusive, difficult to use, or lacked the warmth of genuine connection.
            </p>
            <p className="text-slate-600 leading-relaxed">
              We set out to build a platform that feels less like a surveillance tool and more like a digital living room—a place where you check in because you care, not because you have to.
            </p>
          </div>
        </div>
      </div>

      {/* Values Grid */}
      <div className="bg-slate-50 py-20">
        <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-16">
                <h2 className="text-3xl font-bold text-slate-800">Our Core Values</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
                {[
                    { icon: "fa-lock", title: "Privacy First", text: "Your location data is yours alone. We use end-to-end encryption and never sell your data." },
                    { icon: "fa-heart", title: "Empathy", text: "We design for humans, understanding that family dynamics are complex and require sensitivity." },
                    { icon: "fa-shield-halved", title: "Reliability", text: "When it comes to safety, accuracy matters. We strive for 99.9% uptime and precision." }
                ].map((val, i) => (
                    <div key={i} className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 text-center hover:-translate-y-2 transition-transform duration-300">
                        <div className="w-16 h-16 mx-auto bg-blue-50 rounded-full flex items-center justify-center text-blue-600 mb-6">
                            <i className={`fa-solid ${val.icon} text-2xl`}></i>
                        </div>
                        <h3 className="text-xl font-bold text-slate-800 mb-3">{val.title}</h3>
                        <p className="text-slate-500">{val.text}</p>
                    </div>
                ))}
            </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default AboutPage;