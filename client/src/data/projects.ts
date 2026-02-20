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

// ✅ Added Programming Languages category
export type TechCategory =
  | "Frontend"
  | "Backend"
  | "Tools"
  | "Programming Languages";

export type TechItem = {
  title: string;
  description: string;
  logo: string;
  category: TechCategory;
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
      "A clean and elegant photography portfolio website designed to showcase creative works and services with a modern responsive layout.",
    thumbnail: "/projects/photographer-portfolio.png",
    liveUrl: "https://photographer-portfolio-jet-three.vercel.app",
    githubUrl: "https://github.com/rrlWakai/photographer-portfolio",
    techStack: ["React", "TypeScript", "Tailwind CSS", "Framer Motion"],
  },
  {
    id: 2,
    title: "SmileCare Booking App",
    description:
      "A modern dental clinic website with responsive UI and structured consultation booking flow.",
    thumbnail: "/projects/smilecare.png",
    liveUrl: "https://smilecarebookingapp.vercel.app/",
    githubUrl: "https://github.com/rrlWakai/dental-appointment-app",
    techStack: [
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Framer Motion",
      "Vite",
    ],
  },
  {
    id: 3,
    title: "Saling Cafe",
    description:
      "A warm and welcoming café website designed to showcase menu and brand story while working smoothly across devices.",
    thumbnail: "/projects/SalingCafe.png",
    liveUrl: "https://sailingcafe.vercel.app/",
    githubUrl: "https://github.com/rrlWakai/CoffeWebsite.git",
    techStack: [
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Framer Motion",
      "Vite",
    ],
  },
  {
    id: 4,
    title: "Timeless Resort",
    description:
      "A luxury resort landing page with smooth animations and structured sections guiding users toward booking and inquiries.",
    thumbnail: "/projects/timelessresort.png",
    liveUrl: "https://timelessresort.vercel.app/",
    githubUrl: "https://github.com/rrlWakai/TimelessProject.git",
    techStack: [
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Framer Motion",
      "Vite",
    ],
  },
];

// ================= OPTIONAL BOOKING =================
export const booking: Booking[] = [
  {
    id: 1,
    title: "Portfolio Website",
    description: "A modern portfolio showcasing projects and skills.",
    thumbnail: "/projects/portfolio.png",
    liveUrl: "https://your-portfolio.vercel.app",
    githubUrl: "https://github.com/yourname/portfolio",
    techStack: ["React", "TypeScript", "Tailwind CSS"],
  },
];

// ================= TECH STACK =================
export const techStack: TechItem[] = [
  // -------- Frontend --------
  {
    title: "HTML",
    description: "Semantic structure for accessible layouts.",
    logo: "/icons/html.png",
    category: "Frontend",
  },
  {
    title: "CSS",
    description: "Responsive styling and layout systems.",
    logo: "/icons/css-3.png",
    category: "Frontend",
  },
  {
    title: "JavaScript",
    description: "Core scripting language for web interactivity.",
    logo: "/icons/js.png",
    category: "Frontend",
  },
  {
    title: "React",
    description: "Component-based UI development.",
    logo: "/icons/atom.png",
    category: "Frontend",
  },
  {
    title: "TypeScript",
    description: "Typed JavaScript for scalable applications.",
    logo: "/icons/typescript.png",
    category: "Frontend",
  },
  {
    title: "Tailwind CSS",
    description: "Utility-first CSS framework.",
    logo: "/logos/tailwindcss.svg",
    category: "Frontend",
  },

  // -------- Backend --------
  {
    title: "Node.js",
    description: "JavaScript runtime for backend services.",
    logo: "/icons/node.png",
    category: "Backend",
  },

    {
    title: "Php",
    description: "Server-side scripting language for web development.",
    logo: "/icons/php.png",
    category: "Programming Languages",
  },
  {
    title: "MySQL",
    description: "Relational database management system.",
    logo: "/icons/mysql.png",
    category: "Backend",
  },
  // -------- Tools --------
  {
    title: "Vite",
    description: "Fast development build tool.",
    logo: "/logos/vite.svg",
    category: "Tools",
  },
  {
    title: "Git",
    description: "Version control system.",
    logo: "/icons/social.png",
    category: "Tools",
  },
  {
    title: "GitHub",
    description: "Code hosting and collaboration platform.",
    logo: "/icons/github.png",
    category: "Tools",
  },

  // -------- Programming Languages --------
  {
    title: "C#",
    description: "Object-oriented programming language for applications and systems.",
    logo: "/icons/csharp.png",
    category: "Programming Languages",
  },
  {
    title: "Java",
    description: "Widely-used programming language for backend and software development.",
    logo: "/icons/java.png",
    category: "Programming Languages",
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
  {
    id: 2,
    title: "Web Development Fundamentals",
    issuer: "IBM SkillsBuild",
    date: "2026",
    image: "/certificates/WebDev.png",
  },

];
