import React, { useState } from "react";

const LoginPage = () => {
  // State to toggle between Login and Signup views
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen flex bg-white font-sans text-slate-900">
      
      {/* ======================= */}
      {/* LEFT SIDE: LOGIN FORM   */}
      {/* ======================= */}
      <div className="flex w-full lg:w-1/2 flex-col justify-center px-8 sm:px-12 lg:px-24 xl:px-32">
        
        {/* LOGO SECTION */}
        <div className="mb-10 flex items-center gap-3">
          <img
            className="h-10 w-10 rounded-full object-cover shadow-sm ring-2 ring-slate-100"
            src="./familyflow_logo_tree.jpg"
            alt="FamilyFlow Logo"
          />
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">
            Family <span className="text-amber-500">Flow</span>
          </h2>
        </div>

        {/* HEADING SECTION */}
        <div className="mb-8">
          <h2 className="text-3xl font-extrabold text-slate-900">
            {isLogin ? "Welcome Back" : "Create Account"}
          </h2>
          <p className="mt-2 text-sm text-slate-500">
            {isLogin 
              ? "Sign in to your account to continue" 
              : "Join us and stay connected with your family"}
          </p>
        </div>

        {/* FORM SECTION */}
        <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
          
          {/* Name Input (Only shows during Sign Up) */}
          {!isLogin && (
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Full Name
              </label>
              <div className="relative">
                {/* User Icon */}
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <svg className="h-5 w-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="John Doe"
                  className="block w-full rounded-lg border border-slate-300 bg-slate-50 p-2.5 pl-10 text-sm text-slate-900 placeholder-slate-400 focus:border-amber-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all duration-200"
                />
              </div>
            </div>
          )}

          {/* Email Input */}
          <div>
            <label htmlFor="email" className="mb-2 block text-sm font-semibold text-slate-700">
              Email
            </label>
            <div className="relative">
              {/* Email Icon */}
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <svg className="h-5 w-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <input
                id="email"
                type="email"
                placeholder="example@gmail.com"
                className="block w-full rounded-lg border border-slate-300 bg-slate-50 p-2.5 pl-10 text-sm text-slate-900 placeholder-slate-400 focus:border-amber-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all duration-200"
              />
            </div>
          </div>

          {/* Password Input */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label htmlFor="password" className="text-sm font-semibold text-slate-700">
                Password
              </label>
              {isLogin && (
                <a href="#" className="text-xs font-semibold text-amber-600 hover:text-amber-500 hover:underline">
                  Forgot Password?
                </a>
              )}
            </div>
            <div className="relative">
              {/* Lock Icon */}
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <svg className="h-5 w-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <input
                id="password"
                type="password"
                placeholder="••••••••"
                className="block w-full rounded-lg border border-slate-300 bg-slate-50 p-2.5 pl-10 text-sm text-slate-900 placeholder-slate-400 focus:border-amber-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all duration-200"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button className="w-full transform rounded-lg bg-amber-500 px-5 py-3 text-center text-sm font-bold text-white shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:bg-amber-600 hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-amber-300">
            {isLogin ? "Sign In" : "Create Account"}
          </button>
        </form>

        {/* Toggle Login/Signup */}
        <div className="mt-8 text-center text-sm text-slate-500">
          <p>
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button 
              onClick={() => setIsLogin(!isLogin)} 
              className="font-bold text-amber-600 hover:text-amber-500 hover:underline transition-colors"
            >
              {isLogin ? "Sign Up Free" : "Sign In"}
            </button>
          </p>
        </div>
      </div>

      {/* ======================= */}
      {/* RIGHT SIDE: INFO PANEL  */}
      {/* ======================= */}
      <div className="hidden lg:flex w-1/2 relative flex-col items-center justify-center bg-amber-50 text-center overflow-hidden">
        {/* Decorative background circle */}
        <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-amber-100 mix-blend-multiply opacity-70 blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-orange-100 mix-blend-multiply opacity-70 blur-3xl animate-pulse delay-1000"></div>

        <div className="relative z-10 max-w-lg px-8">
          <div className="mb-8 flex justify-center">
             {/* Larger Hero Image/Logo */}
             <img 
               src="./familyflow_logo_tree.jpg" 
               alt="FamilyFlow Hero" 
               className="h-32 w-32 rounded-full border-4 border-white shadow-xl object-cover"
             />
          </div>
          
          <h2 className="mb-4 text-4xl font-extrabold tracking-tight text-slate-900">
            Stay Connected With <br/>
            <span className="text-amber-500">Your Family</span>
          </h2>
          
          <p className="text-lg text-slate-600 leading-relaxed">
            Real-time location sharing and instant messaging for families who care. 
            Experience the peace of mind you deserve.
          </p>
        </div>
      </div>

    </div>
  );
};

export default LoginPage;