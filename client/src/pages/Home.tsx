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
                I’m <strong>Rhen-Rhen A. Lumbo</strong>, a BSIT student with a
                strong focus on front-end development, currently preparing for
                Web & Mobile App Development (WMAD). I specialize in building
                clean, responsive, and well-structured user interfaces using
                modern front-end tools and best practices.
              </p>

              <p className="text-sm text-muted leading-relaxed mt-4">
                I work primarily with React, TypeScript, and Tailwind CSS to
                translate ideas and designs into functional, maintainable
                components. I pay close attention to layout consistency,
                spacing, typography, and responsiveness to ensure interfaces
                remain usable and visually polished across different screen
                sizes.
              </p>

              <p className="text-sm text-muted leading-relaxed mt-4">
                Through personal and real-world–inspired projects, I’ve gained
                hands-on experience building multi-section websites, reusable UI
                components, form handling, and basic API integration. I value
                clean code, readability, and scalability, and I continuously
                refine my workflow as I learn.
              </p>

              <p className="text-sm text-muted leading-relaxed mt-4">
                While front-end development is my strongest area today, I’m
                intentionally expanding into back-end fundamentals such as APIs,
                databases, and application structure. My long-term goal is to
                become a well-rounded full-stack developer capable of
                contributing effectively to real-world projects and team-based
                environments.
              </p>
            </AnimatedCard>

            {/* EDUCATION — now directly below About */}
            <AnimatedCard
              className="glass"
              title="EDUCATION"
              icon="education"
              disableHover
            >
              <p className="text-sm text-muted leading-relaxed">
                Currently a 2nd-year Bachelor of Science in Information
                Technology (BSIT) student, preparing to pursue Web & Mobile App
                Development (WMAD). Alongside academic coursework, I actively
                build front-end projects to strengthen my understanding of
                responsive design, component-based architecture, and modern UI
                development workflows.
              </p>
            </AnimatedCard>
          </div>

          {/* RIGHT COLUMN */}
          <div className="space-y-4">
            <LocalTimeCard disableHover />

            <AnimatedCard
              className="glass"
              title="FOCUS"
              icon="focus"
              disableHover
            >
              <p className="text-sm text-muted leading-relaxed">
                My current focus is strengthening front-end fundamentals while
                applying them to real-world scenarios. This includes building
                reusable React components, improving responsive layouts,
                refining UI consistency, and handling common features such as
                forms, validations, and API-driven data.
              </p>

              <p className="text-sm text-muted leading-relaxed mt-3">
                I’m also gradually learning back-end concepts to better
                understand full application flow, with the goal of transitioning
                toward full-stack development as I progress academically and
                professionally.
              </p>
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
