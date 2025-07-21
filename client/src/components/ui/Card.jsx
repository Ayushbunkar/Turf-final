import React from 'react';
import { motion } from 'framer-motion';

const Card = ({
  children,
  className = '',
  onClick,
  hoverEffect = true,
  clickEffect = false,
  glowEffect = false,
}) => {
  const baseClasses = `bg-white rounded-xl overflow-hidden transition-shadow duration-300 ${hoverEffect ? 'hover:shadow-2xl' : ''} ${glowEffect ? 'hover:ring-2 hover:ring-green-400 hover:ring-offset-2' : ''} ${className}`;

  return (
    <motion.div
      className={baseClasses}
      onClick={onClick}
      whileHover={hoverEffect ? { scale: 1.03 } : {}}
      whileTap={clickEffect ? { scale: 0.97 } : {}}
      transition={{ duration: 0.2 }}
    >
      {children}
    </motion.div>
  );
};

export default Card;
