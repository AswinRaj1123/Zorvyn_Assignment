import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';

const ThemeToggle = ({ darkMode, onClick }) => {
  return (
    <motion.button
      onClick={onClick}
      type="button"
      aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
      className={`relative w-24 h-10 rounded-full p-1 overflow-hidden border shadow-inner transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
        darkMode
          ? 'bg-[linear-gradient(160deg,#0f1b35_0%,#182b52_55%,#1f3765_100%)] border-[#1b2f56]'
          : 'bg-[linear-gradient(160deg,#f2f3f5_0%,#e9ebee_100%)] border-[#dadde3]'
      }`}
      whileTap={{ scale: 0.97 }}
    >
      {/* Side icon */}
      <motion.div
        className="absolute top-1/2 -translate-y-1/2 flex items-center justify-center w-6 h-6 rounded-full"
        initial={false}
        animate={{
          x: darkMode ? 9 : 57,
          color: darkMode ? '#8ea0bf' : '#7785a0',
          opacity: darkMode ? 0.7 : 0.9,
          backgroundColor: darkMode ? 'rgba(20, 33, 59, 0.5)' : 'rgba(230, 234, 240, 0.55)',
        }}
        transition={{
          type: 'spring',
          stiffness: 420,
          damping: 34,
        }}
      />

      <motion.div
        className="absolute top-1/2 -translate-y-1/2 z-10 flex items-center justify-center w-6 h-6"
        animate={{
          x: darkMode ? 9 : 57,
          color: darkMode ? '#8ea0bf' : '#7785a0',
          opacity: darkMode ? 0.7 : 0.9,
        }}
        transition={{ type: 'spring', stiffness: 420, damping: 34 }}
      >
        {darkMode ? <Sun size={14} strokeWidth={2.2} /> : <Moon size={14} strokeWidth={2.2} />}
      </motion.div>

      <motion.div
        className="absolute top-1/2 z-20 -translate-y-1/2 rounded-full"
        initial={false}
        animate={{
          x: darkMode ? 46 : 4,
          width: 32,
          height: 32,
          backgroundColor: darkMode ? '#1a2f54' : '#f3f4f6',
          boxShadow: darkMode
            ? '0 6px 14px rgba(0, 0, 0, 0.35), inset 0 1px 1px rgba(255, 255, 255, 0.06)'
            : '0 3px 10px rgba(17, 24, 39, 0.16), inset 0 1px 2px rgba(255, 255, 255, 0.9)',
        }}
        transition={{ type: 'spring', stiffness: 430, damping: 32 }}
      />

      <span className="sr-only">Toggle theme</span>
    </motion.button>
  );
};

export default ThemeToggle;
