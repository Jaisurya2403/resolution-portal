import React from 'react';
import '../Login.css';

const Login = () => {
  const handleForgotPassword = () => {
    // Navigation to Forgot Password page
    console.log('Navigate to Forgot Password');
  };

  const handleSignUp = () => {
    // Navigation to Sign Up page
    console.log('Navigate to Sign Up');
  };

  const handleAdminLogin = () => {
    console.log('Navigate to Admin Login');
  };

  const handleBack = () => {
    console.log('Navigate back');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Sign In logic');
  };

  return (
    <div className="login-page">
      {/* Background with Character */}
      <div className="login-background">
        
      </div>

      <button className="back-button" onClick={handleBack}>
        <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none">
          <path d="M19 12H5M12 19l-7-7 7-7" />
        </svg>
      </button>

      <div className="login-container">
        <div className="login-card glass">
          <h1 className="login-title">Welcome Back!</h1>
          
          <form className="login-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Enter Email:</label>
              <input type="email" required className="glass-input" />
            </div>

            <div className="form-group">
              <label>Enter Password:</label>
              <input type="password" required className="glass-input" />
            </div>

            <button type="button" className="forgot-link" onClick={handleForgotPassword}>
              Forgot Password
            </button>

            <button type="submit" className="signin-btn">
              Sign in
            </button>
          </form>

          <div className="login-footer">
            <p>New User? <span className="link-text" onClick={handleSignUp}>Sign up</span></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
