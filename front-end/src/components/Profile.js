import { useState, useRef } from "react";
import {
  FaUserCircle, FaUser, FaEnvelope, FaGlobe,
  FaCalendarAlt, FaLock, FaEye, FaEyeSlash,
  FaCamera, FaCheck, FaExclamationCircle
} from "react-icons/fa";

function Profile({ user, onUserUpdate }) {
  /* ── view / edit mode ── */
  const [isEditing, setIsEditing]   = useState(false);

  /* ── profile photo ── */
  const [image, setImage]           = useState(user.image || "");
  const fileRef                     = useRef(null);

  /* ── form state (all editable fields) ── */
  const [form, setForm]             = useState({
    firstName: user.firstName || "",
    lastName:  user.lastName  || "",
    email:     user.email     || "",
    country:   user.country   || "",
    dob:       user.dob       ? user.dob.split("T")[0] : "",
    password:  "",
  });

  /* ── password visibility ── */
  const [showPw, setShowPw]         = useState(false);

  /* ── save state ── */
  const [saving,  setSaving]        = useState(false);
  const [notif,   setNotif]         = useState(null);   // { type, text }

  /* ── helpers ── */
  const notify = (type, text) => {
    setNotif({ type, text });
    setTimeout(() => setNotif(null), 3500);
  };

  const formatDate = (d) => {
    if (!d) return "—";
    const date = new Date(d);
    return isNaN(date) ? d : date.toLocaleDateString(undefined, {
      year: "numeric", month: "long", day: "numeric"
    });
  };

  /* ── photo upload (stored in localStorage only) ── */
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result);
      localStorage.setItem("user", JSON.stringify({ ...user, image: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  /* ── field change ── */
  const handleChange = (e) =>
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  /* ── save to backend ── */
  const handleSave = async () => {
    if (!form.firstName.trim() || !form.lastName.trim()) {
      notify("error", "First and last name are required.");
      return;
    }
    if (!form.email.trim()) {
      notify("error", "Email is required.");
      return;
    }

    setSaving(true);
    try {
      const payload = {
        id:        user.id,
        firstName: form.firstName.trim(),
        lastName:  form.lastName.trim(),
        name:      `${form.firstName.trim()} ${form.lastName.trim()}`,
        email:     form.email.trim(),
        country:   form.country.trim(),
        dob:       form.dob,
        image,
      };

      /* Only send password if the user typed a new one */
      if (form.password.trim()) {
        payload.password = form.password.trim();
      }

      const res  = await fetch(`${process.env.REACT_APP_API_URL}/update-profile`, {
        method:  "PUT",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify(payload),
      });

      const data = await res.json();

      if (data.user) {
        const saved = { ...data.user, image };
        localStorage.setItem("user", JSON.stringify(saved));

        /* Let App.js know so the nav name updates without a reload */
        if (typeof onUserUpdate === "function") onUserUpdate(saved);

        /* Clear password field, leave rest updated */
        setForm(prev => ({ ...prev, password: "" }));
        setIsEditing(false);
        notify("success", "Profile saved successfully!");
      } else {
        notify("error", data.error || "Failed to save. Please try again.");
      }
    } catch (err) {
      console.error(err);
      notify("error", "Network error — could not save profile.");
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    /* Reset form back to last-saved values */
    setForm({
      firstName: user.firstName || "",
      lastName:  user.lastName  || "",
      email:     user.email     || "",
      country:   user.country   || "",
      dob:       user.dob ? user.dob.split("T")[0] : "",
      password:  "",
    });
    setIsEditing(false);
  };

  /* ══════════════════════════════════════════════════
     RENDER
  ══════════════════════════════════════════════════ */
  return (
    <div className="auth-container">
      <div className="auth-card profile-card">

        {/* ── LOGO ── */}
        <img src="/main_logo.png" className="auth-logo" alt="logo" />

        {/* ── AVATAR + photo upload ── */}
        <div className="profile-image-section">
          <div
            className="profile-avatar-wrap"
            onClick={() => fileRef.current?.click()}
            title="Change photo"
          >
            {image
              ? <img src={image} className="profile-image" alt="profile" />
              : <FaUserCircle className="profile-avatar" />
            }
            <div className="profile-camera-badge">
              <FaCamera />
            </div>
          </div>

          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            hidden
          />

          <h2 className="profile-name">
            {user.name || `${user.firstName} ${user.lastName}` || "Your Profile"}
          </h2>
          <p className="auth-sub profile-sub">Manage your account information</p>
        </div>

        {/* ── NOTIFICATION ── */}
        {notif && (
          <div className={`profile-notif ${notif.type}`}>
            {notif.type === "success"
              ? <FaCheck style={{ marginRight: 7 }} />
              : <FaExclamationCircle style={{ marginRight: 7 }} />
            }
            {notif.text}
          </div>
        )}

        {/* ══════════════════════
            VIEW MODE
        ══════════════════════ */}
        {!isEditing && (
          <div className="auth-body">

            <div className="profile-info-grid">

              <div className="profile-info-row">
                <span className="profile-info-label">
                  <FaUser className="profile-info-icon" /> First Name
                </span>
                <span className="profile-info-value">
                  {user.firstName || "—"}
                </span>
              </div>

              <div className="profile-info-row">
                <span className="profile-info-label">
                  <FaUser className="profile-info-icon" /> Last Name
                </span>
                <span className="profile-info-value">
                  {user.lastName || "—"}
                </span>
              </div>

              <div className="profile-info-row">
                <span className="profile-info-label">
                  <FaEnvelope className="profile-info-icon" /> Email
                </span>
                <span className="profile-info-value">
                  {user.email || "—"}
                </span>
              </div>

              <div className="profile-info-row">
                <span className="profile-info-label">
                  <FaGlobe className="profile-info-icon" /> Country
                </span>
                <span className="profile-info-value">
                  {user.country || "—"}
                </span>
              </div>

              <div className="profile-info-row">
                <span className="profile-info-label">
                  <FaCalendarAlt className="profile-info-icon" /> Date of Birth
                </span>
                <span className="profile-info-value">
                  {formatDate(user.dob)}
                </span>
              </div>

            </div>

            <button className="profile-btn" onClick={() => setIsEditing(true)}>
              Edit Profile
            </button>

          </div>
        )}

        {/* ══════════════════════
            EDIT MODE
        ══════════════════════ */}
        {isEditing && (
          <div className="auth-body">

            {/* First name */}
            <div className="input-box">
              <FaUser className="input-icon" />
              <input
                name="firstName"
                placeholder="First name"
                value={form.firstName}
                onChange={handleChange}
              />
            </div>

            {/* Last name */}
            <div className="input-box">
              <FaUser className="input-icon" />
              <input
                name="lastName"
                placeholder="Last name"
                value={form.lastName}
                onChange={handleChange}
              />
            </div>

            {/* Email */}
            <div className="input-box">
              <FaEnvelope className="input-icon" />
              <input
                name="email"
                type="email"
                placeholder="Email address"
                value={form.email}
                onChange={handleChange}
              />
            </div>

            {/* Country */}
            <div className="input-box">
              <FaGlobe className="input-icon" />
              <input
                name="country"
                placeholder="Country"
                value={form.country}
                onChange={handleChange}
              />
            </div>

            {/* Date of birth */}
            <div className="input-box">
              <FaCalendarAlt className="input-icon" />
              <input
                name="dob"
                type="date"
                value={form.dob}
                onChange={handleChange}
              />
            </div>

            {/* New password (optional) */}
            <div className="input-box">
              <FaLock className="input-icon" />
              <input
                name="password"
                type={showPw ? "text" : "password"}
                placeholder="New password (leave blank to keep)"
                value={form.password}
                onChange={handleChange}
              />
              {showPw
                ? <FaEyeSlash className="eye-icon" onClick={() => setShowPw(false)} />
                : <FaEye      className="eye-icon" onClick={() => setShowPw(true)}  />
              }
            </div>

            <button
              className="profile-btn"
              onClick={handleSave}
              disabled={saving}
            >
              {saving ? "Saving…" : "Save Changes"}
            </button>

            <button
              className="profile-btn cancel-btn"
              onClick={handleCancel}
              disabled={saving}
            >
              Cancel
            </button>

          </div>
        )}

      </div>
    </div>
  );
}

export default Profile;
