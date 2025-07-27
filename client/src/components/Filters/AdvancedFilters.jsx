"use client"

import { Card } from "../ui/Card.jsx"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Navigation, DollarSign, Star, Activity } from "lucide-react"

const AdvancedFilters = ({ filters, setFilters, showFilters }) => {
  if (!showFilters) return null

  return (
    <Card className="p-6 bg-white/90 backdrop-blur-sm border-2 border-green-500 focus:border-green-600 active:border-green-600 rounded-2xl shadow-xl">
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
    </Card>
  )
}

export default AdvancedFilters
