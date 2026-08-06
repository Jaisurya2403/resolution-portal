import React, { useState, useRef } from 'react';
import '../Profile.css';

const Profile = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');
  const [profileImage, setProfileImage] = useState(null);
  
  const [userData, setUserData] = useState({
    name: 'John Doe',
    phone: '+1 234 567 8900',
    location: 'New York, USA',
    email: 'john.doe@example.com'
  }); 

  const fileInputRef = useRef(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData(prev => ({ ...prev, [name]: value }));
  };

  const handleAvatarClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="profile-page">
      <div className="background-overlay"></div>

      {/* Left Sidebar */}
      <aside className="sidebar">
        <button className="home-btn" aria-label="Go home">
          <svg viewBox="0 0 24 24" width="24" height="24" stroke="#1e293b" strokeWidth="2" fill="none">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
            <polyline points="9 22 9 12 15 12 15 22"></polyline>
          </svg>
        </button>

        <div className="menu-container">
          <button 
            className="menu-toggle" 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            
            <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none">
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          </button>

          {isMenuOpen && (
            <div className="menu-list">
              <button
  className={`menu-item ${activeTab === 'profile' ? 'active' : ''}`}
  onClick={() => {
    setActiveTab('profile');
    setIsMenuOpen(false);
  }}
>
  My Profile
</button>

<button
  className={`menu-item ${activeTab === 'complaints' ? 'active' : ''}`}
  onClick={() => {
    setActiveTab('complaints');
    setIsMenuOpen(false);
  }}
>
  My Complaints
</button>

<button
  className={`menu-item ${activeTab === 'reposts' ? 'active' : ''}`}
  onClick={() => {
    setActiveTab('reposts');
    setIsMenuOpen(false);
  }}
>
  Reposts
</button>
            </div>
          )}
        </div>
      </aside>

      {/* Main Content */}
      <main className="main-container">
        <div className="profile-card glass">
          <button 
            className="edit-btn" 
            onClick={() => setIsEditing(!isEditing)}
          >
            {isEditing ? 'Save' : 'Edit'}
          </button>

          <h1 className="card-title">Profile</h1>

          <div className="avatar-container" onClick={handleAvatarClick}>
            <input 
              type="file" 
              ref={fileInputRef} 
              style={{ display: 'none' }} 
              accept="image/*"
              onChange={handleFileChange}
            />
            {profileImage ? (
              <img src={profileImage} alt="User Avatar" className="avatar-img" />
            ) : (
              <div className="avatar-placeholder">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                </svg>
              </div>
            )}
          </div>

          <form className="profile-form" onSubmit={(e) => e.preventDefault()}>
            <div className="form-row">
              <label>Name:</label>
              <div className="input-container">
                <input 
                  type="text" 
                  name="name"
                  value={userData.name}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="glass-input"
                />
              </div>
            </div>

            <div className="form-row">
              <label>Phone:</label>
              <div className="input-container">
                <input 
                  type="text" 
                  name="phone"
                  value={userData.phone}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="glass-input"
                />
              </div>
            </div>

            <div className="form-row">
              <label>Location:</label>
              <div className="input-container">
                <input 
                  type="text" 
                  name="location"
                  value={userData.location}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="glass-input"
                />
              </div>
            </div>

            <div className="email-actions">
              <button type="button" className="change-email-btn">Change email</button>
            </div>
            
            <div className="form-row">
              <label>Email:</label>
              <div className="input-container">
                <input 
                  type="email" 
                  name="email"
                  value={userData.email}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="glass-input"
                />
              </div>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default Profile;