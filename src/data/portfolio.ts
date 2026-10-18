// ===========================================
// PORTFOLIO DATA - Edit this file to update content
// ===========================================

export const personalInfo = {
  name: "Devansh Singh",
  role: "Software engineer and academic reviewer",
  intro:
    "Computer engineering undergraduate and R&D intern at CSIR National Chemical Laboratory. I write systems software, publish with IEEE, and ship open-source tools.",
  email: "devansh.jay.singh@gmail.com",
  phone: "+91 9819425968",
  location: "Pune, India",
  timeZone: "Asia/Kolkata",
  resumeUrl: "/resume.pdf",
  resumeFile: "Devansh_Singh_Resume.pdf",
  resumeUpdated: "October 2026",
  social: {
    github: "https://github.com/Devansh-567/",
    linkedin: "https://linkedin.com/in/devansh050607",
    leetcode: "https://leetcode.com/u/1xUONXAkwR/",
  },
};

// Film chapters, in page order. `id` matches the section element id.
export const chapters = [
  { id: "top", numeral: "I", title: "Prologue", nav: "Home" },
  { id: "about", numeral: "II", title: "Origins", nav: "About" },
  { id: "experience", numeral: "III", title: "The record", nav: "Experience" },
  { id: "projects", numeral: "IV", title: "The work", nav: "Work" },
  { id: "publications", numeral: "V", title: "The papers", nav: "Publications" },
  { id: "achievements", numeral: "VI", title: "The cabinet", nav: "Honors" },
  { id: "media", numeral: "VII", title: "In print", nav: "Press" },
  { id: "education", numeral: "VIII", title: "Foundations", nav: "Education" },
  { id: "contact", numeral: "IX", title: "Say hello", nav: "Contact" },
];

// ---------- Achievements -----------------------------------------------
// tier: gold = first place, silver = first runner-up, bronze = second runner-up,
// platinum = special award. kind: hackathon | event.
export const achievements = [
  { id: 1, title: "HackSphere", result: "Second runner-up", tier: "bronze", kind: "hackathon", level: "Global", year: "2025",
    link: "https://www.linkedin.com/posts/devansh050607_hacksphere-devpost-hackathonwinner-activity-7384235274232283136-FWsm?utm_source=share&utm_medium=member_desktop&rcm=ACoAAFLC2hUBahpd1br1qCrzUUAdj3kDO33YNTo" },
  { id: 2, title: "Inceptia", result: "First runner-up", tier: "silver", kind: "hackathon", level: "Global", year: "2025",
    link: "https://www.linkedin.com/feed/update/urn:li:activity:7347615118798540800?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_honors_details%3BBApmnCdHRxKhkMGLKC8eCQ%3D%3D" },
  { id: 3, title: "NITK Karnataka, Bytes for Bharat", result: "Special recognition", tier: "platinum", kind: "hackathon", level: "National", year: "2025",
    link: "https://www.linkedin.com/in/devansh050607/details/honors/1762746461408/single-media-viewer?type=IMAGE&profileId=ACoAAFLC2hUBahpd1br1qCrzUUAdj3kDO33YNTo&lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_honors_details%3BBApmnCdHRxKhkMGLKC8eCQ%3D%3D" },
  { id: 4, title: "Hacktoberfest National Hackathon", result: "Winner", tier: "gold", kind: "hackathon", level: "National", year: "2025",
    link: "https://www.linkedin.com/in/devansh050607/details/honors/1763023972053/single-media-viewer?type=IMAGE&profileId=ACoAAFLC2hUBahpd1br1qCrzUUAdj3kDO33YNTo&lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_honors_details%3BBApmnCdHRxKhkMGLKC8eCQ%3D%3D" },
  { id: 5, title: "TENET", result: "Second runner-up", tier: "bronze", kind: "hackathon", level: "National", year: "2025",
    link: "https://www.linkedin.com/feed/update/urn:li:activity:7382841796680364032?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_honors_details%3BBApmnCdHRxKhkMGLKC8eCQ%3D%3D" },
  { id: 6, title: "20th Engineering Today Hackathon", result: "Winner", tier: "gold", kind: "hackathon", level: "National", year: "2025",
    link: "https://www.linkedin.com/feed/update/urn:li:activity:7378786613503455232?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_honors_details%3B4w%2B0bwoTRO%2BBMMz%2BLFOWGA%3D%3D" },
  { id: 7, title: "Techathon 2.0, Shri Ratan Tata Best Innovation Award", result: "First place", tier: "platinum", kind: "hackathon", level: "National", year: "2025",
    link: "https://www.linkedin.com/feed/update/urn:li:activity:7299711533629022208?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_honors_details%3BBApmnCdHRxKhkMGLKC8eCQ%3D%3D" },
  { id: 8, title: "CyberKavach National Cyber Festival", result: "Winner", tier: "gold", kind: "event", level: "National", year: "2025",
    link: "https://www.linkedin.com/feed/update/urn:li:activity:7377912440891748352?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_honors_details%3BBApmnCdHRxKhkMGLKC8eCQ%3D%3D" },
  { id: 9, title: "NextGen Solutions", result: "First runner-up", tier: "silver", kind: "event", level: "National", year: "2025",
    link: "https://www.linkedin.com/feed/update/urn:li:activity:7327042579408007169?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_honors_details%3BBApmnCdHRxKhkMGLKC8eCQ%3D%3D" },
  { id: 10, title: "Convene", result: "First runner-up", tier: "silver", kind: "event", level: "National", year: "2025",
    link: "https://www.linkedin.com/feed/update/urn:li:activity:7318856029138472960?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_honors_details%3BBApmnCdHRxKhkMGLKC8eCQ%3D%3D" },
  { id: 11, title: "Tantraudgama 2.0", result: "First runner-up", tier: "silver", kind: "event", level: "National", year: "2025",
    link: "https://www.linkedin.com/feed/update/urn:li:activity:7308907082072670208?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_honors_details%3BBApmnCdHRxKhkMGLKC8eCQ%3D%3D" },
  { id: 12, title: "TechUtsav", result: "First runner-up", tier: "silver", kind: "event", level: "National", year: "2025",
    link: "https://www.linkedin.com/feed/update/urn:li:activity:7317081117650558976?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_honors_details%3BBApmnCdHRxKhkMGLKC8eCQ%3D%3D" },
  { id: 13, title: "Drone Innovation Challenge", result: "Winner", tier: "gold", kind: "event", level: "State", year: "2024",
    link: "https://www.linkedin.com/in/devansh050607/details/honors/1760277293520/single-media-viewer?type=IMAGE&profileId=ACoAAFLC2hUBahpd1br1qCrzUUAdj3kDO33YNTo&lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_honors_details%3BBApmnCdHRxKhkMGLKC8eCQ%3D%3D" },
  { id: 14, title: "InterCollegiate Hackathon", result: "Winner", tier: "gold", kind: "hackathon", level: "State", year: "2024", link: "" },
] as const;

export const medalImage: Record<string, string> = {
  gold: "/assets/media/medals/gold.png",
  silver: "/assets/media/medals/silver.png",
  bronze: "/assets/media/medals/bronze.png",
  platinum: "/assets/media/medals/platinum.png",
};

// Counts are derived from the list above so they can never drift from it.
const count = (f: (a: (typeof achievements)[number]) => boolean) => achievements.filter(f).length;
export const honorCounts = {
  total: achievements.length,
  hackathons: count((a) => a.kind === "hackathon"),
  events: count((a) => a.kind === "event"),
  firstPlaces: count((a) => a.result === "Winner" || a.result === "First place"),
  global: count((a) => a.level === "Global"),
  gold: count((a) => a.tier === "gold"),
  silver: count((a) => a.tier === "silver"),
  bronze: count((a) => a.tier === "bronze"),
  platinum: count((a) => a.tier === "platinum"),
};

// ---------- Publications ------------------------------------------------
export const publications = [
  { id: 1, group: "IEEE 3ICT 2025", title: "Delta Encoding and Predictive Modeling for Lossy Time-Series Compression Using Adaptive Linear Updates", venue: "IEEE Xplore", year: "2025", link: "https://ieeexplore.ieee.org/document/11368175", logo: "/assets/media/paper/ieee.png" },
  { id: 2, group: "IEEE 3ICT 2025", title: "DMS4096+: Enhancing Cryptographic Strength and Efficiency through Advanced Key Generation", venue: "IEEE Xplore", year: "2025", link: "https://ieeexplore.ieee.org/document/11290566", logo: "/assets/media/paper/ieee.png" },
  { id: 3, group: "IEEE 3ICT 2025", title: "SMEE: Self-Mutating AES-GCM Framework for Adaptive Encryption", venue: "IEEE Xplore", year: "2025", link: "https://ieeexplore.ieee.org/document/11367979", logo: "/assets/media/paper/ieee.png" },
  { id: 4, group: "IEEE 3ICT 2025", title: "Parallel Task Scheduling and Dynamic Offloading for Deep Learning and Matrix Computation: APTOS Framework", venue: "IEEE Xplore", year: "2025", link: "https://ieeexplore.ieee.org/document/11368305", logo: "/assets/media/paper/ieee.png" },
  { id: 5, group: "Journals", title: "Sentinel Adornments: IoT Integrated Smart Jewelry for Augmented Women's Safety", venue: "Journal of Emerging Technologies and Innovative Research", year: "2025", link: "https://www.jetir.org/papers/JETIRHA06005.pdf", logo: "/assets/media/paper/jetir.png" },
  { id: 6, group: "Journals", title: "Enhancing Defence Capabilities of UAV Systems by Integrating Mini Drones with Explosive Payloads (Idea Paper)", venue: "International Journal of Current Science", year: "2025", link: "https://rjpn.org/ijcspub/papers/IJCSP25B1057.pdf", logo: "/assets/media/paper/ijcspub.png" },
  { id: 7, group: "Journals", title: "DMS4096: A Novel Approach For Secure Data Encryption in Cache-Augmented Systems", venue: "International Journal of Current Science", year: "2025", link: "https://rjpn.org/ijcspub/papers/IJCSP25B1020.pdf", logo: "/assets/media/paper/ijcspub.png" },
];

// ---------- Experience --------------------------------------------------
// Dates are year-month; `end` is inclusive. Logos load from /public and fall
// back to a monogram if the file is missing.
export const organizations = [
  {
    id: "uob",
    name: "University of Bahrain",
    short: "Univ. of Bahrain",
    logo: "/assets/media/job/uob.png",
    summary:
      "Peer reviewer for IEEE conferences organised through the University of Bahrain. Each term meant reading submissions for originality, technical rigor and reproducibility, and writing feedback authors could act on.",
    roles: [
      { id: "3ict25", chart: "3ICT 2025", title: "Peer reviewer, IEEE 3ICT 2025", focus: "Information and communication technology", start: "2025-09", end: "2025-11", when: "September 2025 to November 2025", mode: "Remote, part time" },
      { id: "fet26", chart: "FET 2026", title: "Peer reviewer, IEEE FET 2026", focus: "Frontiers in engineering and technology", start: "2026-01", end: "2026-03", when: "January 2026 to March 2026", mode: "Remote, part time" },
      { id: "mobi26", chart: "MobiApps 2026", title: "Peer reviewer, IEEE MobiApps 2026", focus: "Mobile apps and open networks", start: "2026-03", end: "2026-07", when: "March 2026 to July 2026", mode: "Remote, part time" },
      { id: "3ict26", chart: "3ICT 2026", title: "Peer reviewer, IEEE 3ICT 2026", focus: "Information and communication technology", start: "2026-07", end: "2026-09", when: "July 2026 to September 2026", mode: "Remote, part time" },
    ],
  },
  {
    id: "cubane",
    name: "Cubane",
    short: "Cubane",
    logo: "/assets/media/job/cubane.png",
    summary: "A three-month internship in software development engineering, serving as team lead for the intern cohort.",
    roles: [
      { id: "cubane", chart: "Cubane", title: "Software development engineering intern and team lead", focus: "Software engineering and leadership", start: "2026-06", end: "2026-09", when: "June 2026 to September 2026", mode: "Three-month internship" },
    ],
  },
  {
    id: "ncl",
    name: "CSIR National Chemical Laboratory",
    short: "CSIR NCL",
    logo: "/assets/media/job/csir-ncl.png",
    summary: "A six-month research and development internship at CSIR-NCL, working on site at the NCL campus in Pune.",
    roles: [
      { id: "ncl", chart: "CSIR NCL", title: "Research and development intern", focus: "Computational systems and research", start: "2026-08", end: "2027-01", when: "August 2026 to January 2027", mode: "On site, NCL campus, Pune", current: true },
    ],
  },
];

// ---------- Projects ----------------------------------------------------
export const projects = {
  chronomap: {
    title: "ChronoMap",
    tagline: "A key-value store that remembers every version of itself.",
    description:
      "A production-ready Python library for time-versioned data management, with rollback, audit trails and persistent storage. Built for concurrency with async I/O and thread-safe locking, it cut latency by 35% and holds 95% test coverage.",
    facts: [
      { value: "50,000+", label: "downloads on PyPI" },
      { value: "35%", label: "lower latency" },
      { value: "95%", label: "test coverage" },
    ],
    tech: ["Python", "Asyncio", "Threading", "PyTest", "JSON", "Pickle"],
    install: "pip install chronomap",
    link: "https://pypi.org/project/chronomap/",
    github: "https://github.com/Devansh-567/",
    logo: "/assets/media/projects/chronomap.png",
  },
  flytora: {
    title: "Flytora",
    tagline: "Type fast, fly high, never stop.",
    description:
      "A browser game where every word you type makes a bird flap through the next gap in the wall. Classic, Sprint and Survival modes, four difficulties, live words-per-minute tracking and a global leaderboard, all drawn on plain HTML5 Canvas with no framework.",
    facts: [
      { value: "3", label: "game modes" },
      { value: "4", label: "difficulties" },
      { value: "0", label: "frameworks" },
    ],
    tech: ["JavaScript", "HTML5 Canvas", "Firebase", "CSS"],
    link: "https://flytora.com",
    feedback: "play.flytora@gmail.com",
    logo: "/assets/media/projects/flytora.png",
  },
};

// ---------- Education ---------------------------------------------------
export const education = {
  institution: "G.H. Raisoni International Skill Tech University",
  place: "Pune",
  degree: "Bachelor of Technology in Computer Engineering",
  duration: "2024 to 2028 (expected)",
  logo: "/assets/media/education/ghristu.png",
  coursework: ["Algorithms", "Computer architecture", "Machine learning", "Computer networks"],
};

// ---------- Press -------------------------------------------------------
export const media = [
  { id: 1, outlet: "Navrashtra", date: "July 2025", image: "/assets/media/news/1.jpeg", link: "https://www.linkedin.com/in/devansh050607/details/honors/1752993464055/single-media-viewer?type=IMAGE&profileId=ACoAAFLC2hUBahpd1br1qCrzUUAdj3kDO33YNTo&lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_honors_details%3BSBJ0n5ulSuevz%2FGQVoyRLg%3D%3D" },
  { id: 2, outlet: "Prabhat", date: "July 2025", image: "/assets/media/news/2.jpeg", link: "https://www.linkedin.com/in/devansh050607/details/honors/1752990929655/single-media-viewer?type=IMAGE&profileId=ACoAAFLC2hUBahpd1br1qCrzUUAdj3kDO33YNTo&lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_honors_details%3BTrG67U5%2FRMS5b1AnLEX%2Flg%3D%3D" },
  { id: 3, outlet: "Navbharat", date: "March 2025", image: "/assets/media/news/3.jpeg", link: "https://www.linkedin.com/in/devansh050607/details/honors/1744700924186/single-media-viewer?type=IMAGE&profileId=ACoAAFLC2hUBahpd1br1qCrzUUAdj3kDO33YNTo&lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_honors_details%3BTrG67U5%2FRMS5b1AnLEX%2Flg%3D%3D" },
  { id: 4, outlet: "Navrashtra", date: "March 2025", image: "/assets/media/news/4.jpeg", link: "https://www.linkedin.com/in/devansh050607/details/honors/1752991143040/single-media-viewer?type=IMAGE&profileId=ACoAAFLC2hUBahpd1br1qCrzUUAdj3kDO33YNTo&lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_honors_details%3B0O6VpVEkTYaWMhDJEScX6w%3D%3D" },
];

export const stack = [
  { group: "Languages", items: "C, C++, Python, JavaScript, TypeScript" },
  { group: "Backend", items: "Node.js, FastAPI, Django, Socket.io" },
  { group: "Frontend", items: "Next.js, React, TailwindCSS" },
  { group: "Cloud and DevOps", items: "AWS, Docker, GitHub Actions, Cloudflare, Supabase" },
  { group: "Databases", items: "PostgreSQL, MySQL, Prisma ORM" },
];
