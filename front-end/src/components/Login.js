import { useState } from "react";
import { FaEnvelope, FaLock, FaEye } from "react-icons/fa";

function Login({ onAuthSuccess, setMode }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);

  const handleLogin = async () => {

    if (!email || !password) {
      alert("Please enter both email and password");
      return;
    }

    try {
      const res = await fetch("${process.env.REACT_APP_API_URL}/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (data.error) {
        if (data.error.includes("deleted")) {
          alert("Your account has been removed by an administrator.");
        } else {
          alert(data.error);
        }
        return;
      }

      if (data.user) {
        onAuthSuccess(data.user);
        return;
      }

      alert("Login failed");

    } catch (err) {
      console.error(err);
      alert("Server error");
    }
  };

  return (
    <div className="auth-card">

      <img src="/main_logo.png" className="auth-logo" alt="logo" />

      <h2>Welcome Back!</h2>
      <p className="auth-sub">Login to your account</p>

      <div className="auth-body">

        <div className="auth-form">

          <div className="input-box">
            <FaEnvelope className="input-icon" />
            <input
              type="email"
              placeholder="Email address"
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

        <button onClick={handleLogin}>Login →</button>

        <div className="spacer"></div>

        <p className="auth-switch">
          Don't have an account?{" "}
          <span onClick={() => setMode("signup")}>
            Sign Up
          </span>
        </p>

      </div>

    </div>
  );
}

export default Login;