import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function DarkModeToggle() {
  const [dark, setDark] = useState(
    document.documentElement.classList.contains("dark")
  );

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  return (
    <button
      onClick={() => setDark(!dark)}
      aria-label="Toggle dark mode"
      className="
        relative inline-flex items-center justify-center
        w-10 h-10 rounded-full
        glass
        transition-shadow
        hover:shadow-md
        focus:outline-none
      "
    >
      <AnimatePresence mode="wait">
        {dark ? (
          <motion.span
            key="sun"
            initial={{ opacity: 0, rotate: -90, scale: 0.6 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: 90, scale: 0.6 }}
            transition={{ duration: 0.25 }}
            className="icons"
          >
            <Sun size={18} />
          </motion.span>
        ) : (
          <motion.span
            key="moon"
            initial={{ opacity: 0, rotate: 90, scale: 0.6 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: -90, scale: 0.6 }}
            transition={{ duration: 0.25 }}
            className="icons"
          >
            <Moon size={18} />
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  );
}
