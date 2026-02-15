'use client';

import { useState, useEffect } from 'react';
import SplitText from "../components/SplitText";
import BlurText from "../components/BlurText";
import Hero from '../components/sections/Hero';
import TechStackSection from '../components/sections/TechStackSection';
import ExperienceSection from '../components/sections/ExperienceSection';
import EducationSection from '../components/sections/EducationSection';
import ProjectsSection from '../components/sections/ProjectsSection';
import AwardsSection from '../components/sections/AwardsSection';
import TerminalSection from '../components/sections/TerminalSection';
import ContactSection from '../components/sections/ContactSection';
import GradualBlur from '../components/GradualBlur';
import { scrollToSection } from '../components/SmoothScroll';

export default function Home() {
  const [view, setView] = useState<'intro' | 'question' | 'fullsite'>('intro');
  const [showIntro, setShowIntro] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const navItems = [
    { target: '#hero', label: 'Home' },
    { target: '#tech-stack', label: 'Tech Stack' },
    { target: '#education', label: 'Education' },
    { target: '#experience', label: 'Experience' },
    { target: '#projects', label: 'Projects' },
    { target: '#awards', label: 'Awards' },
    { target: '#terminal', label: 'Terminal' },
    { target: '#contact', label: 'Contact' }
  ];

  const handleNavClick = (target: string) => {
    scrollToSection(target);
    setMobileMenuOpen(false);
  };

  useEffect(() => {
    // Initial fade in for the intro text
    const initialTimer = setTimeout(() => setShowIntro(true), 100);

    // Sequence transitions
    const sequenceTimer = setTimeout(() => {
      if (view === 'intro') {
        setView('question');
      } else if (view === 'question') {
        setView('fullsite');
      }
    }, 2500); // Combined time for fade-in and display

    return () => {
      clearTimeout(initialTimer);
      clearTimeout(sequenceTimer);
    };
  }, [view]);

  const mobileGate = (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center px-8 text-center">
      <p className="text-5xl mb-6">🖥️</p>
      <h1 className="text-2xl font-bold text-white mb-4">Desktop Only</h1>
      <p className="text-gray-400 leading-relaxed max-w-sm">
        Sorry! This site is best experienced on a tablet or larger screen. Please visit on your laptop, desktop, or tablet to see the full portfolio.
      </p>
      <div className="mt-8 px-4 py-2 border border-gray-700 rounded-lg text-gray-500 text-sm font-mono">
        min-width: 768px required
      </div>
    </div>
  );

  if (isMobile) return mobileGate;

  if (view === 'fullsite') {
    return (
      <div className="animate-in fade-in duration-1000">
        {/* Navigation Bar */}
        <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-sm border-b border-gray-800">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex justify-between md:justify-center items-center">
              {/* Mobile: Logo/Name */}
              <span className="md:hidden text-white font-bold text-lg">MS</span>

              {/* Desktop: Horizontal nav */}
              <div className="hidden md:flex space-x-8">
                {navItems.map((item) => (
                  <button
                    key={item.target}
                    onClick={() => handleNavClick(item.target)}
                    className="text-gray-300 hover:text-white transition-colors text-sm font-medium"
                  >
                    {item.label}
                  </button>
                ))}
              </div>

              {/* Mobile: Hamburger button */}
              <button
                className="md:hidden text-white p-2"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle menu"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {mobileMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>

            {/* Mobile menu dropdown */}
            {mobileMenuOpen && (
              <div className="md:hidden mt-4 pb-2 border-t border-gray-700 pt-4">
                <div className="flex flex-col space-y-3">
                  {navItems.map((item) => (
                    <button
                      key={item.target}
                      onClick={() => handleNavClick(item.target)}
                      className="text-gray-300 hover:text-white transition-colors text-sm font-medium text-left py-2"
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </nav>

        {/* Hero Section */}
        <section id="hero">
          <Hero />
        </section>

        {/* All Other Sections */}
        <TechStackSection />
        <EducationSection />
        <ExperienceSection />
        <ProjectsSection />
        <AwardsSection />
        <TerminalSection />
        <ContactSection />

        <GradualBlur
          target="page"
          position="bottom"
          height="7rem"
          strength={0.2}
          divCount={10}
          curve="bezier"
        />
      </div>
    );
  }

  return (
    <main className="h-screen w-full bg-black flex items-center justify-center overflow-hidden">
      <div
        className={`transition-opacity duration-500 ${showIntro && (view === 'intro' || view === 'question') ? 'opacity-100' : 'opacity-0'
          }`}
      >
        {view === 'intro' ? (
          <SplitText
            text="Hello, World! 👋"
            className="text-8xl font-bold text-center text-white tracking-tighter"
            delay={100}
            duration={0.6}
            ease="power3.out"
            splitType="chars"
            from={{ opacity: 0, y: 40 }}
            to={{ opacity: 1, y: 0 }}
            threshold={0.1}
            rootMargin="-100px"
            textAlign="center"
          />
        ) : (
          <BlurText
            text="Introducing..."
            delay={150}
            animateBy="words"
            direction="top"
            className="text-6xl font-semibold text-white text-center"
          />
        )}
      </div>
    </main>
  );
}