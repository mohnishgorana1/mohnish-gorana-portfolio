// =========================================
// PORTFOLIO DATABASE
// Single source of truth for all AI-queryable data
// =========================================

const BASE_URL = "http://localhost:3000";

export type Project = {
  id: string;
  name: string;
  tagline: string;
  description: string;
  techStack: string[];
  highlights: string[];
  liveUrl?: string;
  githubUrl?: string;
  projectDetailsPageUrl: string;
};

export const PROJECTS: Project[] = [
  {
    id: "mega-drive",
    name: "Mega Drive",
    tagline: "Cloud storage SaaS",
    description:
      "A cloud storage SaaS application that supports direct client-to-cloud uploads, bypassing Vercel's serverless payload size limits entirely. Users can upload, organize, and manage files with a clean dashboard.",
    techStack: ["Next.js 14", "MongoDB", "Clerk", "Cloudinary"],
    highlights: [
      "Direct-to-cloud upload architecture avoids server payload limits",
      "Auth handled via Clerk",
      "Folder-based file organization",
    ],
    liveUrl: "https://mdrive-mg.vercel.app/",
    githubUrl: "https://github.com/mohnishgorana1/code-connect",
    projectDetailsPageUrl: `${BASE_URL}/projects/megadrive`,
  },
  {
    id: "codeconnect",
    name: "CodeConnect",
    tagline: "Collaborative interview platform",
    description:
      "A collaborative technical interview platform with live video calls and real-time collaborative code editing, built for conducting remote coding interviews smoothly.",
    techStack: ["Next.js", "Stream", "Liveblocks", "MongoDB"],
    highlights: [
      "Live video powered by Stream",
      "Real-time shared code editor via Liveblocks",
      "Built for recruiter/candidate interview flows",
    ],
    liveUrl: "https://code-connect-v1.vercel.app/",
    githubUrl: "https://github.com/mohnishgorana1/code-connect",
    projectDetailsPageUrl: `${BASE_URL}/projects/codeconnect`,
  },
  {
    id: "examify",
    name: "Examify",
    tagline: "Online examination platform",
    description:
      "A full-stack, role-based online examination platform supporting separate flows for admins/teachers and students, with question banks and result tracking.",
    techStack: ["Next.js", "MongoDB", "Express.js"],
    highlights: [
      "Role-based access (admin vs student)",
      "Question bank management",
      "Automated result tracking",
    ],
    liveUrl: "https://examify-three.vercel.app/",
    githubUrl: "https://github.com/mohnishgorana1/Examify",
    projectDetailsPageUrl: `${BASE_URL}/projects/examify`,
  },
  {
    id: "docstream",
    name: "DocStream",
    tagline: "Real-time document collaboration",
    description:
      "A real-time collaborative document editor inspired by Google Docs, allowing multiple users to edit the same document simultaneously with live cursors.",
    techStack: ["Next.js", "Liveblocks", "MongoDB"],
    highlights: [
      "Real-time multi-user editing",
      "Live cursor presence",
      "Google Docs-like editing experience",
    ],
    liveUrl: "https://docstream.vercel.app/",
    githubUrl: "https://github.com/mohnishgorana1/DocStream--realtime-docs",
    projectDetailsPageUrl: `${BASE_URL}/projects/docstream`,
  },
];


export const SKILLS = {
  frontend: [
    "Next.js",
    "React",
    "TypeScript",
    "TailwindCSS",
    "Framer Motion",
    "GSAP",
    "ThreeJS",
  ],
  backend: ["Node.js", "Express.js"],
  database: ["MongoDB"],
  tools: [
    "Git",
    "Inngest",
    "Docker",
    "Figma",
    "Postman",
    "Cloudinary",
    "Stream",
    "Liveblocks",
    "Pusher",
    "Clerk",
  ],
  ai: ["GenAI", "RAG", "OPENAI SDK", "AI SDK", "Agentic AI"]
};

export const EDUCATION = [
  {
    degree: "Master of Computer Application (MCA)",
    institute: "Gyanodaya Institute of Professional Studies, RGPV",
    duration: "2022-2024",
    score: "8.07 CGPA",
  },
  {
    degree: "BSc in Computer Science",
    institute: "Balkavi Bairagee Mahavidhyalaya, Vikram University",
    duration: "2018-2021",
    score: "79.8%",
  },
];
export const PROFILE = {
  name: "Mohnish Gorana",
  role: "Full-Stack Web Developer (MERN & Next.js)",
  location: "Neemuch, Madhya Pradesh, India",
  email: "mohnishgorana1@gmail.com",
  phone: "+91 7999517181",
  focus: "Exploring GenAI, RAG Systems, and AI Agents",
  availableForWork: true,
  skills: SKILLS,
  education: EDUCATION
};





export const SERVICES = [
  "Web Development",
  "Backend Development",
  "Database Designing",
  "Cloud Integration",
  "Website Designing",
  "IT-enabled Services",
];

// =========================================
// LOOKUP HELPERS (used by tool handlers)
// =========================================

export function findProjectByName(query: string): Project | null {
  const normalized = query.trim().toLowerCase();
  return (
    PROJECTS.find(
      (p) =>
        p.id.toLowerCase() === normalized ||
        p.name.toLowerCase() === normalized ||
        p.name.toLowerCase().includes(normalized) ||
        normalized.includes(p.name.toLowerCase()),
    ) ?? null
  );
}

export function getAllProjectsSummary() {
  return PROJECTS.map((p) => ({
    name: p.name,
    tagline: p.tagline,
    techStack: p.techStack,
  }));
}
