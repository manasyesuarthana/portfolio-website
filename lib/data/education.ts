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
    degree: "BSc. Computer Science with a Year in Industry",
    institution: "University of Birmingham",
    logo: "https://universitas21.com/wp-content/uploads/2018/04/1200px-BirminghamUniversityCrest.svg_-31f.png",
    period: "Sep 2025 - Jul 2028",
    achievements: [
      "GPA: Predicted Upper Second Class (2:1)",
      "Direct Entry to Year 2 via Dual Degree Scholarship."
    ]
  },
  {
    id: "edu-2",
    degree: "Bachelor of Computer Science",
    institution: "Gadjah Mada University",
    logo: "https://www.eduopinions.com/wp-content/uploads/2019/01/GadjahMadaUniversity-logo.jpg",
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
    logo: "https://cdn.creazilla.com/emojis/46760/white-question-mark-emoji-clipart-xl.png",
    period: "Not Started Yet.",
    achievements: [
      "Coming Soon...",
    ]
  }
];