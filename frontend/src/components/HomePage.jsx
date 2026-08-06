import React, { useState } from 'react';
import '../HomePage.css';

const HomePage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const toggleLogin = () => {
    setIsLoggedIn(!isLoggedIn);
    setShowUserMenu(false);
  };

  const toggleUserMenu = () => {
    setShowUserMenu(!showUserMenu);
  };

  return (
    <div className="homepage-container">
      {/* Background Layer */}
      <div className="background-overlay"></div>

      {/* Navigation Bar */}
      <nav className="navbar glass">
        <div className="nav-logo">
          <div className="logo-top"><span className="dark">My</span><span className="light">Complaint</span></div>
          <div className="logo-bottom"><span className="dark">Portal</span></div>
        </div>
        
        <div className="nav-actions">
          <div className="search-container">
            <input type="text" placeholder="    Enter Pincode to Search" className="pincode-input" />
            <button className="search-btn">
              <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </button>
          </div>
          
          <ul className="nav-links">
            <li><a href="#view-post">View Post</a></li>
            <li><a href="#about">About</a></li>
          </ul>

          <div className="auth-section">
            {!isLoggedIn ? (
              <button className="login-btn" onClick={toggleLogin}>Login</button>
            ) : (
              <div className="user-profile-container">
                <button className="user-avatar-btn" onClick={toggleUserMenu}>
                  <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=80" alt="User Profile" />
                </button>
                
                {showUserMenu && (
                  <div className="user-dropdown glass">
                    <ul>
                      <li><a href="/profile"><b>Profile</b></a></li>
                      <li><a href="/settings"><b>Settings</b></a></li>
                      <li><hr /></li>
                      <li><button onClick={toggleLogin} className="logout-btn"><b>Logout</b></button></li>
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="main-content">
        <section className="hero-section">
          <h1 className="hero-title">
            Your Voice.<br />
            <span className="accent-text">Our Responsibility.</span>
          </h1>
          <button className="register-btn glass">
            Register Complaint &rarr;
          </button>
        </section>

        <section className="features-grid">
          <div className="feature-card glass">
            <div className="feature-icon">
              <svg viewBox="0 0 24 24" width="24" height="24" stroke="#3b82f6" strokeWidth="2" fill="none">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
              </svg>
            </div>
            <div className="feature-text">
              <h3>Easy to File</h3>
              <p>Register your complaint in just a few simple steps.</p>
            </div>
          </div>

          <div className="feature-card glass">
            <div className="feature-icon">
              <svg viewBox="0 0 24 24" width="24" height="24" stroke="#3b82f6" strokeWidth="2" fill="none">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="16" y1="2" x2="16" y2="6"></line>
                <line x1="8" y1="2" x2="8" y2="6"></line>
                <line x1="3" y1="10" x2="21" y2="10"></line>
              </svg>
            </div>
            <div className="feature-text">
              <h3>Track in Real-time</h3>
              <p>Stay updated with real-time status and updates.</p>
            </div>
          </div>

          <div className="feature-card glass">
            <div className="feature-icon">
              <svg viewBox="0 0 24 24" width="24" height="24" stroke="#3b82f6" strokeWidth="2" fill="none">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
              </svg>
            </div>
            <div className="feature-text">
              <h3>Transparent Process</h3>
              <p>We ensure accountability at every step.</p>
            </div>
          </div>

          <div className="feature-card glass">
            <div className="feature-icon">
              <svg viewBox="0 0 24 24" width="24" height="24" stroke="#3b82f6" strokeWidth="2" fill="none">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
              </svg>
            </div>
            <div className="feature-text">
              <h3>Better Communities</h3>
              <p>Together, let's build clean, safe & happy communities.</p>
            </div>
          </div>
        </section>
      </main>

      {/* Floating Chat Bot Icon */}
      <button className="floating-chat-btn">
        <svg viewBox="0 0 24 24" width="24" height="24" fill="white">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
      </button>
    </div>
  );
};

export default HomePage;
