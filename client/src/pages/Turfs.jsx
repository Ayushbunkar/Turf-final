// src/pages/TurfsPage.jsx
"use client"

import { useState } from "react"
import { Button } from "../components/ui/Button.jsx"
import { Card } from "../components/ui/Card.jsx"
import { MapPin, Search, RotateCcw } from "lucide-react"

import TopNavigation from "../components/Navigation/TopNavigation"
import SearchBar from "../components/Search/SearchBar"
import AdvancedFilters from "../components/Filters/AdvancedFilters.jsx"
import ReferralPanel from "../components/ReferralPanel.jsx"
import TurfCard from "../components/TurfCard.jsx"
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

import {
  defaultUserProfile,
  defaultNotifications,
} from "../constants/appConstants"

import mockTurfs from "../constants/mockTurfs.js"

export default function TurfsPage() {
  const [turfs, setTurfs] = useState(mockTurfs)
  const [selectedTurf, setSelectedTurf] = useState(null)
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [viewMode, setViewMode] = useState("grid")
  const [showFilters, setShowFilters] = useState(false)
  const [showChat, setShowChat] = useState(false)
  const [favorites, setFavorites] = useState([])
  const [cart, setCart] = useState([])
  const [userProfile] = useState(defaultUserProfile)
  const [notifications, setNotifications] = useState(defaultNotifications)
  const [showNotifications, setShowNotifications] = useState(false)
  const [referralCode, setReferralCode] = useState("")
  const [showReferral, setShowReferral] = useState(false)

  const userLocation = useUserLocation()
  const {
    filters,
    setFilters,
    searchQuery,
    setSearchQuery,
    filteredTurfs,
    resetFilters,
  } = useFilters(turfs)

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
    <div className="min-h-screen bg-gradient-to-br pt-20 from-green-50 via-blue-50 to-purple-50 relative overflow-hidden">
      {/* Background Animation */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-green-400/20 to-blue-400/20 rounded-full animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-400/20 to-pink-400/20 rounded-full animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-yellow-400/10 to-orange-400/10 rounded-full animate-spin" style={{ animationDuration: "20s" }} />
      </div>

      <div className="relative z-10 p-4 max-w-7xl mx-auto">
        {/* Hero */}
        <div className="mb-8 text-center">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Find Your Perfect Turf
          </h1>
          <p className="text-xl text-gray-600">Book premium sports facilities with advanced features</p>

          <div className="flex justify-center space-x-8 mt-6">
            <Stats count={turfs.length} label="Premium Turfs" color="green" />
            <Stats count="24/7" label="Support" color="blue" />
            <Stats count="1000+" label="Happy Players" color="purple" />
          </div>
        </div>

        {/* Navigation + Search */}
        <TopNavigation {...{ viewMode, setViewMode, userProfile, cart, notifications, showNotifications, setShowNotifications }} />
        <SearchBar {...{ searchQuery, setSearchQuery, filters, showFilters, setShowFilters, resetFilters, showReferral, setShowReferral, filteredTurfs, totalTurfs: turfs.length }} />
        <AdvancedFilters {...{ filters, setFilters, showFilters }} />
        <ReferralPanel {...{ showReferral, referralCode, setReferralCode }} />

        {/* Map Mode */}
        {viewMode === "map" && (
          <Card className="mb-8 p-6 bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl">
            <div className="h-96 bg-gradient-to-br from-blue-100 to-green-100 rounded-xl flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-blue-200/50 to-green-200/50" />
              <div className="relative z-10 text-center">
                <MapPin className="h-16 w-16 text-blue-600 mx-auto mb-4 animate-bounce" />
                <h3 className="text-2xl font-bold text-gray-800 mb-2">Interactive Map View</h3>
                <p className="text-gray-600 mb-4">Google Maps integration would be implemented here</p>
                <div className="flex justify-center space-x-4">
                  {filteredTurfs.slice(0, 3).map((turf, index) => (
                    <div
                      key={turf.id}
                      className="bg-white p-3 rounded-lg shadow-md cursor-pointer hover:shadow-lg hover:scale-105 transition"
                      style={{ position: "absolute", left: `${20 + index * 15}%`, top: `${30 + index * 10}%` }}
                      onClick={() => setSelectedTurf(turf)}
                    >
                      <div className="text-sm font-semibold">{turf.name}</div>
                      <div className="text-xs text-gray-500">₹{turf.price}/hr</div>
                      <div className="flex items-center text-xs">
                        <div className="h-3 w-3 bg-yellow-400 rounded-full mr-1" />{turf.rating}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        )}

        {/* Turf Cards */}
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
            />
          ))}
        </div>

        {/* No Results */}
        {filteredTurfs.length === 0 && (
          <div className="text-center py-16">
            <div className="w-32 h-32 mx-auto mb-6 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center">
              <Search className="h-16 w-16 text-gray-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">No turfs found</h3>
            <p className="text-gray-600 mb-6">Try adjusting your filters or search criteria</p>
            <Button variant="outline" className="rounded-xl bg-white hover:bg-gray-50" onClick={resetFilters}>
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
    <div className={`text-2xl font-bold text-${color}-600`}>{count}</div>
    <div className="text-sm text-gray-500">{label}</div>
  </div>
)
