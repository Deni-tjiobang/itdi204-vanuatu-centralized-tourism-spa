import { useState } from "react";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaKey,
  FaBriefcase,
  FaEye,
  FaArrowLeft,
} from "react-icons/fa";

function AdminSignup({ onBack, onAuthSuccess }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [department, setDepartment] = useState("");
  const [secretKey, setSecretKey] = useState("");
  const [show, setShow] = useState(false);
  const [showKey, setShowKey] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSignup = async () => {
    if (!name || !email || !password || !secretKey) {
      alert("Please fill in all required fields");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/admin-signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, department, secretKey }),
      });

      const data = await res.json();

      if (data.manager) {
  localStorage.setItem("manager", JSON.stringify(data.manager));

  onAuthSuccess(data.manager);
} else {
        alert(data.error || "Invalid secret key or signup failed");
      }
    } catch (err) {
      console.error(err);
      alert("Server error");
    } finally {
      setLoading(false);
    }
  };
  <>
    <p className="auth-sub">
      Vanuatu Tourism Department — Authorised Staff Only
    </p>
    <p style={{ fontSize: "12px", color: "#888" }}>
      You must enter a valid registration key to create a manager account.
    </p>
  </>;
  if (success) {
    return (
      <div className="auth-container">
        <div className="auth-card">
          <img src="/main_logo.png" className="auth-logo" alt="logo" />
          <h2>Account Created!</h2>
          <p className="auth-sub">
            Your manager account has been set up successfully.
          </p>
          <div style={{ marginTop: "24px" }}>
            <button onClick={onBack}>Go to Manager Login →</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <img src="/main_logo.png" className="auth-logo" alt="logo" />

        <h2>Manager Registration</h2>
        <p className="auth-sub">
          Vanuatu Tourism Department - Authorised Staff Only
        </p>

        <div className="auth-body">
          {/* NAME */}
          <div className="input-box">
            <FaUser className="input-icon" />
            <input
              placeholder="Full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          {/* EMAIL */}
          <div className="input-box">
            <FaEnvelope className="input-icon" />
            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* DEPARTMENT */}
          <div className="input-box">
            <FaBriefcase className="input-icon" />
            <input
              placeholder="Department (e.g. Tourism Board)"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
            />
          </div>

          {/* PASSWORD */}
          <div className="input-box">
            <FaLock className="input-icon" />
            <input
              type={show ? "text" : "password"}
              placeholder="Create password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <FaEye className="eye-icon" onClick={() => setShow(!show)} />
          </div>

          {/* SECRET KEY */}
          <div className="input-box">
            <FaKey className="input-icon" />
            <input
              type={showKey ? "text" : "password"}
              placeholder="Secret registration key"
              value={secretKey}
              onChange={(e) => setSecretKey(e.target.value)}
            />
            <FaEye className="eye-icon" onClick={() => setShowKey(!showKey)} />
          </div>

          <button onClick={handleSignup} disabled={loading}>
            {loading ? "Creating account..." : "Create Manager Account →"}
          </button>

          <div className="spacer"></div>

          <p className="auth-switch">
            <span onClick={onBack} style={{ cursor: "pointer" }}>
              <FaArrowLeft style={{ marginRight: "6px" }} />
              Back
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default AdminSignup;
