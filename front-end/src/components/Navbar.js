import { useState, useEffect } from "react";
import {
  FaUserCircle,
  FaHome,
  FaMapMarkedAlt,
  FaHotel,
  FaCar,
  FaSignOutAlt
} from "react-icons/fa";

function Navbar({ setPage }) {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [profileOpen, setProfileOpen] = useState(false);

  const goTo = (pageName) => {
    setPage(pageName);
    setOpen(false);
  };

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) setUser(JSON.parse(stored));
  }, []);

  useEffect(() => {
    const handleClick = () => setProfileOpen(false);
    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.reload();
  };

  return (
    <>
      {/* NAVBAR */}
      <nav className="navbar">
        <ul className="nav-links desktop">
          <li onClick={() => goTo("home")}>Home</li>
          <li onClick={() => goTo("tours")}>Tour Operators</li>
          <li onClick={() => goTo("accommodations")}>Accommodations</li>
          <li onClick={() => goTo("cars")}>Car Rentals</li>

          {/* ✅ PROFILE (DESKTOP) */}
          {user && (
            <li className="profile-section">
              <div
                className="profile-icon"
                onClick={(e) => {
                  e.stopPropagation();
                  setProfileOpen(!profileOpen);
                }}
              >
                <FaUserCircle />
              </div>

              {profileOpen && (
                <div className="profile-dropdown">
                  <p>Welcome, {user.name}</p>

                  {/* ✅ NEW: GO TO PROFILE */}
                  <p
                    className="profile-link"
                    onClick={() => {
                      setProfileOpen(false);
                      goTo("profile");
                    }}
                  >
                    View Profile
                  </p>

                  <button onClick={handleLogout}>Logout</button>
                </div>
              )}
            </li>
          )}
        </ul>

        {/* HAMBURGER */}
        <div className="hamburger" onClick={() => setOpen(true)}>
          ☰
        </div>
      </nav>

      {/* ✅ MOBILE SIDE MENU */}
      {open && (
        <div className="menu-overlay">
          <div className="side-menu">

            {/* PROFILE HEADER */}
            {user && (
              <div className="menu-profile">
                <FaUserCircle className="menu-avatar" />
                <p>{user.name}</p>
              </div>
            )}

            {/* NAV ITEMS */}
            <ul>
              <li onClick={() => goTo("home")}>
                <FaHome className="menu-icon" />
                <span>Home</span>
              </li>

              <li onClick={() => goTo("tours")}>
                <FaMapMarkedAlt className="menu-icon" />
                <span>Tour Operators</span>
              </li>

              <li onClick={() => goTo("accommodations")}>
                <FaHotel className="menu-icon" />
                <span>Accommodations</span>
              </li>

              <li onClick={() => goTo("cars")}>
                <FaCar className="menu-icon" />
                <span>Car Rentals</span>
              </li>

              {/* ✅ NEW: PROFILE PAGE IN MOBILE */}
              {user && (
                <li onClick={() => goTo("profile")}>
                  <FaUserCircle className="menu-icon" />
                  <span>Profile</span>
                </li>
              )}

              {/* LOGOUT */}
              {user && (
                <li onClick={handleLogout} className="logout">
                  <FaSignOutAlt className="menu-icon" />
                  <span>Logout</span>
                </li>
              )}
            </ul>

          </div>
        </div>
      )}
    </>
  );
}

export default Navbar;