import React from 'react';
import { motion } from 'framer-motion';

const Turfs = () => {
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
              Explore Turfs
            </h1>
            <p className="text-xl text-green-100 max-w-2xl mx-auto">
              Find and book the perfect turf for your game.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Available Turfs Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              Available <span className="text-green-600">Turfs</span>
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              This is a placeholder for the Turfs page. In a complete
              implementation, this would include a searchable, filterable list
              of available turfs with details and booking options.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Turfs;
