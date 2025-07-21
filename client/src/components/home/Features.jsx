import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  CalendarIcon,
  ClockIcon,
  MapPinIcon,
  ShieldIcon,
  TagIcon,
  UsersIcon,
  ChevronLeftIcon,
  ChevronRightIcon
} from 'lucide-react';

const featuresList = [
  {
    icon: <CalendarIcon size={36} className="text-green-600" />,
    title: 'Easy Booking',
    description: 'Book your preferred turf with just a few clicks, anytime and anywhere.'
  },
  {
    icon: <MapPinIcon size={36} className="text-green-600" />,
    title: 'Multiple Locations',
    description: 'Choose from various turfs located across the city for your convenience.'
  },
  {
    icon: <ClockIcon size={36} className="text-green-600" />,
    title: 'Flexible Hours',
    description: 'Morning or night, weekday or weekend - play whenever suits you best.'
  },
  {
    icon: <UsersIcon size={36} className="text-green-600" />,
    title: 'Various Formats',
    description: '5-a-side, 7-a-side or full pitch - we have options for all team sizes.'
  },
  {
    icon: <ShieldIcon size={36} className="text-green-600" />,
    title: 'Premium Facilities',
    description: 'Enjoy top-quality turf, changing rooms, and other premium amenities.'
  },
  {
    icon: <TagIcon size={36} className="text-green-600" />,
    title: 'Best Prices',
    description: 'Competitive pricing with special discounts for regular players.'
  },
  {
    icon: <ShieldIcon size={36} className="text-green-600" />,
    title: 'Secure Payments',
    description: 'All transactions are safe, encrypted and protected for a smooth experience.'
  },
  {
    icon: <UsersIcon size={36} className="text-green-600" />,
    title: 'Community Events',
    description: 'Join local matches, tournaments, and social football meetups.'
  }
];

const Features = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px 0px' });
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => setCurrentIndex((prev) => (prev === featuresList.length - 1 ? 0 : prev + 1));
  const prevSlide = () => setCurrentIndex((prev) => (prev === 0 ? featuresList.length - 1 : prev - 1));

  useEffect(() => {
    const timer = setInterval(nextSlide, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-20 bg-white" ref={ref}>
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Why Choose <span className="text-green-600">TurfTime</span>?
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We provide the best turf booking experience with premium facilities
            and seamless service.
          </p>
        </motion.div>

        {/* Desktop Grid */}
        <div className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuresList.map((feature, index) => (
            <motion.div
              key={index}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-100 group"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.03 }}
            >
              <motion.div className="mb-4" whileHover={{ scale: 1.2 }}>
                {feature.icon}
              </motion.div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Mobile Carousel */}
        <div className="md:hidden relative">
          <div className="overflow-hidden">
            <motion.div
              className="bg-white p-6 rounded-lg shadow-md border border-gray-100 h-full"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              key={currentIndex}
            >
              <motion.div
                className="mb-4 flex justify-center"
                animate={{ scale: [1, 1.1, 1], rotateZ: [0, 5, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity, repeatType: 'reverse' }}
              >
                {featuresList[currentIndex].icon}
              </motion.div>
              <h3 className="text-xl font-semibold mb-2 text-center">
                {featuresList[currentIndex].title}
              </h3>
              <p className="text-gray-600 text-center">
                {featuresList[currentIndex].description}
              </p>
            </motion.div>
          </div>

          {/* Navigation */}
          <div className="flex justify-center mt-4">
            <button
              onClick={prevSlide}
              className="mx-2 p-2 rounded-full bg-green-100 text-green-600 hover:bg-green-200"
              aria-label="Previous slide"
            >
              <ChevronLeftIcon size={20} />
            </button>
            <div className="flex items-center mx-4">
              {featuresList.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 mx-1 rounded-full ${currentIndex === index ? 'bg-green-600' : 'bg-gray-300'}`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
            <button
              onClick={nextSlide}
              className="mx-2 p-2 rounded-full bg-green-100 text-green-600 hover:bg-green-200"
              aria-label="Next slide"
            >
              <ChevronRightIcon size={20} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
