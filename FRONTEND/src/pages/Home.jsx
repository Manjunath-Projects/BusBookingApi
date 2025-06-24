import { useState } from 'react';

export default function Home() {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [date, setDate] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    console.log(`Searching buses from ${from} to ${to} on ${date}`);
    // Call your API here
  };

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
      </div>
    </div>
  );
}
