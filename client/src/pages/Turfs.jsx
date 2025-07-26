"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { MapPin, Search, Sun, Cloud, CloudRain, Wind, RotateCcw } from "lucide-react"

// Enhanced mock data with comprehensive features
const mockTurfs = [
  {
    id: 1,
    name: "Elite Sports Arena",
    address: "123 Sports Complex, Downtown",
    distance: 2.5,
    price: 1200,
    rating: 4.8,
    reviews: 156,
    images: [
      "/placeholder.svg?height=400&width=600&text=Elite+Arena+Main+View",
      "/placeholder.svg?height=400&width=600&text=Elite+Arena+Night+Lights",
      "/placeholder.svg?height=400&width=600&text=Elite+Arena+Facilities",
      "/placeholder.svg?height=400&width=600&text=Elite+Arena+Changing+Room",
      "/placeholder.svg?height=400&width=600&text=Elite+Arena+Parking",
      "/placeholder.svg?height=400&width=600&text=Elite+Arena+Cafeteria",
    ],
    videoTour: "/placeholder.svg?height=300&width=500&text=Elite+Arena+Video+Tour",
    amenities: [
      "Free Parking",
      "High-Speed WiFi",
      "Premium Changing Rooms",
      "LED Floodlights",
      "24/7 CCTV",
      "First Aid Station",
      "Modern Cafeteria",
      "AC Lounge",
      "Equipment Storage",
      "Referee Room",
      "Spectator Seating",
      "Sound System",
    ],
    coordinates: { lat: 28.6139, lng: 77.209 },
    phone: "+91 9876543210",
    email: "elite@sports.com",
    website: "https://elitesports.com",
    description: "Premium artificial turf with professional lighting and world-class facilities for serious players.",
    detailedDescription:
      "Our state-of-the-art facility features FIFA-approved artificial turf, professional floodlighting system, and comprehensive amenities. Perfect for tournaments, corporate events, and regular training sessions.",
    openingHours: "05:00 AM - 11:00 PM",
    capacity: 22,
    surface: "Artificial Grass",
    size: "100x60 meters",
    established: "2018",
    owner: "Elite Sports Pvt Ltd",
    socialMedia: {
      facebook: "https://facebook.com/elitesports",
      instagram: "https://instagram.com/elitesports",
      twitter: "https://twitter.com/elitesports",
      youtube: "https://youtube.com/elitesports",
    },
    weatherDependent: false,
    loyaltyPoints: 120,
    groupDiscounts: [
      { minPeople: 10, discount: 10 },
      { minPeople: 20, discount: 15 },
      { minPeople: 30, discount: 20 },
    ],
    equipment: [
      {
        name: "Professional Football",
        price: 50,
        available: 10,
        image: "/placeholder.svg?height=100&width=100&text=Football",
      },
      { name: "Training Bibs", price: 20, available: 30, image: "/placeholder.svg?height=100&width=100&text=Bibs" },
      { name: "Training Cones", price: 30, available: 20, image: "/placeholder.svg?height=100&width=100&text=Cones" },
      { name: "Portable Goals", price: 100, available: 4, image: "/placeholder.svg?height=100&width=100&text=Goals" },
    ],
    tournaments: [
      { name: "Weekend League", date: "2024-02-15", prize: "₹50,000", participants: 16, status: "upcoming" },
      { name: "Corporate Cup", date: "2024-03-01", prize: "₹1,00,000", participants: 32, status: "registration" },
    ],
    weather: {
      temperature: 28,
      condition: "sunny",
      humidity: 65,
      windSpeed: 12,
      forecast: [
        { day: "Today", temp: 28, condition: "sunny" },
        { day: "Tomorrow", temp: 26, condition: "cloudy" },
        { day: "Day After", temp: 30, condition: "sunny" },
      ],
    },
    timeSlots: [
      { time: "06:00-07:00", available: true, price: 1000, demand: "low", bookings: 2 },
      { time: "07:00-08:00", available: false, price: 1200, demand: "high", bookings: 8 },
      { time: "08:00-09:00", available: true, price: 1200, demand: "medium", bookings: 5 },
      { time: "09:00-10:00", available: true, price: 1000, demand: "low", bookings: 3 },
      { time: "17:00-18:00", available: true, price: 1500, demand: "high", bookings: 7 },
      { time: "18:00-19:00", available: false, price: 1500, demand: "high", bookings: 10 },
      { time: "19:00-20:00", available: true, price: 1800, demand: "very-high", bookings: 9 },
      { time: "20:00-21:00", available: true, price: 1800, demand: "very-high", bookings: 8 },
    ],
    reviewsList: [
      {
        id: 1,
        user: "Rahul Sharma",
        avatar: "/placeholder.svg?height=40&width=40&text=RS",
        rating: 5,
        comment:
          "Excellent facility with great maintenance. The artificial turf feels amazing and the lighting is perfect for evening games. Highly recommended!",
        date: "2024-01-10",
        helpful: 12,
        images: ["/placeholder.svg?height=200&width=300&text=Review+Photo+1"],
      },
      {
        id: 2,
        user: "Priya Patel",
        avatar: "/placeholder.svg?height=40&width=40&text=PP",
        rating: 4,
        comment:
          "Good turf but parking can be challenging during peak hours. The facilities are clean and well-maintained.",
        date: "2024-01-08",
        helpful: 8,
        images: [],
      },
    ],
    policies: {
      cancellation: "Free cancellation up to 2 hours before booking time",
      payment: "Pay online or at venue",
      rules: ["No smoking", "Proper sports attire required", "Maximum 22 players", "No outside food allowed"],
    },
  },
  {
    id: 2,
    name: "Green Field Sports",
    address: "456 Park Avenue, Central",
    distance: 4.2,
    price: 800,
    rating: 4.5,
    reviews: 89,
    images: [
      "/placeholder.svg?height=400&width=600&text=Green+Field+Main",
      "/placeholder.svg?height=400&width=600&text=Green+Field+Natural+Grass",
      "/placeholder.svg?height=400&width=600&text=Green+Field+Parking",
      "/placeholder.svg?height=400&width=600&text=Green+Field+Clubhouse",
    ],
    videoTour: "/placeholder.svg?height=300&width=500&text=Green+Field+Tour",
    amenities: [
      "Free Parking",
      "Cafeteria",
      "First Aid",
      "Natural Grass",
      "Sprinkler System",
      "Changing Rooms",
      "Equipment Storage",
      "Spectator Area",
    ],
    coordinates: { lat: 28.6289, lng: 77.2065 },
    phone: "+91 9876543211",
    email: "green@field.com",
    website: "https://greenfield.com",
    description: "Natural grass field with excellent drainage system and eco-friendly facilities.",
    detailedDescription:
      "Experience football on natural grass with our advanced drainage system ensuring playability in all weather conditions. Eco-friendly facility with sustainable practices.",
    openingHours: "06:00 AM - 10:00 PM",
    capacity: 22,
    surface: "Natural Grass",
    size: "105x68 meters",
    established: "2015",
    owner: "Green Sports Foundation",
    socialMedia: {
      facebook: "https://facebook.com/greenfield",
      instagram: "https://instagram.com/greenfield",
    },
    weatherDependent: true,
    loyaltyPoints: 80,
    groupDiscounts: [
      { minPeople: 15, discount: 12 },
      { minPeople: 25, discount: 18 },
    ],
    equipment: [
      { name: "Match Football", price: 40, available: 8, image: "/placeholder.svg?height=100&width=100&text=Football" },
      { name: "Training Bibs", price: 15, available: 25, image: "/placeholder.svg?height=100&width=100&text=Bibs" },
    ],
    tournaments: [{ name: "Green Cup", date: "2024-02-20", prize: "₹25,000", participants: 12, status: "upcoming" }],
    weather: {
      temperature: 26,
      condition: "cloudy",
      humidity: 70,
      windSpeed: 8,
      forecast: [
        { day: "Today", temp: 26, condition: "cloudy" },
        { day: "Tomorrow", temp: 24, condition: "rainy" },
        { day: "Day After", temp: 27, condition: "sunny" },
      ],
    },
    timeSlots: [
      { time: "06:00-07:00", available: true, price: 600, demand: "low", bookings: 1 },
      { time: "07:00-08:00", available: true, price: 800, demand: "medium", bookings: 4 },
      { time: "08:00-09:00", available: false, price: 800, demand: "medium", bookings: 6 },
      { time: "09:00-10:00", available: true, price: 700, demand: "low", bookings: 2 },
      { time: "17:00-18:00", available: true, price: 1000, demand: "high", bookings: 6 },
      { time: "18:00-19:00", available: true, price: 1000, demand: "high", bookings: 5 },
      { time: "19:00-20:00", available: false, price: 1200, demand: "very-high", bookings: 8 },
      { time: "20:00-21:00", available: true, price: 1200, demand: "high", bookings: 7 },
    ],
    reviewsList: [
      {
        id: 3,
        user: "Amit Kumar",
        avatar: "/placeholder.svg?height=40&width=40&text=AK",
        rating: 5,
        comment: "Love playing on natural grass! Great experience and the field is well-maintained.",
        date: "2024-01-12",
        helpful: 15,
        images: [],
      },
    ],
    policies: {
      cancellation: "Free cancellation up to 4 hours before booking time",
      payment: "Advance payment required",
      rules: ["Weather dependent", "Proper football boots required", "No metal studs", "Respect the natural grass"],
    },
  },
  {
    id: 3,
    name: "Champions Ground",
    address: "789 Victory Road, North",
    distance: 7.8,
    price: 1500,
    rating: 4.9,
    reviews: 234,
    images: [
      "/placeholder.svg?height=400&width=600&text=Champions+Main+Stadium",
      "/placeholder.svg?height=400&width=600&text=Champions+VIP+Lounge",
      "/placeholder.svg?height=400&width=600&text=Champions+Trophy+Room",
      "/placeholder.svg?height=400&width=600&text=Champions+Restaurant",
      "/placeholder.svg?height=400&width=600&text=Champions+Training+Area",
      "/placeholder.svg?height=400&width=600&text=Champions+Pro+Shop",
    ],
    videoTour: "/placeholder.svg?height=300&width=500&text=Champions+Virtual+Tour",
    amenities: [
      "Valet Parking",
      "Premium WiFi",
      "Luxury Changing Rooms",
      "Professional Floodlights",
      "Modern Cafeteria",
      "VIP Lounge",
      "AC Spectator Area",
      "VIP Box",
      "Pro Shop",
      "Physiotherapy Center",
      "Live Streaming",
      "Conference Room",
      "Massage Therapy",
      "Equipment Rental",
      "Personal Training",
      "Nutrition Consultation",
    ],
    coordinates: { lat: 28.6448, lng: 77.2167 },
    phone: "+91 9876543212",
    email: "champions@ground.com",
    website: "https://championsground.com",
    description: "State-of-the-art facility with premium amenities and professional setup for elite players.",
    detailedDescription:
      "The ultimate destination for serious football enthusiasts. Features include professional-grade facilities, VIP viewing areas, live streaming capabilities, on-site physiotherapy services, and world-class amenities that rival professional stadiums.",
    openingHours: "05:00 AM - 12:00 AM",
    capacity: 22,
    surface: "Hybrid Grass",
    size: "105x68 meters",
    established: "2020",
    owner: "Champions Sports International",
    socialMedia: {
      facebook: "https://facebook.com/championsground",
      instagram: "https://instagram.com/championsground",
      twitter: "https://twitter.com/championsground",
      youtube: "https://youtube.com/championsground",
    },
    weatherDependent: false,
    loyaltyPoints: 150,
    groupDiscounts: [
      { minPeople: 8, discount: 8 },
      { minPeople: 16, discount: 15 },
      { minPeople: 24, discount: 22 },
    ],
    equipment: [
      {
        name: "Professional Match Ball",
        price: 80,
        available: 15,
        image: "/placeholder.svg?height=100&width=100&text=Pro+Ball",
      },
      {
        name: "Premium Training Bibs",
        price: 25,
        available: 40,
        image: "/placeholder.svg?height=100&width=100&text=Premium+Bibs",
      },
      {
        name: "Agility Training Cones",
        price: 40,
        available: 30,
        image: "/placeholder.svg?height=100&width=100&text=Agility+Cones",
      },
      {
        name: "Professional Goals",
        price: 150,
        available: 6,
        image: "/placeholder.svg?height=100&width=100&text=Pro+Goals",
      },
      {
        name: "Speed Training Ladder",
        price: 60,
        available: 8,
        image: "/placeholder.svg?height=100&width=100&text=Speed+Ladder",
      },
    ],
    tournaments: [
      { name: "Champions League", date: "2024-02-25", prize: "₹2,00,000", participants: 64, status: "registration" },
      { name: "Elite Cup", date: "2024-03-15", prize: "₹1,50,000", participants: 32, status: "upcoming" },
    ],
    weather: {
      temperature: 30,
      condition: "sunny",
      humidity: 60,
      windSpeed: 15,
      forecast: [
        { day: "Today", temp: 30, condition: "sunny" },
        { day: "Tomorrow", temp: 28, condition: "sunny" },
        { day: "Day After", temp: 32, condition: "sunny" },
      ],
    },
    timeSlots: [
      { time: "06:00-07:00", available: true, price: 1200, demand: "medium", bookings: 4 },
      { time: "07:00-08:00", available: true, price: 1500, demand: "high", bookings: 6 },
      { time: "08:00-09:00", available: true, price: 1500, demand: "high", bookings: 7 },
      { time: "09:00-10:00", available: false, price: 1300, demand: "medium", bookings: 5 },
      { time: "17:00-18:00", available: true, price: 1800, demand: "very-high", bookings: 9 },
      { time: "18:00-19:00", available: true, price: 1800, demand: "very-high", bookings: 8 },
      { time: "19:00-20:00", available: true, price: 2000, demand: "very-high", bookings: 10 },
      { time: "20:00-21:00", available: false, price: 2000, demand: "very-high", bookings: 12 },
    ],
    reviewsList: [
      {
        id: 4,
        user: "Vikram Singh",
        avatar: "/placeholder.svg?height=40&width=40&text=VS",
        rating: 5,
        comment:
          "World-class facility! Worth every penny. The VIP experience is amazing and the staff is incredibly professional.",
        date: "2024-01-15",
        helpful: 25,
        images: ["/placeholder.svg?height=200&width=300&text=VIP+Experience"],
      },
      {
        id: 5,
        user: "Sneha Reddy",
        avatar: "/placeholder.svg?height=40&width=40&text=SR",
        rating: 5,
        comment: "Professional setup with excellent staff. Highly recommended for tournaments and corporate events.",
        date: "2024-01-13",
        helpful: 18,
        images: [],
      },
    ],
    policies: {
      cancellation: "Free cancellation up to 1 hour before booking time",
      payment: "Multiple payment options available",
      rules: [
        "Professional attire required",
        "No outside equipment",
        "Respect facility rules",
        "VIP areas require separate booking",
      ],
    },
  },
]

// Weather icons mapping
const weatherIcons = {
  sunny: Sun,
  cloudy: Cloud,
  rainy: CloudRain,
  windy: Wind,
}

// Demand color mapping
const demandColors = {
  low: "bg-green-100 text-green-800",
  medium: "bg-yellow-100 text-yellow-800",
  high: "bg-orange-100 text-orange-800",
  "very-high": "bg-red-100 text-red-800",
}

// Helper functions
const getAvailableSlotsCount = (timeSlots) => {
  if (!Array.isArray(timeSlots)) return 0
  return timeSlots.filter((slot) => slot && slot.available).length
}

const hasAvailableSlots = (timeSlots) => {
  if (!Array.isArray(timeSlots)) return false
  return timeSlots.some((slot) => slot && slot.available)
}

const formatCurrency = (amount) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 0,
  }).format(amount)
}

const formatDate = (date) => {
  return new Intl.DateTimeFormat("en-IN", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date)
}

// Import all components
import TopNavigation from "../components/Navigation/TopNavigation"
import SearchBar from "../components/Search/SearchBar"
import AdvancedFilters from "../components/Filters/AdvancedFilters"
import ReferralPanel from "../components/Referral/ReferralPanel"
import TurfCard from "../components/TurfCard/TurfCard"
import ChatWidget from "../components/Chat/ChatWidget"
import NotificationPanel from "../components/Notifications/NotificationPanel"
import FloatingActionButtons from "../components/FloatingActions/FloatingActionButtons"

// Import hooks and utilities
import { useFilters } from "../hooks/useFilters"
import { useUserLocation } from "../hooks/useUserLocation"
import { shareTurf, getDirections, calculateCartTotal } from "../utils/turfUtils"

// Import constants
import { defaultUserProfile, defaultNotifications } from "../constants/appConstants"

export default function TurfsPage() {
  // State management
  const [turfs, setTurfs] = useState(mockTurfs)
  const [selectedTurf, setSelectedTurf] = useState(null)
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [showFilters, setShowFilters] = useState(false)
  const [viewMode, setViewMode] = useState("grid")
  const [favorites, setFavorites] = useState([])
  const [cart, setCart] = useState([])
  const [showChat, setShowChat] = useState(false)
  const [userProfile, setUserProfile] = useState(defaultUserProfile)
  const [notifications, setNotifications] = useState(defaultNotifications)
  const [showNotifications, setShowNotifications] = useState(false)
  const [referralCode, setReferralCode] = useState("")
  const [showReferral, setShowReferral] = useState(false)

  // Custom hooks
  const userLocation = useUserLocation()
  const { filters, setFilters, searchQuery, setSearchQuery, filteredTurfs, resetFilters } = useFilters(turfs)

  // Handle booking slot
  const handleBookSlot = (turfId, timeSlot) => {
    if (!timeSlot || !turfId) return

    const turf = turfs.find((t) => t.id === turfId)
    if (!turf) return

    const booking = {
      id: Date.now(),
      turfId,
      turfName: turf.name,
      timeSlot: timeSlot.time,
      date: selectedDate,
      price: timeSlot.price,
      equipment: [],
      details: {},
    }

    setCart([...cart, booking])

    // Update local state to reflect booking
    setTurfs((prev) =>
      prev.map((turf) =>
        turf.id === turfId && Array.isArray(turf.timeSlots)
          ? {
              ...turf,
              timeSlots: turf.timeSlots.map((slot) =>
                slot && slot.time === timeSlot.time ? { ...slot, available: false } : slot,
              ),
            }
          : turf,
      ),
    )

    // Add notification
    setNotifications((prev) => [
      {
        id: Date.now(),
        message: `Slot ${timeSlot.time} added to cart for ${turf.name}`,
        type: "success",
        time: "Just now",
      },
      ...prev,
    ])
  }

  // Handle favorites
  const toggleFavorite = (turfId) => {
    setFavorites((prev) => (prev.includes(turfId) ? prev.filter((id) => id !== turfId) : [...prev, turfId]))
  }

  // Calculate total cart value
  const cartTotal = calculateCartTotal(cart)

  return (
    <div className="min-h-screen bg-gradient-to-br pt-20 from-green-50 via-blue-50 to-purple-50 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-green-400/20 to-blue-400/20 rounded-full animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full animate-pulse delay-1000"></div>
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-yellow-400/10 to-orange-400/10 rounded-full animate-spin"
          style={{ animationDuration: "20s" }}
        ></div>
      </div>

      <div className="relative z-10 p-4 max-w-7xl mx-auto">
        {/* Header with animations */}
        <div className="mb-8 text-center">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Find Your Perfect Turf
          </h1>
          <p className="text-xl text-gray-600">Book premium sports facilities with advanced features</p>

          {/* Stats bar */}
          <div className="flex justify-center space-x-8 mt-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{turfs.length}+</div>
              <div className="text-sm text-gray-500">Premium Turfs</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">24/7</div>
              <div className="text-sm text-gray-500">Support</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">1000+</div>
              <div className="text-sm text-gray-500">Happy Players</div>
            </div>
          </div>
        </div>

        {/* Top Navigation Bar */}
        <TopNavigation
          viewMode={viewMode}
          setViewMode={setViewMode}
          userProfile={userProfile}
          cart={cart}
          notifications={notifications}
          showNotifications={showNotifications}
          setShowNotifications={setShowNotifications}
        />

        {/* Search and Filters */}
        <SearchBar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          showFilters={showFilters}
          setShowFilters={setShowFilters}
          filters={filters}
          showReferral={showReferral}
          setShowReferral={setShowReferral}
          resetFilters={resetFilters}
          filteredTurfs={filteredTurfs}
          totalTurfs={turfs.length}
        />

        {/* Advanced Filters Panel */}
        <AdvancedFilters filters={filters} setFilters={setFilters} showFilters={showFilters} />

        {/* Referral Panel */}
        <ReferralPanel showReferral={showReferral} referralCode={referralCode} setReferralCode={setReferralCode} />

        {/* Map View */}
        {viewMode === "map" && (
          <Card className="mb-8 p-6 bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl">
            <div className="h-96 bg-gradient-to-br from-blue-100 to-green-100 rounded-xl flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-200/50 to-green-200/50"></div>
              <div className="relative z-10 text-center">
                <MapPin className="h-16 w-16 text-blue-600 mx-auto mb-4 animate-bounce" />
                <h3 className="text-2xl font-bold text-gray-800 mb-2">Interactive Map View</h3>
                <p className="text-gray-600 mb-4">Google Maps integration would be implemented here</p>
                <div className="flex justify-center space-x-4">
                  {filteredTurfs.slice(0, 3).map((turf, index) => (
                    <div
                      key={turf.id}
                      className="bg-white p-3 rounded-lg shadow-md cursor-pointer hover:shadow-lg transition-all duration-300 hover:scale-105"
                      style={{
                        position: "absolute",
                        left: `${20 + index * 15}%`,
                        top: `${30 + index * 10}%`,
                      }}
                      onClick={() => setSelectedTurf(turf)}
                    >
                      <div className="text-sm font-semibold">{turf.name}</div>
                      <div className="text-xs text-gray-500">₹{turf.price}/hr</div>
                      <div className="flex items-center text-xs">
                        <div className="h-3 w-3 bg-yellow-400 rounded-full mr-1"></div>
                        {turf.rating}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        )}

        {/* Results */}
        <div
          className={`${viewMode === "list" ? "space-y-4" : "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"}`}
        >
          {filteredTurfs.map((turf, index) => (
            <TurfCard
              key={turf.id}
              turf={turf}
              viewMode={viewMode}
              favorites={favorites}
              toggleFavorite={toggleFavorite}
              shareTurf={(turf) => shareTurf(turf, setNotifications)}
              getDirections={(turf) => getDirections(turf, userLocation)}
              setSelectedTurf={setSelectedTurf}
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

        {/* Floating Action Buttons */}
        <FloatingActionButtons setShowChat={setShowChat} />

        {/* Chat Widget */}
        <ChatWidget showChat={showChat} setShowChat={setShowChat} />

        {/* Notifications Panel */}
        <NotificationPanel
          showNotifications={showNotifications}
          setShowNotifications={setShowNotifications}
          notifications={notifications}
        />
      </div>
    </div>
  )
}
