'use client';

import { useState, useEffect } from 'react';
import { projects, Project } from '@/lib/data';
import LightRays from '../LightRays';
import SplitText from '../SplitText';
import Carousel, { CarouselItem } from '../Carousel';
import ScrollVelocity from '../ScrollVelocity';

const ProjectsSection = () => {
  // Responsive carousel dimensions
  const [carouselSize, setCarouselSize] = useState({ width: 1200, height: 600 });

  useEffect(() => {
    const updateSize = () => {
      const width = window.innerWidth;
      if (width < 640) {
        // Mobile: smaller carousel
        setCarouselSize({ width: Math.min(width - 32, 350), height: 420 });
      } else if (width < 768) {
        // Small tablet
        setCarouselSize({ width: Math.min(width - 48, 600), height: 500 });
      } else if (width < 1024) {
        // Tablet
        setCarouselSize({ width: Math.min(width - 64, 800), height: 550 });
      } else {
        // Desktop
        setCarouselSize({ width: 1200, height: 600 });
      }
    };

    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  // Convert projects to carousel items
  const carouselItems: CarouselItem[] = projects.map(project => ({
    id: project.id,
    title: project.title,
    description: project.description,
    image: project.image,
    tags: project.tags,
    github: project.github,
    demo: project.demo
  }));

  // Custom render function for project cards - optimized for responsive layout
  const renderProjectCard = (item: CarouselItem) => (
    <div className="flex flex-col md:grid md:grid-cols-2 gap-4 md:gap-6 h-full p-4 md:p-6">
      {/* Project Image - with spacing */}
      {item.image && (
        <div className="overflow-hidden rounded-xl flex items-center h-32 md:h-auto">
          <img
            src={item.image}
            alt={item.title}
            className="w-full h-full object-cover rounded-xl"
          />
        </div>
      )}

      {/* Content - Vertically centered */}
      <div className="flex flex-col justify-center py-2 md:py-8 pr-0 md:pr-8">
        <h4 className="text-xl md:text-3xl font-bold text-white mb-2 md:mb-3">{item.title}</h4>
        <p className="text-gray-400 text-sm md:text-base mb-3 md:mb-4 leading-relaxed line-clamp-2 md:line-clamp-3">{item.description}</p>

        {/* Tags */}
        {item.tags && (
          <div className="flex flex-wrap gap-1.5 md:gap-2 mb-3 md:mb-5">
            {item.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="px-2 md:px-3 py-0.5 md:py-1 bg-blue-900/50 text-blue-300 rounded-full text-xs md:text-sm border border-blue-800"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-2 md:gap-4">
          {item.github && (
            <a
              href={item.github}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 md:px-5 py-2 md:py-2.5 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors text-xs md:text-sm font-medium flex items-center gap-1.5 md:gap-2"
              onClick={(e) => e.stopPropagation()}
            >
              <svg className="w-4 h-4 md:w-5 md:h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
              <span className="hidden sm:inline">View Code</span>
              <span className="sm:hidden">Code</span>
            </a>
          )}
          {item.demo && (
            <a
              href={item.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 md:px-5 py-2 md:py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-xs md:text-sm font-medium flex items-center gap-1.5 md:gap-2"
              onClick={(e) => e.stopPropagation()}
            >
              <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              <span className="hidden sm:inline">Live Demo</span>
              <span className="sm:hidden">Demo</span>
            </a>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <section id="projects" className="min-h-screen bg-black py-20 px-4 relative">
      {/* Dark to Light Transition Gradient at Top */}
      <div
        className="absolute top-0 left-0 right-0 h-48 z-10 pointer-events-none"
        style={{
          background: 'linear-gradient(to bottom, #000000 0%, #000000 20%, transparent 100%)'
        }}
      />

      {/* Light Rays Background - positioned absolutely to fill section */}
      <div className="absolute inset-0 z-0">
        <LightRays
          raysOrigin="right"
          raysColor="#ffffff"
          raysSpeed={1}
          lightSpread={0.1}
          rayLength={0.75}
          fadeDistance={1}
          saturation={1}
          followMouse={true}
          mouseInfluence={0.1}
        />
      </div>

      {/* Subtle base gradient for depth */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at top center, rgba(59, 130, 246, 0.1) 0%, transparent 60%)'
        }}
      />

      <div className="max-w-7xl mx-auto relative z-20">
        <h2 className="text-4xl md:text-6xl font-bold text-white text-center mb-16">
          <SplitText text="Projects" />
        </h2>

        {/* Projects Carousel */}
        <div className="mb-16">
          <h3 className="text-2xl font-semibold text-white text-center mb-8">
            Take a look at some of the stuff I've built!
          </h3>

          <div className="flex justify-center">
            <Carousel
              items={carouselItems}
              baseWidth={carouselSize.width}
              baseHeight={carouselSize.height}
              autoplay={true}
              autoplayDelay={5000}
              pauseOnHover={true}
              loop={true}
              renderItem={renderProjectCard}
            />
          </div>
        </div>
      </div>
      <ScrollVelocity texts={['Thanks for visiting!']} className="text-white text-4xl" />
    </section>
  );
};

export default ProjectsSection;