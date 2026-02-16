import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, ExternalLink, Github } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";

import { projects, certificates, techStack } from "../data/projects";
import type { Project, Certificate } from "../data/projects";

type FilterType = "projects" | "certificates" | "tech";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const item = {
  hidden: { opacity: 0, y: 14 },
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

// ✅ Updated: now includes Programming Languages (still inside "tech" tab)
const categories = [
  "Frontend",
  "Tools",
  "Backend",
  "Programming Languages",
] as const;

/* ================= CAROUSEL HELPERS ================= */
function useHorizontalScrollState(
  ref: React.RefObject<HTMLUListElement | null>,
) {
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const update = () => {
      const { scrollLeft, scrollWidth, clientWidth } = el;
      setCanLeft(scrollLeft > 0);
      setCanRight(scrollLeft + clientWidth < scrollWidth - 1);
    };

    update();
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);

    return () => {
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [ref]);

  const scrollByCard = (dir: -1 | 1) => {
    const el = ref.current;
    if (!el) return;

    const card = el.querySelector<HTMLElement>("[data-card]");
    const step = card
      ? card.offsetWidth + 16
      : Math.round(el.clientWidth * 0.85);

    el.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  return { canLeft, canRight, scrollByCard };
}

function ArrowButton({
  dir,
  onClick,
  disabled,
}: {
  dir: "left" | "right";
  onClick: () => void;
  disabled: boolean;
}) {
  const Icon = dir === "left" ? ChevronLeft : ChevronRight;

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={dir === "left" ? "Scroll left" : "Scroll right"}
      className={`
        inline-flex h-9 w-9 items-center justify-center
        rounded-lg border border-black/10
        bg-white/80 backdrop-blur-md
        shadow-sm transition
        hover:shadow-md
        disabled:opacity-40 disabled:cursor-not-allowed
        dark:border-white/15 dark:bg-white/5
      `}
    >
      <Icon size={18} />
    </button>
  );
}

/* ================= COMPONENT ================= */
export default function FilteredGrid({ active }: { active: FilterType }) {
  const projectRowRef = useRef<HTMLUListElement | null>(null);
  const certRowRef = useRef<HTMLUListElement | null>(null);

  const projectsScroll = useHorizontalScrollState(projectRowRef);
  const certsScroll = useHorizontalScrollState(certRowRef);

  const projectCards = useMemo(() => projects, []);
  const certCards = useMemo(() => certificates, []);

  return (
    <div className="mt-4">
      {/* ================= PROJECTS (INLINE CAROUSEL) ================= */}
      {active === "projects" && (
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false }}
        >
          {/* Header Row */}
          <div className="mb-3 flex items-center justify-between">
            <h3 className="text-sm font-semibold text-black dark:text-white">
              Projects
            </h3>

            <div className="flex items-center gap-2">
              <ArrowButton
                dir="left"
                disabled={!projectsScroll.canLeft}
                onClick={() => projectsScroll.scrollByCard(-1)}
              />
              <ArrowButton
                dir="right"
                disabled={!projectsScroll.canRight}
                onClick={() => projectsScroll.scrollByCard(1)}
              />
            </div>
          </div>

          {/* Scroll Row */}
          <motion.ul
            ref={projectRowRef}
            variants={container}
            className="
              flex gap-4
              overflow-x-auto
              scroll-smooth
              pb-2
              [-ms-overflow-style:none]
              [scrollbar-width:none]
              [&::-webkit-scrollbar]:hidden
              snap-x snap-mandatory
            "
          >
            {projectCards.map((project: Project) => (
              <motion.li
                key={project.id}
                variants={item}
                className="
                  snap-start
                  w-[85%] sm:w-[420px] lg:w-[420px]
                  shrink-0
                "
              >
                <motion.div
                  data-card
                  whileHover={{ y: -6 }}
                  transition={{ type: "spring", stiffness: 260, damping: 20 }}
                  className={`${cardBase} group h-full flex flex-col`}
                >
                  <img
                    src={project.thumbnail}
                    alt={project.title}
                    className="h-44 w-full object-cover"
                    loading="lazy"
                  />

                  <div className="p-4 flex flex-col flex-1">
                    <h3 className="font-semibold text-lg text-black dark:text-white">
                      {project.title}
                    </h3>

                    <p className="mt-1 text-sm text-gray-700 dark:text-gray-400">
                      {project.description}
                    </p>

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
        </motion.div>
      )}

      {/* ================= CERTIFICATES (INLINE CAROUSEL) ================= */}
      {active === "certificates" && (
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false }}
        >
          <div className="mb-3 flex items-center justify-between">
            <h3 className="text-sm font-semibold text-black dark:text-white">
              Certificates
            </h3>

            <div className="flex items-center gap-2">
              <ArrowButton
                dir="left"
                disabled={!certsScroll.canLeft}
                onClick={() => certsScroll.scrollByCard(-1)}
              />
              <ArrowButton
                dir="right"
                disabled={!certsScroll.canRight}
                onClick={() => certsScroll.scrollByCard(1)}
              />
            </div>
          </div>

          <motion.ul
            ref={certRowRef}
            variants={container}
            className="
              flex gap-4
              overflow-x-auto
              scroll-smooth
              pb-2
              [-ms-overflow-style:none]
              [scrollbar-width:none]
              [&::-webkit-scrollbar]:hidden
              snap-x snap-mandatory
            "
          >
            {certCards.map((cert: Certificate) => (
              <motion.li
                key={cert.id}
                variants={item}
                className="snap-start w-[85%] sm:w-[360px] lg:w-[360px] shrink-0"
              >
                <div data-card className={`${cardBase}`}>
                  <img
                    src={cert.image}
                    alt={cert.title}
                    className="h-40 w-full object-cover"
                    loading="lazy"
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
        </motion.div>
      )}

      {/* ================= TECH STACK (KEEP GRID — NO HOVER) ================= */}
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
                <h3 className="mb-3 text-xs font-semibold uppercase tracking-wide text-muted">
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
                      className="
                        flex items-center gap-3
                        px-4 py-3
                        rounded-xl
                        border border-black/10
                        bg-white/80 backdrop-blur-md
                        shadow-sm
                        dark:border-white/15
                        dark:bg-white/5
                      "
                    >
                      <img
                        src={tech.logo}
                        alt={tech.title}
                        className="h-6 w-6 object-contain shrink-0"
                        loading="lazy"
                      />

                      <span className="text-sm font-medium text-muted">
                        {tech.title}
                      </span>
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
