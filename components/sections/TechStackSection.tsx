'use client';

import { skills } from '@/lib/data';
import LogoLoop from '../LogoLoop';
import Particles from '../Particles';
import SplitText from '../SplitText';
import { motion } from 'motion/react';

const TechStackSection = () => {
  const categories = {
    languages: { title: 'Languages', items: skills.filter(s => s.category === 'languages') },
    frameworks: { title: 'Frameworks & Libraries', items: skills.filter(s => s.category === 'frameworks') },
    devops: { title: 'DevOps & Cloud', items: skills.filter(s => s.category === 'devops') },
    security: { title: 'Security and Testing', items: skills.filter(s => s.category === 'security') }
  };

  return (
    <section id="tech-stack" className="min-h-screen bg-black py-20 px-4 relative">
      {/* GradientBlinds Background */}

      <div className="absolute inset-0 z-0 opacity-30">
        <Particles />
      </div>

      <div className="relative z-10">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-bold text-white text-center mb-16">
            <SplitText
              text="Tech Stack"
            />
          </h2>

          {/* Category Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {Object.entries(categories).map(([key, category], index) => (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-gray-900/50 backdrop-blur-sm border border-blue-900/50 rounded-xl p-6 hover:bg-gray-800/50 hover:border-blue-700/50 transition-colors">
                <h3 className="text-xl font-semibold text-white mb-4 text-center">{category.title}</h3>
                <div className="flex flex-wrap gap-2">
                  {category.items.map((skill) => (
                    <div key={skill.name} className="bg-gray-800/80 text-white px-3 py-1 rounded-lg text-sm flex items-center gap-2 hover:bg-blue-900/50 hover:border-blue-700 transition-colors">
                      <img src={skill.logoUrl} alt={skill.name} className="w-5 h-5" />
                      <span className="text-base">{skill.name}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Tech Logo Marquee */}
          <div className="mt-20">
            <h3 className="text-4xl font-semibold text-white text-center mb-8">Technologies I Work With (More to come...)</h3>
            <LogoLoop
              logos={skills.map(skill => ({
                node: (
                  <div className="flex items-center gap-2 text-white">
                    <img src={skill.logoUrl} alt={skill.name} className="w-7 h-7" />
                    <span className="text-base font-medium">{skill.name}</span>
                  </div>
                )
              }))}
              speed={20}
              pauseOnHover={true}
              logoHeight={40}
            />
          </div>

          {/* Barrier Line */}
          <div className="mt-32 flex justify-center">
            <div className="w-3/4 md:w-9/10 h-px bg-white/20" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechStackSection;