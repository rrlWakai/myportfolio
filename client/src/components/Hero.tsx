import { AnimatePresence, motion } from "framer-motion";
import { MapPin, Mail, FileText, X, ExternalLink } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import DarkModeToggle from "./DarkModeToggle";

type AvatarMode = "default" | "clicked";

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="space-y-2">
      <h2 className="text-[12px] font-bold tracking-[0.14em] text-zinc-800 dark:text-zinc-200">
        {title.toUpperCase()}
      </h2>
      <div className="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
        {children}
      </div>
    </section>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-1.5">
      {items.map((t, i) => (
        <li key={i} className="flex gap-2">
          <span className="mt-2 h-1.5 w-1.5 rounded-full bg-zinc-300 dark:bg-white/20" />
          <span className="flex-1">{t}</span>
        </li>
      ))}
    </ul>
  );
}

function Project({
  title,
  meta,
  bullets,
  links,
}: {
  title: string;
  meta?: string;
  bullets: string[];
  links?: { label: string; href: string }[];
}) {
  return (
    <div className="space-y-1.5">
      <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
        <div className="font-semibold text-zinc-900 dark:text-zinc-100">
          {title}
        </div>
        {meta ? (
          <div className="text-xs text-zinc-500 dark:text-zinc-400">{meta}</div>
        ) : null}
      </div>

      {links?.length ? (
        <div className="flex flex-wrap gap-2 text-xs">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              target="_blank"
              rel="noreferrer"
              className="
                inline-flex items-center gap-1
                rounded-full px-2 py-1
                border border-black/10 dark:border-white/15
                bg-white/60 dark:bg-white/5
                text-zinc-700 dark:text-zinc-200
                hover:bg-white/85 dark:hover:bg-white/10
                transition
              "
            >
              {l.label} <ExternalLink size={12} />
            </a>
          ))}
        </div>
      ) : null}

      <div className="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
        <BulletList items={bullets} />
      </div>
    </div>
  );
}

function CvHeader() {
  return (
    <div className="space-y-2">
      <div className="flex flex-col gap-1">
        <p className="text-xl sm:text-2xl   text-zinc-600 dark:text-zinc-300  tracking-tight">
          RHEN-RHEN A. LUMBO
        </p>
        <p className="text-sm sm:text-[15px] text-zinc-600 dark:text-zinc-300">
          Web Developer • IT Student
        </p>
      </div>

      <div className="flex flex-col sm:flex-row sm:flex-wrap gap-1.5 sm:gap-3 text-[13px] text-zinc-600 dark:text-zinc-300">
        <span>San Pablo City, Laguna, Philippines</span>
        <span className="hidden sm:inline">•</span>
        <a
          className="inline-flex items-center gap-1 hover:underline underline-offset-4"
          href="mailto:lumborhenrhena@gmail.com"
        >
          lumborhenrhena@gmail.com
        </a>
        <span className="hidden sm:inline">•</span>
        <a
          className="inline-flex items-center gap-1 hover:underline underline-offset-4"
          href="https://rhenrhenalumbo.vercel.app"
          target="_blank"
          rel="noreferrer"
        >
          rhenrhenalumbo.vercel.app <ExternalLink size={14} />
        </a>
        <span className="hidden sm:inline">•</span>
        <a
          className="inline-flex items-center gap-1 hover:underline underline-offset-4"
          href="https://github.com/rrlWakai"
          target="_blank"
          rel="noreferrer"
        >
          github.com/rrlWakai <ExternalLink size={14} />
        </a>
      </div>
    </div>
  );
}

function CodedCvOnePage() {
  return (
    <div className="space-y-6">
      <CvHeader />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* MAIN */}
        <div className="lg:col-span-2 space-y-6">
          <Section title="Profile">
            <p>
              Motivated Information Technology student and aspiring Web
              Developer with over two years of hands-on learning and
              project-based experience. Experienced in building responsive and
              modern websites with a strong focus on clean layout structure,
              user-friendly design, and performance. Passionate about continuous
              learning and creating digital solutions that are both functional
              and visually engaging.
            </p>
          </Section>

          <Section title="Project Experience">
            <div className="space-y-4">
              <Project
                title="Full-Stack Hotel Booking Website"
                meta="Personal Project"
                bullets={[
                  "Developed a complete hotel website with an online reservation system.",
                  "Designed a clear booking flow to guide users from browsing to reservation confirmation.",
                  "Created an administrative interface for managing reservations and basic content updates.",
                  "Focused on usability, structure, and performance across devices.",
                ]}
              />

              <Project
                title="Saling Cafe Website"
                meta="Personal Project"
                links={[
                  { label: "Live", href: "https://salingcafe.vercel.app/" },
                ]}
                bullets={[
                  "Designed and built a modern café website centered on brand presentation and storytelling.",
                  "Structured clear sections for menu, about, and contact information.",
                  "Ensured responsive layout and smooth browsing experience across devices.",
                  "Applied clean and consistent design principles to enhance visual appeal.",
                ]}
              />

              <Project
                title="Dental Clinic Booking Website"
                meta="Personal Project"
                bullets={[
                  "Developed a professional clinic website to improve patient interaction and booking experience.",
                  "Designed a structured consultation flow for easier appointment inquiries.",
                  "Focused on accessibility, readability, and user comfort.",
                  "Organized reusable components for scalable design.",
                ]}
              />

              <Project
                title="Photography Portfolio Website"
                meta="Personal Project"
                bullets={[
                  "Built a responsive portfolio website to showcase creative services and projects.",
                  "Structured content sections for improved clarity and navigation.",
                  "Maintained consistent branding and layout design.",
                  "Optimized visuals for performance and cross-device compatibility.",
                ]}
              />

              <Project
                title="Construction Company Website"
                meta="Personal Project"
                bullets={[
                  "Designed a professional business website highlighting services and company credibility.",
                  "Structured content to build trust through service presentation and testimonials.",
                  "Added subtle animations to enhance user engagement.",
                ]}
              />
            </div>
          </Section>

          <Section title="Experience">
            <div className="space-y-1">
              <div className="font-semibold text-zinc-900 dark:text-zinc-100">
                Frontend Development Experience
              </div>
              <BulletList
                items={[
                  "Over 2 years of continuous learning and hands-on practice in web development.",
                  "Completed personal and academic projects to strengthen practical and real-world skills.",
                ]}
              />
            </div>
          </Section>
        </div>

        {/* SIDEBAR */}
        <div className="space-y-6">
          <div
            className="
              rounded-2xl
              border border-black/10 dark:border-white/10
              bg-white/55 dark:bg-white/5
              p-4
            "
          >
            <Section title="Education">
              <div className="space-y-1">
                <div className="font-semibold text-zinc-900 dark:text-zinc-100">
                  Bachelor of Science in Information Technology
                </div>
                <div className="text-sm text-zinc-700 dark:text-zinc-300">
                  Laguna State Polytechnic University (LSPU)
                </div>
                <div className="text-xs text-zinc-500 dark:text-zinc-400">
                  Currently Studying
                </div>
              </div>
            </Section>
          </div>

          <div
            className="
              rounded-2xl
              border border-black/10 dark:border-white/10
              bg-white/55 dark:bg-white/5
              p-4
            "
          >
            <Section title="Skills">
              <div className="space-y-3 text-sm">
                <div>
                  <div className="text-xs font-semibold text-zinc-800 dark:text-zinc-200">
                    Frontend
                  </div>
                  <div className="text-zinc-700 dark:text-zinc-300">
                    HTML5, CSS3, JavaScript (ES6+), TypeScript
                  </div>
                </div>

                <div>
                  <div className="text-xs font-semibold text-zinc-800 dark:text-zinc-200">
                    Frameworks & Tools
                  </div>
                  <div className="text-zinc-700 dark:text-zinc-300">
                    React, Tailwind CSS, Vite, Framer Motion
                  </div>
                </div>

                <div>
                  <div className="text-xs font-semibold text-zinc-800 dark:text-zinc-200">
                    Backend (Basic Knowledge)
                  </div>
                  <div className="text-zinc-700 dark:text-zinc-300">
                    Node.js, Express
                  </div>
                </div>

                <div>
                  <div className="text-xs font-semibold text-zinc-800 dark:text-zinc-200">
                    Tools
                  </div>
                  <div className="text-zinc-700 dark:text-zinc-300">
                    Git, GitHub, Vercel, Postman, Figma
                  </div>
                </div>

                <div>
                  <div className="text-xs font-semibold text-zinc-800 dark:text-zinc-200">
                    Core Skills
                  </div>
                  <div className="text-zinc-700 dark:text-zinc-300">
                    Responsive Design, UI/UX Principles, Component-Based
                    Development
                  </div>
                </div>
              </div>
            </Section>
          </div>

          <div
            className="
              rounded-2xl
              border border-black/10 dark:border-white/10
              bg-white/55 dark:bg-white/5
              p-4
            "
          >
            <Section title="Soft Skills">
              <BulletList
                items={[
                  "Problem-solving",
                  "Attention to detail",
                  "Time management",
                  "Adaptability",
                  "Team collaboration",
                ]}
              />
            </Section>
          </div>

          <div
            className="
              rounded-2xl
              border border-black/10 dark:border-white/10
              bg-white/55 dark:bg-white/5
              p-4
            "
          >
            <Section title="Certifications">
              <div className="space-y-3">
                <div className="space-y-1">
                  <div className="font-semibold text-zinc-900 dark:text-zinc-100">
                    Web Development Fundamentals
                  </div>
                  <div className="text-xs text-zinc-500 dark:text-zinc-400">
                    IBM SkillsBuild
                  </div>
                  <a
                    href="https://students.yourlearning.ibm.com/certificate/share/02a013cd3bewogICJvYmplY3RJZCIgOiAiUExBTi00M0EwMzBCOTc0ODUiLAogICJsZWFybmVyQ05VTSIgOiAiMzg0MjgyM1JFRyIsCiAgIm9iamVjdFR5cGUiIDogIkFDVElWSVRZIgp97bec25bd44-10"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-xs text-zinc-700 dark:text-zinc-200 hover:underline underline-offset-4"
                  >
                    View certificate <ExternalLink size={12} />
                  </a>
                </div>

                <div className="space-y-1">
                  <div className="font-semibold text-zinc-900 dark:text-zinc-100">
                    Data Analytics
                  </div>
                  <div className="text-xs text-zinc-500 dark:text-zinc-400">
                    Cisco
                  </div>
                  <a
                    href="https://www.credly.com/badges/a2cd3d66-0f01-46e2-b083-2f43d023d22e"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-xs text-zinc-700 dark:text-zinc-200 hover:underline underline-offset-4"
                  >
                    Verified badge <ExternalLink size={12} />
                  </a>
                </div>
              </div>
            </Section>
          </div>

          <div
            className="
              rounded-2xl
              border border-black/10 dark:border-white/10
              bg-white/55 dark:bg-white/5
              p-4
            "
          >
            <Section title="Interests">
              <BulletList
                items={[
                  "Web Design & UI Animation",
                  "Learning modern web technologies",
                  "Building creative and functional websites",
                ]}
              />
            </Section>
          </div>

          <div className="text-xs text-zinc-500 dark:text-zinc-400">
            References available upon request.
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Hero() {
  const navigate = useNavigate();

  /* ================= AVATAR LOGIC ================= */
  const [hovered, setHovered] = useState(false);
  const [mode, setMode] = useState<AvatarMode>("default");
  const resetTimer = useRef<number | null>(null);

  const avatarSrc =
    mode === "clicked"
      ? "/avatar-clicked.jpg"
      : hovered
        ? "/avatar-hover.jpg"
        : "/avatar.png";

  function handleAvatarClick() {
    if (resetTimer.current) window.clearTimeout(resetTimer.current);

    setMode("clicked");

    resetTimer.current = window.setTimeout(() => {
      setMode("default");
      resetTimer.current = null;
    }, 2000);
  }

  useEffect(() => {
    return () => {
      if (resetTimer.current) window.clearTimeout(resetTimer.current);
    };
  }, []);

  /* ================= CV MODAL (ONE PAGE, SCROLLABLE) ================= */
  const [cvOpen, setCvOpen] = useState(false);

  function openCv() {
    setCvOpen(true);
  }

  // Lock background scroll when modal open
  useEffect(() => {
    if (!cvOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [cvOpen]);

  // Esc to close
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (!cvOpen) return;
      if (e.key === "Escape") setCvOpen(false);
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [cvOpen]);

  return (
    <motion.div
      initial={{ opacity: 0, y: -24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="
        hero
        max-w-4xl w-full
        flex flex-col sm:flex-row
        items-center sm:items-start
        gap-6
        relative
      "
    >
      <div className="absolute top-0 right-0">
        <DarkModeToggle />
      </div>

      {/* ================= AVATAR ================= */}
      <motion.button
        type="button"
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => setHovered(false)}
        onClick={handleAvatarClick}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.97 }}
        transition={{ type: "spring", stiffness: 260, damping: 18 }}
        className="
          w-32 h-32
          rounded-[12px]
          overflow-hidden
          ring-1 ring-black/10 dark:ring-white/15
          shadow-md
          cursor-pointer
          focus:outline-none
          relative
          bg-black/5 dark:bg-white/10
        "
        aria-label="Profile avatar"
      >
        <motion.img
          key={avatarSrc}
          src={avatarSrc}
          alt="Rhen-Rhen Lumbo"
          className="w-full h-full object-cover"
          initial={{ opacity: 0, scale: 1.02 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          draggable={false}
        />
      </motion.button>

      {/* ================= CONTENT ================= */}
      <div className="space-y-1">
        <h1 className="font-extrabold text-xl leading-tight">
          Rhen-Rhen A. Lumbo
        </h1>

        <p className="flex items-center gap-1 text-sm text-muted">
          <MapPin size={14} className="text-accent" />
          San Pablo City, Laguna, Philippines
        </p>

        <p className="text-sm font-medium">Web Developer / Web Designer</p>

        <p className="text-sm text-muted max-w-md">
          I build modern, results-driven websites for individuals and growing
          businesses.
        </p>

        <div className="flex items-center gap-3 mt-3">
          <motion.button
            type="button"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate("/contact")}
            className="
              btn
              inline-flex items-center gap-1.5
              px-3 py-2 text-xs font-medium
              rounded-md
            "
          >
            <Mail size={12} />
            Contact
          </motion.button>

          <motion.button
            type="button"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={openCv}
            className="
              btn-outline
              inline-flex items-center gap-1.5
              px-3 py-2 text-xs font-medium
              rounded-md
            "
          >
            <FileText size={12} />
            View CV
          </motion.button>
        </div>
      </div>

      {/* ================= CV MODAL (GLASS ONLY, ONE PAGE, SCROLLABLE) ================= */}
      <AnimatePresence>
        {cvOpen && (
          <motion.div
            className="fixed inset-0 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onContextMenu={(e) => e.preventDefault()}
          >
            {/* LIGHT GLASS BACKDROP */}
            <motion.div
              className="
                absolute inset-0
                bg-white/80 dark:bg-zinc-950/35
                backdrop-blur-md
              "
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setCvOpen(false)}
            />

            {/* GLASS PANEL */}
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label="CV Preview"
              initial={{ opacity: 0, y: 18, scale: 0.985 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 18, scale: 0.985 }}
              transition={{ type: "spring", stiffness: 260, damping: 22 }}
              className="
                absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
                w-[96vw] sm:w-[92vw] lg:w-[86vw] max-w-6xl
                h-[92vh] sm:h-[90vh]
                rounded-2xl sm:rounded-3xl
                overflow-hidden
                flex flex-col

                bg-white/55 dark:bg-zinc-950/40
                backdrop-blur-2xl
                text-zinc-900 dark:text-zinc-100
                ring-1 ring-black/10 dark:ring-white/10
                shadow-[0_18px_60px_rgba(0,0,0,0.12)]
              "
              onClick={(e) => e.stopPropagation()}
            >
              {/* HEADER */}
              <div
                className="
                  h-14 sm:h-16
                  px-3 sm:px-5
                  flex items-center justify-between
                  border-b border-black/10 dark:border-white/10
                  bg-white/35 dark:bg-zinc-950/25
                  backdrop-blur-2xl
                "
              >
                <div className="min-w-0">
                  <div className="text-sm sm:text-[15px] font-semibold truncate">
                    CV Preview
                  </div>
                  <div className="text-[11px] sm:text-xs text-zinc-500 dark:text-zinc-400">
                    Scroll to read • Esc to close
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setCvOpen(false)}
                  className="
                    inline-flex items-center justify-center
                    w-9 h-9 sm:w-10 sm:h-10
                    rounded-xl
                    border border-black/10 dark:border-white/12
                    bg-white/40 hover:bg-white/60
                    dark:bg-white/5 dark:hover:bg-white/10
                    transition
                    focus:outline-none
                    focus-visible:ring-2 focus-visible:ring-accent/60
                    focus-visible:ring-offset-2
                    dark:focus-visible:ring-offset-zinc-950
                  "
                  aria-label="Close CV preview"
                >
                  <X size={18} />
                </button>
              </div>

              {/* SCROLL AREA */}
              <div className="flex-1 min-h-0 overflow-auto">
                <div className="p-3 sm:p-6">
                  {/* Inner "paper" (still clean, inside glass modal) */}
                  <div
                    className="
                      mx-auto max-w-5xl
                      rounded-2xl
                      bg-white/80 dark:bg-zinc-950/60
                      border border-black/10 dark:border-white/10
                      shadow-[0_10px_30px_rgba(0,0,0,0.08)]
                      p-4 sm:p-7
                    "
                  >
                    <CodedCvOnePage />
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
