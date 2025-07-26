"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
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
  )
}

export default TopNavigation
