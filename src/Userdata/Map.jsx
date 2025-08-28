import React, { useState } from "react";
import Map, { Marker, Source, Layer } from "react-map-gl/maplibre";
import maplibregl from "maplibre-gl";
import Navbar from "../Pages/Navbar";
import { getCoordinates, getCitySuggestions } from "../utils/Utils";

const MapPage = () => {
  const [waypoints, setWaypoints] = useState([
    { value: "", coords: null, suggestions: [] }, // Start
    { value: "", coords: null, suggestions: [] }, // End
  ]);
  const [routeGeoJson, setRouteGeoJson] = useState(null);

  const API_KEY = import.meta.env.VITE_GEOAPIFY_KEY;

  // Handle input change for any waypoint
  const handleWaypointChange = async (idx, e) => {
    const value = e.target.value;
    const updated = [...waypoints];
    updated[idx].value = value;
    updated[idx].coords = null;
    updated[idx].suggestions = [];
    setRouteGeoJson(null);
    if (value) {
      const results = await getCitySuggestions(value);
      updated[idx].suggestions = results;
    }
    setWaypoints(updated);
  };

  // Select city from suggestions for any waypoint
  const selectWaypoint = async (idx, city) => {
    const updated = [...waypoints];
    updated[idx].value = city;
    updated[idx].suggestions = [];
    const coords = await getCoordinates("", city);
    updated[idx].coords = coords;
    setRouteGeoJson(null);
    setWaypoints(updated);
  };

  // Remove a waypoint (not start/end)
  const handleRemoveWaypoint = (idx) => {
    if (idx === 0 || idx === waypoints.length - 1) return;
    const updated = waypoints.filter((_, i) => i !== idx);
    setWaypoints(updated);
  };

  // Show Directions button handler
  const handleShowDirections = async () => {
    setRouteGeoJson(null);
    // All waypoints must have coords
    if (waypoints.some((w) => !w.coords)) {
      alert("Please select all locations.");
      return;
    }
    // Build waypoints string: lat,lon|lat,lon
    const waypointsStr = waypoints
      .map((w) => `${w.coords.lat},${w.coords.lon}`)
      .join("|");
    const url = `https://api.geoapify.com/v1/routing?waypoints=${waypointsStr}&mode=drive&apiKey=${API_KEY}`;
    const res = await fetch(url);
    const data = await res.json();
    if (data.features && data.features.length > 0) {
      setRouteGeoJson(data.features[0]);
    } else {
      alert("Route not found!");
    }
  };

  // Layer style for the live route line
  const routeLayer = {
    id: "route",
    type: "line",
    paint: {
      "line-color": "#0074D9",
      "line-width": 4,
    },
  };

  // Map center logic (center on first waypoint or India)
  let center = { longitude: 78.9629, latitude: 20.5937, zoom: 4 };
  const filled = waypoints.filter((w) => w.coords);
  if (filled.length === 1) {
    center = { longitude: filled[0].coords.lon, latitude: filled[0].coords.lat, zoom: 6 };
  }
  if (filled.length > 1) {
    const lons = filled.map((w) => w.coords.lon);
    const lats = filled.map((w) => w.coords.lat);
    center = {
      longitude: (Math.min(...lons) + Math.max(...lons)) / 2,
      latitude: (Math.min(...lats) + Math.max(...lats)) / 2,
      zoom: 5,
    };
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-green-100">
      <Navbar />
      <div className="text-center py-10">
        <h1 className="text-4xl font-bold text-green-700 mt-15 mb-4">
          Live Directions Map 🗺️
        </h1>
        <p className="text-gray-600">
          Enter start and end locations. Click "Show Directions" to see the route!
        </p>
      </div>

      {/* Waypoints Inputs + Suggestions */}
      <div className="flex flex-col md:flex-row justify-center items-center gap-2 mb-6 px-4 relative">
        {waypoints.map((wp, idx) => (
          <div key={idx} className="relative w-full md:w-96 flex items-center mb-2">
            <input
              type="text"
              value={wp.value}
              onChange={(e) => handleWaypointChange(idx, e)}
              placeholder={
                idx === 0
                  ? "Start location"
                  : "End location"
              }
              className="border border-green-400 px-4 py-2 rounded-lg w-full outline-none focus:ring-2 focus:ring-green-300"
            />
            {wp.suggestions.length > 0 && (
              <ul className="absolute top-full left-0 right-0 bg-white border border-gray-300 rounded-b-lg max-h-48 overflow-y-auto z-50">
                {wp.suggestions.map((s, sidx) => (
                  <li
                    key={sidx}
                    className="p-2 hover:bg-green-100 cursor-pointer"
                    onClick={() => selectWaypoint(idx, s)}
                  >
                    {s}
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
        <button
          onClick={handleShowDirections}
          className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition"
        >
          Show Directions
        </button>
      </div>
      {/* Dynamic Map */}
      <div className="flex justify-center mb-10">
        <div className="w-[90%] md:w-[80%] h-[500px] rounded-xl shadow-lg overflow-hidden">
          <Map
            style={{ width: "100%", height: "100%" }}
            initialViewState={center}
            mapStyle={`https://maps.geoapify.com/v1/styles/osm-carto/style.json?apiKey=${API_KEY}`}
            mapLib={maplibregl}
          >
            {/* Markers for all waypoints */}
            {waypoints.map(
              (wp, idx) =>
                wp.coords && (
                  <Marker
                    key={idx}
                    longitude={wp.coords.lon}
                    latitude={wp.coords.lat}
                    anchor="bottom"
                  >
                    <div
                      className={`w-5 h-5 rounded-full border-2 border-white ${
                        idx === 0
                          ? "bg-green-500"
                          : "bg-red-500"
                      }`}
                    />
                  </Marker>
                )
            )}
            {/* Live Route Line */}
            {routeGeoJson && (
              <Source id="route" type="geojson" data={routeGeoJson}>
                <Layer {...routeLayer} />
              </Source>
            )}
          </Map>
        </div>
      </div>
    </div>
  );
};

export default MapPage;