"use client"

import { Button } from "../ui/Button"
import { Badge } from "../ui/Badge"
import { Menu, MapPin, ShoppingCart, Bell, Award } from "lucide-react"

const TopNavigation = ({
  viewMode,
  setViewMode,
  userProfile,
  cart,
  notifications,
  showNotifications,
  setShowNotifications,
}) => {
  return (
    <div className="mb-6 flex justify-between items-center bg-green-50/80 backdrop-blur-sm rounded-2xl p-4 shadow-lg">
      <div className="flex items-center space-x-4">
        <Button
          variant={viewMode === "grid" ? "default" : "outline"}
          size="sm"
          onClick={() => setViewMode("grid")}
          className={`transition-all duration-300 hover:scale-105 border-2 border-green-600 ${viewMode === "grid" ? "bg-green-600 text-white" : "bg-green-100 text-green-800"}`}
        >
          <div className="grid grid-cols-2 gap-1 w-4 h-4">
            <div className="bg-green-700 rounded-sm"></div>
            <div className="bg-green-700 rounded-sm"></div>
            <div className="bg-green-700 rounded-sm"></div>
            <div className="bg-green-700 rounded-sm"></div>
          </div>
        </Button>
        <Button
          variant={viewMode === "list" ? "default" : "outline"}
          size="sm"
          onClick={() => setViewMode("list")}
          className={`transition-all duration-300 hover:scale-105 border-2 border-green-600 ${viewMode === "list" ? "bg-green-600 text-white" : "bg-green-100 text-green-800"}`}
        >
          <Menu className="h-4 w-4" />
        </Button>
        <Button
          variant={viewMode === "map" ? "default" : "outline"}
          size="sm"
          onClick={() => setViewMode("map")}
          className={`transition-all duration-300 hover:scale-105 border-2 border-green-600 ${viewMode === "map" ? "bg-green-600 text-white" : "bg-green-100 text-green-800"}`}
        >
          <MapPin className="h-4 w-4" />
        </Button>
      </div>

      <div className="flex items-center space-x-4">
       

        {/* Notifications */}
        <Button
          variant="outline"
          size="sm"
          className="relative transition-all duration-300 hover:scale-105 bg-green-100 border-2 border-green-600 text-green-700"
          onClick={() => setShowNotifications(!showNotifications)}
        >
          <Bell className="h-4 w-4" />
          {notifications.length > 0 && (
            <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 bg-red-500 animate-pulse">
              {notifications.length}
            </Badge>
          )}
        </Button>

       
      </div>
    </div>
  )
}

export default TopNavigation
