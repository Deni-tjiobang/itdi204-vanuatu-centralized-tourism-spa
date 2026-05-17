import { useState } from "react";

function Accommodations() {
  const [search, setSearch] = useState("");

  const accommodations = [
    /* =========================
       PORT VILA – EFATE
    ========================= */

    {
      name: "Ramada Resort by Wyndham Port Vila",
      location: "Port Vila, Efate",
      type: "Waterfront Resort",
      description:
        "Modern waterfront resort offering lagoon-view apartments, restaurant, spa, gym, swimming pool, and marina access.",
      address: "First Lagoon, Paray, Port Vila, Vanuatu",
      phone: "+678 28000",
      email: "reservations@ramadaresort.com.vu",
      website: "https://ramadaresort.com.vu",
    },
    {
      name: "Warwick Le Lagon Vanuatu",
      location: "Port Vila, Efate",
      type: "Beachfront Resort",
      description:
        "Large beachfront resort with spa facilities, golf-style grounds, pools, restaurants, and conference venues.",
      address: "Erakor Lagoon, Port Vila, Vanuatu",
      phone: "+678 22313",
      email: "reservations.vanuatu@warwickhotels.com",
      website: "https://www.warwickhotels.com/le-lagon-vanuatu",
    },
    {
      name: "Breakas Beach Resort",
      location: "Port Vila, Efate",
      type: "Adults-only Beach Resort",
      description:
        "Adults-only beachfront resort featuring traditional island-style bungalows, restaurant, and infinity pool.",
      address: "Pango Road, Port Vila",
      phone: "+678 25070",
      email: "reservations@breakas.com",
      website: "https://www.breakas.com",
    },
    {
      name: "Holiday Inn Resort Vanuatu",
      location: "Port Vila, Efate",
      type: "Family Resort",
      description:
        "Family-friendly resort overlooking Erakor Lagoon with golf course, kids club, and lagoon activities.",
      address: "Tassiriki Park, Port Vila",
      phone: "+678 22100",
      email: "reservations.hivanuatu@ihg.com",
      website: "https://www.ihg.com/holidayinnresorts/vanuatu",
    },
    {
      name: "Grand Hotel and Casino Port Vila",
      location: "Port Vila, Efate",
      type: "Luxury Hotel",
      description:
        "Harbourfront hotel in central Port Vila offering luxury rooms, dining, casino, and business facilities.",
      address: "Kumul Highway, Port Vila",
      phone: "+678 33500",
      email: "reservations@grandvanuatu.com",
      website: "https://www.grandvanuatu.com",
    },
    {
      name: "The Melanesian Port Vila",
      location: "Port Vila, Efate",
      type: "Hotel",
      description:
        "Well-known hotel featuring cultural shows, swimming pool, restaurant, and traditional kava bar.",
      address: "Rue Picarde, Port Vila",
      phone: "+678 22285",
      email: "reservations@melanesian.com.vu",
      website: "https://www.melanesian.com.vu",
    },
    {
      name: "Erakor Island Resort",
      location: "Erakor Island, Efate",
      type: "Private Island Resort",
      description:
        "Private island resort accessible by ferry, offering beachfront bungalows and water sports.",
      address: "Erakor Island, Port Vila",
      phone: "+678 26983",
      email: "reservations@erakorislandresort.com",
      website: "https://www.erakorislandresort.com",
    },
    {
      name: "The Havannah Vanuatu",
      location: "Efate Island",
      type: "Luxury Adults-only Resort",
      description:
        "High-end adults-only resort popular for honeymoons, offering spa services, fine dining, and snorkeling.",
      address: "Havannah Harbour, Efate",
      phone: "+678 27600",
      email: "stay@thehavannah.com",
      website: "https://www.thehavannah.com",
    },
    {
      name: "Tamanu on the Beach",
      location: "North Efate",
      type: "Boutique Beach Resort",
      description:
        "Luxury beachfront resort featuring private villas, spa services, and an on-site restaurant.",
      address: "White Sands Road, North Efate",
      phone: "+678 22521",
      email: "reservations@tamanuonthebeach.com",
      website: "https://www.tamanuonthebeach.com",
    },
    {
      name: "Nasama Resort",
      location: "Port Vila, Efate",
      type: "Resort",
      description:
        "Relaxed resort located along Pango Road offering self-contained apartments and ocean views.",
      address: "Pango Road, Port Vila",
      phone: "+678 27200",
      email: "reservations@nasamaresort.com",
      website: "https://www.nasamaresort.com",
    },
    {
      name: "Mangoes Resort",
      location: "Port Vila, Efate",
      type: "Resort",
      description:
        "Popular hillside resort offering lagoon views, restaurant, swimming pool, and spa treatments.",
      address: "Rue De Wales, Port Vila",
      phone: "+678 23900",
      email: "reservations@mangoesvanuatu.com",
      website: "https://www.mangoesvanuatu.com",
    },
    {
      name: "Iririki Island Resort & Spa",
      location: "Port Vila Harbour",
      type: "Private Island Resort",
      description:
        "Private island resort offering luxury villas, spa facilities, and water activities just minutes from town.",
      address: "Iririki Island, Port Vila Harbour",
      phone: "+678 35060",
      email: "reservations@iririki.com",
      website: "https://www.iririki.com",
    },

    /* =========================
       LUGANVILLE – SANTO
    ========================= */

    {
      name: "Hotel Santo",
      location: "Luganville, Santo",
      type: "Hotel",
      description:
        "Historic hotel located in the centre of Luganville with garden setting, restaurant, and swimming pool.",
      address: "Main Street, Luganville",
      phone: "+678 36250",
      email: "hotelsanto@vanuatu.com.vu",
      website: "https://www.hotelsantovanuatu.com",
    },
    {
      name: "The Espiritu Hotel",
      location: "Luganville, Santo",
      type: "Boutique Hotel",
      description:
        "Popular boutique hotel offering comfortable rooms, restaurant, pool, and tour desk.",
      address: "Luganville Town",
      phone: "+678 37539",
      email: "book@the-espiritu.com",
      website: "https://www.the-espiritu.com",
    },
    {
      name: "Turtle Bay Lodge",
      location: "Espiritu Santo",
      type: "Beachfront Lodge",
      description:
        "Oceanfront lodge popular with snorkellers, offering kayaking and island tours.",
      address: "Turtle Bay, Espiritu Santo",
      phone: "+678 37988",
      email: "stay@turtlebaylodge.vu",
      website: "https://turtlebaylodge.vu",
    },
    {
      name: "Barrier Beach Resort",
      location: "East Coast, Santo",
      type: "Boutique Beach Resort",
      description:
        "Upscale beachfront resort offering luxury accommodation and personalised service.",
      address: "Saraotou, Espiritu Santo",
      phone: "+678 35800",
      email: "reservations@barrierbeach.com",
      website: "https://www.barrierbeach.com",
    },
    {
      name: "Aore Island Resort",
      location: "Aore Island, Santo",
      type: "Island Resort",
      description:
        "Island resort accessible by ferry offering beachfront rooms and island activities.",
      address: "Aore Island",
      phone: "+678 35850",
      email: "reservations@aoreresort.com",
      website: "https://www.aoreresort.com",
    },
    {
      name: "Deco Stop Lodge",
      location: "Luganville, Santo",
      type: "Hillside Lodge",
      description:
        "Hillside lodge offering panoramic sea views and relaxed accommodation near town.",
      address: "Hospital Road, Luganville",
      phone: "+678 35836",
      email: "info@decostoplodge.com",
      website: "https://www.decostoplodge.com",
    },
    {
      name: "Beachfront Resort Santo",
      location: "Luganville, Santo",
      type: "Beachfront Resort",
      description:
        "Waterfront resort near town offering direct beach access and relaxed island stays.",
      address: "Luganville, Espiritu Santo",
      phone: "+678 35000",
      email: "reservations@beachfrontresortvanuatu.com",
      website: "https://www.beachfrontresortvanuatu.com",
    },
  ];

  const filtered = accommodations.filter((place) =>
    `${place.name} ${place.location} ${place.type}`
      .toLowerCase()
      .includes(search.toLowerCase()),
  );

  return (
    <div className="page accommodations-page">
      <div className="page-header">
        <h1>Accommodations</h1>
        <p>
          Search and explore verified hotels, resorts, lodges, and guesthouses
          in Port Vila and Espiritu Santo.
        </p>
      </div>

      <div className="search-box">
        <input
          type="text"
          placeholder="Search by name, location, or type…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="card-grid">
        {filtered.map((place, index) => (
          <div key={index} className="accommodation-card enhanced">
            <div className="accommodation-content">
              <h3>{place.name}</h3>
              <div className="contact-section">
                <div className="contact-section">
  <p>
    <span className="icon">📍</span>
    <strong>Address:</strong> {place.address}
  </p>

  <p>
    <span className="icon">📞</span>
    <strong>Phone:</strong> {place.phone}
  </p>

  <p>
    <span className="icon">✉️</span>
    <strong>Email:</strong>{" "}
    <a href={`mailto:${place.email}`}>
      {place.email}
    </a>
  </p>

  <p>
    <span className="icon">🌐</span>
    <strong>Website:</strong>{" "}
    <a
      href={place.website}
      target="_blank"
      rel="noopener noreferrer"
    >
      Visit official site
    </a>
  </p>
</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Accommodations;
