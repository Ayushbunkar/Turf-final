import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import turf1 from "../assets/turf1.webp";

// Mock Turf Data (should come from API or context in real app)
const turfData = [
  {
    id: 1,
    name: "Game ON",
    location: "Hoshangabad Road, Bhopal",
    type: "5-a-side Turf",
    price: 1000,
    rating: 4.8,
    image: turf1, // <-- Fix: use direct import, not { turf1 }
  },
  {
    id: 2,
    name: "Rush Arena",
    location: "Kolar Road, Bhopal",
    type: "7-a-side Turf",
    price: 1200,
    rating: 4.6,
    image:
      "https://images.unsplash.com/photo-1508609349937-5ec4ae374ebf?auto=format&fit=crop&w=987&q=80",
  },
  {
    id: 3,
    name: "Blaze Sports Club",
    location: "MP Nagar, Bhopal",
    type: "Futsal Arena",
    price: 1500,
    rating: 4.9,
    image:
      "https://images.unsplash.com/photo-1603052877333-dfa0d0d0f5b6?auto=format&fit=crop&w=987&q=80",
  },
];

const TurfDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const turf = turfData.find((t) => t.id === parseInt(id));

  if (!turf) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl text-gray-700">
        Turf not found.
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 bg-white">
      {/* Hero Section */}
      <section className="py-16 bg-green-600">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {turf.name}
            </h1>
            <p className="text-xl text-green-100 max-w-2xl mx-auto">
              View turf details and book your slot today!
            </p>
          </motion.div>
        </div>
      </section>

      {/* Detail Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* Turf Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7 }}
              className="rounded-lg overflow-hidden shadow-lg"
            >
              <img
                src={turf.image}
                alt={turf.name}
                className="w-full h-80 object-cover"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "/placeholder.svg";
                }}
              />
            </motion.div>

            {/* Turf Info */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              className="space-y-4"
            >
              <h2 className="text-3xl font-semibold text-gray-800">
                {turf.name}
              </h2>
              <p className="text-lg text-gray-700">
                <strong>Location:</strong> {turf.location}
              </p>
              <p className="text-lg text-gray-700">
                <strong>Type:</strong> {turf.type}
              </p>
              <p className="text-lg text-gray-700">
                <strong>Price:</strong> ₹{turf.price}/hour
              </p>
              <p className="text-lg text-gray-700">
                <strong>Rating:</strong> {turf.rating} ⭐
              </p>

              <button
                onClick={() => navigate(`/booking/${turf.id}`)}
                className="mt-4 bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition"
              >
                Book Now
              </button>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TurfDetail;
