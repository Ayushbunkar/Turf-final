import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRightIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '../ui/Button.jsx';

const Hero = () => {
  return (
    <div className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <motion.div
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5 }}
          className="w-full h-full"
        >
          <img
            src="https://images.unsplash.com/photo-1574629810360-7efbbe195018?ixlib=rb-4.0.3&auto=format&fit=crop&w=1936&q=80"
            alt="Football turf"
            className="w-full h-full object-cover"
          />
        </motion.div>
        <div className="absolute inset-0 bg-black bg-opacity-60" />

        {/* Animated Floating Particles */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 rounded-full bg-green-400 opacity-70"
              initial={{
                x: `${Math.random() * 100}%`,
                y: `${Math.random() * 100}%`,
                scale: Math.random() * 0.5 + 0.5,
              }}
              animate={{
                y: ['0%', '-100%'],
                opacity: [0, 0.7, 0],
              }}
              transition={{
                duration: Math.random() * 10 + 10,
                repeat: Infinity,
                delay: Math.random() * 5,
              }}
            />
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 z-10 pt-20">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
              Book Your Perfect{' '}
              <motion.span
                className="text-green-500 inline-block"
                animate={{ rotateX: [0, 15, 0], scale: [1, 1.05, 1] }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  repeatType: 'reverse',
                }}
              >
                Turf Experience
              </motion.span>
            </h1>
          </motion.div>

          <motion.p
            className="text-xl text-gray-200 mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Experience the thrill of playing on premium turfs. Easy booking,
            great facilities, and unforgettable moments await you.
          </motion.p>

          <motion.div
            className="flex flex-wrap gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Link to="/turfs">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button size="lg">
                  Explore Turfs <ArrowRightIcon size={20} className="ml-2" />
                </Button>
              </motion.div>
            </Link>
            <Link to="/about">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button variant="outline" size="lg">
                  Learn More
                </Button>
              </motion.div>
            </Link>
          </motion.div>
        </div>

        {/* 3D Football Animation */}
        <motion.div
          className="hidden lg:block absolute right-20 bottom-20"
          initial={{ opacity: 0, scale: 0.8, rotateZ: -15 }}
          animate={{ opacity: 1, scale: 1, rotateZ: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
        >
          <motion.div
            className="w-32 h-32 relative"
            animate={{ rotateY: 360, rotateZ: [0, 10, -10, 0] }}
            transition={{
              rotateY: {
                duration: 8,
                repeat: Infinity,
                ease: 'linear',
              },
              rotateZ: {
                duration: 3,
                repeat: Infinity,
                repeatType: 'reverse',
              },
            }}
          >
            <div className="w-full h-full rounded-full bg-white shadow-[0_0_40px_rgba(74,222,128,0.6)] relative">
              <div className="absolute inset-0 rounded-full bg-white border-8 border-green-500 opacity-80"></div>
              <div className="absolute inset-[10px] rounded-full bg-gradient-to-br from-white to-gray-200 flex items-center justify-center">
                {/* Football Pattern Dots */}
                <div className="absolute w-full h-full rounded-full">
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-4 h-4 rounded-full bg-black opacity-80"
                      style={{
                        top: `${20 + Math.sin((i * 72 * Math.PI) / 180) * 30}%`,
                        left: `${50 + Math.cos((i * 72 * Math.PI) / 180) * 30}%`,
                      }}
                    />
                  ))}
                  {[...Array(6)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-[2px] h-[40%] bg-black opacity-60 origin-bottom"
                      style={{
                        top: '10%',
                        left: '50%',
                        transform: `translateX(-50%) rotate(${i * 60}deg)`,
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Glow & Shadow */}
            <div className="absolute -bottom-8 left-0 w-full h-4 bg-black opacity-20 rounded-full blur-md"></div>
            <motion.div
              className="absolute inset-0 rounded-full bg-green-500 opacity-30 blur-md"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;
