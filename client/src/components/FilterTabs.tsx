import { motion } from "framer-motion";
import { Briefcase, Award, Cpu } from "lucide-react";

export type FilterType = "projects" | "certificates" | "tech";

const tabs = [
  { id: "projects", label: "Projects", icon: Briefcase },
  { id: "certificates", label: "Certificates", icon: Award },
  { id: "tech", label: "Tech Stack", icon: Cpu },
] as const;

export default function FilterTabs({
  active,
  setActive,
}: {
  active: FilterType;
  setActive: (v: FilterType) => void;
}) {
  return (
    <motion.div className="flex justify-center">
      <motion.div className="glass flex gap-6 px-6 py-3 rounded-xl">
        {tabs.map(({ id, label, icon: Icon }) => {
          const isActive = active === id;

          return (
            <button
              key={id}
              onClick={() => setActive(id)}
              className="
                group relative flex items-center gap-2
                text-sm font-medium text-head 
                text-white dark:text-black
                opacity-70 hover:opacity-100
                transition-opacity
              "
            >
              <Icon size={14} />

              <span className="relative">
                {label}

                <span
                  className={`
                    absolute left-0 -bottom-1 h-0.5 w-full
                    bg-white dark:bg-black
                    origin-left transition-transform duration-300
                    ${
                      isActive
                        ? "scale-x-100"
                        : "scale-x-0 group-hover:scale-x-100"
                    }
                  `}
                />
              </span>
            </button>
          );
        })}
      </motion.div>
    </motion.div>
  );
}
