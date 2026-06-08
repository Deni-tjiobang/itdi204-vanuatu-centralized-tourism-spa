import waterMusic from "../images/water_music.jpg";

function Hero() {
  return (
    <section
      className="home"
      style={{ backgroundImage: `url(${waterMusic})` }}
    >
      <div className="overlay"></div>

      <div className="home-content">
        <h1>Vanuatu Centralized Booking System</h1>

        <p>
          Discover destinations, explore culture, and book unforgettable
          experiences across Vanuatu - all in one place.
        </p>

        <button className="main-btn">
          Enjoy Your Stay
        </button>
      </div>
    </section>
  );
}

export default Hero;