// pages/flights.js
import React, { useState } from 'react';

const Flights = () => {
  const [departureCity, setDepartureCity] = useState('');
  const [destinationCity, setDestinationCity] = useState('');
  const [departureDate, setDepartureDate] = useState('');

  const handleSearch = () => {
    // Implement flight search logic here
    // You may use an API or mock data for demonstration
    console.log('Searching for flights...');
  };

  return (
    <div>
      <h1>Flight Search</h1>
      <form onSubmit={handleSearch}>
        <label>
          Departure City:
          <input
            type="text"
            value={departureCity}
            onChange={(e) => setDepartureCity(e.target.value)}
          />
        </label>
        <label>
          Destination City:
          <input
            type="text"
            value={destinationCity}
            onChange={(e) => setDestinationCity(e.target.value)}
          />
        </label>
        <label>
          Departure Date:
          <input
            type="date"
            value={departureDate}
            onChange={(e) => setDepartureDate(e.target.value)}
          />
        </label>
        <button type="submit">Search</button>
      </form>
    </div>
  );
};

export default Flights;
