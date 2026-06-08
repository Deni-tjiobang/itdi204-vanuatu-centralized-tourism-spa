import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import ForeignerTours from "./components/ForeignerTours";
import Accommodations from "./components/Accommodations";
import CarRentals from "./components/CarRentals";
import AuthModal from "./components/AuthModal";
import WelcomeScreen from "./components/WelcomeScreen";
import Profile from "./components/Profile";
import AdminLogin from "./components/AdminLogin";
import AdminSignup from "./components/AdminSignup";
import AdminDashboard from "./components/AdminDashboard";
import "./App.css";

function App() {
  const [page, setPage] = useState("home");
  const [user, setUser] = useState(null);
  const [authMode, setAuthMode] = useState("login");
  const [showAuth, setShowAuth] = useState(false);

  const [screen, setScreen] = useState("welcome");
  const [manager, setManager] = useState(null);

  // Restore user session
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));

    const storedManager = localStorage.getItem("manager");
    if (storedManager) {
      setManager(JSON.parse(storedManager));
      setScreen("adminDashboard");
    }
  }, []);

  // ✅ WELCOME SCREEN
  if (screen === "welcome") {
    return (
      <WelcomeScreen
       onTourist={() => setScreen("userAuth")}
        onAdmin={() => setScreen("adminLogin")}
      />
    );
  }

  // ✅ USER LOGIN / SIGNUP SCREEN
if (screen === "userAuth") {
  return (
    <div className="auth-container">
      <AuthModal
        show={true}
        mode={authMode}
        setMode={setAuthMode}
        onAuthSuccess={(userData) => {
          localStorage.setItem("user", JSON.stringify(userData));
          setUser(userData);
          setScreen("app"); // ✅ ONLY after login
        }}
      />
    </div>
  );
}

  // ✅ ADMIN LOGIN
 if (screen === "adminLogin") {
  return (
    <AdminLogin
      onAuthSuccess={(data) => {
        localStorage.setItem("manager", JSON.stringify(data));
        setManager(data);
        setScreen("adminDashboard");
      }}
      onBack={() => setScreen("welcome")}
      onGoToSignup={() => setScreen("adminSignup")}
    />
  );
}

  // ✅ ADMIN SIGNUP
if (screen === "adminSignup") {
  return (
    <AdminSignup
      onBack={() => setScreen("adminLogin")}
      onAuthSuccess={(data) => {
        setManager(data);
        setScreen("adminDashboard");
      }}
    />
  );
}

  // ✅ ADMIN DASHBOARD
  if (screen === "adminDashboard" && manager) {
    return (
      <AdminDashboard
        manager={manager}
        onLogout={() => {
          localStorage.removeItem("manager");
          setManager(null);
          setScreen("welcome");
        }}
      />
    );
  }

  // ✅ TOURIST APP
  if (screen === "app") {
    return (
      <>
        <Navbar
          setPage={setPage}
          onLoginClick={() => {
            setAuthMode("login");
            setShowAuth(true);
          }}
        />

        {page === "home" && <Hero setPage={setPage} />}
        {page === "tours" && <ForeignerTours />}
        {page === "accommodations" && <Accommodations />}
        {page === "cars" && <CarRentals />}
        {page === "profile" && user && <Profile user={user} />}

        {/* ✅ AUTH MODAL */}
        {showAuth && (
          <div className="auth-container">
            <AuthModal
              show={true}
              mode={authMode}
              setMode={setAuthMode}
              onAuthSuccess={(userData) => {
                localStorage.setItem("user", JSON.stringify(userData));
                setUser(userData);
                setShowAuth(false);
              }}
            />
          </div>
        )}
      </>
    );
  }

  return null;
}

export default App;
