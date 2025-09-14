import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useAnimation } from 'framer-motion';
import { ArrowRightIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from "../ui/Button.jsx";
import footballImg from '../../assets/football.png';

const Hero = () => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const controls = useAnimation();
  const [isMoving, setIsMoving] = useState(false);
  let timer;

  useEffect(() => {
    const handleMouseMove = (e) => {
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      const offsetX = (e.clientX - centerX) / 20;
      const offsetY = (e.clientY - centerY) / 20;

      x.set(offsetX);
      y.set(offsetY);
      setIsMoving(true);

      clearTimeout(timer);
      timer = setTimeout(() => {
        setIsMoving(false);
      }, 2000);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearTimeout(timer);
    };
  }, [x, y]);

  useEffect(() => {
    if (!isMoving) {
      controls.start({
        y: [0, -20, 0],
        transition: {
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        },
      });
    } else {
      controls.stop();
    }
  }, [isMoving, controls]);

  return (
    <div className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background */}
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
        <div className="absolute inset-0 bg-black/70 bg-opacity-60" />

        {/* Floating particles */}
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

      {/* Content */}
      <div className="container mx-auto px-4 lg:px-12 z-10 pt-20 pb-10">
        <div className="max-w-3xl text-center lg:text-left">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
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
            className="text-base sm:text-lg md:text-xl text-gray-200 mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Experience the thrill of playing on premium turfs. Easy booking, great facilities,
            and unforgettable moments await you.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4"
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

        {/* Ball - responsive & animated */}
        <motion.div
          className="hidden lg:block absolute right-10 bottom-16 w-28 sm:w-32 md:w-36 lg:w-40 h-28 sm:h-32 md:h-36 lg:h-40"
          style={{ x, y }}
          animate={controls}
        >
          <img
            src={footballImg}
            alt="Football"
            className="w-full h-full object-cover rounded-full border-4 border-white shadow-xl"
          />
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;
