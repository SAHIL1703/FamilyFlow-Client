import React from "react";

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
        
        {/* BRANDING */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <img
              className="h-10 w-10 rounded-full border border-slate-600"
              src="/familyflow_logo_tree.jpg"
              alt="Logo"
            />
            <h1 className="text-2xl font-bold text-white">
              Family<span className="text-amber-500">Flow</span>
            </h1>
          </div>
          <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
            Keep your family connected and safe with real-time location sharing and instant messaging.
          </p>
          <div className="flex gap-4">
            {['facebook-f', 'twitter', 'instagram', 'linkedin-in'].map((social) => (
              <a key={social} href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-amber-500 hover:text-white transition-all">
                <i className={`fa-brands fa-${social}`}></i>
              </a>
            ))}
          </div>
        </div>

        {/* LINKS */}
        <div>
          <h3 className="text-lg font-bold mb-6 text-white">Product</h3>
          <ul className="space-y-3 text-slate-400 text-sm">
            {['Features', 'Pricing', 'Download', 'Integrations'].map((item) =>(
                <li key={item}><a href="#" className="hover:text-amber-500 transition-colors">{item}</a></li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-bold mb-6 text-white">Company</h3>
          <ul className="space-y-3 text-slate-400 text-sm">
            {['About Us', 'Careers', 'Blog', 'Contact'].map((item) =>(
                <li key={item}><a href="#" className="hover:text-amber-500 transition-colors">{item}</a></li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-bold mb-6 text-white">Legal</h3>
          <ul className="space-y-3 text-slate-400 text-sm">
            {['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'Security'].map((item) =>(
                <li key={item}><a href="#" className="hover:text-amber-500 transition-colors">{item}</a></li>
            ))}
          </ul>
        </div>
      </div>
      
      <div className="border-t border-slate-800 pt-8 text-center text-slate-500 text-sm">
        &copy; {new Date().getFullYear()} FamilyFlow. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;