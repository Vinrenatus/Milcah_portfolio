import { motion, AnimatePresence } from 'framer-motion';
import { FaSun, FaMoon } from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';

// Sliding switch: the gradient track fills on dark, the knob carries the icon.
const ThemeToggle = ({ className = '' }) => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <motion.button
      type="button"
      onClick={toggleTheme}
      role="switch"
      aria-checked={isDark}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      className={`relative flex items-center w-16 h-8 rounded-full p-1 border border-hairline/15 overflow-hidden ${className}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {/* Track: brand gradient at night, warm gradient by day. */}
      <motion.span
        className="absolute inset-0 rounded-full"
        animate={{
          background: isDark
            ? 'linear-gradient(135deg, #4f46e5 0%, #8b5cf6 50%, #06b6d4 100%)'
            : 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 50%, #ec4899 100%)',
        }}
        transition={{ duration: 0.4 }}
      />

      <motion.span
        className="relative z-10 flex items-center justify-center w-6 h-6 rounded-full bg-white shadow-md"
        animate={{ x: isDark ? 32 : 0 }}
        transition={{ type: 'spring', stiffness: 500, damping: 32 }}
      >
        <AnimatePresence mode="wait" initial={false}>
          {isDark ? (
            <motion.span
              key="moon"
              initial={{ opacity: 0, rotate: -90, scale: 0.5 }}
              animate={{ opacity: 1, rotate: 0, scale: 1 }}
              exit={{ opacity: 0, rotate: 90, scale: 0.5 }}
              transition={{ duration: 0.2 }}
              className="flex"
            >
              <FaMoon className="text-[11px] text-indigo-600" />
            </motion.span>
          ) : (
            <motion.span
              key="sun"
              initial={{ opacity: 0, rotate: 90, scale: 0.5 }}
              animate={{ opacity: 1, rotate: 0, scale: 1 }}
              exit={{ opacity: 0, rotate: -90, scale: 0.5 }}
              transition={{ duration: 0.2 }}
              className="flex"
            >
              <FaSun className="text-[11px] text-amber-500" />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.span>
    </motion.button>
  );
};

export default ThemeToggle;
