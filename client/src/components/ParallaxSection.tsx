import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, type ReactNode } from "react";

type Props = {
  children: ReactNode;
  speed?: number;
  className?: string;
};

export default function ParallaxSection({
  children,
  speed = 0.15,
  className = "",
}: Props) {
  const ref = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [-80 * speed, 80 * speed]);

  return (
    <div ref={ref} className="relative overflow-visible">
      <motion.div
        style={{ y }}
        className={`will-change-transform ${className}`}
      >
        {children}
      </motion.div>
    </div>
  );
}
