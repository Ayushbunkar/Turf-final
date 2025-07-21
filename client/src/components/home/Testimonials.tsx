import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { StarIcon, ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
const testimonials = [{
  name: 'Michael Johnson',
  role: 'Football Enthusiast',
  image: 'https://randomuser.me/api/portraits/men/32.jpg',
  rating: 5,
  text: 'TurfTime has revolutionized how we book our weekly football matches. The turfs are always in perfect condition and booking is super easy!'
}, {
  name: 'Sarah Williams',
  role: 'Team Captain',
  image: 'https://randomuser.me/api/portraits/women/44.jpg',
  rating: 5,
  text: 'As a team captain, I need reliability and quality. TurfTime delivers both consistently. Their customer service is also outstanding.'
}, {
  name: 'David Chen',
  role: 'Sports Club Manager',
  image: 'https://randomuser.me/api/portraits/men/67.jpg',
  rating: 4,
  text: 'We use TurfTime for all our club bookings. The platform is intuitive and the variety of turfs available suits all our different needs.'
}, {
  name: 'Emma Thompson',
  role: 'Casual Player',
  image: 'https://randomuser.me/api/portraits/women/23.jpg',
  rating: 5,
  text: 'I love how easy it is to find and book a turf for a casual game with friends. The prices are reasonable and the facilities are great!'
}];
const Testimonials = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true,
    margin: '-100px 0px'
  });
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const nextSlide = () => {
    setDirection(1);
    setCurrentIndex(prevIndex => prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1);
  };
  const prevSlide = () => {
    setDirection(-1);
    setCurrentIndex(prevIndex => prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1);
  };
  // Auto-advance slides
  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(timer);
  }, []);
  // Animation variants
  const slideVariants = {
    hidden: direction => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0
    }),
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    },
    exit: direction => ({
      x: direction > 0 ? -300 : 300,
      opacity: 0,
      transition: {
        duration: 0.5
      }
    })
  };
  return <section className="py-20 bg-gray-50 overflow-hidden" ref={ref}>
      <div className="container mx-auto px-4">
        <motion.div className="text-center mb-12" initial={{
        opacity: 0,
        y: 20
      }} animate={isInView ? {
        opacity: 1,
        y: 0
      } : {
        opacity: 0,
        y: 20
      }} transition={{
        duration: 0.6
      }}>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            What Our <span className="text-green-600">Players Say</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Don't just take our word for it. Here's what our customers have to
            say about their TurfTime experience.
          </p>
        </motion.div>
        <motion.div initial={{
        opacity: 0
      }} animate={isInView ? {
        opacity: 1
      } : {
        opacity: 0
      }} transition={{
        duration: 0.8,
        delay: 0.2
      }} className="relative">
          {/* Desktop version */}
          <div className="hidden md:block">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mx-auto max-w-6xl">
              {testimonials.map((testimonial, index) => <motion.div key={index} className={`bg-white p-6 rounded-lg shadow-lg transform-gpu ${index === 1 ? 'lg:col-span-1 md:col-span-2' : ''}`} initial={{
              opacity: 0,
              y: 20
            }} animate={{
              opacity: isInView ? 1 : 0,
              y: isInView ? 0 : 20
            }} transition={{
              delay: index * 0.2,
              duration: 0.5
            }} whileHover={{
              scale: 1.03,
              rotateY: 5,
              rotateX: 5,
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
            }}>
                  <div className="flex items-center mb-4">
                    <div className="relative">
                      <motion.div className="absolute inset-0 bg-green-500 rounded-full" animate={{
                    scale: [1, 1.1, 1],
                    opacity: [0.5, 0.8, 0.5]
                  }} transition={{
                    duration: 3,
                    repeat: Infinity,
                    repeatType: 'reverse'
                  }} />
                      <img src={testimonial.image} alt={testimonial.name} className="w-14 h-14 rounded-full object-cover mr-4 relative z-10" />
                    </div>
                    <div>
                      <h4 className="font-semibold">{testimonial.name}</h4>
                      <p className="text-gray-600 text-sm">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                  <div className="flex mb-3">
                    {[...Array(5)].map((_, i) => <motion.div key={i} initial={{
                  opacity: 0,
                  y: 10
                }} animate={{
                  opacity: 1,
                  y: 0
                }} transition={{
                  delay: i * 0.1
                }}>
                        <StarIcon size={18} className={i < testimonial.rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'} />
                      </motion.div>)}
                  </div>
                  <p className="text-gray-600 italic flex-grow">
                    "{testimonial.text}"
                  </p>
                </motion.div>)}
            </div>
          </div>
          {/* Mobile version with custom carousel */}
          <div className="md:hidden relative">
            <div className="overflow-hidden h-[350px]">
              <AnimatePresence custom={direction} initial={false}>
                <motion.div key={currentIndex} custom={direction} variants={slideVariants} initial="hidden" animate="visible" exit="exit" className="bg-white p-6 rounded-lg shadow-md absolute w-full">
                  <div className="flex items-center mb-4">
                    <img src={testimonials[currentIndex].image} alt={testimonials[currentIndex].name} className="w-14 h-14 rounded-full object-cover mr-4" />
                    <div>
                      <h4 className="font-semibold">
                        {testimonials[currentIndex].name}
                      </h4>
                      <p className="text-gray-600 text-sm">
                        {testimonials[currentIndex].role}
                      </p>
                    </div>
                  </div>
                  <div className="flex mb-3">
                    {[...Array(5)].map((_, i) => <StarIcon key={i} size={18} className={i < testimonials[currentIndex].rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'} />)}
                  </div>
                  <p className="text-gray-600 italic flex-grow">
                    "{testimonials[currentIndex].text}"
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>
            {/* Navigation buttons */}
            <div className="flex justify-center mt-4">
              <button onClick={prevSlide} className="mx-2 p-2 rounded-full bg-green-100 text-green-600 hover:bg-green-200" aria-label="Previous testimonial">
                <ChevronLeftIcon size={20} />
              </button>
              {/* Pagination dots */}
              <div className="flex items-center mx-4">
                {testimonials.map((_, index) => <button key={index} onClick={() => {
                setDirection(index > currentIndex ? 1 : -1);
                setCurrentIndex(index);
              }} className={`w-2 h-2 mx-1 rounded-full ${currentIndex === index ? 'bg-green-600' : 'bg-gray-300'}`} aria-label={`Go to testimonial ${index + 1}`} />)}
              </div>
              <button onClick={nextSlide} className="mx-2 p-2 rounded-full bg-green-100 text-green-600 hover:bg-green-200" aria-label="Next testimonial">
                <ChevronRightIcon size={20} />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>;
};
export default Testimonials;