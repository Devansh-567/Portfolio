// ===========================================
// PORTFOLIO DATA - Edit this file to update content
// ===========================================

export const personalInfo = {
  name: "Devansh Singh",
  tagline: "Building thoughtful software with precision and purpose.",
  description: "Engineer. Researcher. Problem solver.",
  email: "devansh@example.com",
  location: "India",
  resumeUrl: "/resume.pdf",
  social: {
    github: "https://github.com/devansh",
    linkedin: "https://linkedin.com/in/devansh",
    leetcode: "https://leetcode.com/devansh",
  },
};

export const about = {
  paragraphs: [
    "I approach engineering the way an architect approaches space — with intention, restraint, and a deep respect for the problems worth solving. Every line of code is a decision, and I believe in making each one count.",
    "My work spans across systems design, machine learning research, and building products that serve real human needs. I'm drawn to complexity, but I aim for simplicity in execution.",
    "When I'm not coding, I'm likely reading about distributed systems, exploring new research papers, or thinking about how technology can be more humane.",
  ],
};

export const experiences = [
  {
    id: 1,
    company: "TechCorp Innovation Labs",
    role: "Software Engineer",
    duration: "2023 — Present",
    description: [
      "Architected and deployed a real-time data processing pipeline handling 10M+ events daily",
      "Led the migration of legacy services to a microservices architecture, reducing latency by 40%",
      "Mentored junior engineers and established code review practices across the team",
    ],
  },
  {
    id: 2,
    company: "Research Institute",
    role: "Research Assistant",
    duration: "2022 — 2023",
    description: [
      "Published research on novel approaches to natural language understanding",
      "Developed experimental frameworks for evaluating ML model robustness",
      "Collaborated with cross-functional teams on interdisciplinary research projects",
    ],
  },
  {
    id: 3,
    company: "StartupXYZ",
    role: "Software Engineering Intern",
    duration: "Summer 2022",
    description: [
      "Built core features for the company's flagship product, serving 50K+ users",
      "Optimized database queries resulting in 3x improvement in response times",
      "Contributed to open-source tooling used across the organization",
    ],
  },
];

export const achievements = [
  {
    id: 1,
    title: "ACM ICPC Regional Finalist",
    description: "Ranked among top 50 teams in the regional programming contest",
    year: "2023",
  },
  {
    id: 2,
    title: "Google Code Jam",
    description: "Advanced to Round 3, top 3% globally",
    year: "2023",
  },
  {
    id: 3,
    title: "National Science Olympiad",
    description: "Gold medalist in Computer Science category",
    year: "2022",
  },
  {
    id: 4,
    title: "University Research Grant",
    description: "Awarded funding for independent ML research project",
    year: "2022",
  },
];

export const publications = [
  {
    id: 1,
    title: "Efficient Attention Mechanisms for Long-Form Document Understanding",
    venue: "Conference on Neural Information Processing Systems (NeurIPS)",
    year: "2023",
    link: "https://arxiv.org/example",
  },
  {
    id: 2,
    title: "A Survey on Robustness in Large Language Models",
    venue: "Journal of Machine Learning Research",
    year: "2023",
    link: "https://arxiv.org/example2",
  },
];

export const projects = [
  {
    id: 1,
    title: "Distributed Task Scheduler",
    description: "A fault-tolerant, horizontally scalable task scheduling system built for high-throughput workloads. Handles millions of scheduled jobs with sub-second precision.",
    tech: ["Go", "Redis", "PostgreSQL", "gRPC"],
    github: "https://github.com/example/scheduler",
    live: "https://scheduler-demo.example.com",
    featured: true,
  },
  {
    id: 2,
    title: "Neural Document Parser",
    description: "ML-powered document understanding system that extracts structured data from unstructured documents with 95%+ accuracy.",
    tech: ["Python", "PyTorch", "FastAPI", "Docker"],
    github: "https://github.com/example/docparser",
    featured: true,
  },
  {
    id: 3,
    title: "Real-time Collaboration Engine",
    description: "WebSocket-based real-time collaboration infrastructure supporting concurrent editing and presence awareness.",
    tech: ["TypeScript", "Node.js", "WebSocket", "CRDT"],
    github: "https://github.com/example/collab",
    live: "https://collab-demo.example.com",
    featured: true,
  },
  {
    id: 4,
    title: "CLI Performance Monitor",
    description: "Terminal-based system monitoring tool with real-time metrics visualization and alerting capabilities.",
    tech: ["Rust", "TUI", "Prometheus"],
    github: "https://github.com/example/perfmon",
    featured: false,
  },
];

export const education = [
  {
    id: 1,
    institution: "Indian Institute of Technology",
    degree: "Bachelor of Technology in Computer Science",
    duration: "2020 — 2024",
    coursework: ["Algorithms", "Distributed Systems", "Machine Learning", "Computer Networks"],
    honors: "Dean's List, All Semesters",
  },
];

export const certifications = [
  {
    id: 1,
    name: "AWS Solutions Architect – Associate",
    issuer: "Amazon Web Services",
    year: "2023",
    link: "https://aws.amazon.com/verification",
  },
  {
    id: 2,
    name: "TensorFlow Developer Certificate",
    issuer: "Google",
    year: "2023",
    link: "https://tensorflow.org/certificate",
  },
  {
    id: 3,
    name: "Kubernetes Administrator (CKA)",
    issuer: "Cloud Native Computing Foundation",
    year: "2022",
    link: "https://cncf.io/certification",
  },
];

export const navigation = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "publications", label: "Publications" },
  { id: "achievements", label: "Achievements" },
  { id: "education", label: "Education" },
  { id: "contact", label: "Contact" },
];
