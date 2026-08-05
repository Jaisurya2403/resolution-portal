import React from 'react';
import '../About.css';

const AboutPage = () => {
  return (
    <div className="about-container">
      <div className="about-card">
        {/* Back Button matching the top-left circle in reference */}
        <button className="back-button" aria-label="Go back">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
        </button>

        <div className="content-wrapper">
          <section className="about-section">
            <h1 className="section-title">About</h1>
            <div className="text-box">
              <p>
                <strong>MyComplaint portal</strong> is a digital grievance redressal
                platform designed to bridge the gap between citizens and
                organizations by providing a transparent, efficient, and
                user-friendly complaint management system.
              </p>
              <p>
                Our mission is to empower users to raise concerns, track
                complaint progress in real time, and receive timely
                resolutions through a streamlined process. We aim to
                enhance accountability, improve communication, and
                ensure that every grievance is addressed fairly and
                effectively.
              </p>
            </div>
          </section>

          <section className="contact-section">
            <h2 className="section-title">Contact Us:</h2>
            <div className="contact-box">
              <p><strong>Email:</strong> mycomplaintportal.gov.in</p>
              <p><strong>Ph. no:</strong> 1800-1215-1514</p>
            </div>
          </section>

          <footer className="footer-box">
            <p>© 2026 MyComplaintPortal. All Rights Reserved.</p>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
