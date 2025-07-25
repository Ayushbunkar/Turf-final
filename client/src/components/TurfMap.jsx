import React, { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { getDistance } from "geolib";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// Fix leaflet icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: new URL("leaflet/dist/images/marker-icon-2x.png", import.meta.url).href,
  iconUrl: new URL("leaflet/dist/images/marker-icon.png", import.meta.url).href,
  shadowUrl: new URL("leaflet/dist/images/marker-shadow.png", import.meta.url).href,
});

function ChangeView({ center }) {
  const map = useMap();
  useEffect(() => {
    if (center) {
      map.setView(center);
    }
  }, [center, map]);
  return null;
}

const TurfMap = () => {
  const [userLocation, setUserLocation] = useState(null);
  const [turfs, setTurfs] = useState([]);
  const [radius, setRadius] = useState(10); // default 10km
  const navigate = useNavigate();

  // Get user geolocation
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setUserLocation({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
      },
      () => alert("Geolocation blocked or unavailable."),
      { enableHighAccuracy: true }
    );
  }, []);

  // Fetch all turfs
  useEffect(() => {
    axios.get("/api/turfs")
      .then((res) => setTurfs(res.data))
      .catch((err) => console.error("Failed to fetch turfs", err));
  }, []);

  // Filter turfs within given radius
  const filteredTurfs = userLocation
    ? turfs.filter((turf) => {
        const turfCoords = { latitude: turf.lat, longitude: turf.lng };
        const userCoords = {
          latitude: userLocation.lat,
          longitude: userLocation.lng,
        };
        const dist = getDistance(userCoords, turfCoords) / 1000; // meters to km
        return dist <= radius;
      })
    : turfs;

  return (
    <div className="pt-20 px-2">
      <div className="mb-2 flex gap-4 items-center">
        <label htmlFor="radius" className="text-sm">Filter Radius (km):</label>
        <select
          id="radius"
          className="border px-2 py-1"
          value={radius}
          onChange={(e) => setRadius(parseInt(e.target.value))}
        >
          <option value={2}>2km</option>
          <option value={5}>5km</option>
          <option value={10}>10km</option>
          <option value={20}>20km</option>
          <option value={50}>50km</option>
        </select>
      </div>

      {userLocation && (
        <MapContainer
          key={JSON.stringify({ radius, userLocation })} // Reset map if center/radius changes
          center={[userLocation.lat, userLocation.lng]}
          zoom={13}
          scrollWheelZoom
          style={{ height: "80vh", width: "100%" }}
        >
          <ChangeView center={[userLocation.lat, userLocation.lng]} />
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; OpenStreetMap contributors"
          />

          <Marker position={[userLocation.lat, userLocation.lng]}>
            <Popup>You are here</Popup>
          </Marker>

          {filteredTurfs.map((turf) => (
            <Marker
              key={turf._id}
              position={[turf.lat, turf.lng]}
              eventHandlers={{
                click: () => navigate(`/turfs/${turf._id}`),
              }}
            >
              <Popup>
                <strong>{turf.name}</strong><br />
                {turf.address}
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      )}

      {!userLocation && (
        <div className="text-center py-20 text-gray-500">Fetching your location...</div>
      )}
    </div>
  );
};

export default TurfMap;
