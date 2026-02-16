import { motion } from "framer-motion";
import { Search, PenTool, Code, Rocket } from "lucide-react";

const steps = [
  {
    step: "01",
    title: "Understand Your Needs",
    icon: Search,
    desc: "We talk about your goals, your customers, and what you want the website to achieve (more inquiries, bookings, or sales).",
  },
  {
    step: "02",
    title: "Plan & Design the Layout",
    icon: PenTool,
    desc: "I create a clear page structure and design that looks professional and guides visitors toward your main action (message, call, or book).",
  },
  {
    step: "03",
    title: "Build & Connect Everything",
    icon: Code,
    desc: "I develop the website so it works smoothly on mobile and desktop — and if needed, I connect forms or booking features so customers can take action easily.",
  },
  {
    step: "04",
    title: "Test & Launch",
    icon: Rocket,
    desc: "I check everything before going live (speed, responsiveness, and usability), then launch the website and make final refinements.",
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
              <div className="flex items-center gap-2 mb-2">
                <Icon size={18} className="icons" />
                <span className="text-xs font-medium text-muted">{s.step}</span>
              </div>

              <h3 className="font-semibold text-head">{s.title}</h3>

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
