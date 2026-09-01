// ---------------------------------------------------------------------------
//  Portfolio — content & data layer
// ---------------------------------------------------------------------------

export const SITE = {
  name: "DEEPANSHU YADAV",
  role: "Full Stack Developer",
  statement: "Building scalable web applications with engineering precision and design discipline.",
  email: "deepanshu4551@gmail.com",
  location: "India",
  availability: "Graduating 2026 · open to full-time roles",
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
  level: string;
  capabilities: string[];
  experience: string;
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
    label: "Frontend Systems",
    color: "79 214 255", // cyan
    nodes: [
      {
        name: "React",
        category: "Frontend Library",
        description: "Used for building scalable component-based interfaces with declarative paradigms.",
        projects: ["Portfolio", "Telemedicine Platform", "Student Management System"],
        level: "Advanced",
        capabilities: ["Component Architecture", "State Management", "Performance Optimization"],
        experience: "3+ Years",
      },
      {
        name: "Next.js",
        category: "React Framework",
        description: "Provides hybrid static & server rendering, smart routing, and seamless API integration.",
        projects: ["Portfolio", "Student Management System"],
        level: "Advanced",
        capabilities: ["Server Components", "App Router", "Static Site Generation"],
        experience: "3+ Years",
      },
      {
        name: "TypeScript",
        category: "Language",
        description: "Enforces strict type safety and object-oriented paradigms across the entire stack.",
        projects: ["Portfolio", "Telemedicine Platform", "Trading Bot"],
        level: "Advanced",
        capabilities: ["Static Typing", "Generics", "Interface Design"],
        experience: "3+ Years",
      },
      {
        name: "Tailwind",
        category: "Styling",
        description: "Utility-first CSS framework for rapid, highly customizable UI development.",
        projects: ["Portfolio", "Student Management System"],
        level: "Advanced",
        capabilities: ["Responsive Design", "Design Systems", "Animation"],
        experience: "3+ Years",
      }
    ],
  },
  {
    key: "backend",
    label: "Backend Systems",
    color: "93 242 192", // mint
    nodes: [
      {
        name: "Node.js",
        category: "Runtime Environment",
        description: "Event-driven, non-blocking I/O model for building highly scalable network applications.",
        projects: ["Telemedicine Platform", "Trading Bot"],
        level: "Advanced",
        capabilities: ["Event Loop", "Streams", "Asynchronous Processing"],
        experience: "3+ Years",
      },
      {
        name: "Express",
        category: "Web Framework",
        description: "Fast, unopinionated, minimalist web framework for Node.js.",
        projects: ["Telemedicine Platform", "Student Management System"],
        level: "Advanced",
        capabilities: ["Middleware Architecture", "Routing", "Error Handling"],
        experience: "3+ Years",
      },
      {
        name: "REST APIs",
        category: "Architecture",
        description: "Designing stateless, scalable, and secure communication protocols.",
        projects: ["Telemedicine Platform", "Student Management System", "Trading Bot"],
        level: "Advanced",
        capabilities: ["Resource Modeling", "Status Codes", "Rate Limiting"],
        experience: "3+ Years",
      },
      {
        name: "Authentication",
        category: "Security",
        description: "Implementing robust identity verification and access control systems.",
        projects: ["Telemedicine Platform", "Student Management System"],
        level: "Advanced",
        capabilities: ["JWT", "OAuth 2.0", "Role-Based Access Control"],
        experience: "3+ Years",
      }
    ],
  },
  {
    key: "database",
    label: "Database Systems",
    color: "139 123 255", // violet
    nodes: [
      {
        name: "PostgreSQL",
        category: "Relational Database",
        description: "Advanced, enterprise-class open source relational database with robust ACID compliance.",
        projects: ["Telemedicine Platform", "Portfolio"],
        level: "Advanced",
        capabilities: ["Complex Joins", "Indexing", "Transactions"],
        experience: "3+ Years",
      },
      {
        name: "MongoDB",
        category: "NoSQL Database",
        description: "Document-oriented database designed for flexible, scalable, and agile data storage.",
        projects: ["Student Management System"],
        level: "Intermediate",
        capabilities: ["Aggregation Pipeline", "Replication", "Document Modeling"],
        experience: "3+ Years",
      },
      {
        name: "Redis",
        category: "In-Memory Datastore",
        description: "Lightning-fast data structure server used as a database, cache, and message broker.",
        projects: ["Telemedicine Platform", "Trading Bot"],
        level: "Intermediate",
        capabilities: ["Caching Strategies", "Pub/Sub", "Session Management"],
        experience: "3+ Years",
      },
      {
        name: "Prisma",
        category: "ORM",
        description: "Next-generation Node.js and TypeScript ORM for safe, efficient database access.",
        projects: ["Portfolio", "Telemedicine Platform"],
        level: "Intermediate",
        capabilities: ["Schema Migration", "Type-safe Queries", "Data Modeling"],
        experience: "3+ Years",
      }
    ],
  },
  {
    key: "devops",
    label: "DevOps Systems",
    color: "255 180 87", // amber
    nodes: [
      {
        name: "Docker",
        category: "Containerization",
        description: "Isolating applications into standardized environments for consistent deployment.",
        projects: ["Telemedicine Platform", "Trading Bot"],
        level: "Intermediate",
        capabilities: ["Image Optimization", "Compose Orchestration", "Environment Parity"],
        experience: "3+ Years",
      },
      {
        name: "Nginx",
        category: "Web Server",
        description: "High-performance HTTP server and reverse proxy for load balancing.",
        projects: ["Telemedicine Platform", "Student Management System"],
        level: "Intermediate",
        capabilities: ["Reverse Proxying", "Load Balancing", "SSL Termination"],
        experience: "3+ Years",
      },
      {
        name: "CI/CD",
        category: "Delivery Pipeline",
        description: "Automating the testing and deployment lifecycle for rapid iteration.",
        projects: ["Portfolio", "Trading Bot"],
        level: "Advanced",
        capabilities: ["Automated Testing", "Deployment Automation", "Rollbacks"],
        experience: "3+ Years",
      },
      {
        name: "GitHub Actions",
        category: "Workflow Automation",
        description: "Native workflow engine for orchestrating CI/CD pipelines directly within GitHub.",
        projects: ["Portfolio", "Telemedicine Platform"],
        level: "Advanced",
        capabilities: ["Workflow Orchestration", "Custom Actions", "Matrix Builds"],
        experience: "3+ Years",
      }
    ],
  },
  {
    key: "ai",
    label: "AI Systems",
    color: "255 106 213", // magenta
    nodes: [
      {
        name: "OpenAI",
        category: "LLM Provider",
        description: "Integrating powerful generative capabilities through state-of-the-art foundation models.",
        projects: ["Trading Bot", "Portfolio"],
        level: "Advanced",
        capabilities: ["Prompt Engineering", "Function Calling", "Embeddings"],
        experience: "3+ Years",
      },
      {
        name: "Gemini",
        category: "LLM Provider",
        description: "Leveraging multimodal AI models for complex reasoning and contextual understanding.",
        projects: ["Portfolio"],
        level: "Intermediate",
        capabilities: ["Multimodal Processing", "Context Windows", "API Integration"],
        experience: "3+ Years",
      },
      {
        name: "AI Workflows",
        category: "System Architecture",
        description: "Designing agentic pipelines that sequence multiple LLM tasks autonomously.",
        projects: ["Trading Bot"],
        level: "Advanced",
        capabilities: ["Agentic Chains", "Memory Management", "Tool Use"],
        experience: "3+ Years",
      },
      {
        name: "RAG Systems",
        category: "Architecture",
        description: "Retrieval-Augmented Generation to ground LLM outputs in proprietary data.",
        projects: ["Telemedicine Platform"],
        level: "Intermediate",
        capabilities: ["Vector Search", "Chunking Strategies", "Knowledge Retrieval"],
        experience: "3+ Years",
      }
    ],
  },
  {
    key: "automation",
    label: "Automation Systems",
    color: "180 210 255", // light blue
    nodes: [
      {
        name: "Email Automation",
        category: "Communication",
        description: "Programmatic orchestration of transactional and marketing email sequences.",
        projects: ["Student Management System"],
        level: "Advanced",
        capabilities: ["SMTP Integration", "Template Rendering", "Deliverability Tracking"],
        experience: "3+ Years",
      },
      {
        name: "Integrations",
        category: "API Connectivity",
        description: "Stitching together disparate third-party services into cohesive workflows.",
        projects: ["Telemedicine Platform", "Trading Bot"],
        level: "Advanced",
        capabilities: ["OAuth Flows", "Webhooks", "Data Synchronization"],
        experience: "3+ Years",
      },
      {
        name: "Workflow Systems",
        category: "Orchestration",
        description: "Designing resilient state machines to handle long-running, multi-step processes.",
        projects: ["Trading Bot"],
        level: "Advanced",
        capabilities: ["State Machines", "Retry Logic", "Distributed Tracing"],
        experience: "3+ Years",
      },
      {
        name: "Python",
        category: "Language",
        description: "Versatile language utilized for scripting, data pipelines, and system automation.",
        projects: ["Trading Bot"],
        level: "Advanced",
        capabilities: ["Scripting", "Data Processing", "CLI Development"],
        experience: "3+ Years",
      }
    ],
  },
];

export type Environment = "crystal" | "liquid" | "holographic" | "landscape" | "signal";

export type Project = {
  id: string;
  title: string;
  category: string;
  year: string;
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
    year: "2024",
    summary: "A full-stack academic management platform built with the MERN stack to streamline student administration, attendance tracking, examination management, and report generation.",
    problem: "Educational institutions needed a centralized dashboard to replace scattered records.",
    architecture: "React Client -> Express API -> MongoDB",
    stack: ["React", "Node.js", "Express", "MongoDB", "Tailwind CSS"],
    outcome: "Unified academic workflows into a single dashboard.",
    technicalDecisions: "Adopted MongoDB to easily handle the flexible schema of student electives.",
    image: "/projects/stumansys.png",
    imageMode: "cover",
    environment: "holographic",
    accent: "79 214 255",
    accent2: "93 242 192",
    repo: "https://github.com/DeepanshuAI/Student-Management-System",
    href: "https://student-management-system-opal-sigma.vercel.app/"
  },
  {
    id: "kairos",
    title: "Kairos",
    category: "Web Application",
    year: "2024",
    summary: "A modern React application built for high performance and seamless user experience.",
    problem: "Needed a scalable frontend architecture.",
    architecture: "React + Vite + TypeScript",
    stack: ["React", "TypeScript", "Vite", "Tailwind CSS"],
    outcome: "Delivered a highly responsive user interface.",
    technicalDecisions: "Utilized Vite for lightning-fast HMR and optimized production builds.",
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
    year: "2024",
    summary: "A premium, high-conversion SaaS web application designed for automated enterprise workflow orchestrations. Delivers zero-latency interactive flow simulations and rich glassmorphic aesthetics.",
    problem: "Enterprise workflows required an accessible, high-performance orchestration builder.",
    architecture: "React 18 -> Vite 6 -> Framer Motion",
    stack: ["React", "Vite", "Tailwind CSS", "Framer Motion"],
    outcome: "Achieved strict WAI-ARIA 1.2 compliance and rich interactive workflows.",
    technicalDecisions: "Implemented a dynamic head engine for SEO and hardware-accelerated GPU transitions with reduced motion compliance.",
    image: "/projects/flowpilot.png",
    imageMode: "cover",
    environment: "signal",
    accent: "93 242 192",
    accent2: "79 214 255",
    repo: "https://github.com/DeepanshuAI/FlowPilot",
    href: "https://flow-pilot-pi.vercel.app/"
  }
];

export type DesignThinkingStep = {
  key: string;
  label: string;
  title: string;
  body: string;
  visual: "question" | "sketch" | "wireframe" | "system" | "shipped";
};
export type ArchitecturalPivot = {
  title: string;
  summary: string;
  initialApproach: string;
  whyItFailed: string;
  finalDecision: string;
  result: string;
  architectureBefore: string[];
  architectureAfter: string[];
};

export const DESIGN_THINKING = {
  eyebrow: "03 — Method",
  lead: "System architecture is just design thinking applied to code.",
  body: "The same rigor used to resolve a user interface must be applied to the backend infrastructure.",
  anchor: "stumansys",
  anchorLabel: "Worked through on StuManSys",
  steps: [
    {
      key: "frame",
      label: "Frame",
      title: "Identify the critical path",
      body: "Before defining database schemas, we mapped the exact queries the administration runs daily.",
      visual: "question",
    },
    {
      key: "explore",
      label: "Explore",
      title: "Data model iterations",
      body: "Testing relational vs document structures against the access patterns of the application.",
      visual: "sketch",
    },
    {
      key: "structure",
      label: "Structure",
      title: "API Contracts",
      body: "Establishing strict JSON payloads and REST constraints before touching the frontend.",
      visual: "wireframe",
    },
    {
      key: "system",
      label: "Systemise",
      title: "Reusable services",
      body: "Abstracting business logic away from controllers so it can be tested in isolation.",
      visual: "system",
    },
    {
      key: "resolve",
      label: "Resolve",
      title: "Deploy & Monitor",
      body: "Shipping to production with adequate logging and error boundaries to catch edge cases.",
      visual: "shipped",
    },
  ] as DesignThinkingStep[],
  pivotsTitle: "Architectural Pivots",
  pivotsNote: "Engineering decisions are about trade-offs. Here is why we changed course.",
  pivots: [
    {
      title: "Monolithic State",
      summary: "Replacing Redux with React Query",
      initialApproach: "Hold all student records in a global Redux store.",
      whyItFailed: "Caused data staleness and unnecessary re-renders on the client.",
      finalDecision: "Scrapped Redux for React Query to ensure data freshness and cache invalidation.",
      result: "Guaranteed data freshness and reduced client memory usage.",
      architectureBefore: ["Component", "Redux Store", "UI"],
      architectureAfter: ["Component", "React Query", "API", "Database"],
    },
    {
      title: "Client-side Generation",
      summary: "Offloading PDF generation to a worker",
      initialApproach: "Generate report card PDFs entirely on the client-side.",
      whyItFailed: "Too heavy on low-end devices, causing browser crashes and UI freezes.",
      finalDecision: "Moved report card generation to a Node.js background worker.",
      result: "Zero client blocking and faster, more reliable PDF generation.",
      architectureBefore: ["Client", "PDF Builder", "Browser Download"],
      architectureAfter: ["Client", "API", "Node.js Worker", "PDF Storage"],
    }
  ] as ArchitecturalPivot[],
};

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
    output: "Validated builds",
    artifact: "/process/test.jpg",
  },
  {
    key: "ship",
    label: "Ship",
    blurb: "The final form becomes stable. Coherent finished system.",
    question: "Is it ready for production?",
    output: "Live application",
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
    objective: "Understand the performance impact of B-Tree indices on million-row tables.",
  },
  {
    id: "p2",
    title: "Redis Pub/Sub",
    tag: "Systems",
    blurb: "Real-time message broker.",
    variant: "wave",
    objective: "Implement a low-latency chat service using Redis as the central event bus.",
  },
  {
    id: "p3",
    title: "JWT Microservices",
    tag: "Auth",
    blurb: "Stateless authentication flows.",
    variant: "orbit",
    objective: "Secure communications between multiple independent services.",
  },
];

export const PERSONAL = {
  education: {
    degree: "B.Sc B.Ed Computer Science",
    institution: "Tagore Government College of Education",
    university: "Pondicherry University",
    period: "2022 — 2026",
  },
  tools: ["Docker", "PostgreSQL", "Next.js", "Git Actions", "Redis", "TypeScript"],
  exploring: "Distributed systems, Rust, and advanced CI/CD pipelines.",
  fact: "I treat infrastructure as code and design as a system.",
};
