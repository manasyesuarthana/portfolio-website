'use client';

import { useState, useEffect, useRef } from 'react';
import { education } from '@/lib/data';
import Counter from '../Counter';
import Particles from '../Particles';
import SplitText from '../SplitText';
import CountUp from '../CountUp';

const EducationSection = () => {
  const [visibleCards, setVisibleCards] = useState<Set<number>>(new Set());
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observers = cardRefs.current.map((ref, index) => {
      if (!ref) return null;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setVisibleCards((prev) => new Set(prev).add(index));
            }
          });
        },
        { threshold: 0.1 }
      );

      observer.observe(ref);
      return observer;
    });

    return () => {
      observers.forEach((observer) => observer?.disconnect());
    };
  }, []);

  return (
    <section id="education" className="min-h-screen bg-black py-25 px-4 relative">
      {/* Particles Background */}
      <div className="absolute inset-0 z-0">
        <Particles />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">

        <h2 className="text-4xl md:text-6xl font-bold text-white text-center mb-16">
          <SplitText
            text="Education"
          />
        </h2>

        {/* Education Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {education.map((edu, index) => (
            <div
              key={edu.id}
              ref={(el) => { cardRefs.current[index] = el; }}
              className={`bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-8 hover:bg-gray-800/50 transition-all duration-300 ${visibleCards.has(index)
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-8'
                }`}
              style={{
                transition: 'opacity 0.6s ease-out, transform 0.6s ease-out',
                transitionDelay: visibleCards.has(index) ? `${index * 150}ms` : '0ms'
              }}
            >
              {/* School Logo */}
              <div className="flex justify-center mb-6">
                <img
                  src={edu.logo}
                  alt={`${edu.institution} logo`}
                  className="w-20 h-20 object-contain rounded-lg"
                />
              </div>

              {/* Degree */}
              <h3 className="text-2xl font-bold text-white text-center mb-2">
                {edu.degree}
              </h3>

              {/* Institution */}
              <p className="text-blue-400 font-medium text-center mb-2">
                {edu.institution}
              </p>

              {/* Period */}
              <p className="text-gray-400 text-center mb-6">
                {edu.period}
              </p>

              {/* Achievements with counters */}
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-white text-center mb-4">Achievements</h4>

                {edu.achievements.map((achievement, idx) => {
                  // Extract numbers for counter animation
                  const hasNumber = /\d/.test(achievement);
                  const numberMatch = achievement.match(/(\d+)/);

                  return (
                    <div key={idx} className="flex items-center justify-center text-center">
                      {hasNumber && numberMatch ? (
                        <span className="text-gray-300">
                          {achievement.split(numberMatch[0])[0]}
                          <span className="text-white-400">
                            {numberMatch[0]}
                          </span>
                          {achievement.split(numberMatch[0])[1]}
                        </span>
                      ) : (
                        <span className="text-gray-300 flex items-center">
                          <span className="text-blue-400 mr-2">✓</span>
                          {achievement}
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Education Stats */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <CountUp to={3} className="text-4xl text-white font-bold" />
            <p className="text-gray-400">Years of Study</p>
          </div>
          <div className="text-center">
            <CountUp to={6} className="text-4xl text-white font-bold" />
            <p className="text-gray-400">Dean's List Semesters</p>
          </div>
          <div className="text-center">
            <span className="text-white font-bold text-4xl">IDK (I hope its good)</span>
            <p className="text-gray-400">Final GPA</p>
          </div>
        </div>

        <div className="mt-32 flex justify-center">
          <div className="w-3/4 md:w-9/10 h-px bg-white/20" />
        </div>
      </div>

    </section>
  );
};

export default EducationSection;