import { motion } from 'framer-motion';

/*
Provide a reusable visual container with consistent spacing, border, and motion.
Uses children content, optional className, and optional animation delay.
Renders a styled card wrapper around any nested content.
*/
const Card = ({ children, className = "", delay = 0 }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      whileHover={{ y: -4, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)" }}
      className={`bg-white dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-800 p-6 shadow-sm hover:shadow-md transition-shadow ${className}`}
    >
      {children}
    </motion.div>
  );
};

export default Card;