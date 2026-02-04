'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';

// Extend Window interface to include lenis
declare global {
    interface Window {
        lenis?: Lenis;
    }
}

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: 'vertical',
            gestureOrientation: 'vertical',
            smoothWheel: true,
            touchMultiplier: 2,
        });

        // Store lenis instance on window for global access
        window.lenis = lenis;

        function raf(time: number) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        return () => {
            lenis.destroy();
            delete window.lenis;
        };
    }, []);

    return <>{children}</>;
}

// Helper function for smooth scroll to element
export function scrollToSection(target: string) {
    if (typeof window !== 'undefined' && window.lenis) {
        window.lenis.scrollTo(target, {
            offset: 0,
            duration: 1.2,
        });
    } else {
        // Fallback for when Lenis is not available
        const element = document.querySelector(target);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    }
}
