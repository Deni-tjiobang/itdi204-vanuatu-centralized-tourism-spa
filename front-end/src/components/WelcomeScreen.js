import React from "react";

function WelcomeScreen({ onTourist, onAdmin }) {
  return (
    <div className="welcome-screen">
      <div className="welcome-content">

        <img
          src="/main_logo.png"
          alt="Vanuatu Logo"
          className="welcome-logo"
        />

        <p className="welcome-small">Welcome to</p>

        <h1 className="welcome-title">
          Vanuatu Centralized Booking System
        </h1>

        <div className="welcome-divider"></div>

        <p className="welcome-text">
          Choose how you want to enter the system
        </p>

        {/* TOURIST BUTTON */}
        <button className="start-btn" onClick={onTourist}>
          Continue as Tourist →
        </button>

        {/* ADMIN BUTTON */}
        <button className="manager-btn" onClick={onAdmin}>
          Continue as Admin →
        </button>

      </div>
    </div>
  );
}

export default WelcomeScreen;