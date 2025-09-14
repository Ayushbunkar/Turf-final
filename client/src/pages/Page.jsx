"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { Button } from "../components/ui/Button"
import { Input } from "../components/ui/Input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/Card"
import { Badge } from "../components/ui/Badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/Select"
import { Slider } from "../components/ui/Slider"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/Dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/Tabs"
import { Calendar } from "../components/ui/Calendar"
import {
  MapPin,
  Search,
  Filter,
  Star,
  Phone,
  Mail,
  Navigation,
  Clock,
  Users,
  Shield,
  Play,
  Share2,
  Heart,
  MessageCircle,
  Gift,
  Trophy,
  Sun,
  Cloud,
  CloudRain,
  Wind,
  Bell,
  Eye,
  Award,
  Activity,
  DollarSign,
  Percent,
  ShoppingCart,
  Headphones,
  RotateCcw,
  CheckCircle,
  X,
  ArrowUp,
  Copy,
  Send,
  Menu,
} from "lucide-react"

// Enhanced mock data with more features
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
      "/placeholder.svg?height=300&width=400&text=Elite+Arena+Main",
      "/placeholder.svg?height=300&width=400&text=Elite+Arena+Night",
      "/placeholder.svg?height=300&width=400&text=Elite+Arena+Facilities",
      "/placeholder.svg?height=300&width=400&text=Elite+Arena+Changing+Room",
    ],
    videoTour: "/placeholder.svg?height=200&width=300&text=Video+Tour",
    amenities: ["Parking", "WiFi", "Changing Room", "Floodlights", "CCTV", "First Aid", "Cafeteria", "AC Lounge"],
    coordinates: { lat: 28.6139, lng: 77.209 },
    phone: "+91 9876543210",
    email: "elite@sports.com",
    website: "https://elitesports.com",
    description: "Premium artificial turf with professional lighting and world-class facilities.",
    detailedDescription:
      "Our state-of-the-art facility features FIFA-approved artificial turf, professional floodlighting system, and comprehensive amenities.",
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
    },
    weatherDependent: false,
    loyaltyPoints: 120,
    groupDiscounts: [
      { minPeople: 10, discount: 10 },
      { minPeople: 20, discount: 15 },
      { minPeople: 30, discount: 20 },
    ],
    equipment: [
      { name: "Football", price: 50, available: 10 },
      { name: "Bibs", price: 20, available: 30 },
      { name: "Cones", price: 30, available: 20 },
      { name: "Goals", price: 100, available: 4 },
    ],
    tournaments: [
      { name: "Weekend League", date: "2024-02-15", prize: "₹50,000", participants: 16 },
      { name: "Corporate Cup", date: "2024-03-01", prize: "₹1,00,000", participants: 32 },
    ],
    weather: {
      temperature: 28,
      condition: "sunny",
      humidity: 65,
      windSpeed: 12,
    },
    timeSlots: [
      { time: "06:00-07:00", available: true, price: 1000, demand: "low" },
      { time: "07:00-08:00", available: false, price: 1200, demand: "high" },
      { time: "08:00-09:00", available: true, price: 1200, demand: "medium" },
      { time: "09:00-10:00", available: true, price: 1000, demand: "low" },
      { time: "17:00-18:00", available: true, price: 1500, demand: "high" },
      { time: "18:00-19:00", available: false, price: 1500, demand: "high" },
      { time: "19:00-20:00", available: true, price: 1800, demand: "very-high" },
      { time: "20:00-21:00", available: true, price: 1800, demand: "very-high" },
    ],
    reviewsList: [
      {
        id: 1,
        user: "Rahul Sharma",
        rating: 5,
        comment: "Excellent facility with great maintenance. Highly recommended!",
        date: "2024-01-10",
        helpful: 12,
      },
      {
        id: 2,
        user: "Priya Patel",
        rating: 4,
        comment: "Good turf but parking can be challenging during peak hours.",
        date: "2024-01-08",
        helpful: 8,
      },
    ],
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
      "/placeholder.svg?height=300&width=400&text=Green+Field+Main",
      "/placeholder.svg?height=300&width=400&text=Green+Field+Grass",
      "/placeholder.svg?height=300&width=400&text=Green+Field+Parking",
    ],
    videoTour: "/placeholder.svg?height=200&width=300&text=Green+Field+Tour",
    amenities: ["Parking", "Cafeteria", "First Aid", "Natural Grass", "Sprinkler System"],
    coordinates: { lat: 28.6289, lng: 77.2065 },
    phone: "+91 9876543211",
    email: "green@field.com",
    website: "https://greenfield.com",
    description: "Natural grass field with excellent drainage system and eco-friendly facilities.",
    detailedDescription:
      "Experience football on natural grass with our advanced drainage system ensuring playability in all weather conditions.",
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
      { name: "Football", price: 40, available: 8 },
      { name: "Bibs", price: 15, available: 25 },
    ],
    tournaments: [{ name: "Green Cup", date: "2024-02-20", prize: "₹25,000", participants: 12 }],
    weather: {
      temperature: 26,
      condition: "cloudy",
      humidity: 70,
      windSpeed: 8,
    },
    timeSlots: [
      { time: "06:00-07:00", available: true, price: 600, demand: "low" },
      { time: "07:00-08:00", available: true, price: 800, demand: "medium" },
      { time: "08:00-09:00", available: false, price: 800, demand: "medium" },
      { time: "09:00-10:00", available: true, price: 700, demand: "low" },
      { time: "17:00-18:00", available: true, price: 1000, demand: "high" },
      { time: "18:00-19:00", available: true, price: 1000, demand: "high" },
      { time: "19:00-20:00", available: false, price: 1200, demand: "very-high" },
      { time: "20:00-21:00", available: true, price: 1200, demand: "high" },
    ],
    reviewsList: [
      {
        id: 3,
        user: "Amit Kumar",
        rating: 5,
        comment: "Love playing on natural grass! Great experience.",
        date: "2024-01-12",
        helpful: 15,
      },
    ],
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
      "/placeholder.svg?height=300&width=400&text=Champions+Main",
      "/placeholder.svg?height=300&width=400&text=Champions+VIP",
      "/placeholder.svg?height=300&width=400&text=Champions+Trophy+Room",
      "/placeholder.svg?height=300&width=400&text=Champions+Restaurant",
    ],
    videoTour: "/placeholder.svg?height=200&width=300&text=Champions+Tour",
    amenities: [
      "Parking",
      "WiFi",
      "Changing Room",
      "Floodlights",
      "Cafeteria",
      "AC Lounge",
      "VIP Box",
      "Pro Shop",
      "Physiotherapy",
      "Live Streaming",
    ],
    coordinates: { lat: 28.6448, lng: 77.2167 },
    phone: "+91 9876543212",
    email: "champions@ground.com",
    website: "https://championsground.com",
    description: "State-of-the-art facility with premium amenities and professional setup for elite players.",
    detailedDescription:
      "The ultimate destination for serious football enthusiasts. Features include professional-grade facilities, VIP viewing areas, live streaming capabilities, and on-site physiotherapy services.",
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
      { name: "Professional Football", price: 80, available: 15 },
      { name: "Training Bibs", price: 25, available: 40 },
      { name: "Agility Cones", price: 40, available: 30 },
      { name: "Professional Goals", price: 150, available: 6 },
      { name: "Speed Ladder", price: 60, available: 8 },
    ],
    tournaments: [
      { name: "Champions League", date: "2024-02-25", prize: "₹2,00,000", participants: 64 },
      { name: "Elite Cup", date: "2024-03-15", prize: "₹1,50,000", participants: 32 },
    ],
    weather: {
      temperature: 30,
      condition: "sunny",
      humidity: 60,
      windSpeed: 15,
    },
    timeSlots: [
      { time: "06:00-07:00", available: true, price: 1200, demand: "medium" },
      { time: "07:00-08:00", available: true, price: 1500, demand: "high" },
      { time: "08:00-09:00", available: true, price: 1500, demand: "high" },
      { time: "09:00-10:00", available: false, price: 1300, demand: "medium" },
      { time: "17:00-18:00", available: true, price: 1800, demand: "very-high" },
      { time: "18:00-19:00", available: true, price: 1800, demand: "very-high" },
      { time: "19:00-20:00", available: true, price: 2000, demand: "very-high" },
      { time: "20:00-21:00", available: false, price: 2000, demand: "very-high" },
    ],
    reviewsList: [
      {
        id: 4,
        user: "Vikram Singh",
        rating: 5,
        comment: "World-class facility! Worth every penny. The VIP experience is amazing.",
        date: "2024-01-15",
        helpful: 25,
      },
      {
        id: 5,
        user: "Sneha Reddy",
        rating: 5,
        comment: "Professional setup with excellent staff. Highly recommended for tournaments.",
        date: "2024-01-13",
        helpful: 18,
      },
    ],
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

// Helper function to safely get available slots count
const getAvailableSlotsCount = (timeSlots) => {
  if (!Array.isArray(timeSlots)) return 0
  return timeSlots.filter((slot) => slot && slot.available).length
}

// Helper function to safely check if turf has available slots
const hasAvailableSlots = (timeSlots) => {
  if (!Array.isArray(timeSlots)) return false
  return timeSlots.some((slot) => slot && slot.available)
}

export default function TurfsPage() {
  const [turfs, setTurfs] = useState(mockTurfs)
  const [filteredTurfs, setFilteredTurfs] = useState(mockTurfs)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedTurf, setSelectedTurf] = useState(null)
  const [filters, setFilters] = useState({
    distance: [20],
    priceRange: [0, 2500],
    availability: "all",
    sortBy: "distance",
    surface: "all",
    amenities: [],
    rating: [0],
    weatherDependent: "all",
  })
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [showFilters, setShowFilters] = useState(false)
  const [userLocation, setUserLocation] = useState({ lat: 28.6139, lng: 77.209 })
  const [viewMode, setViewMode] = useState("grid")
  const [favorites, setFavorites] = useState([])
  const [cart, setCart] = useState([])
  const [showChat, setShowChat] = useState(false)
  const [chatMessages, setChatMessages] = useState([])
  const [newMessage, setNewMessage] = useState("")
  const [userProfile, setUserProfile] = useState({
    name: "John Doe",
    email: "john@example.com",
    phone: "+91 9876543210",
    loyaltyPoints: 450,
    membershipTier: "Gold",
  })
  const [notifications, setNotifications] = useState([
    { id: 1, message: "Your booking at Elite Sports Arena is confirmed!", type: "success", time: "2 hours ago" },
    { id: 2, message: "New tournament announced at Champions Ground", type: "info", time: "1 day ago" },
  ])
  const [showNotifications, setShowNotifications] = useState(false)
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [bookingStep, setBookingStep] = useState(1)
  const [bookingDetails, setBookingDetails] = useState({
    playerCount: 1,
    specialRequests: "",
    contactName: "",
    contactPhone: "",
    contactEmail: "",
  })
  const [selectedEquipment, setSelectedEquipment] = useState([])
  const [referralCode, setReferralCode] = useState("")
  const [showReferral, setShowReferral] = useState(false)

  const chatRef = useRef(null)

  // Get user location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          })
        },
        (error) => {
          console.log("Location access denied")
        },
      )
    }
  }, [])

  // Auto-scroll chat to bottom
  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight
    }
  }, [chatMessages])

  // Filter and search logic
  const applyFilters = useCallback(() => {
    const filtered = turfs.filter((turf) => {
      // Ensure turf exists and has required properties
      if (!turf || typeof turf !== "object") return false

      // Distance filter
      if (turf.distance && turf.distance > filters.distance[0]) return false

      // Price filter
      if (turf.price && (turf.price < filters.priceRange[0] || turf.price > filters.priceRange[1])) return false

      // Rating filter
      if (turf.rating && turf.rating < filters.rating[0]) return false

      // Surface filter
      if (filters.surface !== "all" && turf.surface && turf.surface.toLowerCase() !== filters.surface.toLowerCase())
        return false

      // Weather dependent filter
      if (filters.weatherDependent !== "all") {
        const isWeatherDependent = filters.weatherDependent === "true"
        if (turf.weatherDependent !== isWeatherDependent) return false
      }

      // Amenities filter
      if (filters.amenities.length > 0 && Array.isArray(turf.amenities)) {
        const hasAllAmenities = filters.amenities.every((amenity) =>
          turf.amenities.some(
            (turfAmenity) => turfAmenity && turfAmenity.toLowerCase().includes(amenity.toLowerCase()),
          ),
        )
        if (!hasAllAmenities) return false
      }

      // Availability filter
      if (filters.availability === "available") {
        if (!hasAvailableSlots(turf.timeSlots)) return false
      }

      // Search query
      if (searchQuery) {
        const query = searchQuery.toLowerCase()
        const searchableFields = [
          turf.name,
          turf.address,
          turf.description,
          ...(Array.isArray(turf.amenities) ? turf.amenities : []),
        ].filter(Boolean)

        const matchesSearch = searchableFields.some((field) => field && field.toLowerCase().includes(query))

        if (!matchesSearch) return false
      }

      return true
    })

    // Sort results
    switch (filters.sortBy) {
      case "distance":
        filtered.sort((a, b) => (a.distance || 0) - (b.distance || 0))
        break
      case "price":
        filtered.sort((a, b) => (a.price || 0) - (b.price || 0))
        break
      case "rating":
        filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0))
        break
      case "popularity":
        filtered.sort((a, b) => (b.reviews || 0) - (a.reviews || 0))
        break
      case "newest":
        filtered.sort((a, b) => {
          const dateA = new Date(a.established || "1900")
          const dateB = new Date(b.established || "1900")
          return dateB - dateA
        })
        break
      default:
        break
    }

    setFilteredTurfs(filtered)
  }, [turfs, filters, searchQuery])

  useEffect(() => {
    applyFilters()
  }, [applyFilters])

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
      equipment: selectedEquipment,
      details: bookingDetails,
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

  // Handle directions
  const getDirections = (turf) => {
    if (!turf || !turf.coordinates) return
    const url = `https://www.google.com/maps/dir/${userLocation.lat},${userLocation.lng}/${turf.coordinates.lat},${turf.coordinates.lng}`
    window.open(url, "_blank")
  }

  // Handle share
  const shareTurf = (turf) => {
    if (!turf) return

    if (navigator.share) {
      navigator.share({
        title: turf.name,
        text: turf.description,
        url: window.location.href,
      })
    } else {
      navigator.clipboard.writeText(window.location.href)
      setNotifications((prev) => [
        {
          id: Date.now(),
          message: "Link copied to clipboard!",
          type: "success",
          time: "Just now",
        },
        ...prev,
      ])
    }
  }

  // Handle chat
  const sendMessage = () => {
    if (newMessage.trim()) {
      setChatMessages((prev) => [
        ...prev,
        {
          id: Date.now(),
          message: newMessage,
          sender: "user",
          time: new Date().toLocaleTimeString(),
        },
      ])
      setNewMessage("")

      // Simulate bot response
      setTimeout(() => {
        setChatMessages((prev) => [
          ...prev,
          {
            id: Date.now() + 1,
            message: "Thank you for your message! Our team will get back to you shortly.",
            sender: "bot",
            time: new Date().toLocaleTimeString(),
          },
        ])
      }, 1000)
    }
  }

  // Calculate total cart value
  const cartTotal = cart.reduce((total, item) => {
    const equipmentTotal = Array.isArray(item.equipment)
      ? item.equipment.reduce((eqTotal, eq) => eqTotal + (eq.price || 0) * (eq.quantity || 0), 0)
      : 0
    return total + (item.price || 0) + equipmentTotal
  }, 0)

  // Get weather icon
  const WeatherIcon = weatherIcons[selectedTurf?.weather?.condition] || Sun

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 relative overflow-hidden">
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
        <div className="mb-6 flex justify-between items-center bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-lg">
          <div className="flex items-center space-x-4">
            <Button
              variant={viewMode === "grid" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("grid")}
              className="transition-all duration-300 hover:scale-105"
            >
              <div className="grid grid-cols-2 gap-1 w-4 h-4">
                <div className="bg-current rounded-sm"></div>
                <div className="bg-current rounded-sm"></div>
                <div className="bg-current rounded-sm"></div>
                <div className="bg-current rounded-sm"></div>
              </div>
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("list")}
              className="transition-all duration-300 hover:scale-105"
            >
              <Menu className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === "map" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("map")}
              className="transition-all duration-300 hover:scale-105"
            >
              <MapPin className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex items-center space-x-4">
            {/* Loyalty Points */}
            <div className="flex items-center space-x-2 bg-gradient-to-r from-yellow-400 to-orange-400 text-white px-4 py-2 rounded-full">
              <Award className="h-4 w-4" />
              <span className="font-semibold">{userProfile.loyaltyPoints} pts</span>
            </div>

            {/* Cart */}
            <Button
              variant="outline"
              size="sm"
              className="relative transition-all duration-300 hover:scale-105 bg-transparent"
            >
              <ShoppingCart className="h-4 w-4" />
              {cart.length > 0 && (
                <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 bg-red-500 animate-bounce">
                  {cart.length}
                </Badge>
              )}
            </Button>

            {/* Notifications */}
            <Button
              variant="outline"
              size="sm"
              className="relative transition-all duration-300 hover:scale-105 bg-transparent"
              onClick={() => setShowNotifications(!showNotifications)}
            >
              <Bell className="h-4 w-4" />
              {notifications.length > 0 && (
                <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 bg-red-500 animate-pulse">
                  {notifications.length}
                </Badge>
              )}
            </Button>

            {/* Profile */}
            <div className="flex items-center space-x-2 bg-white rounded-full p-2 shadow-md">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
                {userProfile.name.charAt(0)}
              </div>
              <div className="hidden md:block">
                <div className="text-sm font-semibold">{userProfile.name}</div>
                <div className="text-xs text-gray-500">{userProfile.membershipTier}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative group">
              <Search className="absolute left-4 top-4 h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
              <Input
                placeholder="Search turfs by name, location, or amenities..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 h-14 text-lg border-2 border-gray-200 focus:border-blue-500 rounded-2xl bg-white/80 backdrop-blur-sm transition-all duration-300 hover:shadow-lg focus:shadow-xl"
              />
              {searchQuery && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute right-2 top-2 h-10 w-10 rounded-full hover:bg-gray-100"
                  onClick={() => setSearchQuery("")}
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>

            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="h-14 px-8 border-2 border-gray-200 hover:border-blue-500 rounded-2xl bg-white/80 backdrop-blur-sm transition-all duration-300 hover:shadow-lg group"
            >
              <Filter className="h-5 w-5 mr-2 group-hover:rotate-180 transition-transform duration-300" />
              Advanced Filters
              {(filters.amenities.length > 0 || filters.surface !== "all" || filters.rating[0] > 0) && (
                <Badge className="ml-2 bg-blue-500 animate-pulse">
                  {filters.amenities.length + (filters.surface !== "all" ? 1 : 0) + (filters.rating[0] > 0 ? 1 : 0)}
                </Badge>
              )}
            </Button>

            <Button
              variant="outline"
              onClick={() => setShowReferral(!showReferral)}
              className="h-14 px-6 border-2 border-green-200 hover:border-green-500 rounded-2xl bg-gradient-to-r from-green-50 to-emerald-50 transition-all duration-300 hover:shadow-lg"
            >
              <Gift className="h-5 w-5 mr-2" />
              Refer & Earn
            </Button>
          </div>

          {/* Quick Filters */}
          <div className="flex flex-wrap gap-2">
            {["Available Now", "Under ₹1000", "5★ Rated", "Natural Grass", "With Parking"].map((filter, index) => (
              <Button
                key={filter}
                variant="outline"
                size="sm"
                className="rounded-full bg-white/60 backdrop-blur-sm hover:bg-blue-50 hover:border-blue-300 transition-all duration-300 hover:scale-105"
              >
                {filter}
              </Button>
            ))}
          </div>

          {/* Advanced Filters Panel */}
          {showFilters && (
            <Card className="p-6 bg-white/90 backdrop-blur-sm border-2 border-gray-100 rounded-2xl shadow-xl">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="space-y-3">
                  <label className="text-sm font-semibold text-gray-700 flex items-center">
                    <Navigation className="h-4 w-4 mr-2" />
                    Distance Range
                  </label>
                  <Select
                    value={filters.distance[0].toString()}
                    onValueChange={(value) => setFilters((prev) => ({ ...prev, distance: [Number.parseInt(value)] }))}
                  >
                    <SelectTrigger className="rounded-xl">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="5">Within 5km</SelectItem>
                      <SelectItem value="10">Within 10km</SelectItem>
                      <SelectItem value="20">Within 20km</SelectItem>
                      <SelectItem value="50">Within 50km</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-3">
                  <label className="text-sm font-semibold text-gray-700 flex items-center">
                    <DollarSign className="h-4 w-4 mr-2" />
                    Price Range
                  </label>
                  <div className="px-2">
                    <Slider
                      value={filters.priceRange}
                      onValueChange={(value) => setFilters((prev) => ({ ...prev, priceRange: value }))}
                      max={2500}
                      min={0}
                      step={100}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-2">
                      <span>₹{filters.priceRange[0]}</span>
                      <span>₹{filters.priceRange[1]}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-sm font-semibold text-gray-700 flex items-center">
                    <Star className="h-4 w-4 mr-2" />
                    Minimum Rating
                  </label>
                  <div className="px-2">
                    <Slider
                      value={filters.rating}
                      onValueChange={(value) => setFilters((prev) => ({ ...prev, rating: value }))}
                      max={5}
                      min={0}
                      step={0.5}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-2">
                      <span>{filters.rating[0]}★</span>
                      <span>5★</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-sm font-semibold text-gray-700 flex items-center">
                    <Activity className="h-4 w-4 mr-2" />
                    Surface Type
                  </label>
                  <Select
                    value={filters.surface}
                    onValueChange={(value) => setFilters((prev) => ({ ...prev, surface: value }))}
                  >
                    <SelectTrigger className="rounded-xl">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Surfaces</SelectItem>
                      <SelectItem value="artificial grass">Artificial Grass</SelectItem>
                      <SelectItem value="natural grass">Natural Grass</SelectItem>
                      <SelectItem value="hybrid grass">Hybrid Grass</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex justify-between items-center mt-6 pt-4 border-t">
                <Button
                  variant="outline"
                  onClick={() => {
                    setFilters({
                      distance: [20],
                      priceRange: [0, 2500],
                      availability: "all",
                      sortBy: "distance",
                      surface: "all",
                      amenities: [],
                      rating: [0],
                      weatherDependent: "all",
                    })
                  }}
                  className="rounded-xl"
                >
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Reset Filters
                </Button>
                <div className="text-sm text-gray-600">
                  Showing {filteredTurfs.length} of {turfs.length} turfs
                </div>
              </div>
            </Card>
          )}

          {/* Referral Panel */}
          {showReferral && (
            <Card className="p-6 bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-2xl shadow-xl">
              <div className="text-center">
                <Gift className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-green-800 mb-2">Refer Friends & Earn Rewards!</h3>
                <p className="text-green-600 mb-4">Get ₹100 for every friend who books through your referral</p>
                <div className="flex gap-4 max-w-md mx-auto">
                  <Input
                    placeholder="Enter referral code"
                    value={referralCode}
                    onChange={(e) => setReferralCode(e.target.value)}
                    className="rounded-xl"
                  />
                  <Button className="rounded-xl bg-green-600 hover:bg-green-700">Apply Code</Button>
                </div>
                <div className="mt-4 p-3 bg-white rounded-xl">
                  <p className="text-sm text-gray-600">
                    Your referral code: <span className="font-mono font-bold text-green-600">JOHN2024</span>
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-2 rounded-full bg-transparent"
                    onClick={() => navigator.clipboard.writeText("JOHN2024")}
                  >
                    <Copy className="h-4 w-4 mr-2" />
                    Copy Code
                  </Button>
                </div>
              </div>
            </Card>
          )}
        </div>

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
                        <Star className="h-3 w-3 text-yellow-400 fill-current mr-1" />
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
            <Card
              key={turf.id}
              className={`overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 bg-white/90 backdrop-blur-sm border-2 border-gray-100 hover:border-blue-200 group ${
                viewMode === "list" ? "flex" : ""
              }`}
            >
              <div className={`relative ${viewMode === "list" ? "w-64 flex-shrink-0" : ""}`}>
                <div className="relative overflow-hidden">
                  <img
                    src={Array.isArray(turf.images) && turf.images[0] ? turf.images[0] : "/placeholder.svg"}
                    alt={turf.name || "Turf"}
                    className={`${viewMode === "list" ? "h-full" : "h-48"} w-full object-cover transition-transform duration-500 group-hover:scale-110`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>

                {/* Overlay badges */}
                <div className="absolute top-3 left-3 flex flex-col space-y-2">
                  <Badge className="bg-green-500/90 backdrop-blur-sm text-white animate-pulse">
                    {turf.distance || 0}km away
                  </Badge>
                  {turf.loyaltyPoints && (
                    <Badge className="bg-yellow-500/90 backdrop-blur-sm text-white">+{turf.loyaltyPoints} pts</Badge>
                  )}
                </div>

                <div className="absolute top-3 right-3 flex space-x-2">
                  <Button
                    variant="secondary"
                    size="sm"
                    className="h-8 w-8 p-0 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white transition-all duration-300 hover:scale-110"
                    onClick={(e) => {
                      e.stopPropagation()
                      toggleFavorite(turf.id)
                    }}
                  >
                    <Heart
                      className={`h-4 w-4 ${favorites.includes(turf.id) ? "fill-red-500 text-red-500" : "text-gray-600"} transition-colors duration-300`}
                    />
                  </Button>
                  <Button
                    variant="secondary"
                    size="sm"
                    className="h-8 w-8 p-0 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white transition-all duration-300 hover:scale-110"
                    onClick={(e) => {
                      e.stopPropagation()
                      shareTurf(turf)
                    }}
                  >
                    <Share2 className="h-4 w-4 text-gray-600" />
                  </Button>
                </div>

                {/* Weather indicator */}
                {turf.weather && (
                  <div className="absolute bottom-3 left-3">
                    <div className="bg-white/90 backdrop-blur-sm rounded-full p-2 flex items-center space-x-1">
                      <WeatherIcon className="h-4 w-4 text-blue-600" />
                      <span className="text-xs font-medium">{turf.weather.temperature}°C</span>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex-1">
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <CardTitle className="text-xl group-hover:text-blue-600 transition-colors duration-300 flex items-center">
                        {turf.name || "Unknown Turf"}
                        {turf.weatherDependent === false && (
                          <Shield className="h-4 w-4 ml-2 text-green-500" title="Weather Independent" />
                        )}
                      </CardTitle>
                      <CardDescription className="flex items-center mt-2 text-gray-600">
                        <MapPin className="h-4 w-4 mr-1 flex-shrink-0" />
                        <span className="truncate">{turf.address || "Address not available"}</span>
                      </CardDescription>
                      <div className="flex items-center mt-2 space-x-4">
                        <div className="flex items-center">
                          <Star className="h-4 w-4 text-yellow-400 fill-current" />
                          <span className="ml-1 text-sm font-medium">{turf.rating || 0}</span>
                          <span className="ml-1 text-sm text-gray-500">({turf.reviews || 0})</span>
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {turf.surface || "Unknown"}
                        </Badge>
                      </div>
                    </div>
                    <div className="text-right ml-4">
                      <div className="text-2xl font-bold text-green-600">₹{turf.price || 0}</div>
                      <div className="text-sm text-gray-500">per hour</div>
                      {Array.isArray(turf.groupDiscounts) && turf.groupDiscounts.length > 0 && (
                        <Badge className="mt-1 bg-orange-100 text-orange-800 text-xs">
                          <Percent className="h-3 w-3 mr-1" />
                          Group discounts
                        </Badge>
                      )}
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="pt-0">
                  <div className="space-y-4">
                    {/* Amenities */}
                    <div className="flex flex-wrap gap-1">
                      {Array.isArray(turf.amenities) &&
                        turf.amenities.slice(0, viewMode === "list" ? 6 : 4).map((amenity) => (
                          <Badge
                            key={amenity}
                            variant="secondary"
                            className="text-xs bg-blue-50 text-blue-700 hover:bg-blue-100 transition-colors duration-300"
                          >
                            {amenity}
                          </Badge>
                        ))}
                      {Array.isArray(turf.amenities) && turf.amenities.length > (viewMode === "list" ? 6 : 4) && (
                        <Badge variant="secondary" className="text-xs bg-gray-100 text-gray-600">
                          +{turf.amenities.length - (viewMode === "list" ? 6 : 4)} more
                        </Badge>
                      )}
                    </div>

                    {/* Quick stats */}
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div className="bg-gray-50 rounded-lg p-2">
                        <Users className="h-4 w-4 mx-auto text-blue-600 mb-1" />
                        <div className="text-xs text-gray-600">Capacity</div>
                        <div className="text-sm font-semibold">{turf.capacity || 0}</div>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-2">
                        <Clock className="h-4 w-4 mx-auto text-green-600 mb-1" />
                        <div className="text-xs text-gray-600">Available</div>
                        <div className="text-sm font-semibold">{getAvailableSlotsCount(turf.timeSlots)} slots</div>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-2">
                        <Trophy className="h-4 w-4 mx-auto text-yellow-600 mb-1" />
                        <div className="text-xs text-gray-600">Since</div>
                        <div className="text-sm font-semibold">{turf.established || "N/A"}</div>
                      </div>
                    </div>

                    {/* Action buttons */}
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => getDirections(turf)}
                        className="flex-1 rounded-xl hover:bg-blue-50 hover:border-blue-300 transition-all duration-300 hover:scale-105"
                      >
                        <Navigation className="h-4 w-4 mr-2" />
                        Directions
                      </Button>

                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            className="flex-1 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-300 hover:scale-105 hover:shadow-lg"
                            onClick={() => setSelectedTurf(turf)}
                          >
                            <Eye className="h-4 w-4 mr-2" />
                            View & Book
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-white/95 backdrop-blur-sm">
                          {selectedTurf && (
                            <>
                              <DialogHeader className="border-b pb-4">
                                <div className="flex justify-between items-start">
                                  <div>
                                    <DialogTitle className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                      {selectedTurf?.name || "Unknown Turf"}
                                    </DialogTitle>
                                    <DialogDescription className="text-lg mt-2">
                                      <div className="flex items-center">
                                        <MapPin className="h-5 w-5 mr-2 text-blue-600" />
                                        {selectedTurf?.address || "Address not available"}
                                      </div>
                                    </DialogDescription>
                                  </div>
                                  <div className="text-right">
                                    <div className="text-3xl font-bold text-green-600">₹{selectedTurf?.price || 0}</div>
                                    <div className="text-gray-500">per hour</div>
                                    <div className="flex items-center justify-end mt-2">
                                      <Star className="h-5 w-5 text-yellow-400 fill-current" />
                                      <span className="ml-1 font-semibold">{selectedTurf?.rating || 0}</span>
                                      <span className="ml-1 text-gray-500">({selectedTurf?.reviews || 0} reviews)</span>
                                    </div>
                                  </div>
                                </div>
                              </DialogHeader>

                              <Tabs defaultValue="overview" className="w-full">
                                <TabsList className="grid w-full grid-cols-4 bg-gray-100 rounded-xl p-1">
                                  <TabsTrigger value="overview" className="rounded-lg">
                                    Overview
                                  </TabsTrigger>
                                  <TabsTrigger value="booking" className="rounded-lg">
                                    Book Slot
                                  </TabsTrigger>
                                  <TabsTrigger value="gallery" className="rounded-lg">
                                    Gallery
                                  </TabsTrigger>
                                  <TabsTrigger value="contact" className="rounded-lg">
                                    Contact
                                  </TabsTrigger>
                                </TabsList>

                                <TabsContent value="overview" className="space-y-6 mt-6">
                                  {/* Hero Image */}
                                  <div className="relative">
                                    <img
                                      src={
                                        Array.isArray(selectedTurf?.images) && selectedTurf.images[selectedImageIndex]
                                          ? selectedTurf.images[selectedImageIndex]
                                          : "/placeholder.svg"
                                      }
                                      alt={selectedTurf?.name || "Turf"}
                                      className="w-full h-80 object-cover rounded-2xl shadow-lg"
                                    />
                                    {Array.isArray(selectedTurf?.images) && selectedTurf.images.length > 1 && (
                                      <div className="absolute bottom-4 left-4 flex space-x-2">
                                        {selectedTurf.images.map((_, index) => (
                                          <button
                                            key={index}
                                            className={`w-3 h-3 rounded-full transition-all duration-300 ${
                                              index === selectedImageIndex ? "bg-white" : "bg-white/50"
                                            }`}
                                            onClick={() => setSelectedImageIndex(index)}
                                          />
                                        ))}
                                      </div>
                                    )}
                                  </div>

                                  {/* Weather and Status */}
                                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <Card className="p-4 bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200">
                                      <div className="flex items-center justify-between">
                                        <div>
                                          <h3 className="font-semibold text-blue-800">Weather Today</h3>
                                          <div className="flex items-center mt-2">
                                            <WeatherIcon className="h-6 w-6 text-blue-600 mr-2" />
                                            <span className="text-2xl font-bold text-blue-700">
                                              {selectedTurf?.weather?.temperature || 25}°C
                                            </span>
                                          </div>
                                          <p className="text-sm text-blue-600 capitalize mt-1">
                                            {selectedTurf?.weather?.condition || "sunny"}
                                          </p>
                                        </div>
                                      </div>
                                    </Card>

                                    <Card className="p-4 bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
                                      <h3 className="font-semibold text-green-800">Availability</h3>
                                      <div className="mt-2">
                                        <div className="text-2xl font-bold text-green-700">
                                          {getAvailableSlotsCount(selectedTurf?.timeSlots)}
                                        </div>
                                        <p className="text-sm text-green-600">slots available today</p>
                                      </div>
                                      <div className="mt-3 flex space-x-1">
                                        {Array.isArray(selectedTurf?.timeSlots) &&
                                          selectedTurf.timeSlots
                                            .slice(0, 8)
                                            .map((slot, index) => (
                                              <div
                                                key={index}
                                                className={`w-3 h-3 rounded-full ${
                                                  slot && slot.available ? "bg-green-400" : "bg-red-400"
                                                }`}
                                                title={`${slot?.time || "N/A"} - ${slot?.available ? "Available" : "Booked"}`}
                                              />
                                            ))}
                                      </div>
                                    </Card>

                                    <Card className="p-4 bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
                                      <h3 className="font-semibold text-purple-800">Loyalty Rewards</h3>
                                      <div className="mt-2">
                                        <div className="text-2xl font-bold text-purple-700">
                                          +{selectedTurf?.loyaltyPoints || 0}
                                        </div>
                                        <p className="text-sm text-purple-600">points per booking</p>
                                      </div>
                                      <div className="mt-3">
                                        <Badge className="bg-purple-100 text-purple-800">
                                          <Award className="h-3 w-3 mr-1" />
                                          {userProfile.membershipTier} Member
                                        </Badge>
                                      </div>
                                    </Card>
                                  </div>

                                  {/* Detailed Information */}
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-4">
                                      <h3 className="text-xl font-bold text-gray-800">Facility Details</h3>
                                      <div className="space-y-3">
                                        <div className="flex justify-between">
                                          <span className="text-gray-600">Surface Type:</span>
                                          <span className="font-semibold">{selectedTurf?.surface || "Unknown"}</span>
                                        </div>
                                        <div className="flex justify-between">
                                          <span className="text-gray-600">Field Size:</span>
                                          <span className="font-semibold">{selectedTurf?.size || "Unknown"}</span>
                                        </div>
                                        <div className="flex justify-between">
                                          <span className="text-gray-600">Capacity:</span>
                                          <span className="font-semibold">{selectedTurf?.capacity || 0} players</span>
                                        </div>
                                        <div className="flex justify-between">
                                          <span className="text-gray-600">Operating Hours:</span>
                                          <span className="font-semibold">
                                            {selectedTurf?.openingHours || "Unknown"}
                                          </span>
                                        </div>
                                        <div className="flex justify-between">
                                          <span className="text-gray-600">Established:</span>
                                          <span className="font-semibold">
                                            {selectedTurf?.established || "Unknown"}
                                          </span>
                                        </div>
                                      </div>
                                    </div>

                                    <div className="space-y-4">
                                      <h3 className="text-xl font-bold text-gray-800">Description</h3>
                                      <p className="text-gray-600 leading-relaxed">
                                        {selectedTurf?.detailedDescription ||
                                          selectedTurf?.description ||
                                          "No description available"}
                                      </p>

                                      <h4 className="text-lg font-semibold text-gray-800 mt-6">Amenities</h4>
                                      <div className="grid grid-cols-2 gap-2">
                                        {Array.isArray(selectedTurf?.amenities) &&
                                          selectedTurf.amenities.map((amenity) => (
                                            <div key={amenity} className="flex items-center space-x-2">
                                              <CheckCircle className="h-4 w-4 text-green-500" />
                                              <span className="text-sm">{amenity}</span>
                                            </div>
                                          ))}
                                      </div>
                                    </div>
                                  </div>
                                </TabsContent>

                                <TabsContent value="booking" className="space-y-6 mt-6">
                                  <Card className="p-6">
                                    <h3 className="text-xl font-bold mb-4">Select Date & Time</h3>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                      <div>
                                        <label className="text-sm font-semibold text-gray-700 mb-2 block">
                                          Select Date
                                        </label>
                                        <Calendar
                                          mode="single"
                                          selected={selectedDate}
                                          onSelect={setSelectedDate}
                                          className="rounded-xl border-2 border-gray-200"
                                          disabled={(date) => date < new Date()}
                                        />
                                      </div>

                                      <div>
                                        <label className="text-sm font-semibold text-gray-700 mb-2 block">
                                          Available Time Slots
                                        </label>
                                        <div className="space-y-2 max-h-80 overflow-y-auto">
                                          {Array.isArray(selectedTurf?.timeSlots) &&
                                            selectedTurf.timeSlots.map((slot) => (
                                              <Button
                                                key={slot.time}
                                                variant={slot.available ? "outline" : "secondary"}
                                                disabled={!slot.available}
                                                className={`w-full justify-between p-4 h-auto rounded-xl transition-all duration-300 hover:scale-105 ${
                                                  slot.available
                                                    ? "hover:bg-blue-50 hover:border-blue-300"
                                                    : "opacity-50 cursor-not-allowed"
                                                }`}
                                                onClick={() => {
                                                  handleBookSlot(selectedTurf.id, slot)
                                                }}
                                              >
                                                <div className="flex items-center space-x-3">
                                                  <Clock className="h-4 w-4" />
                                                  <span className="font-semibold">{slot.time}</span>
                                                  <Badge
                                                    className={`${demandColors[slot.demand] || demandColors.low} text-xs`}
                                                  >
                                                    {slot.demand ? slot.demand.replace("-", " ") : "low"}
                                                  </Badge>
                                                </div>
                                                <div className="text-right">
                                                  <div className="font-bold text-green-600">₹{slot.price || 0}</div>
                                                  {slot.available ? (
                                                    <div className="text-xs text-green-600">Available</div>
                                                  ) : (
                                                    <div className="text-xs text-red-600">Booked</div>
                                                  )}
                                                </div>
                                              </Button>
                                            ))}
                                        </div>
                                      </div>
                                    </div>
                                  </Card>
                                </TabsContent>

                                <TabsContent value="gallery" className="space-y-6 mt-6">
                                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {Array.isArray(selectedTurf?.images) &&
                                      selectedTurf.images.map((image, index) => (
                                        <div
                                          key={index}
                                          className="relative group cursor-pointer overflow-hidden rounded-xl"
                                          onClick={() => setSelectedImageIndex(index)}
                                        >
                                          <img
                                            src={image || "/placeholder.svg"}
                                            alt={`${selectedTurf?.name || "Turf"} - Image ${index + 1}`}
                                            className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
                                          />
                                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center">
                                            <Eye className="h-8 w-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                          </div>
                                        </div>
                                      ))}
                                  </div>

                                  {/* Video Tour */}
                                  {selectedTurf?.videoTour && (
                                    <Card className="p-6">
                                      <h3 className="text-xl font-bold mb-4 flex items-center">
                                        <Play className="h-5 w-5 mr-2" />
                                        Virtual Tour
                                      </h3>
                                      <div className="relative">
                                        <img
                                          src={selectedTurf?.videoTour || "/placeholder.svg"}
                                          alt="Video Tour"
                                          className="w-full h-64 object-cover rounded-xl"
                                        />
                                        <Button className="absolute inset-0 m-auto w-16 h-16 rounded-full bg-black/70 hover:bg-black/80">
                                          <Play className="h-6 w-6 text-white ml-1" />
                                        </Button>
                                      </div>
                                    </Card>
                                  )}
                                </TabsContent>

                                <TabsContent value="contact" className="space-y-6 mt-6">
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-4">
                                      <Card className="p-6">
                                        <h3 className="font-bold text-lg mb-4 flex items-center">
                                          <Phone className="h-5 w-5 mr-2 text-green-600" />
                                          Phone
                                        </h3>
                                        <p className="text-gray-600 mb-4">{selectedTurf?.phone || "Not available"}</p>
                                        <div className="flex space-x-2">
                                          <Button className="flex-1 bg-green-600 hover:bg-green-700 rounded-xl">
                                            <Phone className="h-4 w-4 mr-2" />
                                            Call Now
                                          </Button>
                                          <Button variant="outline" className="flex-1 rounded-xl bg-transparent">
                                            <MessageCircle className="h-4 w-4 mr-2" />
                                            WhatsApp
                                          </Button>
                                        </div>
                                      </Card>

                                      <Card className="p-6">
                                        <h3 className="font-bold text-lg mb-4 flex items-center">
                                          <Mail className="h-5 w-5 mr-2 text-blue-600" />
                                          Email
                                        </h3>
                                        <p className="text-gray-600 mb-4">{selectedTurf?.email || "Not available"}</p>
                                        <Button className="w-full bg-blue-600 hover:bg-blue-700 rounded-xl">
                                          <Mail className="h-4 w-4 mr-2" />
                                          Send Email
                                        </Button>
                                      </Card>
                                    </div>

                                    <div className="space-y-4">
                                      <Card className="p-6">
                                        <h3 className="font-bold text-lg mb-4 flex items-center">
                                          <MapPin className="h-5 w-5 mr-2 text-red-600" />
                                          Location & Directions
                                        </h3>
                                        <p className="text-gray-600 mb-4">
                                          {selectedTurf?.address || "Address not available"}
                                        </p>
                                        <div className="space-y-2">
                                          <Button
                                            className="w-full bg-red-600 hover:bg-red-700 rounded-xl"
                                            onClick={() => getDirections(selectedTurf)}
                                          >
                                            <Navigation className="h-4 w-4 mr-2" />
                                            Get Directions
                                          </Button>
                                          <Button variant="outline" className="w-full rounded-xl bg-transparent">
                                            <Copy className="h-4 w-4 mr-2" />
                                            Copy Address
                                          </Button>
                                        </div>
                                      </Card>

                                      <Card className="p-6">
                                        <h3 className="font-bold text-lg mb-4 flex items-center">
                                          <Clock className="h-5 w-5 mr-2 text-orange-600" />
                                          Operating Hours
                                        </h3>
                                        <p className="text-gray-600 mb-4">
                                          {selectedTurf?.openingHours || "Not available"}
                                        </p>
                                        <div className="space-y-2 text-sm">
                                          {[
                                            { day: "Monday - Friday", hours: "6:00 AM - 11:00 PM" },
                                            { day: "Saturday - Sunday", hours: "5:00 AM - 12:00 AM" },
                                          ].map((schedule, index) => (
                                            <div key={index} className="flex justify-between">
                                              <span className="text-gray-600">{schedule.day}:</span>
                                              <span className="font-semibold">{schedule.hours}</span>
                                            </div>
                                          ))}
                                        </div>
                                      </Card>
                                    </div>
                                  </div>
                                </TabsContent>
                              </Tabs>
                            </>
                          )}
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>
                </CardContent>
              </div>
            </Card>
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
            <Button
              variant="outline"
              className="rounded-xl bg-white hover:bg-gray-50"
              onClick={() => {
                setSearchQuery("")
                setFilters({
                  distance: [20],
                  priceRange: [0, 2500],
                  availability: "all",
                  sortBy: "distance",
                  surface: "all",
                  amenities: [],
                  rating: [0],
                  weatherDependent: "all",
                })
              }}
            >
              <RotateCcw className="h-4 w-4 mr-2" />
              Clear All Filters
            </Button>
          </div>
        )}

        {/* Floating Action Buttons */}
        <div className="fixed bottom-6 right-6 flex flex-col space-y-3 z-50">
          {/* Chat Support */}
          <Button
            className="w-14 h-14 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
            onClick={() => setShowChat(!showChat)}
          >
            <MessageCircle className="h-6 w-6" />
          </Button>

          {/* Scroll to Top */}
          <Button
            variant="outline"
            className="w-14 h-14 rounded-full bg-white hover:bg-gray-50 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            <ArrowUp className="h-6 w-6" />
          </Button>
        </div>

        {/* Chat Widget */}
        {showChat && (
          <div className="fixed bottom-24 right-6 w-80 h-96 bg-white rounded-2xl shadow-2xl border-2 border-gray-200 z-50 flex flex-col">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 rounded-t-2xl flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                  <Headphones className="h-4 w-4" />
                </div>
                <div>
                  <div className="font-semibold">Support Chat</div>
                  <div className="text-xs opacity-90">Online now</div>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="text-white hover:bg-white/20 h-8 w-8 p-0 rounded-full"
                onClick={() => setShowChat(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            <div ref={chatRef} className="flex-1 p-4 overflow-y-auto space-y-3">
              <div className="bg-gray-100 rounded-lg p-3 max-w-xs">
                <p className="text-sm">Hi! How can I help you find the perfect turf today?</p>
                <span className="text-xs text-gray-500">Support • Just now</span>
              </div>

              {chatMessages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-xs rounded-lg p-3 ${
                      msg.sender === "user" ? "bg-blue-600 text-white" : "bg-gray-100"
                    }`}
                  >
                    <p className="text-sm">{msg.message}</p>
                    <span className={`text-xs ${msg.sender === "user" ? "text-blue-100" : "text-gray-500"}`}>
                      {msg.time}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 border-t">
              <div className="flex space-x-2">
                <Input
                  placeholder="Type your message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                  className="flex-1 rounded-xl"
                />
                <Button
                  onClick={sendMessage}
                  className="rounded-xl bg-blue-600 hover:bg-blue-700"
                  disabled={!newMessage.trim()}
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Notifications Panel */}
        {showNotifications && (
          <div className="fixed top-20 right-6 w-80 bg-white rounded-2xl shadow-2xl border-2 border-gray-200 z-50">
            <div className="p-4 border-b">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-lg">Notifications</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowNotifications(false)}
                  className="h-8 w-8 p-0 rounded-full"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="max-h-80 overflow-y-auto">
              {notifications.map((notification) => (
                <div key={notification.id} className="p-4 border-b hover:bg-gray-50 transition-colors">
                  <div className="flex items-start space-x-3">
                    <div
                      className={`w-2 h-2 rounded-full mt-2 ${
                        notification.type === "success"
                          ? "bg-green-500"
                          : notification.type === "info"
                            ? "bg-blue-500"
                            : "bg-orange-500"
                      }`}
                    />
                    <div className="flex-1">
                      <p className="text-sm">{notification.message}</p>
                      <span className="text-xs text-gray-500">{notification.time}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-4 border-t">
              <Button variant="outline" className="w-full rounded-xl bg-transparent">
                View All Notifications
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
