import { useState } from "react";
import avis from "../images/car_logos/avisvanuatu.png";
import budget from "../images/car_logos/budgetvanuatu.png";
import europcar from "../images/car_logos/europcar.jpg";
import globaldrive from "../images/car_logos/globaldrive.jpg";
import go2rent from "../images/car_logos/go2rent.png";
import hertz from "../images/car_logos/hertz.png";
import onwheels from "../images/car_logos/onwheelsvanuatu.png";
import pacificcarhire from "../images/car_logos/pacificcarhire.png";
import santocarhire from "../images/car_logos/santocarhire.png";
import santotropical from "../images/car_logos/santotropicalcar.jpg";
import wanderlust from "../images/car_logos/wanderlust.png";
import worldcar from "../images/car_logos/worldcarrentals.jpg";

function CarRentals() {
  const [search, setSearch] = useState("");

  const rentals = [
    {
      name: "World Car Rentals Vanuatu",
      location: "Port Vila, Efate",
      services: "Compact cars, SUVs, 4WDs, airport transfers",
      address: "Kumul Highway, Nambatu Area, Port Vila",
      phone: "+678 26515",
      email: "bookings@vanuaturentalcars.com",
      website: "http://www.vanuaturentalcars.com",
      logo: worldcar
    },
    {
      name: "Europcar Vanuatu",
      location: "Port Vila, Efate",
      services: "Daily & long-term rentals, airport pickup",
      address: "Port Vila, Efate",
      phone: "+678 26517",
      email: "europcar@vanuatu.com.vu",
      website: "http://www.europcar.vu",
      logo: europcar
    },
    {
      name: "Avis Vanuatu",
      location: "Port Vila, Efate",
      services: "Economy cars, SUVs, 4WD vehicles",
      address: "Kumul Highway, Port Vila",
      phone: "+678 35335 / +678 22497",
      email: "",
      website: "https://avisvanuatu.com",
      logo: avis
    },
    {
      name: "Hertz Car Rental",
      location: "Port Vila, Efate",
      services: "Short & long-term rentals",
      address: "Lini Highway, Port Vila",
      phone: "+678 22468",
      email: "",
      website: "https://www.hertz.com",
      logo: hertz
    },
    {
      name: "Budget Vanuatu",
      location: "Port Vila, Efate",
      services: "Car and truck rentals",
      address: "Tagabe Area, Port Vila",
      phone: "+678 25444",
      email: "",
      website: "http://www.rentalcarsvanuatu.com",
      logo: budget
    },
    {
      name: "On Wheels Vanuatu",
      location: "Port Vila, Efate",
      services: "Cars, quad bikes, scooters",
      address: "Lini Highway, Port Vila",
      phone: "+678 7771646",
      email: "",
      website: "https://bookmevanuatu.com",
      logo: onwheels
    },
    {
      name: "Go2Rent",
      location: "Port Vila, Efate",
      services: "Small cars, SUVs",
      address: "Kumul Highway, Nambatu",
      phone: "+678 7771646",
      email: "",
      website: "http://go2rent.com.vu",
      logo: go2rent
    },
    {
      name: "GLOBAL DRIVE CAR RENTALS",
      location: "Port Vila, Efate",
      services: "SUVs, 4WD vehicles",
      address: "Kumul Highway, Port Vila",
      phone: "+678 5273180",
      email: "",
      website: "https://www.globaldrivecarrentals.com",
      logo: globaldrive
    },
    {
      name: "Santo Tropical Car Rentals",
      location: "Luganville, Santo",
      services: "Airport delivery, local tours",
      address: "Luganville, Santo",
      phone: "+678 5634918",
      email: "santotropicalrental@gmail.com",
      website: "https://www.santorentalcars.com",
      logo: santotropical
    },
    {
      name: "Pacific Car Hire",
      location: "Luganville, Santo",
      services: "Toyota Hilux 4WD rentals",
      address: "Cook Street, Luganville",
      phone: "+678 36036",
      email: "santoislandcarrental@gmail.com",
      website: "https://pacificcarhire.com",
      logo: pacificcarhire
    },
    {
      name: "Santo Car Hire",
      location: "Luganville, Santo",
      services: "Budget rentals, SUVs, dual-cab vehicles",
      address: "Luganville",
      phone: "+678 7770888 / +678 5550888",
      email: "santocarhire@gmail.com",
      website: "https://carhire.vu",
      logo: santocarhire
    },
    {
      name: "Wanderlust Rental & Tours",
      location: "Luganville, Santo",
      services: "4WDs, SUVs, tour services",
      address: "Luganville, Santo",
      phone: "+678 7658547",
      email: "info@wanderlust.vu",
      website: "https://wanderlust.vu",
      logo: wanderlust
    }
  ];

  const filtered = rentals.filter(r =>
    `${r.name} ${r.location} ${r.services}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="page accommodations-page">
      <div className="page-header">
        <h1>Car Rentals</h1>
        <p>Compare trusted car rental companies across Vanuatu.</p>
      </div>

      <div className="search-box">
        <input
          type="text"
          placeholder="Search car rentals…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="card-grid">
        {filtered.map((r, i) => (
          <div key={i} className="accommodation-card enhanced">
            {/* LOGO */}
            <div className="logo-box">
              <img src={r.logo} alt={`${r.name} logo`} />
            </div>

            <div className="accommodation-content">
              <h3>{r.name}</h3>
              <p className="meta">{r.location}</p>
              <p>{r.services}</p>

              <div className="contact-section">
                <p><span className="icon">📍</span>{r.address}</p>
                <p><span className="icon">📞</span>{r.phone}</p>

                {r.email && (
                  <p>
                    <span className="icon">✉️</span>
                    <a href={`mailto:${r.email}`}>{r.email}</a>
                  </p>
                )}

                <p>
                  <span className="icon">🌐</span>
                  <a href={r.website} target="_blank" rel="noopener noreferrer">
                    Visit official site
                  </a>
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CarRentals;
