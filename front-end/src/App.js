import { useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import BookingForm from "./components/BookingForm";
import ForeignerTours from "./components/ForeignerTours";
import Accommodations from "./components/Accommodations";
import CarRentals from "./components/CarRentals";
import "./App.css";

/*
  App Component
  -------------
  Controls Single Page Application (SPA) navigation
  using state-based conditional rendering.
  This allows smooth transitions without page reloads.
*/

function App() {
  // State to control which "page" is currently visible (SPA navigation)
  const [page, setPage] = useState("home");

  return (
    <>
      {/* Navigation bar receives setPage to control SPA navigation */}
      <Navbar setPage={setPage} />

      {/* Conditional rendering for SPA-style navigation */}
      {page === "home" && <Hero setPage={setPage} />}

      {page === "booking" && <BookingForm />}

      {page === "tours" && <ForeignerTours />}

      {page === "accommodations" && <Accommodations />}

      {page === "cars" && <CarRentals />}
    </>
  );
}

export default App;