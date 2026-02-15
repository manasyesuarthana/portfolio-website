import { education } from './education';
import { experience } from './experience';
import { projects } from './projects';
import { awards } from './awards';
import { skills } from './skills';

export interface FSNode {
    type: 'file' | 'directory';
    name: string;
    content?: string;
    children?: Record<string, FSNode>;
}

function buildEducationContent(): string {
    const sections = education.map(edu => {
        const lines = [
            edu.degree,
            edu.institution,
            edu.period,
            '',
            'Achievements:',
            ...edu.achievements.map(a => `  - ${a}`),
        ];
        return lines.join('\n');
    });
    return sections.join('\n\n─────────────────────────────\n\n');
}

function buildExperienceContent(): string {
    const sections = experience.map(exp => {
        const lines = [
            exp.role,
            exp.company,
            exp.period,
            '',
            'Highlights:',
            ...exp.highlights.map(h => `  - ${h}`),
        ];
        return lines.join('\n');
    });
    return sections.join('\n\n─────────────────────────────\n\n');
}

function buildProjectsContent(): string {
    const sections = projects.map(proj => {
        const lines = [
            proj.title,
            '',
            proj.description,
            '',
            `Tags: ${proj.tags.join(', ')}`,
        ];
        if (proj.github) lines.push(`GitHub: ${proj.github}`);
        if (proj.demo) lines.push(`Demo: ${proj.demo}`);
        return lines.join('\n');
    });
    return sections.join('\n\n─────────────────────────────\n\n');
}

function buildAwardsContent(): string {
    const sections = awards.map(award => {
        const lines = [
            `${award.icon || '🏅'} ${award.title}`,
            `Issued by: ${award.issuer}`,
            `Date: ${award.date}`,
            '',
            award.description,
        ];
        return lines.join('\n');
    });
    return sections.join('\n\n─────────────────────────────\n\n');
}

function buildSkillsContent(): string {
    const categories: Record<string, string[]> = {};
    for (const skill of skills) {
        const cat = skill.category;
        if (!categories[cat]) categories[cat] = [];
        categories[cat].push(skill.name);
    }

    const lines: string[] = ['Skills & Technologies', ''];
    const labels: Record<string, string> = {
        languages: 'Languages',
        frameworks: 'Frameworks & Libraries',
        devops: 'DevOps & Cloud',
        security: 'Security & Testing',
    };

    for (const [key, names] of Object.entries(categories)) {
        lines.push(`${labels[key] || key}:`);
        lines.push(`  ${names.join(', ')}`);
        lines.push('');
    }

    return lines.join('\n');
}

const aboutContent = `Manasye Suarthana
Computer Science Student

Currently pursuing a BSc in Computer Science at the University of Birmingham
through a Dual Degree Scholarship with Gadjah Mada University.

Interests: Cybersecurity, DevOps, Cloud Computing, Full-Stack Development

Contact: manasyesuarthana@gmail.com
GitHub: https://github.com/manasyesuarthana
LinkedIn: https://www.linkedin.com/in/i-putu-herjuna-manasye-suarthana-6a1b93294/`;

export function buildFilesystem(): FSNode {
    return {
        type: 'directory',
        name: '~',
        children: {
            'about.txt': {
                type: 'file',
                name: 'about.txt',
                content: aboutContent,
            },
            'education.txt': {
                type: 'file',
                name: 'education.txt',
                content: buildEducationContent(),
            },
            'experience.txt': {
                type: 'file',
                name: 'experience.txt',
                content: buildExperienceContent(),
            },
            'projects.txt': {
                type: 'file',
                name: 'projects.txt',
                content: buildProjectsContent(),
            },
            'awards.txt': {
                type: 'file',
                name: 'awards.txt',
                content: buildAwardsContent(),
            },
            'skills.txt': {
                type: 'file',
                name: 'skills.txt',
                content: buildSkillsContent(),
            },
        },
    };
}

export function resolvePath(root: FSNode, cwd: string[], pathStr: string): { node: FSNode | null; resolvedPath: string[] } {
    let parts: string[];

    if (pathStr === '~' || pathStr === '') {
        return { node: root, resolvedPath: [] };
    }

    if (pathStr.startsWith('~/')) {
        parts = pathStr.slice(2).split('/').filter(Boolean);
    } else if (pathStr.startsWith('/')) {
        parts = pathStr.slice(1).split('/').filter(Boolean);
    } else {
        parts = [...cwd, ...pathStr.split('/').filter(Boolean)];
    }

    // Resolve . and ..
    const resolved: string[] = [];
    for (const part of parts) {
        if (part === '.') continue;
        if (part === '..') {
            resolved.pop();
        } else {
            resolved.push(part);
        }
    }

    let current = root;
    for (const part of resolved) {
        if (current.type !== 'directory' || !current.children?.[part]) {
            return { node: null, resolvedPath: resolved };
        }
        current = current.children[part];
    }

    return { node: current, resolvedPath: resolved };
}
