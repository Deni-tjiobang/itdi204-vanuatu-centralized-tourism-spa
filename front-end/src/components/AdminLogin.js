import { useState } from "react";
import { FaEnvelope, FaLock, FaEye, FaArrowLeft } from "react-icons/fa";

function AdminLogin({ onAuthSuccess, onBack, onGoToSignup   }) {
    
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Please enter both email and password");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/admin-login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (data.manager) {
        localStorage.setItem("manager", JSON.stringify(data.manager));
        onAuthSuccess(data.manager);
      } else {
        alert(data.error || "Login failed");
      }
    } catch (err) {
      console.error(err);
      alert("Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <img src="/main_logo.png" className="auth-logo" alt="logo" />

        <h2>Manager Login</h2>
        <p className="auth-sub">Vanuatu Tourism Department</p>

        <div className="auth-body">
          <div className="auth-form">
            <div className="input-box">
              <FaEnvelope className="input-icon" />
              <input
                type="email"
                placeholder="Manager email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="input-box">
              <FaLock className="input-icon" />
              <input
                type={show ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <FaEye className="eye-icon" onClick={() => setShow(!show)} />
            </div>
          </div>

          <button onClick={handleLogin} disabled={loading}>
            {loading ? "Logging in..." : "Login →"}
          </button>

          <p className="auth-switch">
            New manager? <span onClick={onGoToSignup}>Register here</span>
          </p>

          <div className="spacer"></div>

          <p className="auth-switch">
            <span onClick={onBack} style={{ cursor: "pointer" }}>
              <FaArrowLeft style={{ marginRight: "6px" }} />
              Back to Welcome
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;
