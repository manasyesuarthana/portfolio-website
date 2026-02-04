'use client';

import { motion } from "framer-motion";
import Lanyard from "../Lanyard";
import RotatingText from "../RotatingText";
import Squares from "../Squares";

export default function Hero() {
    return (
        <section className="relative w-full min-h-screen flex items-center justify-center bg-black overflow-hidden text-stardust pt-20 md:pt-0">

            {/* 1. BACKGROUND GRID */}
            <div className="absolute inset-0 z-0 opacity-100">
                <Squares
                    direction='diagonal'
                    borderColor="#ffffffff"
                />
            </div>

            <div className="container mx-auto px-6 z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center h-full">

                {/* 2. LEFT COLUMN: THE SWAYING LANYARD CONTAINER */}
                <div className="flex justify-center lg:justify-end order-last lg:order-first relative">
                    <div className="relative w-full max-w-[550px] h-[400px] sm:h-[500px] md:h-[600px] lg:h-[700px] flex items-center justify-center bg-blue-500/5 border border-blue-500/20 rounded-3xl backdrop-blur-sm overflow-hidden group">
                        <div className="absolute top-5 left-5 w-4 h-4 border-t border-l border-white/40 rounded-tl-lg" />
                        <div className="absolute top-5 right-5 w-4 h-4 border-t border-r border-white/40 rounded-tr-lg" />
                        <div className="absolute bottom-5 left-5 w-4 h-4 border-b border-l border-white/40 rounded-bl-lg" />
                        <div className="absolute bottom-5 right-5 w-4 h-4 border-b border-r border-white/40 rounded-br-lg" />
                        <div className="absolute top-6 left-1/2 -translate-x-1/2 text-[10px] text-white/30 font-mono tracking-[0.2em] uppercase">
                            Manasye Suarthana
                        </div>

                        {/* The Lanyard Component */}
                        <div className="w-full h-full z-10 cursor-grab active:cursor-grabbing">
                            <Lanyard
                                position={[0, 3, 15]}
                                gravity={[0, -40, 0]}
                            />
                        </div>

                        {/* DECORATION: Subtle Scanline (Optional, adds to the screen feel) */}
                        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_50%,rgba(0,0,0,0.3)_50%)] bg-[length:100%_4px] opacity-10 pointer-events-none" />
                    </div>

                </div>

                {/* 3. RIGHT COLUMN: THE INTRO TEXT */}
                <div className="text-center lg:text-left space-y-6 order-first lg:order-last">

                    {/* Main Headline */}
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7 }}
                        className="text-5xl lg:text-7xl font-bold tracking-tighter text-white"
                    >
                        I'm Manasye.<br />
                        <RotatingText
                            texts={['Software Engineer.', 'DevOps Engineer.', 'Cybersecurity.', 'CS @ Birmingham.']}
                            mainClassName="px-2 sm:px-2 md:px-3 bg-blue-500 text-white overflow-hidden py-0.5 sm:py-1 md:py-2 rounded-lg mt-2 inline-block"
                            staggerFrom={"last"}
                            initial={{ y: "100%" }}
                            animate={{ y: 0 }}
                            exit={{ y: "-120%" }}
                            staggerDuration={0.025}
                            splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
                            transition={{ type: "spring", damping: 30, stiffness: 400 }}
                            rotationInterval={2000}
                        />
                    </motion.h1>

                    {/* Description */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.9 }}
                        className="text-lg text-slate-400 max-w-lg mx-auto lg:mx-0 leading-relaxed"
                    >
                        BSc Computer Science student at the University of Birmingham. Specializing in building resilient backend infrastructure, exciting user interfaces, and  automation pipelines for efficient and secure deployments.
                    </motion.p>

                    {/* CTA Button */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.1 }}
                    >
                        {/* <button className="px-8 py-3 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-400 transition-colors duration-300 shadow-[0_0_20px_rgba(59,130,246,0.3)] hover:shadow-[0_0_20px_rgba(96,165,250,0.5)]">
                            View Logs
                        </button> */}
                    </motion.div>
                </div>

            </div>
        </section>
    );
}