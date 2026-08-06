import React, { useState } from 'react';
import '../Mycomplaints.css';

const Mycomplaints = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('complaints');
  
  // Sample data for the grid of complaints
  const complaintsData = [
    {
      id: 1,
      image: '{{DATA:IMAGE:IMAGE_1}}',
      status: 'Pending',
      date: '26/06/2026',
      upvotes: 24,
      description: 'Potholes in my street...',
      reposts: 20
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1584467735815-f778f274e296?auto=format&fit=crop&q=80&w=400',
      status: 'Resolved',
      date: '15/05/2026',
      upvotes: 56,
      description: 'Broken street light at junction 4...',
      reposts: 12
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1599059813005-11265ba4b4ce?auto=format&fit=crop&q=80&w=400',
      status: 'In Progress',
      date: '10/06/2026',
      upvotes: 8,
      description: 'Garbage accumulation in the park...',
      reposts: 5
    },
    {
      id: 4,
      image: 'https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?auto=format&fit=crop&q=80&w=400',
      status: 'Pending',
      date: '02/07/2026',
      upvotes: 32,
      description: 'Water leakage in main pipeline...',
      reposts: 18
    }
  ];

  const handleDelete = (id) => {
    console.log('Deleting complaint:', id);
  };

  return (
    <div className="complaints-page">
      <div className="background-overlay"></div>

      {/* Left Sidebar - Consistent with Profile.jsx */}
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
            Menu
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
                onClick={() => window.location.href = '/profile'}
              >
                My Profile
              </button>
              <button 
                className={`menu-item ${activeTab === 'complaints' ? 'active' : ''}`}
                onClick={() => setActiveTab('complaints')}
              >
                My Complaints
              </button>
              <button 
                className={`menu-item ${activeTab === 'reposts' ? 'active' : ''}`}
                onClick={() => setActiveTab('reposts')}
              >
                Reposts
              </button>
            </div>
          )}
        </div>
      </aside>

      {/* Main Content */}
      <main className="main-container">
        <h1 className="page-title">My Complaints</h1>
        <div className="top-toolbar">

        <div className="search-box">

            <input
                type="text"
                placeholder="Enter Pincode"
                className="search-input"
            />

            <button className="search-btn">
                .🔍
            </button>

            <select className="search-select">
                <option>Search By</option>
                <option>Pincode</option>
                <option>Status</option>
                <option>Date</option>
            </select>

        </div>

        <div className="resolved-filter">

            <input
                type="checkbox"
                id="resolved"
            />

            <label htmlFor="resolved">
                Resolved
            </label>

        </div>

    </div>

        <div className="complaints-grid">
          {complaintsData.map((complaint) => (
            <div key={complaint.id} className="complaint-card glass">
              <div className="card-image-wrapper">
                <img src={complaint.image} alt="Complaint" className="complaint-img" />
                <button className="nav-arrow left" aria-label="Previous image">
                  <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2.5" fill="none">
                    <path d="M15 18l-6-6 6-6" />
                  </svg>
                </button>
                <button className="nav-arrow right" aria-label="Next image">
                  <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2.5" fill="none">
                    <path d="M9 18l6-6-6-6" />
                  </svg>
                </button>
              </div>

              <div className="card-content">
                <p><strong>Status:</strong> {complaint.status}</p>
                <p><strong>Date:</strong> {complaint.date}</p>
                <p><strong>Upvote:</strong> {complaint.upvotes}</p>
                <p><strong>Description:</strong> {complaint.description}</p>
                <p><strong>Reposts:</strong> {complaint.reposts}</p>
              </div>

              <div className="card-footer">
                <button 
                  className="delete-btn" 
                  onClick={() => handleDelete(complaint.id)}
                  aria-label="Delete complaint"
                >
                  <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none">
                    <polyline points="3 6 5 6 21 6"></polyline>
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                    <line x1="10" y1="11" x2="10" y2="17"></line>
                    <line x1="14" y1="11" x2="14" y2="17"></line>
                  </svg>
                </button>
                <div className="expand-indicator">
                  <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2.5" fill="none">
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Mycomplaints;
