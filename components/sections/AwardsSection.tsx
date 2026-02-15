'use client';

import { useState, useEffect, useRef } from 'react';
import { awards } from '@/lib/data';
import SplitText from '../SplitText';
import LightRays
    from '../LightRays';
const AwardsSection = () => {
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
                        } else {
                            setVisibleCards((prev) => {
                                const next = new Set(prev);
                                next.delete(index);
                                return next;
                            });
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
        <section id="awards" className="min-h-screen bg-black py-25 px-4 relative">
            {/* Particles Background */}
            <div className="absolute inset-0 z-0">
                <LightRays
                    raysOrigin="left"
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

            <div className="max-w-7xl mx-auto relative z-10">
                <h2 className="text-4xl md:text-6xl font-bold text-white text-center mb-16">
                    <SplitText text="Awards & Honors" />
                </h2>

                {/* Awards Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {awards.map((award, index) => (
                        <div
                            key={award.id}
                            ref={(el) => { cardRefs.current[index] = el; }}
                            className={`group relative bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-8 hover:border-blue-500/30 hover:shadow-xl hover:shadow-blue-500/20 hover:bg-blue-900/20 ${visibleCards.has(index)
                                ? 'opacity-100 translate-y-0'
                                : 'opacity-0 translate-y-8'
                                }`}
                            style={{
                                transition: `opacity 0.6s ease-out ${visibleCards.has(index) ? `${index * 150}ms` : '0ms'}, transform 0.6s ease-out ${visibleCards.has(index) ? `${index * 150}ms` : '0ms'}, border-color 0.3s ease, box-shadow 0.3s ease, background-color 0.3s ease`,
                            }}
                        >
                            {/* Gradient glow overlay on hover */}
                            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500/10 via-transparent to-blue-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                            <div className="relative z-10">
                                {/* Icon & Date Row */}
                                <div className="flex items-center justify-between mb-5">
                                    <span className="text-5xl drop-shadow-lg" role="img" aria-label={award.title}>
                                        {award.icon || '🏅'}
                                    </span>
                                    <span className="px-3 py-1 bg-blue-900/40 text-blue-300 rounded-full text-sm font-medium border border-blue-800/50">
                                        {award.date}
                                    </span>
                                </div>

                                {/* Title */}
                                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-100 transition-colors duration-300">
                                    {award.title}
                                </h3>

                                {/* Issuer */}
                                <p className="text-blue-400 font-medium mb-4 text-sm">
                                    {award.issuer}
                                </p>

                                {/* Description */}
                                <p className="text-gray-400 leading-relaxed text-sm">
                                    {award.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Divider */}
                <div className="mt-32 flex justify-center">
                    <div className="w-3/4 md:w-9/10 h-px bg-white/20" />
                </div>
            </div>
        </section>
    );
};

export default AwardsSection;
