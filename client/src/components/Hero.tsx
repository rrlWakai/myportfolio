import { motion } from "framer-motion";
import { MapPin, Mail, Download } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import DarkModeToggle from "./DarkModeToggle";

type AvatarMode = "default" | "clicked";

export default function Hero() {
  const navigate = useNavigate();

  /* ================= AVATAR LOGIC ================= */
  const [hovered, setHovered] = useState(false);
  const [mode, setMode] = useState<AvatarMode>("default");
  const resetTimer = useRef<number | null>(null);

  const avatarSrc =
    mode === "clicked"
      ? "/avatar-clicked.jpg" // 🖱️ click image
      : hovered
      ? "/avatar-hover.jpg" // 🫧 hover image
      : "/avatar.png"; // 🙂 default image

  function handleAvatarClick() {
    if (resetTimer.current) {
      window.clearTimeout(resetTimer.current);
    }

    setMode("clicked");

    resetTimer.current = window.setTimeout(() => {
      setMode("default");
      resetTimer.current = null;
    }, 2000);
  }

  useEffect(() => {
    return () => {
      if (resetTimer.current) {
        window.clearTimeout(resetTimer.current);
      }
    };
  }, []);

  /* ================= UI ================= */
  return (
    <motion.div
      initial={{ opacity: 0, y: -24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="
        hero
        max-w-4xl w-full
        flex flex-col sm:flex-row
        items-center sm:items-start
        gap-6
        relative
      "
    >
      <div className="absolute top-0 right-0">
        <DarkModeToggle />
      </div>

      {/* ================= AVATAR ================= */}
      <motion.button
        type="button"
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => setHovered(false)}
        onClick={handleAvatarClick}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.97 }}
        transition={{ type: "spring", stiffness: 260, damping: 18 }}
        className="
          w-32 h-32
          rounded-[12px]
          overflow-hidden
          ring-1 ring-black/10 dark:ring-white/15
          shadow-md
          cursor-pointer
          focus:outline-none
          relative
        "
        aria-label="Profile avatar"
      >
        <motion.img
          key={avatarSrc}
          src={avatarSrc}
          alt="Rhen-Rhen Lumbo"
          className="w-full h-full object-cover"
          initial={{ opacity: 0, scale: 1.02 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
        />
      </motion.button>

      {/* ================= CONTENT ================= */}
      <div className="space-y-1">
        <h1 className="font-extrabold text-xl leading-tight">
          Rhen-Rhen A. Lumbo
        </h1>

        <p className="flex items-center gap-1 text-sm text-muted">
          <MapPin size={14} className="text-accent" />
          San Pablo City, Laguna, Philippines
        </p>

        <p className="text-sm font-medium">
          Front-end Developer / Web Designer
        </p>

        <p className="text-sm text-muted max-w-md">
          I build modern, results-driven websites for individuals and growing
          businesses.
        </p>

        <div className="flex items-center gap-3 mt-3">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate("/contact")}
            className="
              btn
              inline-flex items-center gap-1.5
              px-3 py-2 text-xs font-medium
              rounded-md
            "
          >
            <Mail size={12} />
            Contact
          </motion.button>

          <motion.a
            href="/Rhen-Rhen-Lumbo-CV.pdf"
            download
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="
              btn-outline
              inline-flex items-center gap-1.5
              px-3 py-2 text-xs font-medium
              rounded-md
            "
          >
            <Download size={12} />
            Download CV
          </motion.a>
        </div>
      </div>
    </motion.div>
  );
}
