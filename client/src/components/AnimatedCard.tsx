import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { User, GraduationCap, Target } from "lucide-react";

interface Props {
  title?: string;
  icon?: "about" | "education" | "focus";
  children: ReactNode;
  className?: string;
  delay?: number;
  disableHover?: boolean; // ✅ NEW
}

const iconMap = {
  about: User,
  education: GraduationCap,
  focus: Target,
};

export default function AnimatedCard({
  title,
  icon,
  children,
  className = "",
  delay = 0,
  disableHover = false,
}: Props) {
  const Icon = icon ? iconMap[icon] : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.6 }}
      whileHover={disableHover ? undefined : { y: -6 }} // ✅ disable hover per-card
      className={`
        bg-white p-6
        rounded-2xl
        border border-gray-200
        hover:border-gray-300
        shadow-md
        transition
        ${className}
      `}
    >
      {title && (
        <div className="flex items-center gap-2 mb-3">
          {Icon && <Icon size={16} className="text-gray-500" />}
          <h2 className="text-xs uppercase tracking-wide text-gray-500 font-semibold">
            {title}
          </h2>
        </div>
      )}
      {children}
    </motion.div>
  );
}
