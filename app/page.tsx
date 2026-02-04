'use client';

import { useState, useEffect } from 'react';
import SplitText from "../components/SplitText";
import BlurText from "../components/BlurText";
import Hero from '../components/sections/Hero';
import TechStackSection from '../components/sections/TechStackSection';
import ExperienceSection from '../components/sections/ExperienceSection';
import EducationSection from '../components/sections/EducationSection';
import ProjectsSection from '../components/sections/ProjectsSection';
import ContactSection from '../components/sections/ContactSection';
import GradualBlur from '../components/GradualBlur';
import { scrollToSection } from '../components/SmoothScroll';

export default function Home() {
  const [view, setView] = useState<'intro' | 'question' | 'fullsite'>('intro');
  const [showIntro, setShowIntro] = useState(false);

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

  if (view === 'fullsite') {
    return (
      <div className="animate-in fade-in duration-1000">
        {/* Navigation Bar */}
        <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-sm border-b border-gray-800">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex justify-center space-x-8">
              {[
                { target: '#hero', label: 'Home' },
                { target: '#tech-stack', label: 'Tech Stack' },
                { target: '#experience', label: 'Experience' },
                { target: '#education', label: 'Education' },
                { target: '#projects', label: 'Projects' },
                { target: '#contact', label: 'Contact' }
              ].map((item) => (
                <button
                  key={item.target}
                  onClick={() => scrollToSection(item.target)}
                  className="text-gray-300 hover:text-white transition-colors text-sm font-medium"
                >
                  {item.label}
                </button>
              ))}
            </div>
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
        <ContactSection />

        <GradualBlur
          target="parent"
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
            text="Wanna see something cool?"
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