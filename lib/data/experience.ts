export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  logo: string;
  period: string;
  highlights: string[];
}

export const experience: ExperienceItem[] = [
  {
    id: "exp-1",
    role: "Undergraduate Research Assistant",
    company: "Computer Systems and Networks Lab, Gadjah Mada University",
    logo: "/logos/tech-company.png",
    period: "Jul 2025 - Oct 2025",
    highlights: [
      "Led development of microservices architecture serving 1M+ users",
      "Reduced API response time by 60% through optimization",
      "Mentored team of 5 junior developers"
    ]
  },
  {
    id: "exp-2",
    role: "Full Stack Developer",
    company: "Digital Agency",
    logo: "/logos/digital-agency.png",
    period: "2021 - 2023",
    highlights: [
      "Built 15+ client projects using React and Node.js",
      "Implemented CI/CD pipelines reducing deployment time by 40%",
      "Designed scalable database architectures"
    ]
  },
  {
    id: "exp-3",
    role: "Full Stack Developer",
    company: "Digital Agency",
    logo: "/logos/digital-agency.png",
    period: "2021 - 2023",
    highlights: [
      "Built 15+ client projects using React and Node.js",
      "Implemented CI/CD pipelines reducing deployment time by 40%",
      "Designed scalable database architectures"
    ]
  },
  {
    id: "exp-4",
    role: "Full Stack Developer",
    company: "Digital Agency",
    logo: "/logos/digital-agency.png",
    period: "2021 - 2023",
    highlights: [
      "Built 15+ client projects using React and Node.js",
      "Implemented CI/CD pipelines reducing deployment time by 40%",
      "Designed scalable database architectures"
    ]
  }
];