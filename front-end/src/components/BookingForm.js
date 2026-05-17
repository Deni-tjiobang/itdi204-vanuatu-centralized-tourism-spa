import { useState } from "react";

/*
  BookingForm Component
  ---------------------
  This component demonstrates form handling, validation,
  and client-side data storage using LocalStorage.
*/

function BookingForm({ destination }) {
  const [name, setName] = useState("");
  const [date, setDate] = useState("");

  if (!destination) {
    return (
      <div className="page">
        <div className="page-header">
          <h1>No destination selected</h1>
          <p>Please return to Destinations and choose a place to book.</p>
        </div>
      </div>
    );
  }

  const submitBooking = (e) => {
    e.preventDefault();

    const message = `Hello, I would like to book the following experience:

Name: ${name}
Destination: ${destination.name}
Preferred date: ${date}

Thank you.`;

    window.open(
      `https://wa.me/6780000000?text=${encodeURIComponent(message)}`,
      "_blank"
    );
  };

  return (
    <div className="page booking-page">
      {/* PAGE HEADER */}
      <div className="page-header">
        <h1>Book Your Experience</h1>
        <p>
          Review your selected destination and provide your details to complete
          the booking via WhatsApp.
        </p>
      </div>

      <div className="booking-grid">
        {/* DESTINATION SUMMARY */}
        <div className="booking-card destination-summary">
          {destination.image}

          <div className="summary-content">
            <h3>{destination.name}</h3>
            <p>{destination.description}</p>

            <span className="summary-note">
              You are about to request a booking for this experience.
            </span>
          </div>
        </div>

        {/* BOOKING FORM */}
        <div className="booking-card">
          <h3>Your Booking Details</h3>

          <form className="booking-form" onSubmit={submitBooking}>
            <label>Your full name</label>
            <input
              type="text"
              placeholder="e.g. John Smith"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <label>Preferred visit date</label>
            <input
              type="date"
              required
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />

            <p className="booking-info">
              After confirming, you will be redirected to WhatsApp to complete
              the booking directly with the operator.
            </p>

            <button type="submit" className="whatsapp-btn">
              Confirm via WhatsApp
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default BookingForm;