import { useState, useEffect } from "react";
import { FaUser } from "react-icons/fa";

function Navbar({ setPage }) {
  const [user, setUser] = useState(null);
  const [active, setActive] = useState("home");

  const goTo = (page) => {
    setPage(page);
    setActive(page);
  };

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) setUser(JSON.parse(stored));
  }, []);

  return (
    <div className="nav-wrapper">
      <nav className="navbar">
        {/* LEFT LOGO */}
        <div className="nav-logo" onClick={() => goTo("home") }>
          <img src="/main_logo.png" alt="logo" />
          <div>
            <h3>Vanuatu Centralized</h3>
            <span>Booking System</span>
          </div>
        </div>

        {/* CENTER LINKS */}
        <ul className="nav-links">
          <li
            className={active === "home" ? "active" : ""}
            onClick={() => goTo("home")}
          >
            Home
          </li>
          <li
            className={active === "tours" ? "active" : ""}
            onClick={() => goTo("tours")}
          >
            Tour Operators
          </li>
          <li
            className={active === "accommodations" ? "active" : ""}
            onClick={() => goTo("accommodations")}
          >
            Accommodations
          </li>
          <li
            className={active === "cars" ? "active" : ""}
            onClick={() => goTo("cars")}
          >
            Car Rentals
          </li>
        </ul>

        {/* RIGHT BUTTON */}
        <div className="nav-right">
          {user ? (
            <button className="nav-btn" onClick={() => goTo("profile")}>
              <FaUser /> Profile
            </button>
          ) : (
            <button className="nav-btn" onClick={() => goTo("login")}>
              Sign In
            </button>
          )}
        </div>
      </nav>
      
    </div>
  );
}

export default Navbar;