import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { ImageIcon } from "lucide-react";
import { useMemo, useRef, useState } from "react";

type Item = {
  src: string;
  title?: string;
  subtitle?: string;
};

const items: Item[] = [
  { src: "/images/DBProject.jpeg", title: "Project", subtitle: "Preview" },
  { src: "/images/Finguard.jpg", title: "FinTech", subtitle: "Preview" },
  { src: "/images/tech.jpg", title: "Tech", subtitle: "Preview" },
  {
    src: "/images/certificate.png",
    title: "Operating System Basics",
    subtitle: "Preview",
  },
];

function GalleryCard({ item, index }: { item: Item; index: number }) {
  const [broken, setBroken] = useState(false);

  return (
    <motion.figure
      className="
        relative
        min-w-[420px] h-[250px]
        rounded-[28px] overflow-hidden
        border border-black/10 dark:border-white/10
        bg-white/60 dark:bg-white/5
        shadow-[0_14px_40px_rgba(0,0,0,0.08)]
        backdrop-blur
      "
      // Cinematic hover: small scale + lift (subtle)
      whileHover={{ scale: 1.015, y: -2 }}
      transition={{ type: "spring", stiffness: 140, damping: 18 }}
    >
      {!broken ? (
        <motion.img
          src={item.src}
          alt={
            item.title ? `${item.title} image` : `Gallery image ${index + 1}`
          }
          loading="lazy"
          onError={() => setBroken(true)}
          className="w-full h-full object-cover"
          // Depth: gentle micro-zoom always, stronger on hover
          initial={{ scale: 1.02 }}
          whileHover={{ scale: 1.08 }}
          transition={{ duration: 1.1, ease: "easeOut" }}
        />
      ) : (
        // Fallback: never show empty/broken cards
        <div className="w-full h-full grid place-items-center bg-gradient-to-br from-black/5 to-black/10 dark:from-white/5 dark:to-white/10">
          <div className="flex items-center gap-2 text-black/50 dark:text-white/60">
            <ImageIcon className="h-5 w-5" />
            <span className="text-sm">Image unavailable</span>
          </div>
        </div>
      )}

      {/* Cinematic veil (very soft, not heavy) */}
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0.18 }}
        whileHover={{ opacity: 0.36 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        style={{
          background:
            "linear-gradient(120deg, rgba(0,0,0,0.45), rgba(0,0,0,0.12), rgba(0,0,0,0))",
        }}
      />

      {/* Quiet caption (premium) */}
      <motion.figcaption
        className="
          absolute left-5 bottom-5
          inline-flex items-center gap-2
          rounded-2xl px-4 py-2
          bg-black/25 text-white
          border border-white/10
          backdrop-blur-md
        "
        initial={{ opacity: 0, y: 10 }}
        whileHover={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
      >
        <span className="text-sm font-medium tracking-wide">
          {item.title ?? "View"}
        </span>
        <span className="text-sm text-white/70">
          — {item.subtitle ?? "Preview"}
        </span>
      </motion.figcaption>

      {/* Subtle continuous float (cinematic, not bouncy) */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{ opacity: [0.0, 0.03, 0.0] }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: (index % 6) * 0.4,
        }}
      />
    </motion.figure>
  );
}

export default function GalleryCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);

  // Raw x (we update it each frame)
  const xRaw = useMotionValue(0);

  // Spring x (cinematic smoothing)
  const x = useSpring(xRaw, { stiffness: 55, damping: 22, mass: 0.7 });

  const speed = 22; // px/sec (slow cinematic)
  const paused = useRef(false);

  // Duplicate items for seamless loop
  const loopItems = useMemo(() => [...items, ...items], []);

  useAnimationFrame((_t, delta) => {
    if (paused.current) return;

    const el = trackRef.current;
    if (!el) return;

    const halfWidth = el.scrollWidth / 2;
    const moveBy = (speed * delta) / 1000;

    let next = xRaw.get() - moveBy;

    // Wrap seamlessly (no jump)
    if (-next >= halfWidth) next = 0;

    xRaw.set(next);
  });

  // Premium edge fade using mask (no harsh black overlays)
  const edgeFadeMask = {
    WebkitMaskImage:
      "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
    maskImage:
      "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
  } as const;

  return (
    <section className="relative py-8">
      <div
        className="relative overflow-hidden"
        style={edgeFadeMask}
        onMouseEnter={() => (paused.current = true)}
        onMouseLeave={() => (paused.current = false)}
      >
        <motion.div
          ref={trackRef}
          style={{ x }}
          className="flex gap-4 will-change-transform px-4"
        >
          {loopItems.map((item, i) => (
            <GalleryCard key={`${item.src}-${i}`} item={item} index={i} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
