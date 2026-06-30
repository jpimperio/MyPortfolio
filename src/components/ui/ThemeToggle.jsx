import { Sun, Moon } from "lucide-react";
import { motion } from "framer-motion";
import { useTheme } from "../../context/ThemeContext";

export default function ThemeToggle() {
  const { dark, toggle } = useTheme();

  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={toggle}
      className="relative w-10 h-10 rounded-full bg-deep-700 border border-deep-600 flex items-center justify-center text-slate-400 hover:text-accent-light hover:border-accent/50 transition-colors"
      aria-label="Toggle theme"
    >
      <motion.span
        key={dark ? "moon" : "sun"}
        initial={{ rotate: -90, opacity: 0 }}
        animate={{ rotate: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        {dark ? <Moon size={18} /> : <Sun size={18} />}
      </motion.span>
    </motion.button>
  );
}
