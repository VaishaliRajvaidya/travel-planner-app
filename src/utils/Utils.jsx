const API_KEY = import.meta.env.VITE_GEOAPIFY_KEY;

// ✅ Get coordinates
export const getCoordinates = async (country, city) => {
  const query = `${city}, ${country}`;
  const url = `https://api.geoapify.com/v1/geocode/search?text=${query}&apiKey=${API_KEY}`;

  const res = await fetch(url);
  const data = await res.json();

  if (!data.features || data.features.length === 0) {
    throw new Error("Location not found!");
  }

  return {
    lon: data.features[0].geometry.coordinates[0],
    lat: data.features[0].geometry.coordinates[1],
  };
};

// ✅ Get tourist places
export const getTouristPlaces = async (lon, lat) => {
  const url = `https://api.geoapify.com/v2/places?categories=tourism.sights&filter=circle:${lon},${lat},5000&limit=12&apiKey=${API_KEY}`;

  const res = await fetch(url);
  const data = await res.json();

  if (!data.features) return [];
  return data.features;
};

export const getCountrySuggestions = async (text) => {
  if (!text) return [];
  const url = `https://api.geoapify.com/v1/geocode/autocomplete?text=${text}&type=country&limit=5&apiKey=${API_KEY}`;
  const res = await fetch(url);
  const data = await res.json();
  if (!data.features) return [];
  return data.features.map((place) => place.properties.country);
};

// ✅ Get city suggestions
export const getCitySuggestions = async (text, country = "") => {
  if (!text) return [];
  let url = `https://api.geoapify.com/v1/geocode/autocomplete?text=${text}&type=city&limit=5&apiKey=${API_KEY}`;

  
  if (country) {
    url = `https://api.geoapify.com/v1/geocode/autocomplete?text=${text}&filter=countrycode:${country}&type=city&limit=5&apiKey=${API_KEY}`;
  }

  const res = await fetch(url);
  const data = await res.json();
  if (!data.features) return [];
  return data.features.map((place) => place.properties.formatted);
};
export const getDirections = async (startLon, startLat, endLon, endLat, mode = "drive") => {
  const url = `https://api.geoapify.com/v1/routing?waypoints=${startLat},${startLon}|${endLat},${endLon}&mode=${mode}&apiKey=${API_KEY}`;

  const res = await fetch(url);
  const data = await res.json();

  if (!data.features || data.features.length === 0) {
    throw new Error("Directions not found!");
  }

  return data.features[0]; // route geometry + info
};
export const formatDuration = (seconds) => {
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  return `${hrs} hr ${mins} min`;
};