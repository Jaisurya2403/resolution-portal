import React, { useState, useRef, useEffect } from "react";
import {
  Search,
  ArrowRight,
  PenLine,
  ClipboardCheck,
  ShieldCheck,
  Users,
  User,
  Settings,
  LogOut,
  ChevronDown,
} from "lucide-react";

/**
 * HomePage
 * -------
 * Landing page for "My Complaint Portal".
 *
 * Props:
 * - isLoggedIn (bool)      : controls Login button vs Profile avatar+dropdown
 * - onLoginClick (fn)      : called when "Login" is clicked (logged-out state)
 * - onNavigate (fn(path))  : called with 'view-post' | 'about' | 'register' |
 *                            'profile' | 'settings' | 'logout'
 * - backgroundImageUrl     : swap in your own hero background image
 *
 * Wire onNavigate to react-router's useNavigate (or your router of choice):
 *   const navigate = useNavigate();
 *   <HomePage onNavigate={(path) => navigate(`/${path}`)} ... />
 */
export default function HomePage({
  isLoggedIn: isLoggedInProp,
  onLoginClick,
  onNavigate,
  backgroundImageUrl,
}) {
  // Internal fallback state so this component is drop-in demoable.
  // If you pass `isLoggedIn` as a prop, this internal state is ignored.
  const [internalLoggedIn, setInternalLoggedIn] = useState(false);
  const isLoggedIn =
    typeof isLoggedInProp === "boolean" ? isLoggedInProp : internalLoggedIn;

  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleNavigate = (path) => {
    setMenuOpen(false);
    if (onNavigate) onNavigate(path);
    else console.log("navigate ->", path);
  };

  const handleLogin = () => {
    if (onLoginClick) onLoginClick();
    else console.log("navigate -> login");
    if (typeof isLoggedInProp !== "boolean") setInternalLoggedIn(true);
  };

  const handleLogout = () => {
    handleNavigate("logout");
    if (typeof isLoggedInProp !== "boolean") setInternalLoggedIn(false);
  };

  const features = [
    {
      icon: PenLine,
      title: "Easy to File",
      desc: "Register your complaint in just a few simple steps.",
    },
    {
      icon: ClipboardCheck,
      title: "Track in Real-time",
      desc: "Stay updated with real-time status and updates.",
    },
    {
      icon: ShieldCheck,
      title: "Transparent Process",
      desc: "We ensure accountability at every step.",
    },
    {
      icon: Users,
      title: "Better Communities",
      desc: "Together, let's build clean, safe & happy communities.",
    },
  ];

  return (
    <div
      className="relative w-full min-h-screen overflow-hidden bg-cover bg-center font-sans"
      style={{
        backgroundImage: `url(${
          backgroundImageUrl ||
          "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?q=80&w=1600&auto=format&fit=crop"
        })`,
      }}
    >
      {/* soft light wash so glass panels stay readable over any photo */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-white/10 to-white/30 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 pt-6">
        {/* ---------------- NAVBAR ---------------- */}
        <nav className="flex items-center justify-between gap-3 bg-white/40 backdrop-blur-xl border border-white/60 shadow-[0_8px_32px_rgba(31,38,135,0.15)] rounded-full px-4 sm:px-6 py-3">
          {/* Logo */}
          <button
            onClick={() => handleNavigate("home")}
            className="flex flex-col items-start leading-[1.05] shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-md"
          >
            <span className="text-lg sm:text-xl font-black tracking-tight text-slate-900">
              My<span className="text-blue-600">Complaint</span>
            </span>
            <span className="text-lg sm:text-xl font-black tracking-tight text-slate-900 -mt-1">
              Portal
            </span>
          </button>

          {/* Pincode search — hidden on very small screens */}
          <div className="hidden sm:flex items-center flex-1 max-w-xs bg-white/60 border border-white/70 rounded-full px-4 py-2 mx-2">
            <input
              type="text"
              placeholder="Enter Pincode"
              className="bg-transparent outline-none text-sm text-slate-700 placeholder:text-slate-500 w-full"
            />
          </div>

          {/* Right side */}
          <div className="flex items-center gap-2 sm:gap-4 shrink-0">
            <button
              aria-label="Search"
              className="w-9 h-9 flex items-center justify-center rounded-full bg-white/60 border border-white/70 hover:bg-white/80 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
            >
              <Search size={16} className="text-slate-700" />
            </button>

            <button
              onClick={() => handleNavigate("view-post")}
              className="hidden md:inline text-sm font-semibold text-slate-800 hover:text-blue-600 transition-colors"
            >
              View Post
            </button>

            <button
              onClick={() => handleNavigate("about")}
              className="hidden md:inline text-sm font-semibold text-slate-800 hover:text-blue-600 transition-colors"
            >
              About
            </button>

            {!isLoggedIn ? (
              <button
                onClick={handleLogin}
                className="text-sm font-semibold text-slate-800 hover:text-blue-600 transition-colors"
              >
                Login
              </button>
            ) : (
              <div className="relative" ref={menuRef}>
                <button
                  onClick={() => setMenuOpen((o) => !o)}
                  aria-haspopup="true"
                  aria-expanded={menuOpen}
                  className="w-9 h-9 flex items-center justify-center rounded-full bg-white/70 border border-white/80 hover:bg-white/90 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                >
                  <User size={18} className="text-slate-700" />
                </button>

                {menuOpen && (
                  <div className="absolute right-0 mt-3 w-44 bg-white/50 backdrop-blur-xl border border-white/60 shadow-[0_8px_32px_rgba(31,38,135,0.2)] rounded-2xl py-2 overflow-hidden animate-[fadeIn_0.15s_ease-out]">
                    <MenuItem
                      icon={User}
                      label="Profile"
                      onClick={() => handleNavigate("profile")}
                    />
                    <MenuItem
                      icon={Settings}
                      label="Settings"
                      onClick={() => handleNavigate("settings")}
                    />
                    <MenuItem
                      icon={LogOut}
                      label="Logout"
                      onClick={handleLogout}
                      danger
                    />
                  </div>
                )}
              </div>
            )}
          </div>
        </nav>

        {/* ---------------- HERO ---------------- */}
        <div className="mt-16 sm:mt-24 max-w-xl">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-slate-900 leading-[1.05]">
            Your Voice.
          </h1>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-blue-600 leading-[1.05] mt-1">
            Our Responsibility.
          </h1>

          <button
            onClick={() => handleNavigate("register")}
            className="group mt-8 inline-flex items-center gap-2 bg-white/60 hover:bg-white/80 backdrop-blur-xl border border-slate-900/80 text-slate-900 font-bold text-sm sm:text-base rounded-full pl-6 pr-5 py-3 shadow-[0_8px_24px_rgba(0,0,0,0.12)] transition-all hover:shadow-[0_10px_30px_rgba(0,0,0,0.18)] hover:-translate-y-0.5"
          >
            Register Complaint
            <ArrowRight
              size={18}
              className="transition-transform group-hover:translate-x-1"
            />
          </button>
        </div>

        {/* ---------------- FEATURE STRIP ---------------- */}
        <div className="mt-16 sm:mt-24 mb-10">
          <div className="bg-white/45 backdrop-blur-xl border border-white/60 shadow-[0_8px_32px_rgba(31,38,135,0.12)] rounded-3xl px-6 sm:px-8 py-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-4">
            {features.map((f, i) => (
              <div
                key={f.title}
                className={`flex items-start gap-3 ${
                  i !== 0 ? "lg:pl-4 lg:border-l lg:border-slate-900/10" : ""
                }`}
              >
                <div className="w-10 h-10 shrink-0 rounded-full bg-white/70 border border-white/80 flex items-center justify-center">
                  <f.icon size={18} className="text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-900">{f.title}</p>
                  <p className="text-xs text-slate-600 mt-0.5 leading-snug">
                    {f.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Dev-only helper so you can preview both states without wiring auth.
          Safe to delete once real auth state drives `isLoggedIn`. */}
      {typeof isLoggedInProp !== "boolean" && (
        <button
          onClick={() => setInternalLoggedIn((v) => !v)}
          className="fixed bottom-4 left-4 z-20 text-[11px] font-semibold px-3 py-1.5 rounded-full bg-slate-900/80 text-white/90 hover:bg-slate-900 backdrop-blur-sm border border-dashed border-white/40"
        >
          Demo: {isLoggedIn ? "Logged in" : "Logged out"} (toggle)
        </button>
      )}
    </div>
  );
}

function MenuItem({ icon: Icon, label, onClick, danger }) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-2.5 px-4 py-2.5 text-sm font-medium text-left transition-colors ${
        danger
          ? "text-red-600 hover:bg-red-50/60"
          : "text-slate-800 hover:bg-white/60"
      }`}
    >
      <Icon size={15} />
      {label}
    </button>
  );
}
