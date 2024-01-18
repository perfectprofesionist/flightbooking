// utils/api.js
import axios from 'axios';
import { amadeusApiKey } from '../config';
import { amadeusApiSecret } from '../config';

// Variable to store the access token obtained from Amadeus API
let access_token = '';

// Create an initial instance of axios with the base URL and initial access token header
let amadeusApi = axios.create({
  baseURL: 'https://test.api.amadeus.com/v2',
  headers: {
    Authorization: `Bearer ${access_token}`,
  },
});

// Function to perform flight search using the Amadeus API
export const searchFlights = async (params: any) => {
  try {
    // Obtain a new access token using client credentials
    const amadeusApiTokenResponse = await axios.post(
      'https://test.api.amadeus.com/v1/security/oauth2/token',
      `grant_type=client_credentials&client_id=${amadeusApiKey}&client_secret=${amadeusApiSecret}`,
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );

    // Extract the access token from the token response
    const responseAccessToken = amadeusApiTokenResponse.data.access_token;

    // Update the global access_token variable
    access_token = responseAccessToken;

    // Create a new axios instance with the updated access token header
    let amadeusApi = axios.create({
      baseURL: 'https://test.api.amadeus.com/v2',
      headers: {
        Authorization: `Bearer ${responseAccessToken}`,
      },
    });

    // Make a request to the flight search endpoint with the provided parameters
    const responseFlightSearch = await amadeusApi.get('/shopping/flight-offers', { params });

    // Prepare the data to be sent to the frontend
    let dataToSend = {
      'data': [],
      'dictionaries': [],
    };

    // Copy flight data and dictionaries from the response to the dataToSend object
    for (let i = 0; i < responseFlightSearch.data.data.length; i++) {
      dataToSend['data'][i] = responseFlightSearch.data.data[i];
    }
    dataToSend['dictionaries'] = responseFlightSearch.data.dictionaries;

    // Return the formatted data to be displayed in the frontend
    return dataToSend;
  } catch (error) {
    // Handle errors during the flight search process
    console.error('Error fetching flight data:', error);
    throw error;
  }
};
