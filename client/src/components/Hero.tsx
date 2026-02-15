import { AnimatePresence, motion } from "framer-motion";
import {
  MapPin,
  Mail,
  FileText,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
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
      ? "/avatar-clicked.jpg"
      : hovered
        ? "/avatar-hover.jpg"
        : "/avatar.png";

  function handleAvatarClick() {
    if (resetTimer.current) window.clearTimeout(resetTimer.current);

    setMode("clicked");

    resetTimer.current = window.setTimeout(() => {
      setMode("default");
      resetTimer.current = null;
    }, 2000);
  }

  useEffect(() => {
    return () => {
      if (resetTimer.current) window.clearTimeout(resetTimer.current);
    };
  }, []);

  /* ================= CV MODAL (IMAGES) =================
     Put your pages here:
     /public/cv/cv-1.png
     /public/cv/cv-2.png
     /public/cv/cv-3.png
  */
  const cvPages = ["/cv/cv-1.png", "/cv/cv-2.png", "/cv/cv-3.png"];

  const [cvOpen, setCvOpen] = useState(false);
  const [pageIndex, setPageIndex] = useState(0);

  function openCv() {
    setPageIndex(0);
    setCvOpen(true);
  }
  function prevPage() {
    setPageIndex((i) => Math.max(0, i - 1));
  }
  function nextPage() {
    setPageIndex((i) => Math.min(cvPages.length - 1, i + 1));
  }

  // Lock background scroll when modal open
  useEffect(() => {
    if (!cvOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [cvOpen]);

  // Esc to close, arrows to navigate pages
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (!cvOpen) return;

      if (e.key === "Escape") setCvOpen(false);
      if (e.key === "ArrowLeft") prevPage();
      if (e.key === "ArrowRight") nextPage();
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cvOpen, pageIndex, cvPages.length]);

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
          bg-black/5 dark:bg-white/10
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
          draggable={false}
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

        <p className="text-sm font-medium">Web Developer / Web Designer</p>

        <p className="text-sm text-muted max-w-md">
          I build modern, results-driven websites for individuals and growing
          businesses.
        </p>

        <div className="flex items-center gap-3 mt-3">
          <motion.button
            type="button"
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

          <motion.button
            type="button"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={openCv}
            className="
              btn-outline
              inline-flex items-center gap-1.5
              px-3 py-2 text-xs font-medium
              rounded-md
            "
          >
            <FileText size={12} />
            View CV
          </motion.button>
        </div>
      </div>

      {/* ================= CV MODAL ================= */}
      <AnimatePresence>
        {cvOpen && (
          <motion.div
            className="fixed inset-0 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onContextMenu={(e) => e.preventDefault()}
          >
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-black/60"
              onClick={() => setCvOpen(false)}
            />

            {/* Panel */}
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label="CV Preview"
              initial={{ opacity: 0, y: 18, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 18, scale: 0.98 }}
              transition={{ type: "spring", stiffness: 260, damping: 22 }}
              className="
                absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
                w-[94vw] max-w-4xl
                h-[85vh]
                rounded-2xl
                bg-white dark:bg-zinc-950
                text-zinc-900 dark:text-zinc-100
                shadow-2xl
                ring-1 ring-black/10 dark:ring-white/10
                overflow-hidden
              "
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="h-12 px-3 flex items-center justify-between border-b border-black/10 dark:border-white/10">
                <div className="text-sm font-semibold">
                  CV Preview • Page {pageIndex + 1} / {cvPages.length}
                </div>

                <button
                  type="button"
                  onClick={() => setCvOpen(false)}
                  className="
                    inline-flex items-center justify-center
                    w-9 h-9 rounded-lg
                    hover:bg-black/5 dark:hover:bg-white/10
                    focus:outline-none
                  "
                  aria-label="Close CV preview"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Content */}
              <div className="relative h-[calc(85vh-3rem)]">
                {/* Page */}
                <div className="h-full overflow-auto">
                  <div className="min-h-full flex items-start justify-center p-3 sm:p-4">
                    <img
                      src={cvPages[pageIndex]}
                      alt={`CV page ${pageIndex + 1}`}
                      className="
                        w-full max-w-3xl
                        rounded-xl
                        ring-1 ring-black/10 dark:ring-white/10
                        select-none
                      "
                      draggable={false}
                      loading="eager"
                      onContextMenu={(e) => e.preventDefault()}
                    />
                  </div>
                </div>

                {/* Controls */}
                <div className="absolute inset-x-0 bottom-0 p-3 flex items-center justify-between gap-2">
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={prevPage}
                    disabled={pageIndex === 0}
                    className="
                      btn-outline
                      inline-flex items-center gap-1.5
                      px-3 py-2 text-xs font-medium
                      rounded-md
                      disabled:opacity-40 disabled:cursor-not-allowed
                      bg-white/90 dark:bg-zinc-950/70
                    "
                  >
                    <ChevronLeft size={14} />
                    Prev
                  </motion.button>

                  <div className="text-xs text-muted">
                    Use ← → keys to navigate • Esc to close
                  </div>

                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={nextPage}
                    disabled={pageIndex === cvPages.length - 1}
                    className="
                      btn-outline
                      inline-flex items-center gap-1.5
                      px-3 py-2 text-xs font-medium
                      rounded-md
                      disabled:opacity-40 disabled:cursor-not-allowed
                      bg-white/90 dark:bg-zinc-950/70
                    "
                  >
                    Next
                    <ChevronRight size={14} />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
