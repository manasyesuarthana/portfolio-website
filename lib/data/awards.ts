export interface AwardItem {
    id: string;
    title: string;
    issuer: string;
    date: string;
    description: string;
    icon?: string;
}

export const awards: AwardItem[] = [
    {
        id: "award-1",
        title: "Dual Degree Scholarship",
        issuer: "Gadjah Mada University",
        date: "2025",
        description: "Awarded a partial scholarship to pursue a dual degree program at the University of Birmingham, United Kingdom, in collaboration with Gadjah Mada University.",
        icon: "🎓"
    },
    {
        id: "award-2",
        title: "1st Place in LIGA KOMATIK CTF 2025",
        issuer: "Information Technology Student Community (KOMATIK) of Gadjah Mada University",
        date: "2025",
        description: "Achieved 1st Place at the university level LIGA KOMATIK 2025 CTF, a selection process for students from Information Technology fields to select the top 10 teams to join GEMASTIK, a prestigious national level IT competition hosted by the government.",
        icon: "🥇"
    },
    {
        id: "award-3",
        title: "3rd Place at FIK CUP CTF",
        issuer: "Computer Club of Batam International University",
        date: "2025",
        description: "Achieved third place at the national level FIK CUP 2025 CTF hosted by the Computer Club (community) of International Batam University (UIB)",
        icon: "🥉"
    },
    {
        id: "award-4",
        title: "Top 10 INTECHFEST CTF",
        issuer: "Computer Club at Bali State Polytechnic (PNB)",
        date: "2025",
        description: "Placed Top 10 out of 100+ teams at the national level INTECHFEST CTF hosted by Computer Club at Bali State Polytechnic, competing against some of the best hackers in Indonesia.",
        icon: "🏆"
    },
    {
        id: "award-5",
        title: "Best Staff",
        issuer: "Student Executive Board of Information Technology Student Community (BEM KOMATIK UGM)",
        date: "2024",
        description: "Awarded 'Best Staff' for outstanding contribution, leadership, and dedication during the 2023/2024 term, recognized for excellence in teamwork and organizational impact.",
        icon: "🎖️"
    },
    {
        id: "award-6",
        title: "Valedictorian High School Graduate",
        issuer: "Sekolah Lentera Kasih Bali",
        date: "2023",
        description: "Graduated as Valedictorian of the 2023 batch, recognized for academic excellence and overall contribution to the school community.",
        icon: "🎓"
    }
];
