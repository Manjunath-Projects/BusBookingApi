import { useState } from 'react';

export default function Home() {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [date, setDate] = useState('');
  const [loading, setLoading] = useState(false);
  const [searchResults, setSearchResults] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`http://localhost:5000/api/admin/bus/search?from=${from}&to=${to}`, {
        headers: { Authorization: `Bearer ${yourToken}` }
      });
      if (!res.ok) throw new Error('Search failed');
      const data = await res.json();
      setSearchResults(data);
    } catch (err) {
      console.error(err);
      alert('No buses found or error occurred');
    }
    setLoading(false);
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-blue-100 flex flex-col items-center justify-center p-6">
      <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-2xl">
        <h1 className="text-3xl md:text-4xl font-extrabold text-center text-blue-600 mb-8">
          Search Buses
        </h1>
        <form 
          onSubmit={handleSearch} 
          className="flex flex-col md:flex-row gap-4"
        >
          <input
            type="text"
            placeholder="From"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            required
            className="flex-1 p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-4 focus:ring-blue-300 transition"
          />
          <input
            type="text"
            placeholder="To"
            value={to}
            onChange={(e) => setTo(e.target.value)}
            required
            className="flex-1 p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-4 focus:ring-blue-300 transition"
          />
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
            className="flex-1 p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-4 focus:ring-blue-300 transition"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition shadow-md"
          >
            Search
          </button>
        </form>

        {loading && <div className="mt-4 text-blue-600 font-semibold">Searching...</div>}

        {searchResults && (
          <div className="mt-8 grid gap-4">
            {searchResults.map(bus => (
              <div key={bus._id} className="border rounded-lg p-4 shadow-sm bg-white">
                <div className="font-bold text-lg">{bus.busNumber}</div>
                <div className="text-gray-600">{bus.route.from} → {bus.route.to}</div>
                <div className="text-sm">Capacity: {bus.capacity}</div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
