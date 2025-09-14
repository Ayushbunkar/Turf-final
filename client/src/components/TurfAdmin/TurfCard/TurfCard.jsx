"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../ui/Card.jsx"
import { Badge } from "../../ui/Badge.jsx"
import { Button } from "../../ui/Button.jsx"
import { Dialog, DialogContent, DialogTrigger } from "../../ui/Dialog.jsx"
import {
  MapPin, Star, Navigation, Eye, Heart, Share2, Shield,
  Users, Clock, Trophy, Percent
} from "lucide-react"
import { getAvailableSlotsCount } from "../../../utils/turfUtils.js"
import { weatherIcons } from "../../../constants/appConstants.js"
import TurfDetailsModal from "../../Modals/TurfDetailsModal.jsx"

const TurfCard = ({ turf, viewMode, favorites, toggleFavorite, shareTurf, getDirections, setSelectedTurf, distance }) => {
  const WeatherIcon = weatherIcons[turf?.weather?.condition] || weatherIcons.sunny

  return (
    <Card
      className={`overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 bg-white/90 backdrop-blur-sm border-2 border-green-500 hover:border-green-600 group ${
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
            {distance ? distance : "Calculating..."}
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
              <WeatherIcon className="h-4 w-4 text-green-600" />
              <span className="text-xs font-medium">{turf.weather.temperature}°C</span>
            </div>
          </div>
        )}
      </div>

      <div className="flex-1">
        <CardHeader className="pb-3">
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <CardTitle className="text-xl group-hover:text-green-600 transition-colors duration-300 flex items-center">
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
                <Badge variant="outline" className="text-xs">{turf.surface || "Unknown"}</Badge>
              </div>
            </div>
            <div className="text-right ml-4">
              <div className="text-2xl font-bold text-green-600">₹{turf.price || 0}</div>
              <div className="text-sm text-gray-500">per hour</div>
              {Array.isArray(turf.groupDiscounts) && turf.groupDiscounts.length > 0 && (
                <Badge className="mt-1 bg-green-100 text-green-800 text-xs">
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
                    className="text-xs bg-green-50 text-green-700 hover:bg-green-100 transition-colors duration-300"
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
              <div className="bg-green-50 rounded-lg p-2">
                <Users className="h-4 w-4 mx-auto text-green-600 mb-1" />
                <div className="text-xs text-gray-600">Capacity</div>
                <div className="text-sm font-semibold">{turf.capacity || 0}</div>
              </div>
              <div className="bg-green-50 rounded-lg p-2">
                <Clock className="h-4 w-4 mx-auto text-green-600 mb-1" />
                <div className="text-xs text-gray-600">Available</div>
                <div className="text-sm font-semibold">{getAvailableSlotsCount(turf.timeSlots)} slots</div>
              </div>
              <div className="bg-green-50 rounded-lg p-2">
                <Trophy className="h-4 w-4 mx-auto text-yellow-600 mb-1" />
                <div className="text-xs text-gray-600">Since</div>
                <div className="text-sm font-semibold">{turf.established || "N/A"}</div>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex justify-between items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => getDirections(turf)}
                className="rounded-xl hover:bg-green-50 hover:border-green-600 focus:border-green-600 active:border-green-600 transition-all duration-300 hover:scale-105 border-green-500"
              >
                <Navigation className="h-4 w-4 mr-2" />
                Directions
              </Button>

              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    className="rounded-xl bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 transition-all duration-300 hover:scale-105 hover:shadow-lg ml-auto"
                    onClick={() => setSelectedTurf(turf)}
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    View & Book
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-white/95 backdrop-blur-sm">
                  <TurfDetailsModal turf={turf} />
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </CardContent>
      </div>
    </Card>
  )
}

export default TurfCard
