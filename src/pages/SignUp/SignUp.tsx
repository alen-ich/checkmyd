import React from 'react';
import './SignUp.css';

const SignUp: React.FC = () => {
  const handleSubmitterClick = () => {
    console.log('Become a Submitter clicked');
    // Add navigation or action logic here
  };

  const handleRaterClick = () => {
    console.log('Become a Rater clicked');
    // Add navigation or action logic here
  };

  const handleTermsClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    console.log('Terms of Service & Privacy Policy clicked');
    // Add navigation or action logic here
  };

  return (
    <div className="signup-container">
      {/* Header */}
      <header className="signup-header">
        <div className="app-logo">
          <div className="camera-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="3" y="6" width="18" height="12" rx="2" stroke="currentColor" strokeWidth="2" fill="none"/>
              <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" fill="none"/>
              <path d="M9 6V4C9 3.44772 9.44772 3 10 3H14C14.5523 3 15 3.44772 15 4V6" stroke="currentColor" strokeWidth="2" fill="none"/>
            </svg>
          </div>
          <h1 className="app-name">AnonLens</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="signup-main">
        {/* Submitter Card */}
        <div className="role-card">
          <h2 className="role-title">I want feedback (Submitter)</h2>
          <p className="role-description">
            Share your photos and get honest ratings and reviews from our community of raters.
          </p>
          <button className="role-button" onClick={handleSubmitterClick}>
            Become a Submitter
          </button>
        </div>

        {/* Rater Card */}
        <div className="role-card">
          <h2 className="role-title">I want to rate (Rater)</h2>
          <p className="role-description">
            Lend your discerning eye to photos from others and earn rewards for your valuable feedback.
          </p>
          <button className="role-button" onClick={handleRaterClick}>
            Become a Rater
          </button>
        </div>
      </main>

      {/* Footer */}
      <footer className="signup-footer">
        <p className="age-restriction">18+ only</p>
        <a href="#" className="terms-link" onClick={handleTermsClick}>
          Terms of Service & Privacy Policy
        </a>
      </footer>
    </div>
  );
};

export default SignUp;

