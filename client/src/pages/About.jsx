import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
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
              About Us
            </h1>
            <p className="text-xl text-green-100 max-w-2xl mx-auto">
              Learn about our journey to revolutionize turf booking and our
              commitment to sports enthusiasts.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              Our <span className="text-green-600">Story</span>
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              This is a placeholder for the About Us page. In a complete
              implementation, this would include the company's story, team
              information, and mission statement.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
