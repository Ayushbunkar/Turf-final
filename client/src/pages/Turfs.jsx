// src/pages/TurfsPage.jsx

import React from "react";

import { useState } from "react"
import { Button } from "../components/ui/Button.jsx"
import { Card } from "../components/ui/Card.jsx"
import { MapPin, Search, RotateCcw } from "lucide-react"

import TopNavigation from "../components/Navigation/TopNavigation"
import SearchBar from "../components/Search/SearchBar"
import AdvancedFilters from "../components/Filters/AdvancedFilters.jsx"
import ReferralPanel from "../components/ReferralPanel.jsx"
import TurfCard from "../components/TurfCard/TurfCard.jsx"
import ChatWidget from "../components/ChatWidget.jsx"
import NotificationPanel from "../components/NotificationPanel.jsx"
import FloatingActionButtons from "../components/FloatingActionButtons.jsx"

import { useFilters } from "../hooks/useFilters"
import { useUserLocation } from "../hooks/useUserLocation"

import {
  shareTurf,
  getDirections,
  calculateCartTotal,
} from "../utils/turfUtils"
import { getDistanceFromGoogleMaps } from "../utils/googleMapsUtils.js"

import {
  defaultNotifications,
} from "../constants/appConstants"

import mockTurfs from "../constants/mockTurfs.js"

import {
  GoogleMap,
  useLoadScript,
  Marker,
} from "@react-google-maps/api"

const mapContainerStyle = {
  width: "100%",
  height: "100%",
}

const defaultCenter = {
  lat: 19.076,
  lng: 72.8777,
}

export default function TurfsPage() {
  const [turfs, setTurfs] = useState(mockTurfs)
  const [distances, setDistances] = useState({})
  const [selectedTurf, setSelectedTurf] = useState(null)
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [viewMode, setViewMode] = useState("grid")
  const [showFilters, setShowFilters] = useState(false)
  const [showChat, setShowChat] = useState(false)
  const [favorites, setFavorites] = useState([])
  const [cart, setCart] = useState([])
  const [userProfile, setUserProfile] = useState(() => {
    const storedUser = localStorage.getItem("user")
    return storedUser ? JSON.parse(storedUser) : { name: "Guest" }
  })
  const [notifications, setNotifications] = useState(defaultNotifications)
  const [showNotifications, setShowNotifications] = useState(false)
  const [referralCode, setReferralCode] = useState("")
  const [showReferral, setShowReferral] = useState(false)

  const userLocation = useUserLocation()

  // Fetch real-time distances when turfs or userLocation change
  React.useEffect(() => {
    async function fetchDistances() {
      if (!userLocation || !turfs.length) return;
      const newDistances = {};
      for (const turf of turfs) {
        if (
          turf.location &&
          typeof turf.location.lat === "number" &&
          typeof turf.location.lng === "number"
        ) {
          const distance = await getDistanceFromGoogleMaps(userLocation, turf.location);
          newDistances[turf.id] = distance;
        } else {
          newDistances[turf.id] = null;
        }
      }
      setDistances(newDistances);
    }
    fetchDistances();
  }, [userLocation, turfs]);
  const {
    filters,
    setFilters,
    searchQuery,
    setSearchQuery,
    filteredTurfs,
    resetFilters,
  } = useFilters(turfs)

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
  })

  const handleBookSlot = (turfId, slot) => {
    const turf = turfs.find((t) => t.id === turfId)
    if (!turf || !slot) return

    const booking = {
      id: Date.now(),
      turfId,
      turfName: turf.name,
      timeSlot: slot.time,
      date: selectedDate,
      price: slot.price,
      equipment: [],
      details: {},
    }

    setCart([...cart, booking])
    setTurfs(prev => prev.map(t =>
      t.id === turfId
        ? { ...t, timeSlots: t.timeSlots.map(s => s.time === slot.time ? { ...s, available: false } : s) }
        : t
    ))

    setNotifications(prev => [
      {
        id: Date.now(),
        message: `Slot ${slot.time} added to cart for ${turf.name}`,
        type: "success",
        time: "Just now",
      },
      ...prev,
    ])
  }

  const toggleFavorite = (id) =>
    setFavorites(prev => prev.includes(id) ? prev.filter(fid => fid !== id) : [...prev, id])

  const cartTotal = calculateCartTotal(cart)

  return (
    <div className="min-h-screen bg-gradient-to-br pt-20 from-green-50 via-green-100 to-green-200 relative overflow-hidden">
      {/* Background Animation */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-green-300/30 rounded-full animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-green-500/20 rounded-full animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-green-100/20 rounded-full animate-spin" style={{ animationDuration: "20s" }} />
      </div>

      <div className="relative z-10 p-4 max-w-7xl mx-auto">
        {/* Hero */}
        <div className="mb-12 text-center bg-gradient-to-r from-green-700 via-green-600 to-green-500 p-8 rounded-2xl shadow-lg border-4 border-green-600 animate-fade-in-up">
          <h1 className="text-5xl font-extrabold tracking-tight text-white mb-4 animate-fade-in">
            Unlock Your Game Zone
          </h1>
          <p className="text-lg md:text-xl text-white/80 animate-fade-in delay-100">
            Explore & book top-notch turf arenas with ease and flair.
          </p>
          <div className="flex justify-center space-x-8 mt-6 animate-fade-in delay-200">
            <Stats count={turfs.length} label="Turfs Available" color="white" />
            <Stats count="24/7" label="Customer Support" color="white" />
            <Stats count="1.2K+" label="Players Joined" color="white" />
          </div>
        </div>

        {/* Navigation + Search */}
        <TopNavigation {...{ viewMode, setViewMode, userProfile, cart, notifications, showNotifications, setShowNotifications }} />
        <div className="">
          <SearchBar {...{ searchQuery, setSearchQuery, filters, showFilters, setShowFilters, resetFilters, showReferral, setShowReferral, filteredTurfs, totalTurfs: turfs.length }} />
        </div>
        <AdvancedFilters {...{ filters, setFilters, showFilters }} />
        <ReferralPanel {...{ showReferral, referralCode, setReferralCode }} />

        {/* Map Mode */}
        {viewMode === "map" && (
          <Card className="mb-8 p-6 bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border-4 border-green-500">
            <div className="h-96 rounded-xl overflow-hidden relative z-10">
              {isLoaded && (
                <GoogleMap
                  mapContainerStyle={mapContainerStyle}
                  center={userLocation || defaultCenter}
                  zoom={13}
                >
                  {filteredTurfs.map((turf) => (
                    <Marker
                      key={turf.id}
                      position={{ lat: turf.location.lat, lng: turf.location.lng }}
                      onClick={() => setSelectedTurf(turf)}
                    />
                  ))}
                </GoogleMap>
              )}
            </div>
          </Card>
        )}

        
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

        {filteredTurfs.length === 0 && (
          <div className="text-center py-16 border-2 border-green-500 rounded-2xl">
            <div className="w-32 h-32 mx-auto mb-6 bg-gradient-to-br from-green-100 to-green-200 rounded-full flex items-center justify-center border-4 border-green-500">
              <Search className="h-16 w-16 text-green-400" />
            </div>
            <h3 className="text-2xl font-bold text-green-700 mb-2">No turfs found</h3>
            <div className="mb-6 text-green-600">Try adjusting your filters or search criteria</div>
            <Button variant="outline" className="rounded-xl bg-white border-2 border-green-500 text-green-700 hover:bg-green-50" onClick={resetFilters}>
              <RotateCcw className="h-4 w-4 mr-2" />
              Clear All Filters
            </Button>
          </div>
        )}

        {/* Extras */}
        <FloatingActionButtons setShowChat={setShowChat} />
        <ChatWidget {...{ showChat, setShowChat }} />
        <NotificationPanel {...{ showNotifications, setShowNotifications, notifications }} />
      </div>
    </div>
  )
}

// Stats component
const Stats = ({ count, label, color }) => (
  <div className="text-center">
    <div className={`text-2xl font-bold text-${color}-400 animate-fade-in`}>{count}</div>
    <div className="text-sm text-white/70 animate-fade-in delay-100">{label}</div>
  </div>
)
