import { useState } from "react";

/*
  Navbar Component
  ----------------
  Provides SPA navigation by updating the page state
  without triggering a browser reload.
*/

function Navbar({ setPage }) {
  const [open, setOpen] = useState(false);

  // Navigate to selected page and close mobile menu
  const goTo = (pageName) => {
    setPage(pageName);
    setOpen(false);
  };

  return (
    <>
      <nav className="navbar">
        {/* Desktop navigation */}
        <ul className="nav-links desktop">
          <li onClick={() => goTo("home")}>Home</li>
          <li onClick={() => goTo("tours")}>Foreigner Tours</li>
          <li onClick={() => goTo("accommodations")}>Accommodations</li>
          <li onClick={() => goTo("cars")}>Car Rentals</li>
        </ul>

        {/* Mobile hamburger button */}
        <div className="hamburger" onClick={() => setOpen(true)}>
          ☰
        </div>
      </nav>

      {/* Full-screen mobile menu */}
      {open && (
        <div className="menu-overlay">
          <div className="close-btn" onClick={() => setOpen(false)}>
            ✕
          </div>

          <ul className="overlay-menu">
            <li onClick={() => goTo("home")}>Home</li>
            <li onClick={() => goTo("destinations")}>Destinations</li>
            <li onClick={() => goTo("tours")}>Foreigner Tours</li>
            <li onClick={() => goTo("accommodations")}>Accommodations</li>
            <li onClick={() => goTo("cars")}>Car Rentals</li>
          </ul>
        </div>
      )}
    </>
  );
}

export default Navbar;