// pages/flight-search.js
import { useState } from 'react';
import { searchFlights } from '../utils/api';

const FlightSearch = () => {
  // Set default search parameters using React state
  const [searchParams, setSearchParams] = useState({
    originLocationCode: 'SYD',
    destinationLocationCode: 'BKK',
    departureDate: '2024-02-05', // Replace with your desired date format
    adults: 1
  });

  // Initialize variables to store flight data and data for printing
  let flightData: any = null;
  const [dataToPrint, setDataToPrint] = useState<any>(null);

  // Handle flight search event
  const handleSearch = async () => {
    try {
      // Perform flight search using API
      flightData = await searchFlights(searchParams);

      // Log flight search results and update data for printing
      console.log('Flight search results:', flightData);
      setDataToPrint(flightData);
      
    } catch (error) {
      // Handle error if flight search fails
      console.error('Error during flight search:', error);
    }
  };

  return (
    <div>
      <h1>Flight Search</h1>
      <form>
        {/* Input fields for origin, destination, departure date, and number of adults */}
        <label>
          Origin:
          <input
            type="text"
            value={searchParams.originLocationCode}
            onChange={(e) => setSearchParams({ ...searchParams, originLocationCode: e.target.value })}
          />
        </label>
        <label>
          Destination:
          <input
            type="text"
            value={searchParams.destinationLocationCode}
            onChange={(e) => setSearchParams({ ...searchParams, destinationLocationCode: e.target.value })}
          />
        </label>
        <label>
          Departure Date:
          <input
            type="date"
            value={searchParams.departureDate}
            onChange={(e) => setSearchParams({ ...searchParams, departureDate: e.target.value })}
          />
        </label>
        <label>
          Adults:
          <input
            type="number"
            value={searchParams.adults}
            onChange={(e) => setSearchParams({ ...searchParams, adults: parseInt(e.target.value) })}
          />
        </label>
        {/* Button to trigger flight search */}
        <button type="button" onClick={handleSearch}>
          Search Flights
        </button>
      </form>

      {/* Display flight search results if available */}
      <div>
        {dataToPrint != null && (
          <div style={{ textAlign: 'center' }}>
            {/* Flight result table */}
            <table style={{ margin: '0 auto', width: '80%' }}>
              <thead>
                <tr>
                  {/* Table headers */}
                  <td>id</td>
                  <td>Price</td>
                  <td>Cur</td>
                  <td>For</td>
                  <td>Avail Seats</td>
                  <td>Last Ticketing Date</td>
                </tr>
              </thead>
              <tbody>
                {/* Iterate through flight data and display details in the table */}
                {dataToPrint.data.map((element: any) => (
                  <tr key={element.id}>
                    <td>{element.id}</td>
                    <td>{element.price.total}</td>
                    <td>{element.price.currency}</td>
                    <td>{element.travelerPricings.length > 0 && element.travelerPricings[0].travelerType}</td>
                    <td>{element.numberOfBookableSeats}</td>
                    <td>{element.lastTicketingDate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default FlightSearch;
