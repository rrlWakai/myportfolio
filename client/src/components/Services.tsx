import { motion } from "framer-motion";
import { Layout, Briefcase, Code2 } from "lucide-react";
const services = [
  {
    title: "Personal Portfolio Development",
    description:
      "Design and development of responsive personal portfolios that clearly present projects, skills, and technical background using clean layouts and modern UI practices.",
    icon: Layout,
  },
  {
    title: "Small Business Website Development",
    description:
      "Structured, mobile-first websites for small businesses featuring clear content sections, professional layout, and user-friendly navigation to support online presence.",
    icon: Briefcase,
  },
  {
    title: "Front-End UI Development (React)",
    description:
      "Front-end development using React, TypeScript, and Tailwind CSS—focused on reusable components, responsive design, clean structure, and maintainable code.",
    icon: Code2,
  },
];

export default function Services() {
  return (
    <section className="space-y-6">
      {/* HEADER */}
      <div className="text-center">
        <h2 className="text-xl font-extrabold text-head">SERVICES</h2>
        <p className="text-sm text-muted">What I can help you build</p>
      </div>

      {/* CARDS */}
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service) => {
          const Icon = service.icon;

          return (
            <motion.div
              key={service.title}
              whileHover={{ y: -6 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
              className="glass rounded-xl p-6 transition hover:shadow-lg"
            >
              {/* ICON */}
              <Icon size={22} className="icons mb-3" />

              {/* TITLE */}
              <h3 className="text-base font-semibold text-head">
                {service.title}
              </h3>

              {/* DESCRIPTION */}
              <p className="mt-2 text-sm text-muted leading-relaxed">
                {service.description}
              </p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
