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
  Menu,
  X,
} from "lucide-react";
import "../HomePage.css";
import homeBg from "../assets/homeBg.jpeg"

/**
 * HomePage
 * -------
 * Landing page for "My Complaint Portal".
 * Plain CSS version — no Tailwind required. Pair with HomePage.css.
 *
 * Props:
 * - isLoggedIn (bool)      : controls Login button vs Profile avatar+dropdown
 * - onLoginClick (fn)      : called when "Login" is clicked (logged-out state)
 * - onNavigate (fn(path))  : called with 'view-post' | 'about' | 'register' |
 *                            'profile' | 'settings' | 'logout'
 * - backgroundImageUrl     : swap in your own hero background image
 */
export default function HomePage({
  isLoggedIn: isLoggedInProp,
  onLoginClick,
  onNavigate,
  backgroundImageUrl,
}) {
  const [internalLoggedIn, setInternalLoggedIn] = useState(false);
  const isLoggedIn =
    typeof isLoggedInProp === "boolean" ? isLoggedInProp : internalLoggedIn;

  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  // Mobile hamburger panel (View Post / About / Login / pincode search)
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    function handleClickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close the mobile panel automatically if the viewport is resized back up
  useEffect(() => {
    function handleResize() {
      if (window.innerWidth > 640) setMobileOpen(false);
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleNavigate = (path) => {
    setMenuOpen(false);
    setMobileOpen(false);
    if (onNavigate) onNavigate(path);
    else console.log("navigate ->", path);
  };

  const handleLogin = () => {
    setMobileOpen(false);
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
      className="mcp-page"
      style={{
        backgroundImage: `url(${
          homeBg
        })`,
      }}
    >
      <div className="mcp-overlay" />

      <div className="mcp-container">
        {/* ---------------- NAVBAR ---------------- */}
        <nav className="mcp-navbar">
          <button
            onClick={() => handleNavigate("home")}
            className="mcp-logo"
          >
            <span className="mcp-logo-line1">
              My<span className="mcp-logo-accent">Complaint</span>
            </span>
            <span className="mcp-logo-line2">Portal</span>
          </button>

          <div className="mcp-search-group">
            <div className="mcp-pincode">
              <input type="text" placeholder="Enter Pincode" />
            </div>
            <button aria-label="Search" className="mcp-icon-btn">
              <Search size={16} />
            </button>
          </div>

          <div className="mcp-nav-right">
            <button
              onClick={() => handleNavigate("view-post")}
              className="mcp-nav-link mcp-desktop-only"
            >
              View Post
            </button>

            <button
              onClick={() => handleNavigate("about")}
              className="mcp-nav-link mcp-desktop-only"
            >
              About
            </button>

            {!isLoggedIn ? (
              <button
                onClick={handleLogin}
                className="mcp-nav-link mcp-desktop-only"
              >
                Login
              </button>
            ) : (
              <div className="mcp-profile-wrap mcp-desktop-only" ref={menuRef}>
                <button
                  onClick={() => setMenuOpen((o) => !o)}
                  aria-haspopup="true"
                  aria-expanded={menuOpen}
                  className="mcp-avatar-btn"
                >
                  <User size={18} />
                </button>

                {menuOpen && (
                  <div className="mcp-dropdown">
                    <button
                      className="mcp-dropdown-item"
                      onClick={() => handleNavigate("profile")}
                    >
                      <User size={15} /> Profile
                    </button>
                    <button
                      className="mcp-dropdown-item"
                      onClick={() => handleNavigate("settings")}
                    >
                      <Settings size={15} /> Settings
                    </button>
                    <button
                      className="mcp-dropdown-item mcp-dropdown-danger"
                      onClick={handleLogout}
                    >
                      <LogOut size={15} /> Logout
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Hamburger — mobile only */}
            <button
              aria-label="Menu"
              aria-expanded={mobileOpen}
              className="mcp-hamburger"
              onClick={() => setMobileOpen((o) => !o)}
            >
              {mobileOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </nav>

        {/* Reserves the vertical space the fixed navbar occupies so content
            below doesn't slide underneath it */}
        <div className="mcp-navbar-spacer" />

        {/* ---------------- MOBILE PANEL ---------------- */}
        {mobileOpen && (
          <div className="mcp-mobile-panel">
            <button
              className="mcp-mobile-link"
              onClick={() => handleNavigate("view-post")}
            >
              View Post
            </button>
            <button
              className="mcp-mobile-link"
              onClick={() => handleNavigate("about")}
            >
              About
            </button>

            <div className="mcp-mobile-divider" />

            {!isLoggedIn ? (
              <button className="mcp-mobile-login" onClick={handleLogin}>
                <User size={16} /> Login
              </button>
            ) : (
              <>
                <button
                  className="mcp-mobile-link"
                  onClick={() => handleNavigate("profile")}
                >
                  <User size={15} /> Profile
                </button>
                <button
                  className="mcp-mobile-link"
                  onClick={() => handleNavigate("settings")}
                >
                  <Settings size={15} /> Settings
                </button>
                <button
                  className="mcp-mobile-link mcp-mobile-danger"
                  onClick={handleLogout}
                >
                  <LogOut size={15} /> Logout
                </button>
              </>
            )}
          </div>
        )}

        {/* ---------------- HERO ---------------- */}
        <div className="mcp-hero">
          <h1 className="mcp-hero-line1">Your Voice.</h1>
          <h1 className="mcp-hero-line2">Our Responsibility.</h1>

          <button
            onClick={() => handleNavigate("register")}
            className="mcp-cta"
          >
            Register Complaint
            <ArrowRight size={18} />
          </button>
        </div>

        {/* ---------------- FEATURE STRIP ---------------- */}
        <div className="mcp-features">
          {features.map((f, i) => (
            <div className="mcp-feature" key={f.title}>
              <div className="mcp-feature-icon">
                <f.icon size={18} />
              </div>
              <div>
                <p className="mcp-feature-title">{f.title}</p>
                <p className="mcp-feature-desc">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {typeof isLoggedInProp !== "boolean" && (
        <button
          onClick={() => setInternalLoggedIn((v) => !v)}
          className="mcp-demo-toggle"
        >
          Demo: {isLoggedIn ? "Logged in" : "Logged out"} (toggle)
        </button>
      )}
    </div>
  );
}
