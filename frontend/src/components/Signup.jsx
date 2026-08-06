import React, { useState } from 'react';
import '../Signup.css';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');

  const handleBack = () => {
    console.log('Navigate back');
  };

  const handleResendOTP = () => {
    console.log('Resending OTP to:', email);
  };

  const handleSignIn = () => {
    console.log('Navigate to Sign In');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Sign Up verification logic with:', { email, otp });
  };

  return (
    <div className="signup-page">
      {/* Background with Illustration/Character */}
      <div className="signup-background">
        
      </div>

      <button className="back-button" onClick={handleBack} aria-label="Go back">
        <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none">
          <path d="M19 12H5M12 19l-7-7 7-7" />
        </svg>
      </button>

      <div className="signup-container">
        <div className="signup-card glass">
          <h1 className="signup-title">Verify Email</h1>
          
          <form className="signup-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Enter Email:</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required 
                className="glass-input" 
              />
              <p className="account-prompt">
                already have account? <span className="link-text" onClick={handleSignIn}>Sign-in</span>
              </p>
            </div>

            <div className="form-group">
              <label>Enter OTP</label>
              <input 
                type="text" 
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required 
                className="glass-input" 
              />
            </div>

            <button type="button" className="resend-btn" onClick={handleResendOTP}>
              Resend OTP
            </button>

            <button type="submit" className="signup-submit-btn">
              Sign up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
