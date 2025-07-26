import mongoose from "mongoose"

const timeSlotSchema = new mongoose.Schema({
  time: String,
  available: Boolean,
  price: Number,
  demand: {
    type: String,
    enum: ["low", "medium", "high"],
    default: "low",
  },
})

const weatherSchema = new mongoose.Schema({
  temperature: Number,
  condition: String, // sunny, rainy, cloudy etc.
})

const turfSchema = new mongoose.Schema({
  name: String,
  address: String,
  price: Number,
  rating: Number,
  reviews: Number,
  surface: String,
  size: String,
  capacity: Number,
  openingHours: String,
  established: String,
  loyaltyPoints: Number,
  email: String,
  phone: String,
  videoTour: String,
  images: [String],
  amenities: [String],
  weather: weatherSchema,
  timeSlots: [timeSlotSchema],
  location: {
    lat: Number,
    lng: Number,
  },
})

export default mongoose.model("Turf", turfSchema)
