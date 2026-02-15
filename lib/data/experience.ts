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
    logo: "",
    period: "Jul 2025 - Oct 2025",
    highlights: [
      "Performed detailed performance analysis on an encryption algorithm under supervisor guidance, applying analytical skills to evaluate bottlenecks and implement proposed optimizations, resulting in a 100 percent improvement in system throughput.",
      "Collaborated with a team of 10 students and 5 professors, doing weekly standups and getting feedback, continuously improving progress by gaining insights for alternatives approaches and implementations.",
    ]
  },
  {
    id: "exp-2",
    role: "Core Team - Activation (Technical Project Manager)",
    company: "Google Developer Groups on Campus, Gadjah Mada University",
    logo: "",
    period: "Oct 2024 - Aug 2025",
    highlights: [
      "Coordinated with 20 Core Team members to deliver technical learning experiences for 60+ community members.",
      "Planned, organized, and executed 10 community events and 1 large company visit to Jakarta, visiting 2 of the biggest companies in Indonesia (Blibli & BRI).",
      "Managed and maintained a Google Events Manager Platform called Bevy to host, publish and share information for 10+ events to 500+ users."
    ]
  },
  {
    id: "exp-3",
    role: "Member & Vice Head of Gadjah Mada Cyber Alliance",
    company: "KOMATIK UGM (Information Technology Student Community, Gadjah Mada University)",
    logo: "",
    period: "Feb 2024 - Aug 2025",
    highlights: [
      "Analyzed security gaps in web applications and delivered structured presentations during weekly training sessions to teach common web vulnerabilities to 50+ community members, enhancing team-wide understanding of secure development practices.",
      "Coached members on System Architecture and Linux networking during weekly workshops, leading collaboration among 5+ senior and 10+ junior students by assigning tasks, managing timelines, and coordinating curriculum development to ensure consistent knowledge delivery."
    ]
  },
  {
    id: "exp-4",
    role: "Committee Member of Cybersecurity",
    company: "OmahTI UGM",
    logo: "",
    period: "Feb 2024 - Aug 2025",
    highlights: [
      "Participated and taught in 6 weekly Cybersecurity training focusing in different areas of security such as web vulnerabilities, operating system vulnerabilities, reverse engineering, cryptography and digital forensics.",
      "Assist other members/staff who are new to CTFs by teaching them about general concepts of Cybersecurity, covering topics such as Linux, Web Applications, and Basics in Networking.",
    ]
  },
  {
    id: "exp-5",
    role: "Member of Bureau of Organizational Development",
    company: "BEM KM FMIPA UGM (Student Council of Faculty of Mathematics and Natural Sciences, Gadjah Mada University)",
    logo: "",
    period: "Sep 2023 - Dec 2024",
    highlights: [
      "Conducted a total of 20+ weekly evaluations with representatives from other ministers/bureaus to assess progress on active and upcoming programs and events.",
      "Carried out assessments on a total of 20 events or programs from 9 different ministries/bureaus, leading an annual mid year event called “Evaluasi Tengah Tahun/Survei Tengah Tahun”, an organization wide meeting to discuss the progress, achievements, and future plans or improvements for each ministry/bureau."
    ]
  }
];