

# Flight Search App

This React application allows users to search for flights using the Amadeus API. The application consists of two main components: `FlightSearch` and `api.js`. The `FlightSearch` component provides a user interface for entering search parameters and displays the flight search results. The `api.js` file contains the logic for interacting with the Amadeus API to perform flight searches.

## Getting Started

1. Clone the repository to your local machine:

```bash
git clone <repository-url>
cd <repository-directory>
```

2. Install dependencies:

```bash
npm install
```

3. Set up Amadeus API credentials:

   - Obtain your Amadeus API key and secret from the Amadeus developer portal.
   - Create a `config.js` file in the project root and export your API key and secret:

   ```javascript
   // config.js
   export const amadeusApiKey = 'your-api-key';
   export const amadeusApiSecret = 'your-api-secret';
   ```

4. Run the application:

```bash
npm start
```

Visit [http://localhost:3000](http://localhost:3000) in your browser to use the Flight Search App.

## Components

### `FlightSearch` (flight-search.js)

- Provides a form for users to enter flight search parameters.
- Handles user input and triggers a flight search using the `searchFlights` function from `api.js`.
- Displays flight search results in a table.

### `api.js`

- Handles communication with the Amadeus API.
- Obtains an access token using client credentials and updates the axios instance with the token.
- Defines the `searchFlights` function to perform flight searches and format the data for the frontend.

## Notes

- The application uses React and Axios for making API requests.
- Flight search results are displayed in a table format.
- Error handling is implemented for API requests to handle potential issues.

Feel free to customize the application and add additional features as needed.

```

Adjust the content as necessary based on your project structure and additional information you may want to include.