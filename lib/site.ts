// ---------------------------------------------------------------------------
//  Portfolio — content & data layer
// ---------------------------------------------------------------------------

export const SITE = {
  name: "DEEPANSHU YADAV",
  role: "Junior Frontend & Full-Stack Developer",
  statement: "I build responsive web interfaces and full-stack projects with a focus on clear, considered design.",
  email: "deepanshu4551@gmail.com",
  location: "India",
  availability: "Early-career developer · open to junior roles",
  socials: [
    { label: "GitHub", href: "https://github.com/DeepanshuAI" },
    { label: "LinkedIn", href: "https://linkedin.com/in/deepanshu-yadav-484a82270/" },
    { label: "Email", href: "mailto:deepanshu4551@gmail.com" },
  ],
} as const;

export const HERO_SEQUENCE = {
  dir: "/hero",
  prefix: "ezgif-frame-",
  ext: "webp",
  count: 120,
  pad: 3,
  width: 1280,
  height: 720,
};

export function heroFrameSrc(i: number) {
  const n = String(i).padStart(HERO_SEQUENCE.pad, "0");
  return `${HERO_SEQUENCE.dir}/${HERO_SEQUENCE.prefix}${n}.${HERO_SEQUENCE.ext}`;
}

export type SectionMeta = { id: string; index: string; label: string };
export const SECTIONS: SectionMeta[] = [
  { id: "hero", index: "00", label: "Origin" },
  { id: "featured-systems", index: "01", label: "Featured Systems" },
  { id: "engineering-core", index: "02", label: "Engineering Core" },
  { id: "design-thinking", index: "03", label: "Method" },
  { id: "process", index: "04", label: "Pipeline" },
  { id: "playground", index: "05", label: "Experiments" },
  { id: "contact", index: "06", label: "Transmit" },
];

export type SkillNode = {
  name: string;
  category: string;
  description: string;
  projects: string[];
};

export type SkillLayer = {
  key: string;
  label: string;
  color: string;
  nodes: SkillNode[];
};

export const SKILL_LAYERS: SkillLayer[] = [
  {
    key: "frontend",
    label: "Frontend",
    color: "79 214 255",
    nodes: [
      { name: "React", category: "UI library", description: "Component based UI library used in the portfolio and featured projects.", projects: ["Portfolio", "Student Management System", "Kairos", "FlowPilot AI"] },
      { name: "TypeScript", category: "Language", description: "Used in the portfolio and Kairos frontend.", projects: ["Portfolio", "Kairos"] },
      { name: "Tailwind CSS", category: "Styling", description: "Utility CSS used in the portfolio and featured project interfaces.", projects: ["Portfolio", "Student Management System", "FlowPilot AI"] },
      { name: "Vite", category: "Build tool", description: "Build tool used by the Kairos and FlowPilot projects.", projects: ["Kairos", "FlowPilot AI"] },
    ],
  },
  {
    key: "fullstack",
    label: "Full-Stack",
    color: "93 242 192",
    nodes: [
      { name: "Node.js", category: "Runtime", description: "Runtime used by the Student Management System API.", projects: ["Student Management System"] },
      { name: "Express", category: "Web framework", description: "Server framework used for the Student Management System API.", projects: ["Student Management System"] },
      { name: "MongoDB", category: "Database", description: "Database used by the Student Management System API.", projects: ["Student Management System"] },
      { name: "REST API", category: "HTTP API", description: "The Student Management System frontend communicates with its API over HTTP.", projects: ["Student Management System"] },
    ],
  },
  {
    key: "interface",
    label: "Interactive UI",
    color: "139 123 255",
    nodes: [
      { name: "Framer Motion", category: "Animation library", description: "Used for animated interface elements in the portfolio and FlowPilot.", projects: ["Portfolio", "FlowPilot AI"] },
      { name: "Three.js", category: "3D library", description: "Used for the portfolio's WebGL scenes and the Kairos 3D experience.", projects: ["Portfolio", "Kairos"] },
      { name: "WebGL", category: "Graphics API", description: "Rendering technology used by the portfolio's interactive scenes.", projects: ["Portfolio"] },
      { name: "React Router", category: "Routing library", description: "Client-side routing used in the Student Management System and FlowPilot.", projects: ["Student Management System", "FlowPilot AI"] },
    ],
  },
];

export type Environment = "crystal" | "liquid" | "holographic" | "landscape" | "signal";

export type Project = {
  id: string;
  title: string;
  category: string;
  summary: string;
  problem: string;
  architecture: string;
  stack: string[];
  outcome: string;
  technicalDecisions: string;
  image: string;
  imageMode: "cover" | "object";
  environment: Environment;
  accent: string;
  accent2: string;
  href?: string;
  repo?: string;
};

export const PROJECTS: Project[] = [
  {
    id: "stumansys",
    title: "Student Management System",
    category: "Full-Stack Platform",
    summary: "A student administration app with student records, attendance, and grade entry, built around a React client and Express API.",
    problem: "A single interface for managing student records and related academic data.",
    architecture: "React client -> Express API -> MongoDB",
    stack: ["React", "Node.js", "Express", "MongoDB", "Tailwind CSS"],
    outcome: "Includes student CRUD, attendance, and grade management flows.",
    technicalDecisions: "The repository separates the React frontend from an Express API and stores student, attendance, and grade data with Mongoose models.",
    image: "/projects/stumansys.png",
    imageMode: "cover",
    environment: "holographic",
    accent: "79 214 255",
    accent2: "93 242 192",
    repo: "https://github.com/DeepanshuAI/Student-Management-System",
  },
  {
    id: "kairos",
    title: "Kairos",
    category: "Web Application",
    summary: "A resort website prototype with 3D scenes, sample resort content, and client-side booking flows. It has no live booking backend.",
    problem: "Presenting resort spaces and booking information through an immersive web experience.",
    architecture: "React + TypeScript + Vite + Three.js",
    stack: ["React", "TypeScript", "Vite", "Three.js", "Tailwind CSS"],
    outcome: "The repository includes 3D presentation scenes, room content, and client-side booking flows.",
    technicalDecisions: "The project uses React components for page sections and Three.js via React Three Fiber for 3D scenes.",
    image: "/projects/kairos.png",
    imageMode: "cover",
    environment: "crystal",
    accent: "139 123 255",
    accent2: "180 140 255",
    repo: "https://github.com/DeepanshuAI/Kairos",
    href: "https://kairos-seven-theta.vercel.app/"
  },
  {
    id: "flowpilot",
    title: "FlowPilot AI",
    category: "SaaS Platform",
    summary: "A workflow automation interface concept with a local flow simulation and illustrative sample content. It has no external integrations.",
    problem: "Demonstrating how a workflow automation interface could be configured and previewed.",
    architecture: "React + Vite + Framer Motion",
    stack: ["React", "Vite", "Tailwind CSS", "Framer Motion"],
    outcome: "Includes preset workflow examples and a timed client-side simulation; it does not execute external integrations.",
    technicalDecisions: "The workflow preview is implemented as a local React state sequence, with preset step data in the component.",
    image: "/projects/flowpilot.png",
    imageMode: "cover",
    environment: "signal",
    accent: "93 242 192",
    accent2: "79 214 255",
    repo: "https://github.com/DeepanshuAI/FlowPilot",
    href: "https://flow-pilot-pi.vercel.app/"
  }
];

export type ProcessStage = {
  key: string;
  label: string;
  blurb: string;
  question?: string;
  output?: string;
  artifact?: string;
};

export const PROCESS: ProcessStage[] = [
  {
    key: "idea",
    label: "Idea",
    blurb: "A tiny glowing point. The seed of a product.",
    question: "What are we building?",
    output: "Concept",
    artifact: "/process/idea.jpg",
  },
  {
    key: "define",
    label: "Define",
    blurb: "The point expands. Vagueness becomes a defined problem.",
    question: "What needs to scale?",
    output: "System specs",
    artifact: "/process/define.jpg",
  },
  {
    key: "architect",
    label: "Architect",
    blurb: "Connections form. The system takes shape.",
    question: "How does data flow?",
    output: "Technical blueprint",
    artifact: "/process/architect.jpg",
  },
  {
    key: "build",
    label: "Build",
    blurb: "Components assemble. Frontend, backend, database.",
    question: "Is the logic sound?",
    output: "Source code",
    artifact: "/process/build.jpg",
  },
  {
    key: "test",
    label: "Test",
    blurb: "Intentional iteration. Elements dim and get replaced.",
    question: "Is it resilient?",
    output: "Reviewed build",
    artifact: "/process/test.jpg",
  },
  {
    key: "ship",
    label: "Ship",
    blurb: "The final form becomes stable. Coherent finished system.",
    question: "Is it ready for production?",
    output: "Release",
    artifact: "/process/ship.jpg",
  },
];

export type PlaygroundModule = {
  id: string;
  title: string;
  tag: string;
  blurb: string;
  variant: "shader" | "grid" | "orbit" | "type" | "wave" | "particles";
  objective?: string;
  tested?: string;
  result?: string;
  lesson?: string;
};
export const PLAYGROUND: PlaygroundModule[] = [
  {
    id: "p1",
    title: "PostgreSQL Indexing",
    tag: "Database",
    blurb: "Query optimization study.",
    variant: "grid",
    objective: "Explore how database indexes affect query plans and response time.",
  },
  {
    id: "p2",
    title: "Redis Pub/Sub",
    tag: "Systems",
    blurb: "Real-time message broker.",
    variant: "wave",
    objective: "Explore how Redis Pub/Sub can deliver messages to active subscribers.",
  },
  {
    id: "p3",
    title: "JWT Microservices",
    tag: "Auth",
    blurb: "Stateless authentication flows.",
    variant: "orbit",
    objective: "Explore how signed tokens can carry identity between separate services.",
  },
];

export const PERSONAL = {
  education: {
    degree: "B.Sc B.Ed Computer Science",
    institution: "Tagore Government College of Education",
    university: "Pondicherry University",
    period: "2022 — 2026",
  },
  tools: ["React", "TypeScript", "Next.js", "Node.js", "Express", "MongoDB", "Three.js", "Tailwind CSS"],
  exploring: "",
  fact: "",
};
