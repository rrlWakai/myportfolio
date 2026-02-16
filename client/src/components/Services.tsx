import { motion } from "framer-motion";
import { Layout, Monitor, CalendarCheck } from "lucide-react";

const services = [
  {
    title: "Website Design & Development",
    description:
      "Modern, mobile-friendly websites designed to build trust and clearly present your brand. Clean layouts, smooth navigation, and a professional look that helps visitors take action.",
    icon: Layout,
  },
  {
    title: "High-Converting Landing Pages",
    description:
      "Focused landing pages built to promote a product, service, or campaign. Clear messaging, strong call-to-action, and structured sections that guide visitors toward booking or contacting you.",
    icon: Monitor,
  },
  {
    title: "Full Booking System Website",
    description:
      "Complete booking websites where customers can check availability, reserve online, and receive confirmations automatically — helping you save time and manage appointments efficiently.",
    icon: CalendarCheck,
  },
];

export default function Services() {
  return (
    <section className="space-y-6">
      {/* HEADER */}
      <div className="text-center max-w-2xl mx-auto">
        <h2 className="text-xl font-extrabold text-head">SERVICES</h2>
        <p className="text-sm text-muted mt-2 leading-relaxed">
          I focus on building websites that don’t just look good — they help
          businesses attract customers, build credibility, and operate more
          efficiently online.
        </p>
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
              <Icon size={22} className="icons mb-3" />

              <h3 className="text-base font-semibold text-head">
                {service.title}
              </h3>

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
