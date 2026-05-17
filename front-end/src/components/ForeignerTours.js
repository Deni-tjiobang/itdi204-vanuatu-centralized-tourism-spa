import atmosphere from "../images/logos/atmosphere.jpg";
import bountiful from "../images/logos/bountifultours.jpg";
import evergreen from "../images/logos/evergreen.png";
import lelepa from "../images/logos/lelepaislandtour.png";
import mystery from "../images/logos/mysteryislandtours.webp";
import nature from "../images/logos/naturetours.webp";
import offroad from "../images/logos/offroadadventures.jpg";
import paradise from "../images/logos/paradisetours.jpg";
import rarru from "../images/logos/rarrurentapaorivercascadetour.jpg";
import santo from "../images/logos/santoheritagetours.jpg";
import spt from "../images/logos/southpacifictours.jpg";
import ecotours from "../images/logos/vanuatuecotours.png";
import vilahope from "../images/logos/vilahope.png";

function ForeignerTours() {
  const operators = [
    {
      name: "Vanuatu Ecotours",
      tagline: "Sustainable and authentic island experiences",
      rating: "4.7",
      location: "Port Vila, Efate",
      phone: "6785403506",
      logo: ecotours,
      services: [
        "Eco tours and cultural villages",
        "Outer island expeditions",
        "Custom group itineraries"
      ]
    },
    {
      name: "Atmosphere Tours Vanuatu",
      tagline: "Popular day tours and cruise excursions",
      rating: "3.8",
      location: "Port Vila",
      phone: "67827870",
      logo: atmosphere,
      services: [
        "Blue Lagoon and waterfall tours",
        "Pele Island day trips",
        "Airport transfers"
      ]
    },
    {
      name: "Evergreen Vanuatu",
      tagline: "Classic Efate sightseeing and transfers",
      rating: "4.0",
      location: "Port Vila",
      phone: "67823050",
      logo: evergreen,
      services: [
        "Mele Cascades tours",
        "Snorkelling trips",
        "Hotel transfers"
      ]
    },
    {
      name: "Nature Tours Vanuatu",
      tagline: "Guided nature and cultural exploration",
      rating: "4.0",
      location: "Port Vila",
      phone: "6787790351",
      logo: nature,
      services: [
        "Wildlife and river tours",
        "Cultural food experiences",
        "Local guide services"
      ]
    },
    {
      name: "South Pacific Tours (SPT)",
      tagline: "Leading cruise excursion specialists",
      rating: "4.6",
      location: "Port Vila",
      phone: "67826559",
      logo: spt,
      services: [
        "Cruise ship tours",
        "Efate sightseeing",
        "Cultural day trips"
      ]
    },
    {
      name: "Off Road Adventures Vanuatu",
      tagline: "Adventure‑focused jungle experiences",
      rating: "4.6",
      location: "Port Vila",
      phone: "67825479",
      logo: offroad,
      services: [
        "Buggy and off-road tours",
        "Jungle exploration",
        "Guided adventure trips"
      ]
    },
    {
      name: "Vila Hope Tours & Transfers",
      tagline: "Reliable transport and private touring",
      rating: "4.3",
      location: "Port Vila",
      phone: "6785444455",
      logo: vilahope,
      services: [
        "Airport transfers",
        "Private transport",
        "Cruise passenger tours"
      ]
    },
    {
      name: "Bountiful Tours & Transfers",
      tagline: "Personalised transport and local tours",
      rating: "5.0",
      location: "Port Vila",
      phone: "6787712159",
      logo: bountiful,
      services: [
        "Private transfers",
        "Local sightseeing tours"
      ]
    },
    {
      name: "Rarru Rentapao River Cascade Tours",
      tagline: "Nature-based river adventures",
      rating: "4.4",
      location: "Efate",
      phone: "6785551007",
      logo: rarru,
      services: [
        "River cascade tours",
        "Jungle nature walks"
      ]
    },
    {
      name: "Lelepa Island Day Tours",
      tagline: "Island culture and snorkelling trips",
      rating: "4.8",
      location: "Port Vila",
      phone: "6787763516",
      logo: lelepa,
      services: [
        "Lelepa Island visits",
        "Cultural heritage tours"
      ]
    },
    {
      name: "Santo Heritage Tours",
      tagline: "History and WWII experiences in Santo",
      rating: "4.2",
      location: "Espiritu Santo",
      phone: "6787740968",
      logo: santo,
      services: [
        "WWII historical tours",
        "Island sightseeing"
      ]
    },
    {
      name: "Paradise Tours & Transfers",
      tagline: "Private Santo-based tour experiences",
      rating: "4.8",
      location: "Espiritu Santo",
      phone: "6787747159",
      logo: paradise,
      services: [
        "Custom island tours",
        "Group and private travel"
      ]
    },
    {
      name: "Mystery Island Tours",
      tagline: "Cruise day experiences in Aneityum",
      rating: "4.5",
      location: "Aneityum",
      phone: "6785434562",
      logo: mystery,
      services: [
        "Cruise excursions",
        "Village and beach tours"
      ]
    }
  ];

  const openWhatsApp = (name, phone) => {
    const message = `Hello, I would like to enquire about tours with ${name}.`;
    window.open(
      `https://wa.me/${phone}?text=${encodeURIComponent(message)}`,
      "_blank"
    );
  };

  return (
    <div className="page foreigner-page">
      <div className="page-header">
        <h1>Foreigner Tours</h1>
        <p>
          Explore trusted tour operators across Vanuatu offering cultural,
          adventure, and sightseeing experiences for international visitors.
        </p>
      </div>

      <div className="tour-grid">
        {operators.map((op, index) => (
          <div key={index} className="tour-card enhanced">
            <div className="tour-logo">
              <img src={op.logo} alt={op.name} />
            </div>

            <div className="tour-content">
              <h3>{op.name}</h3>
              <span className="tagline">{op.tagline}</span>
              <p className="rating">Rating: {op.rating} ⭐</p>
              <p className="location">Location: {op.location}</p>

              <ul>
                {op.services.map((s, i) => (
                  <li key={i}>{s}</li>
                ))}
              </ul>

              <span className="explore-link">
                Contact operator for availability →
              </span>
            </div>

            <button
              className="whatsapp-btn"
              onClick={() => openWhatsApp(op.name, op.phone)}
            >
              Contact via WhatsApp
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ForeignerTours;