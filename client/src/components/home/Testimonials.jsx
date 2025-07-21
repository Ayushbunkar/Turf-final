import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { StarIcon, ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';

const testimonials = [
  {
    name: 'Michael Johnson',
    role: 'Football Enthusiast',
    image: 'https://randomuser.me/api/portraits/men/32.jpg',
    rating: 5,
    text: 'TurfTime has revolutionized how we book our weekly football matches. The turfs are always in perfect condition and booking is super easy!'
  },
  {
    name: 'Sarah Williams',
    role: 'Team Captain',
    image: 'https://randomuser.me/api/portraits/women/44.jpg',
    rating: 5,
    text: 'As a team captain, I need reliability and quality. TurfTime delivers both consistently. Their customer service is also outstanding.'
  },
  {
    name: 'David Chen',
    role: 'Sports Club Manager',
    image: 'https://randomuser.me/api/portraits/men/67.jpg',
    rating: 4,
    text: 'We use TurfTime for all our club bookings. The platform is intuitive and the variety of turfs available suits all our different needs.'
  },
  {
    name: 'Emma Thompson',
    role: 'Casual Player',
    image: 'https://randomuser.me/api/portraits/women/23.jpg',
    rating: 5,
    text: 'I love how easy it is to find and book a turf for a casual game with friends. The prices are reasonable and the facilities are great!'
  },
  {
    name: 'Raj Patel',
    role: 'Weekend Warrior',
    image: 'https://randomuser.me/api/portraits/men/91.jpg',
    rating: 4,
    text: 'TurfTime is my go-to app every weekend. Hassle-free and affordable!'
  },
  {
    name: 'Lina Gomez',
    role: 'Coach',
    image: 'https://randomuser.me/api/portraits/women/47.jpg',
    rating: 5,
    text: 'Great platform for organizing coaching sessions and scrims. A+ facilities.'
  },
  {
    name: 'Amar Singh',
    role: 'College Captain',
    image: 'https://randomuser.me/api/portraits/men/36.jpg',
    rating: 5,
    text: 'I’ve booked over 20 matches through TurfTime. Never had a problem.'
  },
  {
    name: 'Anjali Mehta',
    role: 'Fitness Buff',
    image: 'https://randomuser.me/api/portraits/women/55.jpg',
    rating: 5,
    text: 'Clean, professional, and high-quality experience every single time.'
  }
];

const Testimonials = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px 0px' });

  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const nextSlide = () => {
    setDirection(1);
    setCurrentIndex(prev => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentIndex(prev => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  useEffect(() => {
    const timer = setInterval(nextSlide, 6000);
    return () => clearInterval(timer);
  }, []);

  const slideVariants = {
    hidden: direction => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
      scale: 0.8
    }),
    visible: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: { duration: 0.6 }
    },
    exit: direction => ({
      x: direction > 0 ? -300 : 300,
      opacity: 0,
      scale: 0.8,
      transition: { duration: 0.6 }
    })
  };

  return (
    <section ref={ref} className="py-20 bg-[#f9fafb] relative overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            What Our <span className="text-green-600">Players Say</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Real stories from real people who love playing with TurfTime.
          </p>
        </motion.div>

        {/* Desktop view - Grid */}
        <div className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              className="bg-white p-6 rounded-xl shadow-xl backdrop-blur-md border border-gray-200 hover:shadow-2xl transition-transform hover:-translate-y-2"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <div className="flex items-center gap-4 mb-4">
                <img src={testimonial.image} alt={testimonial.name} className="w-14 h-14 rounded-full object-cover" />
                <div>
                  <h4 className="font-semibold">{testimonial.name}</h4>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </div>
              <div className="flex gap-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <StarIcon key={i} size={18} className={i < testimonial.rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'} />
                ))}
              </div>
              <p className="text-gray-700 italic">"{testimonial.text}"</p>
            </motion.div>
          ))}
        </div>

        {/* Mobile View - Carousel */}
        <div className="md:hidden relative mt-10 h-[370px]">
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={slideVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="absolute w-full bg-white p-6 rounded-lg shadow-lg"
            >
              <div className="flex items-center mb-4">
                <div className="relative">
                  <img src={testimonials[currentIndex].image} alt={testimonials[currentIndex].name} className="w-14 h-14 rounded-full object-cover" />
                  <motion.div
                    className="absolute inset-0 rounded-full border-2 border-green-500 animate-pulse"
                    animate={{ scale: [1, 1.1, 1], opacity: [0.4, 0.8, 0.4] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold">{testimonials[currentIndex].name}</h4>
                  <p className="text-sm text-gray-500">{testimonials[currentIndex].role}</p>
                </div>
              </div>
              <div className="flex gap-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <StarIcon key={i} size={18} className={i < testimonials[currentIndex].rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'} />
                ))}
              </div>
              <p className="text-gray-700 italic">"{testimonials[currentIndex].text}"</p>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Buttons */}
          <div className="flex justify-center mt-6">
            <button onClick={prevSlide} className="mx-2 p-2 rounded-full bg-green-100 text-green-600 hover:bg-green-200">
              <ChevronLeftIcon size={20} />
            </button>
            <button onClick={nextSlide} className="mx-2 p-2 rounded-full bg-green-100 text-green-600 hover:bg-green-200">
              <ChevronRightIcon size={20} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
