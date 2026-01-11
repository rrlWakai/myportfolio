import { motion } from "framer-motion";
import { Search, PenTool, Code, Rocket } from "lucide-react";

const steps = [
  {
    step: "01",
    title: "Discovery",
    icon: Search,
    desc: "Understanding project goals, requirements, and expectations.",
  },
  {
    step: "02",
    title: "Design",
    icon: PenTool,
    desc: "Creating clear, usable layouts and structured UI concepts.",
  },
  {
    step: "03",
    title: "Development",
    icon: Code,
    desc: "Building fast, responsive, and scalable front-end solutions.",
  },
  {
    step: "04",
    title: "Launch",
    icon: Rocket,
    desc: "Testing, refinement, and preparing for deployment.",
  },
];

export default function Process() {
  return (
    <section className="space-y-6">
      {/* HEADER */}
      <div className="text-center">
        <h2 className="text-xl font-extrabold text-head">PROCESS</h2>
        <p className="text-sm text-muted">How I work</p>
      </div>

      {/* STEPS */}
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((s) => {
          const Icon = s.icon;

          return (
            <motion.div
              key={s.step}
              whileHover={{ y: -6 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
              className="glass rounded-xl p-5 transition hover:shadow-lg"
            >
              {/* ICON + STEP */}
              <div className="flex items-center gap-2 mb-2">
                <Icon size={18} className="icons" />
                <span className="text-xs font-medium text-muted">{s.step}</span>
              </div>

              {/* TITLE */}
              <h3 className="font-semibold text-head">{s.title}</h3>

              {/* DESCRIPTION */}
              <p className="mt-2 text-sm text-muted leading-relaxed">
                {s.desc}
              </p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
