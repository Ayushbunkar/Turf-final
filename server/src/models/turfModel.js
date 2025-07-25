// server/src/models/turfModel.js
import mongoose from "mongoose";

const turfSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  location: String,
  latitude: {
    type: Number,
    required: true,
  },
  longitude: {
    type: Number,
    required: true,
  },
});

const Turf = mongoose.model("Turf", turfSchema);
export default Turf;
