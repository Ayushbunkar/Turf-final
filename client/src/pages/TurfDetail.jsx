import { motion } from 'framer-motion';
import React from 'react';

const TurfDetail = () => {
  return (
    <div className="min-h-screen pt-20 bg-white">
      {/* Header Section */}
      <section className="py-16 bg-green-600">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Turf Details
            </h1>
            <p className="text-xl text-green-100 max-w-2xl mx-auto">
              View details and book this turf.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Info Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              Turf <span className="text-green-600">Information</span>
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              This is a placeholder for the Turf Detail page. In a complete
              implementation, this would include detailed information about a
              specific turf, images, amenities, pricing, and booking options.
            </p>
          </div>

          {/* Placeholder for images and details */}
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="bg-gray-100 rounded-lg h-64"></div>
            <div className="space-y-4">
              <p className="text-lg text-gray-700">
                <strong>Location:</strong> Downtown Sports Complex
              </p>
              <p className="text-lg text-gray-700">
                <strong>Type:</strong> 5-a-side Turf
              </p>
              <p className="text-lg text-gray-700">
                <strong>Price:</strong> ₹1000/hour
              </p>
              <p className="text-lg text-gray-700">
                <strong>Rating:</strong> 4.8 ⭐
              </p>
              <button className="mt-4 bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700">
                Book Now
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TurfDetail;
