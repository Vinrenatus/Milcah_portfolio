// Configuration constants for Milcah Mwangi's portfolio

export const PERSONAL_INFO = {
  name: "Milcah Mwangi",
  title: "Senior Software Engineer — Fintech Systems & AI Model Evaluation",
  email: "mwangimilcah72@gmail.com",
  location: "Isleworth, United Kingdom",
  // The resume lists placeholder handles for these; fill them in when confirmed.
  github: null,
  linkedin: null,
  resume: "/Milcah_Mwangi_Resume.pdf",
};

export const NAVIGATION = [
  { name: "Home", path: "#home" },
  { name: "About", path: "#about" },
  { name: "Skills", path: "#skills" },
  { name: "Projects", path: "#projects" },
  { name: "Experience", path: "#experience" },
  { name: "Contact", path: "#contact" },
];

export const SOCIAL_LINKS = [
  { name: "GitHub", url: PERSONAL_INFO.github, icon: "github" },
  { name: "LinkedIn", url: PERSONAL_INFO.linkedin, icon: "linkedin" },
  { name: "Email", url: `mailto:${PERSONAL_INFO.email}`, icon: "mail" },
].filter((link) => Boolean(link.url));
