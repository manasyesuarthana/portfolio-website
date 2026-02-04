'use client';

import { experience, ExperienceItem } from '@/lib/data';
import Particles from '../Particles';
import AnimatedList from '../AnimatedList';
import Image from 'next/image';

const ExperienceSection = () => {
  const renderExperienceCard = (exp: ExperienceItem, index: number, isSelected: boolean) => (
    <div
      className={`
        p-8 md:p-10 rounded-2xl border transition-all duration-300
        ${isSelected
          ? 'bg-blue-900/20 border-blue-500/30 shadow-xl shadow-blue-500/20'
          : 'bg-white/5 border-white/10 hover:bg-blue-900/10'
        }
      `}
    >
      <div className="flex items-start gap-4">
        {/* Logo */}
        <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-white/10 flex items-center justify-center overflow-hidden">
          <Image
            src={exp.logo}
            alt={exp.company}
            width={32}
            height={32}
            className="object-contain"
            onError={(e) => {
              // Fallback to initials if image fails
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
            }}
          />
          <span className="text-white/60 text-sm font-medium">
            {exp.company.charAt(0)}
          </span>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mb-2">
            <h3 className="text-lg font-semibold text-white truncate">
              {exp.role}
            </h3>
            <span className="text-sm text-blue-400 font-medium whitespace-nowrap">
              {exp.period}
            </span>
          </div>

          <p className="text-white/60 text-sm mb-3">
            {exp.company}
          </p>

          {/* Highlights */}
          <ul className="space-y-2">
            {exp.highlights.map((highlight, idx) => (
              <li
                key={idx}
                className="flex items-start gap-2 text-sm text-white/80"
              >
                <span className="text-blue-400 mt-0">•</span>
                <span>{highlight}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );

  return (
    <section id="experience" className="min-h-screen bg-black py-20 px-4 relative">
      <div className="absolute inset-0 z-0">
        <Particles />
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        <h2 className="text-4xl md:text-6xl font-bold text-white text-center mb-16">
          Experience
        </h2>

        <AnimatedList<ExperienceItem>
          items={experience}
          renderItem={renderExperienceCard}
          showGradients={true}
          enableArrowNavigation={true}
          displayScrollbar={false}
          className="experience-list"
        />
      </div>
    </section>
  );
};

export default ExperienceSection;