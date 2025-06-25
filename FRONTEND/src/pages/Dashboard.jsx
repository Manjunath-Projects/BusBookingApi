import { useState } from 'react';
import './Dashboard.css';

export default function Dashboard() {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [date, setDate] = useState('');
  const [buses, setBuses] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem('token');

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`http://localhost:5000/api/admin/bus/search?from=${from}&to=${to}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Search failed');
      setBuses(data);
    } catch (err) {
      alert(err.message);
      setBuses([]);
    }
    setLoading(false);
  };

  const handleBook = async (busId) => {
    try {
      const res = await fetch(`http://localhost:5000/api/user/booking`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ busId, date })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Booking failed');
      alert('Bus booked successfully!');
      loadBookings(); // Refresh bookings after booking
    } catch (err) {
      alert(err.message);
    }
  };

  const loadBookings = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/user/booking/admin/all`, {
  headers: { Authorization: `Bearer ${token}` }
});
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to load bookings');
      setBookings(data);
    } catch (err) {
      alert(err.message);
    }
  };

  const handleCancel = async (bookingId) => {
    try {
      const res = await fetch(`http://localhost:5000/api/user/booking/${bookingId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Cancel failed');
      setBookings(bookings.filter(b => b._id !== bookingId));
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="dashboard-container">
      <form className="search-form" onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="From"
          value={from}
          onChange={(e) => setFrom(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="To"
          value={to}
          onChange={(e) => setTo(e.target.value)}
          required
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Searching...' : 'Search Bus'}
        </button>
      </form>

      <div className="grid-container">
        {buses.map((bus) => (
          <div key={bus._id} className="card">
            <p><strong>Bus Number:</strong> {bus.busNumber}</p>
            <p><strong>Route:</strong> {bus.route.from} → {bus.route.to}</p>
            <p><strong>Capacity:</strong> {bus.capacity}</p>
            <button onClick={() => handleBook(bus._id)}>Book</button>
          </div>
        ))}
      </div>

      <button className="my-bookings-btn" onClick={loadBookings}>
        My Bookings
      </button>

      <div className="grid-container">
  {bookings.map((booking) => (
    <div key={booking._id} className="card">
      <p><strong>User:</strong> {booking.user?.email}</p>
      <p><strong>Bus Number:</strong> {booking.bus?.busNumber}</p>
      <p><strong>Route:</strong> {booking.bus?.route.from} → {booking.bus?.route.to}</p>
      <p><strong>Date:</strong> {booking.date}</p>
      <p><strong>Status:</strong> {booking.status}</p>
    </div>
  ))}
</div>

    </div>
  );
}
