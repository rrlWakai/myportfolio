import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { User, GraduationCap, Target } from "lucide-react";

interface Props {
  title?: string;
  icon?: "about" | "education" | "focus";
  children: ReactNode;
  className?: string;
  delay?: number;
  disableHover?: boolean;
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
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ delay, duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      whileHover={disableHover ? undefined : { y: -4 }}
      className={[
        "w-full min-w-0 rounded-2xl p-5 sm:p-6",
        "transition-[transform,border-color,box-shadow,background-color] duration-300",
        !disableHover ? "hover-lift" : "",
        className,
      ].join(" ")}
    >
      {title && (
        <div className="mb-4 flex items-center gap-2.5">
          {Icon && (
            <Icon
              size={15}
              className="shrink-0 text-zinc-500 dark:text-zinc-400"
              strokeWidth={1.9}
            />
          )}

          <h2 className="text-[11px] font-bold uppercase tracking-[0.08em] text-zinc-600 dark:text-zinc-300">
            {title}
          </h2>
        </div>
      )}

      <div className="w-full min-w-0">{children}</div>
    </motion.div>
  );
}
