// import { useEffect, useState } from "react";
// import "./AdminDashboard.css";

// export default function AdminDashboard() {
//   const [buses, setBuses] = useState([]);
//   const [users, setUsers] = useState([]);
//   const [bookings, setBookings] = useState([]);

//   const [showAddForm, setShowAddForm] = useState(false);
//   const [busForm, setBusForm] = useState({
//     busNumber: "",
//     capacity: "",
//     from: "",
//     to: "",
//   });
//   const token = localStorage.getItem("token");

//   useEffect(() => {
//     fetchBuses();
//     fetchUsers();
//   }, []);

//   const fetchBuses = async () => {
//     try {
//       const res = await fetch("http://localhost:5000/api/admin/bus", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       const data = await res.json();
//       if (!res.ok) throw new Error(data.message || "Failed to fetch buses");
//       setBuses(data);
//     } catch (err) {
//       alert(err.message);
//     }
//   };

//   const fetchUsers = async () => {
//     try {
//       const res = await fetch("http://localhost:5000/api/admin/users", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       const data = await res.json();
//       if (!res.ok) throw new Error(data.message || "Failed to fetch users");
//       setUsers(data);
//     } catch (err) {
//       alert(err.message);
//     }
//   };

//   const handleAddBus = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await fetch("http://localhost:5000/api/admin/bus", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify({
//           busNumber: busForm.busNumber,
//           capacity: busForm.capacity,
//           route: { from: busForm.from, to: busForm.to },
//         }),
//       });
//       const data = await res.json();
//       if (!res.ok) throw new Error(data.message || "Failed to add bus");
//       alert("Bus added successfully");
//       setShowAddForm(false);
//       setBusForm({ busNumber: "", capacity: "", from: "", to: "" });
//       fetchBuses();
//     } catch (err) {
//       alert(err.message);
//     }
//   };

//   const handleDeleteBus = async (busId) => {
//     try {
//       const res = await fetch(`http://localhost:5000/api/admin/bus/${busId}`, {
//         method: "DELETE",
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       const data = await res.json();
//       if (!res.ok) throw new Error(data.message || "Failed to delete bus");
//       alert("Bus deleted");
//       setBuses(buses.filter((b) => b._id !== busId));
//     } catch (err) {
//       alert(err.message);
//     }
//   };

//    const loadBookings = async () => {
//     try {
//       const res = await fetch(`http://localhost:5000/api/user/booking`, {
//         headers: { Authorization: `Bearer ${token}` }
//       });
//       const data = await res.json();
//       if (!res.ok) throw new Error(data.message || 'Failed to load bookings');
//       setBookings(data);
//     } catch (err) {
//       alert(err.message);
//     }
//   };

//   return (
//     <div className="admin-dashboard">
//       <button
//         className="add-bus-btn"
//         onClick={() => setShowAddForm(!showAddForm)}
//       >
//         {showAddForm ? "Close Add Bus Form" : "Add New Bus"}
//       </button>

//       {showAddForm && (
//         <form className="add-bus-form" onSubmit={handleAddBus}>
//           <input
//             type="text"
//             placeholder="Bus Number"
//             value={busForm.busNumber}
//             onChange={(e) =>
//               setBusForm({ ...busForm, busNumber: e.target.value })
//             }
//             required
//           />
//           <input
//             type="number"
//             placeholder="Capacity"
//             value={busForm.capacity}
//             onChange={(e) =>
//               setBusForm({ ...busForm, capacity: e.target.value })
//             }
//             required
//           />
//           <input
//             type="text"
//             placeholder="From"
//             value={busForm.from}
//             onChange={(e) => setBusForm({ ...busForm, from: e.target.value })}
//             required
//           />
//           <input
//             type="text"
//             placeholder="To"
//             value={busForm.to}
//             onChange={(e) => setBusForm({ ...busForm, to: e.target.value })}
//             required
//           />
//           <button type="submit">Add Bus</button>
//         </form>
//       )}

//       <h2>All Buses</h2>
//       <div className="grid-container">
//         {buses.map((bus) => (
//           <div key={bus._id} className="card">
//             <p>
//               <strong>Number:</strong> {bus.busNumber}
//             </p>
//             <p>
//               <strong>Capacity:</strong> {bus.capacity}
//             </p>
//             <p>
//               <strong>Route:</strong> {bus.route.from} → {bus.route.to}
//             </p>
//             <button onClick={() => handleDeleteBus(bus._id)}>Delete</button>
//             {/* You can add edit form/modal logic here */}
//           </div>
//         ))}
//       </div>

//       <h2>Booking Details</h2>
//       {/* <div className="grid-container">
//         {users.map(user => (
//           <div key={user._id} className="card">
//             <p><strong>Email:</strong> {user.email}</p>
//             <p><strong>Role:</strong> {user.role}</p>
//           </div>
//         ))}
//       </div> */}
//       <div className="grid-container">
//         {bookings.map((booking) => (
//           <div key={booking._id} className="card">
//             <p>
//               <strong>Bus Number:</strong> {booking.bus.busNumber}
//             </p>
//             <p>
//               <strong>Route:</strong> {booking.bus.route.from} →{" "}
//               {booking.bus.route.to}
//             </p>
//             <p>
//               <strong>Date:</strong> {booking.date}
//             </p>
//             <p>
//               <strong>Status: {booking.status}</strong>
//             </p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

import { useEffect, useState } from "react";
import "./AdminDashboard.css";
import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  const [buses, setBuses] = useState([]);
  const [users, setUsers] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [editingBus, setEditingBus] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);

  const navigate = useNavigate();

  const [busForm, setBusForm] = useState({
    busNumber: "",
    capacity: "",
    from: "",
    to: "",
  });
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchBuses();
    fetchUsers();
    loadBookings();  // Fetch bookings on mount
  }, []);

  const fetchBuses = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/admin/bus", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to fetch buses");
      setBuses(data);
    } catch (err) {
      alert(err.message);
    }
  };

  const fetchUsers = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/user/booking", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to fetch users");
      setUsers(data);
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

  const handleAddBus = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/admin/bus", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          busNumber: busForm.busNumber,
          capacity: busForm.capacity,
          route: { from: busForm.from, to: busForm.to },
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to add bus");
      alert("Bus added successfully");
      setShowAddForm(false);
      setBusForm({ busNumber: "", capacity: "", from: "", to: "" });
      fetchBuses();
    } catch (err) {
      alert(err.message);
    }
  };

  const handleClick =()=>{
    navigate('/')
  }

  const handleDeleteBus = async (busId) => {
  try {
    const res = await fetch(`http://localhost:5000/api/admin/bus/${busId}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Failed to delete bus");
    alert("Bus deleted");
    setBuses(buses.filter((b) => b._id !== busId));
  } catch (err) {
    alert(err.message);
  }
};


  const handleEditBus = (bus) => {
  setEditingBus(bus);
  setShowAddForm(true);
  setBusForm({
    busNumber: bus.busNumber,
    capacity: bus.capacity,
    from: bus.route.from,
    to: bus.route.to
  });
};

const handleUpdateBus = async (e) => {
  e.preventDefault();
  try {
    const res = await fetch(`http://localhost:5000/api/admin/bus/${editingBus._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        busNumber: busForm.busNumber,
        capacity: busForm.capacity,
        route: { from: busForm.from, to: busForm.to }
      }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Failed to update bus");
    alert("Bus updated successfully");
    setEditingBus(null);
    setShowAddForm(false);
    setBusForm({ busNumber: "", capacity: "", from: "", to: "" });
    fetchBuses();
  } catch (err) {
    alert(err.message);
  }
};


  return (
    <div className="admin-dashboard">
      <button
        className="add-bus-btn"
        onClick={() => setShowAddForm(!showAddForm)}
      >
        {showAddForm ? "Close Add Bus Form" : "Add New Bus"}
      </button>

      {showAddForm && (
        <form className="add-bus-form" onSubmit={editingBus ? handleUpdateBus : handleAddBus}>
          <input
            type="text"
            placeholder="Bus Number"
            value={busForm.busNumber}
            onChange={(e) =>
              setBusForm({ ...busForm, busNumber: e.target.value })
            }
            required
          />
          <input
            type="number"
            placeholder="Capacity"
            value={busForm.capacity}
            onChange={(e) =>
              setBusForm({ ...busForm, capacity: e.target.value })
            }
            required
          />
          <input
            type="text"
            placeholder="From"
            value={busForm.from}
            onChange={(e) => setBusForm({ ...busForm, from: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="To"
            value={busForm.to}
            onChange={(e) => setBusForm({ ...busForm, to: e.target.value })}
            required
          />
          <button type="submit">Add Bus</button>
          
        </form>
      )}

      <div>
            <button className="my-bookings-btn" onClick={handleClick} >
        Logout
      </button>
          </div>

      {/* <h2>All Buses</h2> */}
      <div className="grid-container">
        {buses.map((bus) => (
          <div key={bus._id} className="card">
            <p><strong>Number:</strong> {bus.busNumber}</p>
            <p><strong>Capacity:</strong> {bus.capacity}</p>
            <p><strong>Route:</strong> {bus.route.from} → {bus.route.to}</p>
            <button onClick={() => handleDeleteBus(bus._id)}>Delete</button>
            <button onClick={() => handleEditBus(bus)}>Edit</button>
          </div>
        ))}
      </div>


      {/* <h2>All Users</h2>
      <div className="grid-container">
        {users.map((user) => (
          <div key={user._id} className="card">
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Role:</strong> {user.role}</p>
          </div>
        ))}
      </div> */}

      <h2>Booking Details</h2>
      
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
