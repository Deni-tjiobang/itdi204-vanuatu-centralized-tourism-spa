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
   "Breakas Beach Resort": breakers,
  "Erakor Island Resort": erakor,
  "Grand Hotel": grandHotel,
  "The Havannah": havannah,
  "Holiday Inn": holidayInn,
  "Melanesian Hotel": melanesian,
  "Melanesian": melanesian,
  "Melanesian Port Vila": melanesian,
  "Nasama Resort": nasama,
  "Ramada Resort": ramada,
  "Tamanu on the Beach": tamanu,
  "Warwick Le Lagon": warwick,

  "Avis Vanuatu": avis,
  "Budget Vanuatu": budget,
  "Europcar": europcar,
  "Global Drive": globaldrive,
  "Go2Rent": go2rent,
  "Hertz" : hertz,
  "OnWheel Vanuatu": onwheels,
  "On Wheels Vanuatu": onwheels,
  "On Wheels": onwheels,
  "Onwheel Vanuatu": onwheels,
  "Pacific Car Hire": pacificcarhire,
  "Santo Car Hire": santocarhire,
  "Santo Tropical": santotropical,
  "Wanderlust": wanderlust,
  "World Car Rentals": worldcarrentals,

  "Atmosphere": atmosphere,
  "Bountiful Tours": bountiful,
  "Evergreen": evergreen,
  "Lelepa Island Tour": lelepa,
  "Mystery Island Tours": mysteryisland,
  "Nature Tours": nature,
  "Offroad Adventures": offroad,
  "Paradise Tours": paradise,
  "Run Run Tea": runruntea,
  "Santo Heritage Tours": santoheritage,
  "South Pacific Tours": southpacific,
  "Vanuatu Eco Tours": vanuatuecotours,
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
  const [notification, setNotification] = useState(null);

  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({});

  const API = "http://localhost:5000";

  useEffect(() => {
    let endpoint = "/admin/users";
    if (tab === "accommodations") endpoint = "/accommodations";
    if (tab === "users") endpoint = "/admin/users";
    if (tab === "cars") endpoint = "/car-rentals";
    if (tab === "tours") endpoint = "/tours";

    fetch(`${API}${endpoint}`)
      .then((res) => {
        if (!res.ok) throw new Error("Server error");
        return res.json();
      })
      .then(setData)
      .catch(() => setData([]));
  }, [tab]);

  const filtered = data.filter((item) =>
    Object.values(item || {})
      .join(" ")
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const getImage = (item) => {
    if (!item?.name) return null;
    const key = Object.keys(imageMap).find((k) =>
      item.name.toLowerCase().includes(k.toLowerCase())
    );
    return key ? imageMap[key] : null;
  };

  /* ✅ EDIT */
  const handleEdit = (item) => {
    setEditingItem(item);
    setFormData(item);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async () => {
    if (!editingItem?.id) return;

    let endpoint = "/admin/accommodations";
    if (tab === "cars") endpoint = "/admin/car-rentals";
    if (tab === "tours") endpoint = "/admin/tours";

    try {
      const res = await fetch(`${API}${endpoint}/${editingItem.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const updated = await res.json();

      setData((prev) =>
        prev.map((item) =>
          item.id === updated.id ? updated : item
        )
      );

      setEditingItem(null);
    } catch (err) {
      console.error(err);
    }
  };

  /* ✅ DELETE */
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this item?")) return;

    let endpoint = "/admin/accommodations";
    if (tab === "cars") endpoint = "/admin/car-rentals";
    if (tab === "tours") endpoint = "/admin/tours";
    if (tab === "users") endpoint = "/admin/users";

    try {
      const res = await fetch(`${API}${endpoint}/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error("Delete failed");
      }

      setData((prev) => prev.filter((item) => item.id !== id));
      setNotification({
        type: "success",
        text: tab === "users" ? "User deleted successfully." : "Item deleted successfully.",
      });

      window.setTimeout(() => setNotification(null), 3000);
    } catch (err) {
      console.error(err);
      setNotification({ type: "error", text: "Unable to delete item." });
      window.setTimeout(() => setNotification(null), 3000);
    }
  };

  return (
    <div className="page">

      {/* ✅ STICKY HEADER (NEW BEHAVIOUR) */}
      <div className="sticky-header">

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

        {notification && (
          <div className={`notification ${notification.type}`}>
            {notification.text}
          </div>
        )}

      </div>

      {/* ✅ SCROLL AREA */}
      <div className="page-content">

        <div className="card-grid">
          {filtered.map((item, index) => {
            const imgSrc = tab === "users" ? null : getImage(item);

            return (
              <div key={item.id || index} className="card">

                {/* ✅ IMAGE */}
                {imgSrc && (
                  <img src={imgSrc} className="logo" alt="logo" />
                )}

                <h3>{item.name || item.email}</h3>

                {item.location && <p className="meta">{item.location}</p>}
                {item.services && <p>{item.services}</p>}
                {item.description && <p>{item.description}</p>}

                <div className="contact">
                  {item.email && <p>Email: {item.email}</p>}
                  {item.phone && <p>Phone: {item.phone}</p>}
                </div>

                {/* ✅ ADMIN ACTIONS */}
                <div className="admin-actions">
                  {tab !== "users" && (
                    <button
                      className="profile-btn"
                      onClick={() => handleEdit(item)}
                    >
                      Edit
                    </button>
                  )}
                  <button
                    className="admin-delete"
                    onClick={() => handleDelete(item.id)}
                  >
                    Delete
                  </button>
                </div>

              </div>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <p className="admin-empty">No data found.</p>
        )}

      </div>

      {/* ✅ EDIT MODAL (UNCHANGED BUT KEPT) */}
      {editingItem && (
        <div className="modal-overlay">
          <div className="modal-box">

            <h3>Edit Item</h3>

            <input
              name="name"
              value={formData.name || ""}
              onChange={handleChange}
              placeholder="Name"
            />

            <input
              name="location"
              value={formData.location || ""}
              onChange={handleChange}
              placeholder="Location"
            />

            <textarea
              name="description"
              value={formData.description || ""}
              onChange={handleChange}
              placeholder="Description"
            />

            <div className="modal-actions">
              <button onClick={handleSave}>Save Changes</button>
              <button onClick={() => setEditingItem(null)}>Cancel</button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}

export default AdminDashboard;