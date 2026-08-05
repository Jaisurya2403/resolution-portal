import React from 'react';
import '../signup2.css';

const Signup2 = () => {
  return (
    <div className="signup-container">
      <div className="signup-card">
        {/* Back Button matching the top-left circle in reference */}
        <button className="back-button" aria-label="Go back">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
        </button>

        {/* Left Side: Illustration from the image */}
        <div className="illustration-container">
          <img 
            src="{{DATA:IMAGE:IMAGE_1}}" 
            alt="Welcome character" 
            className="character-image" 
          />
        </div>

        {/* Right Side: Form content */}
        <div className="form-section">
          <h1 className="welcome-text">WELCOME !!!</h1>
          
          <form className="signup-form" onSubmit={(e) => e.preventDefault()}>
            <div className="form-group">
              <label htmlFor="name">Name:</label>
              <input type="text" id="name" name="name" className="form-input" placeholder="" />
            </div>

            <div className="form-group">
              <label htmlFor="phone">Phone:</label>
              <input type="tel" id="phone" name="phone" className="form-input" placeholder="" />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password:</label>
              <input type="password" id="password" name="password" className="form-input" placeholder="" />
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password:</label>
              <input type="password" id="confirmPassword" name="confirmPassword" className="form-input" placeholder="" />
            </div>

            <div className="checkbox-group">
              <input type="checkbox" id="terms" name="terms" className="form-checkbox" />
              <label htmlFor="terms">I accept the Terms & Conditions.</label>
            </div>

            <button type="submit" className="submit-button">Create Account</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup2;