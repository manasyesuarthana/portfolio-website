export interface Skill {
  name: string;
  logoUrl: string;
  category: 'languages' | 'frameworks' | 'devops' | 'security';
}

export const skills: Skill[] = [
  // Languages
  { name: "Python", logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg", category: "languages" },
  { name: "Bash", logoUrl: "https://cdn.simpleicons.org/gnubash/4EAA25", category: "languages" },
  { name: "TypeScript", logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg", category: "languages" },
  { name: "JavaScript", logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg", category: "languages" },
  { name: "Go", logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original-wordmark.svg", category: "languages" },
  { name: "Java", logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg", category: "languages" },
  { name: "C++", logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg", category: "languages" },
  { name: "C", logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg", category: "languages" },


  // Frameworks & Libraries
  { name: "React", logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg", category: "frameworks" },
  { name: "Next.js", logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg", category: "frameworks" },
  { name: "Node.js", logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg", category: "frameworks" },
  { name: "Express.js", logoUrl: "https://camo.githubusercontent.com/d7ac93eb508bba7311a9069208f6765804f1c211e0d1d4221eaf958832b1d7db/68747470733a2f2f6432656970397366336f6f3663322e636c6f756466726f6e742e6e65742f746167732f696d616765732f3030302f3030302f3335392f7468756d622f657870726573736a736c6f676f2e706e67", category: "frameworks" },
  { name: "FastAPI", logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg", category: "frameworks" },

  // DevOps & Cloud
  { name: "Git", logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg", category: "devops" },
  { name: "Linux", logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg", category: "devops" },
  { name: "AWS", logoUrl: "https://raw.githubusercontent.com/devicons/devicon/master/icons/amazonwebservices/amazonwebservices-original-wordmark.svg", category: "devops" },
  { name: "Docker", logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg", category: "devops" },
  { name: "Kubernetes", logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-original.svg", category: "devops" },
  { name: "GitHub Actions", logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg", category: "devops" },
  { name: "Jenkins", logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jenkins/jenkins-original.svg", category: "devops" },
  { name: "Terraform", logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/terraform/terraform-original.svg", category: "devops" },

  // Security
  { name: "Burp Suite", logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/BurpSuite_Comunity_Edition.svg/960px-BurpSuite_Comunity_Edition.svg.png", category: "security" },
  { name: "Kali Linux", logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2b/Kali-dragon-icon.svg/960px-Kali-dragon-icon.svg.png", category: "security" },
  { name: "Postman", logoUrl: "https://static.cdnlogo.com/logos/p/20/postman.svg", category: "security" },
  { name: "Vagrant", logoUrl: "https://images.icon-icons.com/2699/PNG/512/vagrantup_logo_icon_169305.png", category: "security" },
];