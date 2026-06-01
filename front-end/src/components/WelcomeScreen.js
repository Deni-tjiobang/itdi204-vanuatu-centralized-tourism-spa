function WelcomeScreen({ onStart }) {
  return (
    <div className="welcome-screen">

      <div className="welcome-content">

        {/* ✅ LARGE LOGO */}
        <img src="/main_logo.png" className="welcome-logo" alt="logo" />

        {/* ✅ TEXT */}
        <h4 className="welcome-small">Welcome to</h4>

        <h1 className="welcome-title">Vanuatu Centralized Booking System</h1>

        {/* ✅ DECORATIVE LINE */}
        <div className="welcome-divider"></div>

        <p className="welcome-text">
          Your gateway to unforgettable experiences in Vanuatu.
        </p>

        {/* ✅ BUTTON */}
        <button className="start-btn" onClick={onStart}>
          Enter Platform →
        </button>

      </div>

    </div>
  );
}

export default WelcomeScreen;
