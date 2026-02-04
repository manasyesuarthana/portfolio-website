'use client';

import { useState } from 'react';
import Magnet from '../Magnet';
import FlowingMenu from '../FlowingMenu';
import SplitText from '../SplitText';
import Particles from '../Particles';
import { scrollToSection } from '../SmoothScroll';

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));

    alert('Thank you for your message! I will get back to you soon.');
    setFormData({ name: '', email: '', message: '' });
    setIsSubmitting(false);
  };

  const socialLinks = [
    {
      link: 'https://github.com/yourusername',
      text: 'GitHub',
      marqueeBgColor: '#939393ff'
    },
    {
      link: 'https://linkedin.com/in/yourusername',
      text: 'LinkedIn',
      marqueeBgColor: '#0A66C2'
    },
    {
      link: 'https://instagram.com/yourusername',
      text: 'Instagram',
      marqueeBgColor: '#C13584'
    },
    {
      link: 'mailto:contact@example.com',
      text: 'Email',
      marqueeBgColor: '#EA4335'
    }
  ];

  return (
    <section id="contact" className="bg-black py-20 px-4 relative">
      {/* Gradient Background */}
      <div className="absolute inset-0 z-0 opacity-30">
        <Particles />
      </div>

      <div className="relative z-10">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold text-white text-center mb-16">
            <SplitText
              text="Let's Connect!"
            />

          </h1>
        </div>
        <FlowingMenu
          items={socialLinks}
          speed={15}
          textColor="#fff"
          bgColor="#000000"
          marqueeBgColor="#ffffff"
          marqueeTextColor="#000000"
          borderColor="#333"
        />
      </div>
      {/* Footer */}
      <footer className="mt-20 pt-8 border-t border-gray-800">
        <div className="text-center">
          <p className="text-gray-400 mb-4">
            © 2026 Manasye Suarthana. Built with passion and lots of ☕ with Next.js
          </p>
          <div className="flex justify-center gap-6">
            <Magnet magnetStrength={1.5}>
              <button
                onClick={() => scrollToSection('#hero')}
                className="text-gray-400 hover:text-blue-400 transition-colors"
              >
                Back to Top
              </button>
            </Magnet>
          </div>
        </div>
      </footer>
    </section>
  );
};

export default ContactSection;