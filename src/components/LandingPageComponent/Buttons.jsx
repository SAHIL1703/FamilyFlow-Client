import React from "react";
import { Link } from "react-router-dom";

const Buttons = () => {
  return (
    <div className="flex flex-col sm:flex-row justify-center items-center gap-4 px-4 mb-20">
      <Link to="/auth" className="w-full sm:w-auto px-8 py-3.5 bg-blue-600 text-white font-bold rounded-xl shadow-xl shadow-blue-200 hover:bg-blue-700 hover:-translate-y-1 transition-all flex items-center justify-center gap-2">
        Start for Free
        <i className="fa-solid fa-arrow-right"></i>
      </Link>

      <button className="w-full sm:w-auto px-8 py-3.5 bg-white border-2 border-slate-200 text-slate-700 font-bold rounded-xl hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600 transition-all">
        See How It Works
      </button>
    </div>
  );
};

export default Buttons;