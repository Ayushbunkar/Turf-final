import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Button from '../ui/Button';
import { CalendarIcon } from 'lucide-react';

const CallToAction = () => {
  return (
    <section className="py-16 bg-green-600">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <motion.div
            className="mb-6 md:mb-0 md:max-w-xl"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Play?
            </h2>
            <p className="text-green-100 text-lg">
              Book your turf now and experience the best playing conditions for
              your game. Special discounts available for weekday bookings!
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Link to="/turfs">
              <Button variant="secondary" size="lg" className="shadow-lg">
                <CalendarIcon size={20} className="mr-2" />
                Book a Turf Now
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
