"use client"

import { useState } from "react"
import { DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card } from "../ui/Card.jsx"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { MapPin, Star, Phone, Mail, Navigation, Clock, Eye, Play, CheckCircle, Copy, Award } from "lucide-react"
import { weatherIcons, demandColors } from "../../constants/appConstants"
import { getAvailableSlotsCount } from "../../utils/turfUtils"

const TurfDetailsModal = ({ turf }) => {
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)

  if (!turf) return null

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
                Array.isArray(turf?.images) && turf.images[selectedImageIndex]
                  ? turf.images[selectedImageIndex]
                  : "/placeholder.svg"
              }
              alt={turf?.name || "Turf"}
              className="w-full h-80 object-cover rounded-2xl shadow-lg"
            />
            {Array.isArray(turf?.images) && turf.images.length > 1 && (
              <div className="absolute bottom-4 left-4 flex space-x-2">
                {turf.images.map((_, index) => (
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
                    <span className="text-2xl font-bold text-blue-700">{turf?.weather?.temperature || 25}°C</span>
                  </div>
                  <p className="text-sm text-blue-600 capitalize mt-1">{turf?.weather?.condition || "sunny"}</p>
                </div>
              </div>
            </Card>

            <Card className="p-4 bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
              <h3 className="font-semibold text-green-800">Availability</h3>
              <div className="mt-2">
                <div className="text-2xl font-bold text-green-700">{getAvailableSlotsCount(turf?.timeSlots)}</div>
                <p className="text-sm text-green-600">slots available today</p>
              </div>
              <div className="mt-3 flex space-x-1">
                {Array.isArray(turf?.timeSlots) &&
                  turf.timeSlots
                    .slice(0, 8)
                    .map((slot, index) => (
                      <div
                        key={index}
                        className={`w-3 h-3 rounded-full ${slot && slot.available ? "bg-green-400" : "bg-red-400"}`}
                        title={`${slot?.time || "N/A"} - ${slot?.available ? "Available" : "Booked"}`}
                      />
                    ))}
              </div>
            </Card>

            <Card className="p-4 bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
              <h3 className="font-semibold text-purple-800">Loyalty Rewards</h3>
              <div className="mt-2">
                <div className="text-2xl font-bold text-purple-700">+{turf?.loyaltyPoints || 0}</div>
                <p className="text-sm text-purple-600">points per booking</p>
              </div>
              <div className="mt-3">
                <Badge className="bg-purple-100 text-purple-800">
                  <Award className="h-3 w-3 mr-1" />
                  Gold Member
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
                  <span className="font-semibold">{turf?.surface || "Unknown"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Field Size:</span>
                  <span className="font-semibold">{turf?.size || "Unknown"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Capacity:</span>
                  <span className="font-semibold">{turf?.capacity || 0} players</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Operating Hours:</span>
                  <span className="font-semibold">{turf?.openingHours || "Unknown"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Established:</span>
                  <span className="font-semibold">{turf?.established || "Unknown"}</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-bold text-gray-800">Description</h3>
              <p className="text-gray-600 leading-relaxed">
                {turf?.detailedDescription || turf?.description || "No description available"}
              </p>

              <h4 className="text-lg font-semibold text-gray-800 mt-6">Amenities</h4>
              <div className="grid grid-cols-2 gap-2">
                {Array.isArray(turf?.amenities) &&
                  turf.amenities.map((amenity) => (
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
                <label className="text-sm font-semibold text-gray-700 mb-2 block">Select Date</label>
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  className="rounded-xl border-2 border-gray-200"
                  disabled={(date) => date < new Date()}
                />
              </div>

              <div>
                <label className="text-sm font-semibold text-gray-700 mb-2 block">Available Time Slots</label>
                <div className="space-y-2 max-h-80 overflow-y-auto">
                  {Array.isArray(turf?.timeSlots) &&
                    turf.timeSlots.map((slot) => (
                      <Button
                        key={slot.time}
                        variant={slot.available ? "outline" : "secondary"}
                        disabled={!slot.available}
                        className={`w-full justify-between p-4 h-auto rounded-xl transition-all duration-300 hover:scale-105 ${
                          slot.available ? "hover:bg-blue-50 hover:border-blue-300" : "opacity-50 cursor-not-allowed"
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <Clock className="h-4 w-4" />
                          <span className="font-semibold">{slot.time}</span>
                          <Badge className={`${demandColors[slot.demand] || demandColors.low} text-xs`}>
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
            {Array.isArray(turf?.images) &&
              turf.images.map((image, index) => (
                <div
                  key={index}
                  className="relative group cursor-pointer overflow-hidden rounded-xl"
                  onClick={() => setSelectedImageIndex(index)}
                >
                  <img
                    src={image || "/placeholder.svg"}
                    alt={`${turf?.name || "Turf"} - Image ${index + 1}`}
                    className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center">
                    <Eye className="h-8 w-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                </div>
              ))}
          </div>

          {/* Video Tour */}
          {turf?.videoTour && (
            <Card className="p-6">
              <h3 className="text-xl font-bold mb-4 flex items-center">
                <Play className="h-5 w-5 mr-2" />
                Virtual Tour
              </h3>
              <div className="relative">
                <img
                  src={turf?.videoTour || "/placeholder.svg"}
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
                <p className="text-gray-600 mb-4">{turf?.phone || "Not available"}</p>
                <div className="flex space-x-2">
                  <Button className="flex-1 bg-green-600 hover:bg-green-700 rounded-xl">
                    <Phone className="h-4 w-4 mr-2" />
                    Call Now
                  </Button>
                  <Button variant="outline" className="flex-1 rounded-xl bg-transparent">
                    <Mail className="h-4 w-4 mr-2" />
                    WhatsApp
                  </Button>
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="font-bold text-lg mb-4 flex items-center">
                  <Mail className="h-5 w-5 mr-2 text-blue-600" />
                  Email
                </h3>
                <p className="text-gray-600 mb-4">{turf?.email || "Not available"}</p>
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
                <p className="text-gray-600 mb-4">{turf?.address || "Address not available"}</p>
                <div className="space-y-2">
                  <Button className="w-full bg-red-600 hover:bg-red-700 rounded-xl">
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
                <p className="text-gray-600 mb-4">{turf?.openingHours || "Not available"}</p>
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
  )
}

export default TurfDetailsModal
