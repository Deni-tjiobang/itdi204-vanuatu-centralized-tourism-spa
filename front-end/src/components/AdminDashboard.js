import { useState, useEffect } from "react";

/* ACCOMMODATION IMAGES */
import breakers from "../images/acclogo/breakers.jpg";
import erakor from "../images/acclogo/erakor.jpg";
import grandHotel from "../images/acclogo/grand_hotel.jpg";
import havannah from "../images/acclogo/havannah.jpg";
import holidayInn from "../images/acclogo/holiday_inn.jpg";
import melanesian from "../images/acclogo/melanesian.jpg";
import nasama from "../images/acclogo/nasama.jpg";
import ramada from "../images/acclogo/ramada.png";
import tamanu from "../images/acclogo/tamanu.jpg";
import warwick from "../images/acclogo/warwick.png";

/* CAR LOGOS */
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
import worldcarrentals from "../images/car_logos/worldcarrentals.jpg";

/* TOUR LOGOS */
import atmosphere from "../images/logos/atmosphere.jpg";
import bountiful from "../images/logos/bountifultours.jpg";
import evergreen from "../images/logos/evergreen.png";
import lelepa from "../images/logos/lelepaislandtour.png";
import mysteryisland from "../images/logos/mysteryislandtours.webp";
import nature from "../images/logos/naturetours.webp";
import offroad from "../images/logos/offroadadventures.jpg";
import paradise from "../images/logos/paradisetours.jpg";
import runruntea from "../images/logos/rarrurentapaorivercascadetour.jpg";
import santoheritage from "../images/logos/santoheritagetours.jpg";
import southpacific from "../images/logos/southpacifictours.jpg";
import vanuatuecotours from "../images/logos/vanuatuecotours.png";
import vilaHope from "../images/logos/vilahope.png";
import waterMusic from "../images/water_music.jpg";

const imageMap = {
  // accommodations
  "Breakers Resort": breakers,
  "Breakers": breakers,
  "Breakas Resort": breakers,
  "Breakas": breakers,
  "Erakor Island Resort": erakor,
  "Grand Hotel": grandHotel,
  "The Havannah": havannah,
  "Holiday Inn": holidayInn,
  "Melanesian Hotel": melanesian,
  "Melanesian": melanesian,
  "Nasama Resort": nasama,
  "Ramada Resort": ramada,
  "Tamanu Beach": tamanu,
  "Tamanu": tamanu,
  "Warwick Le Lagon": warwick,

  // cars
  "Avis Vanuatu": avis,
  "Budget Vanuatu": budget,
  Europcar: europcar,
  "Global Drive": globaldrive,
  "Go2Rent": go2rent,
  Hertz: hertz,
  "OnWheel Vanuatu": onwheels,
  "On Wheels Vanuatu": onwheels,
  "On Wheels": onwheels,
  "Onwheel Vanuatu": onwheels,
  "Pacific Car Hire": pacificcarhire,
  "Santo Car Hire": santocarhire,
  "Santo Tropical": santotropical,
  Wanderlust: wanderlust,
  "World Car Rentals": worldcarrentals,

  // tours
  Atmosphere: atmosphere,
  "Bountiful Tours": bountiful,
  Evergreen: evergreen,
  "Lelepa Island Tour": lelepa,
  "Mystery Island Tours": mysteryisland,
  "Nature Tours": nature,
  "Offroad Adventures": offroad,
  "Paradise Tours": paradise,
  "Run Run Tea": runruntea,
  "Santo Heritage Tours": santoheritage,
  "South Pacific Tours": southpacific,
  "Vanuatu Eco Tours": vanuatuecotours,
  "VanuatuEcoTours": vanuatuecotours,
  "Vanuatu Eco": vanuatuecotours,
  "Vila Hope": vilaHope,
  "Water Music": waterMusic,
  "Off Road Adventures": offroad,
  "Rarru Rentapao": runruntea,
};

function AdminDashboard({ manager, onLogout }) {
  const [tab, setTab] = useState("users");
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");

  const API = "http://localhost:5000";

  useEffect(() => {
    let endpoint = "/admin/users";
    if (tab === "accommodations") endpoint = "/accommodations";
    if (tab === "cars") endpoint = "/car-rentals";
    if (tab === "tours") endpoint = "/tours";

    fetch(`${API}${endpoint}`)
      .then((res) => {
        if (!res.ok) throw new Error("Server returned error");
        return res.json();
      })
      .then((resData) => setData(resData))
      .catch((err) => {
        console.error("Fetch error:", err.message);
        setData([]);
      });
  }, [tab]);

  const filtered = Array.isArray(data)
    ? data.filter((item) =>
        Object.values(item || {})
          .join(" ")
          .toLowerCase()
          .includes(search.toLowerCase())
      )
    : [];

  const getImage = (item) => {
    if (!item || !item.name) return null;
    const key = Object.keys(imageMap).find((k) =>
      item.name.toLowerCase().includes(k.toLowerCase())
    );
    return key ? imageMap[key] : null;
  };

  return (
    <div className="page">
      <div className="admin-header">
        <h1>Admin Dashboard</h1>
        <p>Welcome back, {manager?.name}</p>
        <button className="profile-btn" onClick={onLogout}>
          Logout
        </button>
      </div>

      <div className="admin-tabs">
        {["users", "accommodations", "cars", "tours"].map((t) => (
          <button
            key={t}
            className={`admin-tab-btn ${tab === t ? "active" : ""}`}
            onClick={() => setTab(t)}
          >
            {t.toUpperCase()}
          </button>
        ))}
      </div>

      <div className="search-box">
        <input
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="card-grid">
        {filtered.map((item, index) => {
          const imgSrc = tab === "users" ? null : getImage(item);
          return (
            <div key={item.id || item.email || index} className="card">
              {imgSrc && <img src={imgSrc} className="logo" alt={item.name || "logo"} />}

              <h3>{item.name || item.email}</h3>

              {item.location && <p className="meta">{item.location}</p>}
              {item.services && <p>{item.services}</p>}
              {item.description && <p>{item.description}</p>}

              <div className="contact">
                {item.email && <p>Email: {item.email}</p>}
                {item.phone && <p>Phone: {item.phone}</p>}
              </div>

              <div className="admin-actions">
                <button className="profile-btn">Edit</button>
                <button className="admin-delete">Delete</button>
              </div>
            </div>
          );
        })}
      </div>

      {filtered.length === 0 && <p className="admin-empty">No data found.</p>}
    </div>
  );
}

export default AdminDashboard;
