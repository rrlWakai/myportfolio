import { useState } from "react";
import { motion } from "framer-motion";
import Hero from "../components/Hero";
import AnimatedCard from "../components/AnimatedCard";
import GalleryCarousel from "../components/GalleryCarousel";
import FilterTabs, { type FilterType } from "../components/FilterTabs";
import FilteredGrid from "../components/FilteredGrid";
import Footer from "../components/Footer";
import ScrollReveal from "../components/ScrollReveal";
import Services from "../components/Services";
import Process from "../components/Process";
import LocalTimeCard from "../components/LocalTimeCard";

/* ---------- Education: Process Bulletin Item (minimal) ---------- */
function EducationStep({
  title,
  subtitle,
  meta,
  children,
}: {
  title: string;
  subtitle?: string;
  meta: string; // e.g., "2nd Year • In Progress" / "Graduate"
  children: React.ReactNode;
}) {
  return (
    <div className="relative pl-6">
      {/* dot */}
      <div className="absolute left-[3px] top-[7px] h-1.5 w-1.5 rounded-full bg-black/35 dark:bg-white/35" />

      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <div className="min-w-0">
          <p className="text-sm font-semibold tracking-wide">{title}</p>
          {subtitle ? (
            <p className="text-xs text-muted mt-1">{subtitle}</p>
          ) : null}
        </div>

        <span className="text-[11px] px-2 py-0.5 rounded-full border border-black/10 dark:border-white/15 bg-white/60 dark:bg-white/10 text-muted">
          {meta}
        </span>
      </div>

      <p className="text-sm text-muted leading-relaxed mt-2">{children}</p>
    </div>
  );
}

export default function Home() {
  const [activeFilter, setActiveFilter] = useState<FilterType>("projects");

  return (
    <motion.main
      className="max-w-6xl mx-auto px-4 py-6 space-y-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <ScrollReveal>
        <div className="flex justify-center">
          <Hero />
        </div>
      </ScrollReveal>

      <ScrollReveal>
        <section className="grid md:grid-cols-3 gap-4">
          {/* LEFT COLUMN */}
          <div className="md:col-span-2 space-y-4">
            {/* ABOUT */}
            <AnimatedCard
              className="glass"
              title="ABOUT ME"
              icon="about"
              disableHover
            >
              <p className="text-sm text-muted leading-relaxed">
                I’m <strong>Rhen-Rhen A. Lumbo</strong>, a BSIT student who
                helps small businesses and teams present their brand
                professionally through a clean, modern website. My goal is to
                turn your ideas into a site that looks trustworthy and is easy
                for people to use.
              </p>

              <p className="text-sm text-muted leading-relaxed mt-4">
                I can help you build pages that clearly explain what you
                offer—such as a homepage, services, gallery, pricing, FAQs, and
                contact page—so visitors can quickly understand your business
                and take action (message, inquire, or book).
              </p>

              <p className="text-sm text-muted leading-relaxed mt-4">
                I focus on making websites <strong>fast</strong>,{" "}
                <strong>mobile-friendly</strong>, and <strong>organized</strong>
                , with clear layout and readable content. This helps customers
                find information faster and makes your business look more
                credible.
              </p>

              <p className="text-sm text-muted leading-relaxed mt-4">
                If you already have a website, I can also help improve it by
                redesigning the layout, fixing sections that feel confusing, and
                making the overall experience smoother—so your website works
                better for your customers, not just looks good.
              </p>

              <ul className="mt-4 space-y-2 text-sm text-muted leading-relaxed">
                <li>• Business / portfolio websites</li>
                <li>• Landing pages for promotions or services</li>
                <li>• Website redesign (cleaner layout + better flow)</li>
                <li>• Simple contact / inquiry forms</li>
              </ul>
            </AnimatedCard>

            {/* FOCUS */}
            <AnimatedCard
              className="glass"
              title="FOCUS"
              icon="focus"
              disableHover
            >
              <p className="text-sm text-muted leading-relaxed">
                My current focus is strengthening front-end fundamentals while
                applying them to real-world scenarios. This includes building
                reusable components, improving responsive layouts, refining UI
                consistency, and handling common features such as forms,
                validations, and API-driven data.
              </p>

              <p className="text-sm text-muted leading-relaxed mt-3">
                I’m also gradually learning back-end concepts to better
                understand full application flow, with the goal of transitioning
                toward full-stack development as I progress academically and
                professionally.
              </p>
            </AnimatedCard>
          </div>

          {/* RIGHT COLUMN */}
          <div className="space-y-4">
            <LocalTimeCard disableHover />

            {/* EDUCATION — process bulletin (latest on top) */}
            <AnimatedCard
              className="glass"
              title="EDUCATION"
              icon="education"
              disableHover
            >
              <div className="relative">
                {/* minimal rail */}
                <div className="absolute left-[4px] top-2 bottom-2 w-px bg-black/10 dark:bg-white/15" />

                <div className="space-y-5">
                  {/* Latest FIRST */}
                  <EducationStep
                    title="Bachelor of Science in Information Technology (BSIT)"
                    subtitle="Track: Web & Mobile App Development (WMAD)"
                    meta="2nd Year • In Progress"
                  >
                    Strengthening front-end development while expanding into
                    APIs, databases, and full-stack application structure.
                  </EducationStep>

                  <EducationStep
                    title="Senior High School"
                    subtitle="TVL – Programming Strand"
                    meta="Graduate"
                  >
                    Focused on programming fundamentals, logic building, and
                    introductory web development concepts.
                  </EducationStep>

                  <EducationStep
                    title="Junior High School"
                    subtitle="Completed"
                    meta="Graduate"
                  >
                    Developed analytical thinking, communication, and early
                    exposure to ICT-related subjects.
                  </EducationStep>

                  <EducationStep
                    title="Elementary Education"
                    subtitle="Completed"
                    meta="Graduate"
                  >
                    Built strong foundational skills in mathematics, reading,
                    and basic computer literacy.
                  </EducationStep>
                </div>
              </div>
            </AnimatedCard>
          </div>
        </section>
      </ScrollReveal>

      <Services />
      <Process />

      <section className="glass rounded-2xl p-6">
        <FilterTabs active={activeFilter} setActive={setActiveFilter} />
        <FilteredGrid active={activeFilter} />
      </section>

      <section className="space-y-5">
        <h2 className="text-center font-extrabold text-xl">GALLERY</h2>
        <GalleryCarousel />
      </section>

      <Footer />
    </motion.main>
  );
}
