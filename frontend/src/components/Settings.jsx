import React from 'react';
import '../Settings.css';

const SettingsPage = () => {
  return (
    <div className="settings-container">
      <div className="settings-card">
        {/* Back Button */}
        <button className="back-button" aria-label="Go back">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
        </button>

        <div className="settings-content">
          <h1 className="settings-title">Settings</h1>

          {/* Search Bar */}
          <div className="search-container">
            <input 
              type="text" 
              className="search-input" 
              placeholder="Search Settings" 
              aria-label="Search Settings"
            />
            <button className="search-button" aria-label="Search">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </button>
          </div>

          {/* Settings Options Card */}
          <div className="options-card">
            <div className="settings-item">
              <span className="item-label">Change Theme</span>
              <div className="toggle-switch"></div>
            </div>

            <div className="settings-item">
              <span className="item-label">Change Password</span>
              <div className="arrow-icon">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </div>
            </div>

            <div className="settings-item">
              <span className="item-label">Help & Support</span>
              <div className="arrow-icon">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
