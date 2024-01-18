import React from 'react';

const SampleComponent = () => {
  // Sample data for demonstration
  const itineraryData = [
    {
      id: '1',
      itineraries: [
        {
          duration: '2h 30m',
          arrival: {
            iatacode: 'ABC',
            terminal: 'T1',
            at: '2024-01-18T12:00:00',
          },
          departure: {
            iatacode: 'XYZ',
            terminal: 'T2',
            at: '2024-01-18T09:30:00',
          },
        },
      ],
      price: {
        base: '100',
        currency: 'USD',
        grandTotal: '120',
      },
    },
    // Add more items as needed
  ];

  return (
    <div>
      {/* Render the data as needed */}
      {itineraryData.map((item) => (
        <div key={item.id}>
          <p>ID: {item.id}</p>
          <p>Itineraries:</p>
          <ul>
            {item.itineraries.map((itinerary, index) => (
              <li key={index}>
                <p>Duration: {itinerary.duration}</p>
                <p>Arrival:</p>
                <ul>
                  <li>IATACode: {itinerary.arrival.iatacode}</li>
                  <li>Terminal: {itinerary.arrival.terminal}</li>
                  <li>At: {itinerary.arrival.at}</li>
                </ul>
                <p>Departure:</p>
                <ul>
                  <li>IATACode: {itinerary.departure.iatacode}</li>
                  <li>Terminal: {itinerary.departure.terminal}</li>
                  <li>At: {itinerary.departure.at}</li>
                </ul>
              </li>
            ))}
          </ul>
          <p>Price:</p>
          <ul>
            <li>Base: {item.price.base}</li>
            <li>Currency: {item.price.currency}</li>
            <li>Grand Total: {item.price.grandTotal}</li>
          </ul>
        </div>
      ))}
    </div>
  );
};

export default SampleComponent;
