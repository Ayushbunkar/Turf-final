import React, { useState, useEffect } from "react";
import axios from "axios";
import TopNavigation from "../components/Navigation/TopNavigation.jsx";
import SearchBar from "../components/Search/SearchBar.jsx";
import AdvancedFilters from "../components/Filters/AdvancedFilters.jsx";
import ReferralPanel from "../components/Referral/ReferralPanel.jsx";
import TurfCard from "../components/TurfCard/TurfCard.jsx";
import ChatWidgetToggle from "../components/Chat/ChatWidgetToggle.jsx";
import NotificationPanel from "../components/NotificationPanel.jsx";
import FloatingActionButtons from "../components/FloatingActionButtons.jsx";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import { useFilters } from "../hooks/useFilters";
import { useUserLocation } from "../hooks/useUserLocation";
import { shareTurf, getDirections, calculateCartTotal } from "../utils/turfUtils";
import { getDistanceFromGoogleMaps } from "../utils/googleMapsUtils";
import mockTurfs from "../mockTurfs";
import { Button } from "../components/ui/Button";
import { Search, RotateCcw } from "lucide-react";

const mapContainerStyle = { width: "100%", height: "100%" };
const defaultCenter = { lat: 19.076, lng: 72.8777 };

export default function Turfs() {
  const [turfs, setTurfs] = useState(mockTurfs);
  const [distances, setDistances] = useState({});
  const [selectedTurf, setSelectedTurf] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [viewMode, setViewMode] = useState("grid");
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [show, setShow] = useState({ filters: false, chat: false, notifications: false, referral: false });
  
  // ✅ Fixed JSON parsing from localStorage
  const [userProfile] = useState(() => {
    try {
      const stored = localStorage.getItem("user");
      return stored ? JSON.parse(stored) : { name: "Guest" };
    } catch (e) {
      console.error("Failed to parse user from localStorage:", e);
      return { name: "Guest" };
    }
  });

  const [referralCode, setReferralCode] = useState("");

  const userLocation = useUserLocation();

  // Load turfs from backend
  useEffect(() => {
    const fetchTurfs = async () => {
      try {
        const res = await axios.get("/api/turfs");
        setTurfs(Array.isArray(res.data) && res.data.length ? res.data : mockTurfs);
      } catch {
        setTurfs(mockTurfs);
      } finally {
        setLoading(false);
      }
    };
    fetchTurfs();
  }, []);

  // Calculate distance from user
  useEffect(() => {
    if (!userLocation || !turfs.length) return;
    (async () => {
      const newDistances = {};
      for (const turf of turfs) {
        const { lat, lng } = turf.location || {};
        if (lat && lng) {
          newDistances[turf.id] = await getDistanceFromGoogleMaps(userLocation, turf.location);
        }
      }
      setDistances(newDistances);
    })();
  }, [userLocation, turfs]);

  const {
    filters, setFilters, searchQuery, setSearchQuery, filteredTurfs, resetFilters,
  } = useFilters(Array.isArray(turfs) ? turfs : []);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
  });

  const handleBookSlot = (turfId, slot) => {
    const turf = turfs.find(t => t.id === turfId);
    if (!turf || !slot) return;

    const booking = {
      id: Date.now(),
      turfId,
      turfName: turf.name,
      timeSlot: slot.time,
      date: selectedDate,
      price: slot.price,
    };

    setCart([...cart, booking]);

    setTurfs(prev =>
      prev.map(t => t.id === turfId
        ? { ...t, timeSlots: t.timeSlots.map(s => s.time === slot.time ? { ...s, available: false } : s) }
        : t
      )
    );

    setNotifications(prev => [
      { id: Date.now(), message: `Slot ${slot.time} added for ${turf.name}`, type: "success" },
      ...prev,
    ]);
  };

  const toggleFavorite = id =>
    setFavorites(prev => prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]);

  return (
    <div className="pt-20 px-4 max-w-7xl mx-auto">
      <TopNavigation
        viewMode={viewMode}
        setViewMode={setViewMode}
        userProfile={userProfile}
        cart={cart}
        notifications={notifications}
        showNotifications={show.notifications}
        setShowNotifications={(val) => setShow({ ...show, notifications: val })}
      />

      <SearchBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        filters={filters}
        showFilters={show.filters}
        setShowFilters={(val) => setShow({ ...show, filters: val })}
        resetFilters={resetFilters}
        showReferral={show.referral}
        setShowReferral={(val) => setShow({ ...show, referral: val })}
        filteredTurfs={filteredTurfs}
        totalTurfs={turfs.length}
      />

      <AdvancedFilters
        filters={filters}
        setFilters={setFilters}
        showFilters={show.filters}
      />

      <ReferralPanel
        showReferral={show.referral}
        referralCode={referralCode}
        setReferralCode={setReferralCode}
      />

      {viewMode === "map" && isLoaded && (
        <div className="h-96 mb-8 rounded-lg overflow-hidden">
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            center={userLocation || defaultCenter}
            zoom={13}
          >
            {filteredTurfs.map((turf) => (
              <Marker
                key={turf.id}
                position={turf.location}
                onClick={() => setSelectedTurf(turf)}
              />
            ))}
          </GoogleMap>
        </div>
      )}

      {loading ? (
        <div className="text-center py-20 text-green-700 font-medium">Loading turfs...</div>
      ) : filteredTurfs.length === 0 ? (
        <div className="text-center py-12 border rounded-xl">
          <Search className="w-12 h-12 mx-auto text-green-500" />
          <h3 className="mt-4 text-xl font-semibold text-green-700">No turfs found</h3>
          <p className="text-green-600">Try adjusting your filters or search terms</p>
          <Button className="mt-4" onClick={resetFilters}>
            <RotateCcw className="w-4 h-4 mr-2" /> Reset Filters
          </Button>
        </div>
      ) : (
        <div className={viewMode === "list" ? "space-y-4" : "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"}>
          {filteredTurfs.map((turf) => (
            <TurfCard
              key={turf.id}
              turf={turf}
              viewMode={viewMode}
              favorites={favorites}
              toggleFavorite={toggleFavorite}
              shareTurf={(t) => shareTurf(t, setNotifications)}
              getDirections={(t) => getDirections(t, userLocation)}
              setSelectedTurf={setSelectedTurf}
              onBookSlot={handleBookSlot}
              distance={distances[turf.id]}
            />
          ))}
        </div>
      )}

      <ChatWidgetToggle showChat={show.chat} setShowChat={(val) => setShow({ ...show, chat: val })} />
      <NotificationPanel
        showNotifications={show.notifications}
        setShowNotifications={(val) => setShow({ ...show, notifications: val })}
        notifications={notifications}
      />
    </div>
  );
}
