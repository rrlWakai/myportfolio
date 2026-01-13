export const portfolioContext = {
  owner: "Rhen-Rhen Lumbo",
  pronouns:"He/Him",

  contact: {
    email: "lumborhenrhena@gmail.com",
    phone: "09612961879",
    contactPage:"/contact",
  },
    personal:{
        lifeVerse:"Deuteronomy 31:8 The LORD himself goes before you and will be with you; He will never leave you nor forsake you. Do not be afraid; do not be discouraged."
    },

  availability: {
    status: "Open to internships and freelance projects",
    focus: ["Frontend development", "Portfolio/Landing pages", "Small business websites"],
    location: "Philippines San Pablo City, Laguna",
    contactHint: "Use the Contact section on the portfolio to reach out.",
  },

  techStack: {
    Frontend: [
      "HTML",
      "CSS",
      "JavaScript",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Framer Motion",
    ],
    Tools: ["Git", "GitHub", "Vite", "Vercel"],
    Backend: ["Node.js (learning)", "Express (learning)"],
  },

  projects: [
    {
      name: "Photographer Portfolio Website",
      description:
        "A clean and elegant photography portfolio website focused on creative showcase and personal branding.",
      tech: ["React", "TypeScript", "Tailwind CSS", "Framer Motion"],
      live: "https://photographer-portfolio-jet-three.vercel.app",
    },
    {
      name: "SmileCare Booking App",
      description:
        "A modern dental clinic website with professional UI and clear consultation booking flow.",
      tech: ["React", "TypeScript", "Tailwind CSS", "Framer Motion", "Vite", "Vercel"],
      live: "https://smilecarebookingapp.vercel.app",
    },
  ],
};
