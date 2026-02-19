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
    title: "Linux Infrastructure Automation",
    description: "Bash scripts to set up a linux server in order for it to be able to serve a static site. These scripts are used to automate file transfer, system updates, and the website deployment on the server.",
    image: "/projects/deployed_website.png",
    tags: ["CentOS", "Bash", "Vagrant", "Nginx"],
    github: "https://github.com/manasyesuarthana/automated-server-setup",
    demo: "https://github.com/manasyesuarthana/automated-server-setup/blob/main/README.md",
    featured: true
  },
  {
    id: "project-2",
    title: "Automated Algorithm Validation Framework",
    description: "an Automated Testing Framework to validate the resilience of privacy-preserving algorithms, designing a containerized stress-test environment using Docker and used GitHub Actions for CI/CD.",
    image: "/projects/pipeline_diagram.jpeg",
    tags: ["Python", "Docker", "GitHub Actions", "Docker Compose"],
    github: "https://github.com/manasyesuarthana/AGE-validation-framework",
    demo: "https://github.com/manasyesuarthana/AGE-validation-framework",
    featured: true
  },
  {
    id: "project-3",
    title: "Portfolio Website",
    description: "A portfolio website (the one you are currently viewing) built with Next.js, Tailwind CSS, and TypeScript.",
    image: "/projects/portfolio-project.png",
    tags: ["Next.js", "Tailwind CSS", "TypeScript"],
    github: "https://github.com/manasyesuarthana/portfolio-website",
    demo: "https://github.com/manasyesuarthana/portfolio-website",
    featured: true
  },
  {
    id: "project-4",
    title: "Regulatory Compliance Chatbot",
    description: "An AI-powered web tool that simplifies regulatory compliance. Upload your PDFs, ask questions, and get instant, accurate answers with direct references to the source documents. It makes finding critical information quick and reliable.",
    image: "/projects/rag_chatbot.png",
    tags: ["LangChain", "ChromaDB", "Gemini API"],
    github: "https://github.com/manasyesuarthana/compliance-rag-chatbot",
    demo: "https://github.com/manasyesuarthana/compliance-rag-chatbot",
    featured: false
  },
  {
    id: "project-5",
    title: "Deploying OpenWebUI on AWS and GCP using Terraform",
    description: "Hands on learning project of using IaC (Infrastructure as Code) with Terraform automate the deployment of OpenWebUI on AWS, GCP, and Azure VM instances.",
    image: "/projects/terraform_aws_gcp.png",
    tags: ["Terraform", "OpenWebUI", "Cloud Computing"],
    github: "https://github.com/manasyesuarthana/openwebui-terraform-labs",
    demo: "https://github.com/manasyesuarthana/openwebui-terraform-labs",
    featured: false
  }
];