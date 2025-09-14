import mongoose from 'mongoose';

const turfSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A turf must have a name'],
    trim: true
  },
  location: {
    type: String,
    required: [true, 'A turf must have a location']
  },
  description: {
    type: String,
    required: [true, 'A turf must have a description']
  },
  pricePerHour: {
    type: Number,
    required: [true, 'A turf must have a price']
  },
  sportType: {
    type: String,
    required: [true, 'A turf must specify a sport type'],
    enum: ['football', 'cricket', 'basketball', 'volleyball', 'badminton', 'tennis', 'multiple']
  },
  images: [String],
  amenities: [String],
  owner: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'A turf must have an owner']
  },
  turfOwner: {  // For consistency in queries
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  },
  availability: {
    type: Map,
    of: {
      start: String,
      end: String,
      isAvailable: Boolean
    },
    default: {}
  },
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  },
  size: String,
  capacity: Number,
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual populate for reviews
turfSchema.virtual('reviews', {
  ref: 'Review',
  foreignField: 'turf',
  localField: '_id'
});

// Add a pre-save hook to set turfOwner
turfSchema.pre('save', function(next) {
  if (!this.turfOwner) {
    this.turfOwner = this.owner;
  }
  next();
});

const Turf = mongoose.model('Turf', turfSchema);

export default Turf;