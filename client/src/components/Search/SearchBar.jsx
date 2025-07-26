"use client"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Search, Filter, X, Gift, RotateCcw } from "lucide-react"

const SearchBar = ({
  searchQuery,
  setSearchQuery,
  showFilters,
  setShowFilters,
  filters,
  showReferral,
  setShowReferral,
  resetFilters,
  filteredTurfs,
  totalTurfs,
}) => {
  const activeFiltersCount =
    filters.amenities.length + (filters.surface !== "all" ? 1 : 0) + (filters.rating[0] > 0 ? 1 : 0)

  return (
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
          {activeFiltersCount > 0 && <Badge className="ml-2 bg-blue-500 animate-pulse">{activeFiltersCount}</Badge>}
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

      {/* Results count */}
      {showFilters && (
        <div className="flex justify-between items-center">
          <Button variant="outline" onClick={resetFilters} className="rounded-xl bg-transparent">
            <RotateCcw className="h-4 w-4 mr-2" />
            Reset Filters
          </Button>
          <div className="text-sm text-gray-600">
            Showing {filteredTurfs.length} of {totalTurfs} turfs
          </div>
        </div>
      )}
    </div>
  )
}

export default SearchBar
