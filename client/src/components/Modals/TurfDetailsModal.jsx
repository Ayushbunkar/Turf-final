// src/components/Modals/TurfDetailsModal.jsx
"use client"

import { useEffect, useState } from "react"
import axios from "axios"
import { DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card } from "../ui/Card.jsx"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  MapPin, Star, Phone, Mail, Navigation,
  Clock, Eye, Play, CheckCircle, Copy, Award,
} from "lucide-react"
import { weatherIcons, demandColors } from "../../constants/appConstants"
import { getAvailableSlotsCount } from "../../utils/turfUtils"

const TurfDetailsModal = ({ turfId }) => {
  const [turf, setTurf] = useState(null)
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [loading, setLoading] = useState(true)

  // Fetch turf data by ID
  useEffect(() => {
    if (!turfId) return
    const fetchTurf = async () => {
      try {
        setLoading(true)
        const res = await axios.get(`/api/turfs/${turfId}`)
        setTurf(res.data)
      } catch (err) {
        console.error("Failed to fetch turf", err)
      } finally {
        setLoading(false)
      }
    }

    fetchTurf()
  }, [turfId])

  if (!turfId) return null
  if (loading) return <div className="p-6 text-center">Loading turf details...</div>
  if (!turf) return <div className="p-6 text-center text-red-500">Turf not found.</div>

  const WeatherIcon = weatherIcons[turf?.weather?.condition] || weatherIcons.sunny

  return (
    <>
      <DialogHeader className="border-b pb-4">
        <div className="flex justify-between items-start">
          <div>
            <DialogTitle className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {turf?.name || "Unknown Turf"}
            </DialogTitle>
            <DialogDescription className="text-lg mt-2">
              <div className="flex items-center">
                <MapPin className="h-5 w-5 mr-2 text-blue-600" />
                {turf?.address || "Address not available"}
              </div>
            </DialogDescription>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold text-green-600">₹{turf?.price || 0}</div>
            <div className="text-gray-500">per hour</div>
            <div className="flex items-center justify-end mt-2">
              <Star className="h-5 w-5 text-yellow-400 fill-current" />
              <span className="ml-1 font-semibold">{turf?.rating || 0}</span>
              <span className="ml-1 text-gray-500">({turf?.reviews || 0} reviews)</span>
            </div>
          </div>
        </div>
      </DialogHeader>

      {/* KEEP the rest of your UI content as it is, from the previous message.
          Everything below remains the same including TabsContent, Cards, etc. */}
      {/* Just use turf?.xxx instead of props */}
      {/* You already pasted the rest of the component above, so you can directly plug it here */}
    </>
  )
}

export default TurfDetailsModal
