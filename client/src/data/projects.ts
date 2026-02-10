// ================= TYPES =================
export type Project = {
  id: number;
  title: string;
  description: string;
  thumbnail: string;
  liveUrl?: string;
  githubUrl?: string;
  techStack: string[];
};

export type Booking = {
  id: number;
  title: string;
  description: string;
  thumbnail: string;
  liveUrl?: string;
  githubUrl?: string;
  techStack: string[];
};

export type TechCategory = "Frontend" | "Tools" | "Backend";

export type TechItem = {
  title: string;
  description: string;
  logo: string;
  category: TechCategory; // ✅ ADDED
};

export type Certificate = {
  id: number;
  title: string;
  issuer: string;
  date: string;
  image: string;
};

// ================= PROJECTS =================
export const projects: Project[] = [
  {
    id: 1,
    title: "Photographer Portfolio Website",
    description:
      "A clean and elegant photography portfolio website designed to showcase creative works, personal branding, and services with a modern, responsive layout.",
    thumbnail: "/projects/photographer-portfolio.png",
    liveUrl: "https://photographer-portfolio-jet-three.vercel.app",
    githubUrl: "https://github.com/rrlWakai/photographer-portfolio",
    techStack: ["React", "TypeScript", "Tailwind CSS", "Framer Motion"],
  },
  {
    id: 2,
    title: "SmileCare Booking App",
    description:
      "A modern dental clinic website featuring a professional UI, responsive layout, and clear consultation booking flow.",
    thumbnail: "/projects/smilecare.png",
    liveUrl: "https://smilecarebookingapp.vercel.app/",
    githubUrl: "https://github.com/rrlWakai/dental-appointment-app",
    techStack: [
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Framer Motion",
      "Vite",
      "Vercel",
    ],
  },
{
    id: 3,
    title: "Saling Cafe",
    description:
      "Saling Café’s website is designed to reflect a warm and welcoming café atmosphere while making it easy for customers to explore the menu and learn more about the brand. The site works beautifully on phones, tablets, and desktops, helping attract and engage customers online.",
    thumbnail: "/projects/SalingCafe.png",
    liveUrl: "https://sailingcafe.vercel.app/",
    githubUrl: "https://github.com/rrlWakai/CoffeWebsite.git",
    techStack: [
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Framer Motion",
      "Vite",
      "Vercel",
    ],
  },
    {
    id: 4,
    title: "Timeless Resort",
    description:
      "A luxury resort landing page concept built with a modern, responsive layout, smooth animations, and clear sections that guide users toward booking and inquiries.",
    thumbnail: "/projects/timelessresort.png",
    liveUrl: "https://timelessresort.vercel.app/",
    githubUrl: "https://github.com/rrlWakai/TimelessProject.git",
    techStack: ["React", "TypeScript", "Tailwind CSS", "Framer Motion", "Vite", "Vercel"],
  },
];

// ================= OPTIONAL BOOKING =================
export const booking: Booking[] = [
  {
    id: 1,
    title: "Portfolio Website",
    description:
      "A modern portfolio showcasing projects, skills, and certifications.",
    thumbnail: "/projects/portfolio.png",
    liveUrl: "https://your-portfolio.vercel.app",
    githubUrl: "https://github.com/yourname/portfolio",
    techStack: ["React", "TypeScript", "Tailwind CSS"],
  },
];

// ================= TECH STACK (GROUPED) =================
export const techStack: TechItem[] = [
  // -------- Frontend --------
  {
    title: "HTML",
    description: "Semantic structure for accessible, SEO-friendly layouts.",
    logo: "/icons/html.png",
    category: "Frontend",
  },
  {
    title: "CSS",
    description: "Responsive styling, layout systems, and modern UI polish.",
    logo: "/icons/css-3.png",
    category: "Frontend",
  },
  {
    title: "JavaScript",
    description: "Interactive UI logic, DOM handling, and web functionality.",
    logo: "/icons/js.png",
    category: "Frontend",
  },
  {
    title: "React",
    description: "Component-based UI library for scalable interfaces.",
    logo: "/icons/atom.png",
    category: "Frontend",
  },
  {
    title: "TypeScript",
    description: "Typed JavaScript for safer, scalable applications.",
    logo: "/icons/typescript.png",
    category: "Frontend",
  },
  {
    title: "Tailwind CSS",
    description: "Utility-first CSS framework for rapid UI development.",
    logo: "/logos/tailwindcss.svg",
    category: "Frontend",
  },

  // -------- Tools --------
  {
    title: "Vite",
    description: "Fast development server and modern build tool.",
    logo: "/logos/vite.svg",
    category: "Tools",
  },
  {
    title: "Git",
    description: "Distributed version control system.",
    logo: "/icons/social.png",
    category: "Tools",
  },
  {
    title: "GitHub",
    description: "Code hosting platform for collaboration and version control.",
    logo: "/icons/github.png",
    category: "Tools",
  },

  // -------- Backend (Learning / Early Stage) --------
  {
    title: "Node.js",
    description: "JavaScript runtime for backend services and APIs.",
    logo: "/icons/node.png",
    category: "Backend",
  },
];

// ================= CERTIFICATES =================
export const certificates: Certificate[] = [
  {
    id: 1,
    title: "Data Analytics",
    issuer: "Cisco Networking Academy",
    date: "2025",
    image: "/certificates/DataAnalytics.png",
  },
];
