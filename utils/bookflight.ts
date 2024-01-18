// utils/api.js
import axios from 'axios';
import { amadeusApiKey } from '../config';
import {amadeusApiSecret } from '../config';
import { access } from 'fs';
let access_token = '';
let amadeusApi = axios.create({
  baseURL: 'https://test.api.amadeus.com/v2',
  headers: {
    Authorization: `Bearer ${access_token}`,
  },
});

export const searchFlights = async (params: any) => {
  try {
    
    const amadeusApi1 = await axios.post(
        'https://test.api.amadeus.com/v1/security/oauth2/token',
        'grant_type=client_credentials&client_id='+amadeusApiKey+'&client_secret='+amadeusApiSecret+'',
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }
      );

    let response = amadeusApi1.data.access_token;
    access_token = response;
    console.log('Access Token'+access_token);
    let amadeusApi = axios.create({
      baseURL: 'https://test.api.amadeus.com/v2',
      headers: {
        Authorization: `Bearer ${response}`,
      },
    });
    const response1 = await amadeusApi.get('/shopping/flight-offers', { params });
    
    return response1.data.data;
  } catch (error) {
    console.error('Error fetching flight data:', error);
    throw error;
  }
};
