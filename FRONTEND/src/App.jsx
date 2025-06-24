import { Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Bookings from './pages/Bookings';
import Admin from './pages/Admin';

export default function App() {
  return (
    <div>
      <nav>
        <Link to="/">Home</Link> | 
        <Link to="/bookings">My Bookings</Link> | 
        <Link to="/admin">Admin</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/bookings" element={<Bookings />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </div>
  );
}
