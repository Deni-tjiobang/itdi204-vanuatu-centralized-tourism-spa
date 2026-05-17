function Dashboard() {
  const booking = JSON.parse(localStorage.getItem("booking"));

  if (!booking) {
    return <p className="dashboard">No bookings yet.</p>;
  }

  return (
    <div className="dashboard">
      <h2>Last Booking</h2>
      <p>Name: {booking.name}</p>
      <p>Service: {booking.service.name}</p>
      <p>Date: {booking.date}</p>
    </div>
  );
}

export default Dashboard;