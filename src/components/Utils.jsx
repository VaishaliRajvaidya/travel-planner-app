
import axios from "axios";


const Utils = axios.create({});

const GOOGLE_MAPS_API_KEY = "";

export async function geocodeAddress(address) {
  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${GOOGLE_MAPS_API_KEY}`;
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error("Geocoding error:", error);
    return null;
  }
}

export default Utils;