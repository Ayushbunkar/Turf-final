import React from 'react';
import { motion } from 'framer-motion';
interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  hoverEffect?: boolean;
}
const Card: React.FC<CardProps> = ({
  children,
  className = '',
  onClick,
  hoverEffect = true
}) => {
  return <motion.div className={`bg-white rounded-lg shadow-md overflow-hidden ${hoverEffect ? 'hover:shadow-xl transition-shadow' : ''} ${className}`} onClick={onClick} whileHover={hoverEffect ? {
    scale: 1.02
  } : {}} transition={{
    duration: 0.2
  }}>
      {children}
    </motion.div>;
};
export default Card;