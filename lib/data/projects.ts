export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  github?: string;
  demo?: string;
  featured: boolean;
}

export const projects: Project[] = [
  {
    id: "project-1",
    title: "3D Portfolio Website",
    description: "Interactive portfolio with 3D galaxy background and smooth animations",
    image: "/projects/portfolio.png",
    tags: ["Next.js", "Three.js", "React", "TypeScript"],
    github: "https://github.com",
    demo: "https://demo.com",
    featured: true
  },
  {
    id: "project-2",
    title: "Real-time Analytics Dashboard",
    description: "Dashboard for monitoring application performance and user metrics",
    image: "/projects/dashboard.png",
    tags: ["React", "Node.js", "WebSocket", "MongoDB"],
    github: "https://github.com",
    demo: "https://demo.com",
    featured: false
  }
];