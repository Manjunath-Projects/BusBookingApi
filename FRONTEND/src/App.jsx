import { Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Bookings from './pages/Bookings';
import Admin from './pages/Admin';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import AdminDashboard from './pages/AdminDashboard';

export default function App() {
  return (
    <div>
      {/* <nav className="bg-blue-600 text-white shadow-md">
  <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
    <div className="text-xl font-bold">NammBus</div>
    <div className="space-x-4">
      <Link to="/" className="hover:underline">Home</Link>
      <Link to="/bookings" className="hover:underline">My Bookings</Link>
      <Link to="/auth" className="hover:underline">Login</Link>
    </div>
  </div>
</nav> */}
      <div className="bg-gray-50 min-h-screen">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Login />} />
        <Route path="/bookings" element={<Bookings />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
      </Routes>
    </div>
    </div>
  );
}
