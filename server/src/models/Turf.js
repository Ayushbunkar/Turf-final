import mongoose from "mongoose";

const timeSlotSchema = new mongoose.Schema({
  time: String,
  price: Number,
  available: Boolean,
});

const turfSchema = new mongoose.Schema({
  name: String,
  location: {
    lat: Number,
    lng: Number,
  },
  address: String,
  timeSlots: [timeSlotSchema],
  amenities: [String],
  images: [String],
});

const Turf = mongoose.model("Turf", turfSchema);
export default Turf;
