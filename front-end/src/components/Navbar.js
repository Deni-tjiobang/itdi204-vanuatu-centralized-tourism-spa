import { useState, useEffect } from "react";
import { FaUser, FaBars, FaTimes } from "react-icons/fa";

function Navbar({ setPage }) {
  const [user, setUser] = useState(null);
  const [active, setActive] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);

  const goTo = (page) => {
    setPage(page);
    setActive(page);
    setMenuOpen(false);
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
        <ul className="nav-links desktop">
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

        <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>

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

      {menuOpen && (
        <>
          <div className="menu-overlay" onClick={() => setMenuOpen(false)} />
          <div className="side-menu">
            <div className="menu-profile">
              <div className="menu-avatar">
                <FaUser />
              </div>
              <p>{user ? user.name : "Guest"}</p>
            </div>
            <ul>
              <li onClick={() => goTo("home")}>Home</li>
              <li onClick={() => goTo("tours")}>Tour Operators</li>
              <li onClick={() => goTo("accommodations")}>Accommodations</li>
              <li onClick={() => goTo("cars")}>Car Rentals</li>
            </ul>
            <button className="nav-btn" onClick={() => goTo(user ? "profile" : "login")}>{user ? "Profile" : "Sign In"}</button>
          </div>
        </>
      )}
    </div>
  );
}

export default Navbar;