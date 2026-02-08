export interface EducationItem {
  id: string;
  degree: string;
  institution: string;
  logo: string;
  period: string;
  achievements: string[];
}

export const education: EducationItem[] = [
  {
    id: "edu-1",
    degree: "BSc. Computer Science",
    institution: "University of Birmingham",
    logo: "/logos/UoB_Logo.png",
    period: "Sep 2025 - Present",
    achievements: [
      "GPA: Predicted Upper Second Class (2:1)",
      "Direct Entry to Year 2 via Dual Degree Scholarship."
    ]
  },
  {
    id: "edu-2",
    degree: "Bachelor of Computer Science",
    institution: "Gadjah Mada University",
    logo: "/logos/GadjahMadaUniversity-logo.jpg",
    period: "Jul 2023 - Jul 2025",
    achievements: [
      "CGPA: 3.92/4.00",
      "Volunteered in 4 different student organizations, taking on leadership roles in 2 of them."
    ]
  },
  {
    id: "Coming Soon...",
    degree: "Master's Degree",
    institution: "Coming Soon...",
    logo: "/logos/question-mark.png",
    period: "Not Started Yet.",
    achievements: [
      "Coming Soon...",
    ]
  }
];