// utils/apiUtils.js
import axios from 'axios';

const GEOCODE_API = 'https://maps.googleapis.com/maps/api/geocode/json';
const PLACES_API = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json';

const API_KEY = import.meta.env.VITE_MAP_EMBED_API_KEY;

export const getCoordinates = async (city, country) => {
  try {
    const address = `${city}, ${country}`;
    const response = await axios.get(GEOCODE_API, {
      params: {
        address,
        key: API_KEY,
      },
    });

    if (response.data.status === 'OK') {
      return response.data.results[0].geometry.location;
    } else {
      throw new Error('Geocoding failed');
    }
  } catch (error) {
    throw new Error(`Geocoding error: ${error.message}`);
  }
};

export const getNearbyPlaces = async (location, type = 'tourist_attraction') => {
  try {
    const { lat, lng } = location;
    const response = await axios.get(PLACES_API, {
      params: {
        location: `${lat},${lng}`,
        radius: 5000,
        type,
        key: API_KEY,
      },
    });

    if (response.data.status === 'OK') {
      return response.data.results;
    } else {
      throw new Error('Places search failed');
    }
  } catch (error) {
    throw new Error(`Places error: ${error.message}`);
  }
};
