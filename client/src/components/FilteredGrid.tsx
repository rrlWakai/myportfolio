import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";

import { projects, certificates, techStack } from "../data/projects";
import type { Project, Certificate } from "../data/projects";

type FilterType = "projects" | "certificates" | "tech";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0 },
};

const cardBase = `
  relative overflow-hidden rounded-xl
  border border-black/10
  bg-white/80 backdrop-blur-md
  shadow-sm transition
  hover:shadow-md
  dark:border-white/15
  dark:bg-white/5
`;

const categories = ["Frontend", "Tools", "Backend"] as const;

export default function FilteredGrid({ active }: { active: FilterType }) {
  return (
    <div className="mt-4">
      {/* ================= PROJECTS ================= */}
      {active === "projects" && (
        <motion.ul
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false }}
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {projects.map((project: Project) => (
            <motion.li key={project.id} variants={item} className="h-full">
              <motion.div
                whileHover={{ y: -6 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
                className={`${cardBase} group h-full flex flex-col`}
              >
                {/* Image (fixed height – unchanged styling) */}
                <img
                  src={project.thumbnail}
                  alt={project.title}
                  className="h-44 w-full object-cover"
                />

                {/* Content */}
                <div className="p-4 flex flex-col flex-1">
                  <h3 className="font-semibold text-lg text-black dark:text-white">
                    {project.title}
                  </h3>

                  <p className="mt-1 text-sm text-gray-700 dark:text-gray-400">
                    {project.description}
                  </p>

                  {/* Actions pinned to bottom */}
                  <div className="mt-auto flex gap-4 pt-4">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="
                    inline-flex items-center gap-1
                    text-sm font-medium
                    text-black-600
                    dark:hover:text-white/800
                    transition-colors
                  "
                      >
                        <ExternalLink size={16} />
                        Live
                      </a>
                    )}

                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="
                    inline-flex items-center gap-1
                    text-sm font-medium
                    text-black-600
                    dark:hover:text-white
                    transition-colors
                  "
                      >
                        <Github size={16} />
                        Code
                      </a>
                    )}
                  </div>
                </div>

                {/* Hover overlay (unchanged) */}
                <div
                  className="
              pointer-events-none absolute inset-0
              opacity-0 group-hover:opacity-100 transition
              bg-linear-to-tr from-black/5 to-transparent
              dark:from-white/10
            "
                />
              </motion.div>
            </motion.li>
          ))}
        </motion.ul>
      )}

      {/* ================= CERTIFICATES ================= */}
      {active === "certificates" && (
        <motion.ul
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false }}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {certificates.map((cert: Certificate) => (
            <motion.li key={cert.id} variants={item}>
              <div className={cardBase}>
                <img
                  src={cert.image}
                  alt={cert.title}
                  className="h-40 w-full object-cover"
                />

                <div className="p-4">
                  <h3 className="font-semibold text-black dark:text-white">
                    {cert.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {cert.issuer} • {cert.date}
                  </p>
                </div>
              </div>
            </motion.li>
          ))}
        </motion.ul>
      )}

      {/* ================= TECH STACK (Grouped + Tooltip) ================= */}
      {active === "tech" && (
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          className="space-y-6"
        >
          {categories.map((category) => {
            const items = techStack.filter((t) => t.category === category);
            if (!items.length) return null;

            return (
              <div key={category}>
                <h3 className="mb-3 text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                  {category}
                </h3>

                <motion.ul
                  variants={container}
                  className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3"
                >
                  {items.map((tech) => (
                    <motion.li
                      key={tech.title}
                      variants={item}
                      className={`
                        relative group
                        flex items-center gap-3
                        px-4 py-3
                        ${cardBase}
                      `}
                    >
                      <img
                        src={tech.logo}
                        alt={tech.title}
                        className="h-6 w-6 object-contain shrink-0"
                      />

                      <span className="text-sm font-medium text-black-600 ">
                        {tech.title}
                      </span>

                      <div
                        className="
                          pointer-events-none
                          absolute left-1/2 top-full z-20
                          mt-2 w-52 -translate-x-1/2
                          rounded-lg
                          bg-black text-black-600
                          px-3 py-2
                          text-xs leading-relaxed
                          opacity-0 scale-95
                          transition
                          group-hover:opacity-100
                          group-hover:scale-100
                         
                          shadow-lg
                          hidden sm:block
                        "
                      >
                        {tech.description}
                      </div>
                    </motion.li>
                  ))}
                </motion.ul>
              </div>
            );
          })}
        </motion.div>
      )}
    </div>
  );
}
