'use client';

import { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { buildFilesystem, resolvePath, FSNode } from '@/lib/data/filesystem';
import SplitText from '../SplitText';

interface OutputLine {
    text: string;
    isCommand?: boolean;
    isError?: boolean;
    isSystem?: boolean;
}

const FAKE_PASSWD = `root:x:0:0:root::/nonexistent
nobody:x:65534:65534:Unprivileged Peasant::/usr/sbin/nologin
visitor:x:65533:65533:Thinks They Have Sudo::/bin/false
ghost:x:666:666:Invisible Background Process::/bin/false
coffee:x:1337:1337:Mission Critical Caffeine Daemon::/bin/sleep
printer_therapist:x:1999:1999:Provides Emotional Support to Printers::/bin/false
intern:x:404:404:User Not Found::/bin/false
overlord:x:9001:9001:Definitely Not Monitoring You::/bin/bash
cat:x:10000:10000:Walks On Keyboard Service::/bin/true
update:x:12345:12345:Reboots At The Worst Possible Time::/bin/false`;

const SUDO_RM_RF_LINES: OutputLine[] = [
    { text: 'rm: it looks like you\'re trying to delete the entire operating system.', isError: true },
    { text: 'rm: are you absolutely, positively, unquestionably sure about this? [nope]', isError: true },
    { text: '' },
    { text: 'Checking common sense... FAILED', isError: true },
    { text: 'Checking life choices... FAILED', isError: true },
    { text: 'Consulting /dev/brain... NOT FOUND', isError: true },
    { text: '' },
    { text: 'ERROR: User attempted to uninstall reality.', isError: true },
    { text: 'ERROR: Privileges revoked due to suspicious overconfidence.', isError: true },
    { text: 'ERROR: Keyboard ownership transferred to nearest responsible adult.', isError: true },
    { text: '' },
    { text: 'Initiating countermeasures...' },
    { text: ' - Saving system files ✔', isSystem: true },
    { text: ' - Deleting your sudo privileges ✘', isError: true },
    { text: ' - Posting this command to #it-support-memes ✔', isSystem: true },
    { text: ' - Scheduling mandatory Linux tutorial ✔', isSystem: true },
    { text: '' },
    { text: 'rm: operation not permitted', isError: true },
    { text: 'rm: suggestion: maybe try `sudo rm -rf homework` instead' },
    { text: '' },
    { text: 'System integrity: intact', isSystem: true },
    { text: 'Your reputation: compromised', isError: true },
];

const NEOFETCH = `
         ▲                  visitor@manasye
        ▲ ▲                 ─────────────────
       ▲   ▲                OS: Portfolio/1.0
      ▲     ▲               Host: Next.js 14.2.35
     ▲       ▲              Kernel: React 18
    ▲    ▼    ▲             Shell: manasye-sh
   ▲   ▼   ▼   ▲            Theme: Dark [always]
  ▲   ▼     ▼   ▲           Terminal: portfolio-term
 ▲   ▼       ▼   ▲          Languages: TypeScript, Python, Go, Java, C++
▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲         Frameworks: React, Next.js, FastAPI
                            DevOps: Docker, K8s, Terraform, AWS
  ▲ Powered by Vercel       Uptime: as long as I can remember
`;

const WELCOME_MESSAGE: OutputLine[] = [
    { text: '┌──────────────────────────────────────────────────┐', isSystem: true },
    { text: '│  Welcome to Manasye\'s Portfolio Terminal!        │', isSystem: true },
    { text: '│                                                  │', isSystem: true },
    { text: '│  Type "help" to see available commands.          │', isSystem: true },
    { text: '│  Navigate the filesystem to explore my portfolio.│', isSystem: true },
    { text: '└──────────────────────────────────────────────────┘', isSystem: true },
    { text: '', isSystem: true },
];

const HELP_TEXT = `Available commands:

  help              Show this help message
  ls [dir]          List directory contents
  cd <dir>          Change directory (supports .., ~, relative/absolute paths)
  cat <file>        Display file contents
  pwd               Print current working directory
  whoami            Display user info
  neofetch          Display system info
  clear             Clear the terminal
  sudo su           Try to become root
  sudo rm -rf / *   Try to delete the entire system

Directories: education, experience, projects, awards
Files: about.txt, skills.txt, and more inside each directory

Try: ls → cd education → ls → cat <filename>`;

const TerminalSection = () => {
    const fs = useMemo(() => buildFilesystem(), []);
    const [output, setOutput] = useState<OutputLine[]>([...WELCOME_MESSAGE]);
    const [input, setInput] = useState('');
    const [cwd, setCwd] = useState<string[]>([]);
    const [history, setHistory] = useState<string[]>([]);
    const [historyIndex, setHistoryIndex] = useState(-1);
    const [locked, setLocked] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const outputRef = useRef<HTMLDivElement>(null);

    const animateLines = useCallback((baseOutput: OutputLine[], lines: OutputLine[], delay = 150) => {
        setLocked(true);
        lines.forEach((line, i) => {
            setTimeout(() => {
                setOutput(prev => [...prev, line]);
                if (i === lines.length - 1) {
                    setLocked(false);
                }
            }, delay * (i + 1));
        });
        setOutput(baseOutput);
    }, []);

    const prompt = useMemo(() => {
        const path = cwd.length === 0 ? '~' : `~/${cwd.join('/')}`;
        return `visitor@manasye:${path}$`;
    }, [cwd]);

    const scrollToBottom = useCallback(() => {
        if (outputRef.current) {
            const el = outputRef.current;
            const isNearBottom = el.scrollHeight - el.scrollTop - el.clientHeight < 100;
            if (isNearBottom) {
                el.scrollTop = el.scrollHeight;
            }
        }
    }, []);

    useEffect(() => {
        scrollToBottom();
    }, [output, scrollToBottom]);

    // Prevent Lenis smooth scroll from hijacking wheel events inside the terminal
    const handleTerminalWheel = useCallback((e: React.WheelEvent<HTMLDivElement>) => {
        e.stopPropagation();
    }, []);

    const handleMouseEnter = useCallback(() => {
        window.lenis?.stop();
    }, []);

    const handleMouseLeave = useCallback(() => {
        window.lenis?.start();
    }, []);

    const executeCommand = useCallback((cmd: string) => {
        const trimmed = cmd.trim();
        const newOutput: OutputLine[] = [
            ...output,
            { text: `${prompt} ${trimmed}`, isCommand: true },
        ];

        if (!trimmed) {
            setOutput(newOutput);
            return;
        }

        const parts = trimmed.split(/\s+/);
        const command = parts[0];
        const args = parts.slice(1);

        // Handle special multi-word commands first
        if (trimmed === 'sudo -i' || trimmed === 'sudo su') {
            newOutput.push({ text: 'you tryna be root? it\'s not that easy bud.', isError: true });
            setOutput(newOutput);
            return;
        }

        if (trimmed.startsWith('sudo rm -rf')) {
            animateLines(newOutput, SUDO_RM_RF_LINES, 200);
            return;
        }

        switch (command) {
            case 'help': {
                newOutput.push({ text: HELP_TEXT });
                break;
            }

            case 'ls': {
                const target = args[0] || '';
                const { node } = target
                    ? resolvePath(fs, cwd, target)
                    : resolvePath(fs, cwd, cwd.join('/') || '~');

                if (!node) {
                    newOutput.push({ text: `ls: cannot access '${args[0]}': No such file or directory`, isError: true });
                } else if (node.type === 'file') {
                    newOutput.push({ text: node.name });
                } else if (node.children) {
                    const entries = Object.values(node.children)
                        .map(child => child.type === 'directory' ? `${child.name}/` : child.name)
                        .sort((a, b) => {
                            const aDir = a.endsWith('/');
                            const bDir = b.endsWith('/');
                            if (aDir && !bDir) return -1;
                            if (!aDir && bDir) return 1;
                            return a.localeCompare(b);
                        });
                    newOutput.push({ text: entries.join('  ') });
                }
                break;
            }

            case 'cd': {
                if (!args[0] || args[0] === '~') {
                    setCwd([]);
                    break;
                }

                const { node, resolvedPath } = resolvePath(fs, cwd, args[0]);

                if (!node) {
                    newOutput.push({ text: `cd: no such file or directory: ${args[0]}`, isError: true });
                } else if (node.type !== 'directory') {
                    newOutput.push({ text: `cd: not a directory: ${args[0]}`, isError: true });
                } else {
                    setCwd(resolvedPath);
                }
                break;
            }

            case 'cat': {
                if (!args[0]) {
                    newOutput.push({ text: 'cat: missing file operand', isError: true });
                    break;
                }

                // Easter egg: cat /etc/passwd
                if (args[0] === '/etc/passwd') {
                    newOutput.push({ text: FAKE_PASSWD });
                    break;
                }

                const { node } = resolvePath(fs, cwd, args[0]);

                if (!node) {
                    newOutput.push({ text: `cat: ${args[0]}: No such file or directory`, isError: true });
                } else if (node.type === 'directory') {
                    newOutput.push({ text: `cat: ${args[0]}: Is a directory`, isError: true });
                } else {
                    newOutput.push({ text: node.content || '' });
                }
                break;
            }

            case 'pwd': {
                const path = cwd.length === 0 ? '~' : `~/${cwd.join('/')}`;
                newOutput.push({ text: path });
                break;
            }

            case 'whoami': {
                newOutput.push({ text: 'visitor — thanks for stopping by!' });
                break;
            }

            case 'neofetch': {
                newOutput.push({ text: NEOFETCH });
                break;
            }

            case 'sudo': {
                newOutput.push({ text: 'you tryna be root? it\'s not that easy bud.', isError: true });
                break;
            }

            case 'clear': {
                setOutput([]);
                return;
            }

            default: {
                newOutput.push({ text: `command not found: ${command}`, isError: true });
                newOutput.push({ text: 'Type "help" for available commands.' });
                break;
            }
        }

        setOutput(newOutput);
    }, [output, prompt, fs, cwd]);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (locked) { e.preventDefault(); return; }
        if (e.key === 'Enter') {
            const cmd = input;
            executeCommand(cmd);
            if (cmd.trim()) {
                setHistory(prev => [...prev, cmd]);
            }
            setHistoryIndex(-1);
            setInput('');
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            if (history.length === 0) return;
            const newIndex = historyIndex === -1 ? history.length - 1 : Math.max(0, historyIndex - 1);
            setHistoryIndex(newIndex);
            setInput(history[newIndex]);
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            if (historyIndex === -1) return;
            const newIndex = historyIndex + 1;
            if (newIndex >= history.length) {
                setHistoryIndex(-1);
                setInput('');
            } else {
                setHistoryIndex(newIndex);
                setInput(history[newIndex]);
            }
        } else if (e.key === 'Tab') {
            e.preventDefault();
            // Basic autocomplete: resolve current directory and match partial input
            const partial = input.split(/\s+/).pop() || '';
            if (!partial) return;

            const { node } = resolvePath(fs, cwd, cwd.join('/') || '~');
            if (node?.type === 'directory' && node.children) {
                const matches = Object.keys(node.children).filter(name => name.startsWith(partial));
                if (matches.length === 1) {
                    const parts = input.split(/\s+/);
                    parts[parts.length - 1] = matches[0];
                    setInput(parts.join(' '));
                }
            }
        }
    };

    const focusInput = () => {
        inputRef.current?.focus();
    };

    return (
        <section id="terminal" className="min-h-screen bg-black py-20 px-4 relative">
            <div className="max-w-4xl mx-auto relative z-10">
                <h2 className="text-4xl md:text-6xl font-bold text-white text-center mb-16">
                    <SplitText text="Can you hack my website?" />
                </h2>

                {/* Terminal Window */}
                <div
                    className="rounded-xl overflow-hidden border border-blue-500/30 shadow-[0_0_30px_rgba(59,130,246,0.3),0_0_60px_rgba(59,130,246,0.15)]"
                    onClick={focusInput}
                >
                    {/* Title Bar */}
                    <div className="bg-gray-800 px-4 py-3 flex items-center gap-2 border-b border-gray-700">
                        <div className="flex gap-2">
                            <div className="w-3 h-3 rounded-full bg-red-500" />
                            <div className="w-3 h-3 rounded-full bg-yellow-500" />
                            <div className="w-3 h-3 rounded-full bg-green-500" />
                        </div>
                        <span className="text-gray-400 text-sm font-mono ml-3">
                            visitor@manasye — portfolio-term
                        </span>
                    </div>

                    {/* Terminal Body */}
                    <div
                        ref={outputRef}
                        onWheel={handleTerminalWheel}
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                        className="bg-gray-950 p-4 md:p-6 font-mono text-sm md:text-base h-[500px] overflow-y-auto cursor-text [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-white/40 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb:hover]:bg-white/60"
                        style={{ scrollBehavior: 'smooth', overscrollBehavior: 'contain' }}
                    >
                        {/* Output Lines */}
                        {output.map((line, i) => (
                            <div key={i} className="whitespace-pre-wrap break-words leading-relaxed">
                                {line.isCommand ? (
                                    <span className="text-green-400">{line.text}</span>
                                ) : line.isError ? (
                                    <span className="text-red-400">{line.text}</span>
                                ) : line.isSystem ? (
                                    <span className="text-cyan-400">{line.text}</span>
                                ) : (
                                    <span className="text-gray-300">{line.text}</span>
                                )}
                            </div>
                        ))}

                        {/* Input Line */}
                        <div className="flex items-center gap-2 mt-1">
                            <span className="text-green-400 whitespace-nowrap">{prompt}</span>
                            <input
                                ref={inputRef}
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={handleKeyDown}
                                className="flex-1 bg-transparent text-gray-100 outline-none font-mono text-sm md:text-base caret-green-400"
                                spellCheck={false}
                                autoComplete="off"
                                autoCorrect="off"
                                autoCapitalize="off"
                            />
                        </div>
                    </div>
                </div>

                <p className="text-gray-500 text-center text-sm mt-6">
                    Click on the terminal and type &quot;help&quot; to get started.
                </p>

                <br />
                <h4 className="text-2xl md:text-4xl font-bold text-white text-center mb-16">
                    Let me know if you find anything interesting by contacting me through the links below!
                </h4>
            </div>
        </section>
    );
};

export default TerminalSection;
