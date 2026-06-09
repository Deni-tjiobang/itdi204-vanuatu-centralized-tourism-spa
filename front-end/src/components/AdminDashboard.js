import { useState, useEffect, useRef } from "react";
import {
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaGlobe,
  FaEdit,
  FaTrashAlt,
  FaPlus,
  FaUpload,
  FaTimes,
  FaSignOutAlt,
} from "react-icons/fa";

/* ── ACCOMMODATION IMAGES ── */
import breakers      from "../images/acclogo/breakers.jpg";
import erakor        from "../images/acclogo/erakor.jpg";
import grandHotel    from "../images/acclogo/grand_hotel.jpg";
import havannah      from "../images/acclogo/havannah.jpg";
import holidayInn    from "../images/acclogo/holiday_inn.jpg";
import melanesian    from "../images/acclogo/melanesian.jpg";
import nasama        from "../images/acclogo/nasama.jpg";
import ramada        from "../images/acclogo/ramada.png";
import tamanu        from "../images/acclogo/tamanu.jpg";
import warwick       from "../images/acclogo/warwick.png";

/* ── CAR LOGOS ── */
import avis            from "../images/car_logos/avisvanuatu.png";
import budget          from "../images/car_logos/budgetvanuatu.png";
import europcar        from "../images/car_logos/europcar.jpg";
import globaldrive     from "../images/car_logos/globaldrive.jpg";
import go2rent         from "../images/car_logos/go2rent.png";
import hertz           from "../images/car_logos/hertz.png";
import onwheels        from "../images/car_logos/onwheelsvanuatu.png";
import pacificcarhire  from "../images/car_logos/pacificcarhire.png";
import santocarhire    from "../images/car_logos/santocarhire.png";
import santotropical   from "../images/car_logos/santotropicalcar.jpg";
import wanderlust      from "../images/car_logos/wanderlust.png";
import worldcarrentals from "../images/car_logos/worldcarrentals.jpg";

/* ── TOUR LOGOS ── */
import atmosphere    from "../images/logos/atmosphere.jpg";
import bountiful     from "../images/logos/bountifultours.jpg";
import evergreen     from "../images/logos/evergreen.png";
import lelepa        from "../images/logos/lelepaislandtour.png";
import mysteryisland from "../images/logos/mysteryislandtours.webp";
import nature        from "../images/logos/naturetours.webp";
import offroad       from "../images/logos/offroadadventures.jpg";
import paradise      from "../images/logos/paradisetours.jpg";
import runruntea     from "../images/logos/rarrurentapaorivercascadetour.jpg";
import santoheritage from "../images/logos/santoheritagetours.jpg";
import southpacific  from "../images/logos/southpacifictours.jpg";
import vanuatuecotours from "../images/logos/vanuatuecotours.png";
import vilaHope      from "../images/logos/vilahope.png";
import waterMusic    from "../images/water_music.jpg";

/* ─────────────────────────────────────────
   IMAGE MAP  (name → imported asset)
───────────────────────────────────────── */
const imageMap = {
  "Breakas Beach Resort":  breakers,
  "Erakor Island Resort":  erakor,
  "Grand Hotel":           grandHotel,
  "The Havannah":          havannah,
  "Holiday Inn":           holidayInn,
  "Melanesian Hotel":      melanesian,
  "Melanesian":            melanesian,
  "Melanesian Port Vila":  melanesian,
  "Nasama Resort":         nasama,
  "Ramada Resort":         ramada,
  "Tamanu on the Beach":   tamanu,
  "Warwick Le Lagon":      warwick,

  "Avis Vanuatu":          avis,
  "Budget Vanuatu":        budget,
  "Europcar":              europcar,
  "Global Drive":          globaldrive,
  "Go2Rent":               go2rent,
  "Hertz":                 hertz,
  "OnWheel Vanuatu":       onwheels,
  "On Wheels Vanuatu":     onwheels,
  "On Wheels":             onwheels,
  "Onwheel Vanuatu":       onwheels,
  "Pacific Car Hire":      pacificcarhire,
  "Santo Car Hire":        santocarhire,
  "Santo Tropical":        santotropical,
  "Wanderlust":            wanderlust,
  "World Car Rentals":     worldcarrentals,

  "Atmosphere":            atmosphere,
  "Bountiful Tours":       bountiful,
  "Evergreen":             evergreen,
  "Lelepa Island Tour":    lelepa,
  "Mystery Island Tours":  mysteryisland,
  "Nature Tours":          nature,
  "Offroad Adventures":    offroad,
  "Off Road Adventures":   offroad,
  "Paradise Tours":        paradise,
  "Run Run Tea":           runruntea,
  "Rarru Rentapao":        runruntea,
  "Santo Heritage Tours":  santoheritage,
  "South Pacific Tours":   southpacific,
  "Vanuatu Eco Tours":     vanuatuecotours,
  "Vanuatu Eco":           vanuatuecotours,
  "Vila Hope":             vilaHope,
  "Water Music":           waterMusic,
};

/* ─────────────────────────────────────────
   CONSTANTS
───────────────────────────────────────── */
const API = "${process.env.REACT_APP_API_URL}";

const ENDPOINTS = {
  accommodations: { read: "/accommodations",   write: "/admin/accommodations" },
  cars:           { read: "/car-rentals",       write: "/admin/car-rentals"    },
  tours:          { read: "/tours",             write: "/admin/tours"          },
  users:          { read: "/admin/users",       write: "/admin/users"          },
};

const TABS = [
  { key: "users",          label: "Users"          },
  { key: "accommodations", label: "Accommodations" },
  { key: "cars",           label: "Car Rentals"    },
  { key: "tours",          label: "Tours"          },
];

/* ─────────────────────────────────────────
   HELPERS
───────────────────────────────────────── */

/** Returns a local-asset src, server-uploaded URL, or null */
function resolveImage(item) {
  if (item?.imagePreview) return item.imagePreview;
  if (item?.image_url)    return item.image_url;
  if (!item?.name)        return null;
  const key = Object.keys(imageMap).find((k) =>
    item.name.toLowerCase().includes(k.toLowerCase())
  );
  return key ? imageMap[key] : null;
}

const emptyForm = () => ({
  name:         "",
  location:     "",
  address:      "",
  phone:        "",
  email:        "",
  website:      "",
  description:  "",
  services:     "",
  type:         "",
  imageFile:    null,
  imagePreview: null,
});

/* ─────────────────────────────────────────
   COMPONENT
───────────────────────────────────────── */
function AdminDashboard({ manager, onLogout }) {
  const [tab,          setTab]          = useState("users");
  const [data,         setData]         = useState([]);
  const [loading,      setLoading]      = useState(true);
  const [search,       setSearch]       = useState("");
  const [notification, setNotification] = useState(null);

  /* modal state: null | "add" | "edit" */
  const [modalMode,  setModalMode]  = useState(null);
  const [activeItem, setActiveItem] = useState(null);
  const [formData,   setFormData]   = useState(emptyForm());

  const fileInputRef = useRef(null);

  /* ── fetch on tab change ── */
  useEffect(() => {
    setLoading(true);
    setSearch("");
    const ep = ENDPOINTS[tab]?.read || "/admin/users";
    fetch(`${API}${ep}`)
      .then((r) => (r.ok ? r.json() : []))
      .then((d) => { setData(d); setLoading(false); })
      .catch(() => { setData([]); setLoading(false); });
  }, [tab]);

  /* ── notification helper ── */
  const notify = (type, text) => {
    setNotification({ type, text });
    setTimeout(() => setNotification(null), 3500);
  };

  /* ── filtered list ── */
  const filtered = data.filter((item) =>
    Object.values(item || {})
      .join(" ")
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  /* ── form handlers ── */
  const handleChange = (e) =>
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) =>
      setFormData((prev) => ({
        ...prev,
        imageFile:    file,
        imagePreview: ev.target.result,
      }));
    reader.readAsDataURL(file);
  };

  const openAdd = () => {
    setFormData(emptyForm());
    setActiveItem(null);
    setModalMode("add");
  };

  const openEdit = (item) => {
    setActiveItem(item);
    setFormData({
      ...emptyForm(),
      ...item,
      imageFile:    null,
      imagePreview: item.image_url || null,
    });
    setModalMode("edit");
  };

  const closeModal = () => {
    setModalMode(null);
    setActiveItem(null);
    setFormData(emptyForm());
  };

  /* ── build request body (multipart or JSON) ── */
  const buildBody = () => {
    if (formData.imageFile) {
      const fd = new FormData();
      Object.entries(formData).forEach(([k, v]) => {
        if (k === "imagePreview") return;
        if (v !== null && v !== undefined) fd.append(k, v);
      });
      return { body: fd, headers: {} };
    }
    const { imageFile, imagePreview, ...rest } = formData; // eslint-disable-line
    return {
      body:    JSON.stringify(rest),
      headers: { "Content-Type": "application/json" },
    };
  };

  /* ── save (add or edit) ── */
  const handleSave = async () => {
    const ep = ENDPOINTS[tab]?.write;
    if (!ep) return;

    const isEdit = modalMode === "edit" && activeItem?.id;
    const url    = isEdit ? `${API}${ep}/${activeItem.id}` : `${API}${ep}`;
    const method = isEdit ? "PUT" : "POST";
    const { body, headers } = buildBody();

    try {
      const res = await fetch(url, { method, headers, body });
      if (!res.ok) throw new Error("Server error");
      const saved = await res.json();

      if (isEdit) {
        setData((prev) => prev.map((d) => (d.id === saved.id ? saved : d)));
        notify("success", "Changes saved successfully.");
      } else {
        setData((prev) => [...prev, saved]);
        notify("success", "New entry added successfully.");
      }
      closeModal();
    } catch (err) {
      console.error(err);
      notify("error", "Unable to save. Please try again.");
    }
  };

  /* ── delete ── */
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this entry?")) return;
    const ep = ENDPOINTS[tab]?.write;
    try {
      const res = await fetch(`${API}${ep}/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Delete failed");
      setData((prev) => prev.filter((d) => d.id !== id));
      notify("success", tab === "users" ? "User deleted." : "Entry deleted.");
    } catch {
      notify("error", "Unable to delete. Please try again.");
    }
  };

  /* ── render ── */
  return (
    <div className="page">

      {/* ═══════════════════ STICKY HEADER ═══════════════════ */}
      <div className="page-header sticky-header admin-sticky">

        <div className="admin-top-bar">
          <div className="admin-title-block">
            <h1>Admin Dashboard</h1>
            <p>Welcome back, <strong>{manager?.name}</strong></p>
          </div>
          <button className="admin-logout-btn" onClick={onLogout}>
            <FaSignOutAlt /> Logout
          </button>
        </div>

        {/* tab navigation */}
        <div className="admin-tabs">
          {TABS.map(({ key, label }) => (
            <button
              key={key}
              className={`admin-tab-btn ${tab === key ? "active" : ""}`}
              onClick={() => setTab(key)}
            >
              {label}
            </button>
          ))}
        </div>

        {/* search + add */}
        <div className="admin-toolbar">
          <div className="search-box admin-search">
            <input
              type="text"
              placeholder={`Search ${tab}…`}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {tab !== "users" && (
            <button className="admin-add-btn" onClick={openAdd}>
              <FaPlus /> Add New
            </button>
          )}
        </div>

        {notification && (
          <div className={`notification ${notification.type}`}>
            {notification.text}
          </div>
        )}
      </div>

      {/* ═══════════════════ SCROLLABLE CONTENT ═══════════════════ */}
      <div className="page-content">

        {loading && <p className="loading">Loading {tab}…</p>}

        {!loading && filtered.length === 0 && (
          <p className="empty">No results found.</p>
        )}

        {!loading && filtered.length > 0 && (
          <div className={tab === "users" ? "admin-users-grid" : "card-grid"}>

            {/* ─── USERS TAB ─── */}
            {tab === "users" && filtered.map((user, i) => (
              <div key={user.id || i} className="admin-user-card">
                <div className="admin-user-avatar">
                  {(user.name || user.email || "?")[0].toUpperCase()}
                </div>
                <div className="admin-user-info">
                  {user.name  && <h3>{user.name}</h3>}
                  {user.email && <p className="meta"><FaEnvelope /> {user.email}</p>}
                  {user.phone && <p><FaPhone /> {user.phone}</p>}
                </div>
                <div className="admin-card-actions">
                  <button
                    className="admin-delete"
                    title="Delete user"
                    onClick={() => handleDelete(user.id)}
                  >
                    <FaTrashAlt />
                  </button>
                </div>
              </div>
            ))}

            {/* ─── ACCOMMODATIONS / CARS / TOURS TABS ─── */}
            {tab !== "users" && filtered.map((item, i) => {
              const imgSrc = resolveImage(item);
              return (
                <div key={item.id || i} className="card admin-listing-card">

                  {imgSrc ? (
                    <img className="logo" src={imgSrc} alt={item.name} />
                  ) : (
                    <div className="logo admin-no-image">
                      <FaUpload style={{ fontSize: "1.6rem", color: "#aac" }} />
                      <span>No image</span>
                    </div>
                  )}

                  <h3>{item.name}</h3>

                  {item.location && (
                    <p className="meta">
                      {item.location}{item.type ? ` • ${item.type}` : ""}
                    </p>
                  )}

                  {item.services    && <p>{item.services}</p>}
                  {item.description && <p>{item.description}</p>}

                  <div className="contact">
                    {item.address && <p><FaMapMarkerAlt /> {item.address}</p>}
                    {item.phone   && <p><FaPhone />        {item.phone}</p>}
                    {item.email   && (
                      <p>
                        <FaEnvelope />
                        <a href={`mailto:${item.email}`}>{item.email}</a>
                      </p>
                    )}
                    {item.website && (
                      <p>
                        <FaGlobe />
                        <a href={item.website} target="_blank" rel="noreferrer">
                          Visit website
                        </a>
                      </p>
                    )}
                  </div>

                  <div className="admin-listing-actions">
                    <button
                      className="profile-btn admin-action-btn"
                      onClick={() => openEdit(item)}
                      title="Edit"
                    >
                      <FaEdit /> Edit
                    </button>
                    <button
                      className="admin-delete admin-action-btn"
                      onClick={() => handleDelete(item.id)}
                      title="Delete"
                    >
                      <FaTrashAlt /> Delete
                    </button>
                  </div>

                </div>
              );
            })}

          </div>
        )}
      </div>

      {/* ═══════════════════ ADD / EDIT MODAL ═══════════════════ */}
      {modalMode && (
        <div
          className="modal-overlay"
          onClick={(e) => { if (e.target === e.currentTarget) closeModal(); }}
        >
          <div className="modal-box admin-modal-box">

            <div className="modal-header">
              <h3>
                {modalMode === "add"
                  ? `Add New ${tab.replace(/s$/, "")}`
                  : "Edit Entry"}
              </h3>
              <button
                className="modal-close-btn"
                onClick={closeModal}
                aria-label="Close"
              >
                <FaTimes />
              </button>
            </div>

            {/* image upload */}
            <div
              className="admin-image-upload-zone"
              onClick={() => fileInputRef.current?.click()}
              title="Click to upload image"
            >
              {formData.imagePreview ? (
                <img
                  src={formData.imagePreview}
                  alt="preview"
                  className="admin-img-preview"
                />
              ) : (
                <div className="admin-upload-placeholder">
                  <FaUpload style={{ fontSize: "1.8rem", marginBottom: 6 }} />
                  <span>Click to upload photo</span>
                  <small>PNG · JPG · WEBP</small>
                </div>
              )}
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              onChange={handleImageChange}
            />

            {/* form fields */}
            <div className="admin-form-grid">

              <label>
                <span className="field-label">Name / Title <span className="required">*</span></span>
                <input
                  name="name"
                  value={formData.name || ""}
                  onChange={handleChange}
                  placeholder="e.g. Holiday Inn Vanuatu"
                />
              </label>

              <label>
                <span className="field-label">Location</span>
                <input
                  name="location"
                  value={formData.location || ""}
                  onChange={handleChange}
                  placeholder="e.g. Port Vila"
                />
              </label>

              <label>
                <span className="field-label">Address</span>
                <input
                  name="address"
                  value={formData.address || ""}
                  onChange={handleChange}
                  placeholder="Street / postal address"
                />
              </label>

              <label>
                <span className="field-label">Phone</span>
                <input
                  name="phone"
                  value={formData.phone || ""}
                  onChange={handleChange}
                  placeholder="+678 …"
                />
              </label>

              <label>
                <span className="field-label">Email</span>
                <input
                  name="email"
                  type="email"
                  value={formData.email || ""}
                  onChange={handleChange}
                  placeholder="contact@example.com"
                />
              </label>

              <label>
                <span className="field-label">Website</span>
                <input
                  name="website"
                  value={formData.website || ""}
                  onChange={handleChange}
                  placeholder="https://…"
                />
              </label>

              {tab === "accommodations" && (
                <label>
                  <span className="field-label">Type</span>
                  <input
                    name="type"
                    value={formData.type || ""}
                    onChange={handleChange}
                    placeholder="e.g. Resort, Hotel, Guesthouse"
                  />
                </label>
              )}

              {(tab === "cars" || tab === "tours") && (
                <label>
                  <span className="field-label">Services</span>
                  <input
                    name="services"
                    value={formData.services || ""}
                    onChange={handleChange}
                    placeholder="e.g. 4WD hire, day tours…"
                  />
                </label>
              )}

              <label className="full-width">
                <span className="field-label">Description</span>
                <textarea
                  name="description"
                  value={formData.description || ""}
                  onChange={handleChange}
                  placeholder="Short description…"
                  rows={3}
                />
              </label>

            </div>

            {/* action buttons */}
            <div className="modal-actions">
              <button className="modal-save-btn" onClick={handleSave}>
                {modalMode === "add" ? "Add Entry" : "Save Changes"}
              </button>
              <button className="modal-cancel-btn" onClick={closeModal}>
                Cancel
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}

export default AdminDashboard;
