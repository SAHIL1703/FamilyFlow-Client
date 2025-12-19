import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const LoginPage = () => {
  const baseURI = "http://localhost:3000";

  const { login, user, loading } = useContext(AppContext);

  // UI State
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // UX State
  const [error, setError] = useState("");
  const [formLoading, setFormLoading] = useState(false);

  const navigate = useNavigate();

  // -------------------------
  // HANDLE FORM SUBMIT
  // -------------------------
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setFormLoading(true);

    try {
      const url = isLogin
        ? `${baseURI}/api/auth/login`
        : `${baseURI}/api/auth/register`;

      const payload = isLogin
        ? { email, password }
        : { username, email, password };

      const { data } = await axios.post(url, payload);

      await login(data.token); // wait for user to be set
      toast.success("All Set");
    } catch (err) {
      const msg = err.response?.data?.message || "Something went wrong";
      setError(msg);
      toast.error(msg);
    } finally {
      setFormLoading(false);
    }
  };

  // -------------------------
  // REDIRECT AFTER LOGIN
  // -------------------------
  useEffect(() => {
    if (!loading && user) {
      navigate("/app-dashboard");
    }
  }, [user, loading, navigate]);

  return (
    <div className="min-h-screen flex bg-white font-sans text-slate-900">
      {/* ======================= */}
      {/* LEFT SIDE: LOGIN FORM   */}
      {/* ======================= */}
      <div className="flex w-full lg:w-1/2 flex-col justify-center px-8 sm:px-12 lg:px-24 xl:px-32">
        {/* LOGO */}
        <div className="mb-10 flex items-center gap-3">
          <img
            className="h-10 w-10 rounded-full object-cover shadow-sm ring-2 ring-slate-100"
            src="./familyflow_logo_tree.jpg"
            alt="FamilyFlow Logo"
          />
          <h2 className="text-2xl font-bold tracking-tight">
            Family <span className="text-amber-500">Flow</span>
          </h2>
        </div>

        {/* HEADING */}
        <div className="mb-8">
          <h2 className="text-3xl font-extrabold">
            {isLogin ? "Welcome Back" : "Create Account"}
          </h2>
          <p className="mt-2 text-sm text-slate-500">
            {isLogin
              ? "Sign in to your account to continue"
              : "Join us and stay connected with your family"}
          </p>
        </div>

        {/* ERROR */}
        {error && (
          <div className="mb-4 rounded-lg bg-red-100 px-4 py-3 text-sm text-red-700 border border-red-300">
            {error}
          </div>
        )}

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {!isLogin && (
            <input
              required
              type="text"
              placeholder="Full Name"
              onChange={(e) => setUsername(e.target.value)}
              className="w-full rounded-lg border border-slate-300 p-2.5"
            />
          )}

          <input
            required
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-lg border border-slate-300 p-2.5"
          />

          <input
            required
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-lg border border-slate-300 p-2.5"
          />

          <button
            disabled={formLoading}
            className={`w-full rounded-lg px-5 py-3 text-sm font-bold text-white transition
              ${
                formLoading
                  ? "bg-amber-300 cursor-not-allowed"
                  : "bg-amber-500 hover:bg-amber-600"
              }
            `}
          >
            {formLoading
              ? "Please wait..."
              : isLogin
              ? "Sign In"
              : "Create Account"}
          </button>
        </form>

        {/* TOGGLE */}
        <div className="mt-8 text-center text-sm text-slate-500">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="font-bold text-amber-600 hover:underline"
          >
            {isLogin ? "Sign Up" : "Sign In"}
          </button>
        </div>
      </div>

      {/* ======================= */}
      {/* RIGHT SIDE INFO PANEL   */}
      {/* ======================= */}
      <div className="hidden lg:flex w-1/2 items-center justify-center bg-amber-50">
        <h2 className="text-4xl font-extrabold">
          Stay Connected With <span className="text-amber-500">Your Family</span>
        </h2>
      </div>
    </div>
  );
};

export default LoginPage;
