import React, { useState, useEffect } from 'react';
import { Container } from './Container';

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'glass shadow-sm py-4' : 'bg-transparent py-6'}`}>
      <Container className="flex items-center justify-between">
        <a href="/" className="flex items-center gap-4 hover:opacity-80 transition-opacity">
          <img src="/logo.png" alt="Artery Logo" className="w-14 h-14 object-contain" />
          <span className="text-2xl font-bold font-heading text-midnight tracking-tight">ARTERY</span>
        </a>

        <div className="hidden md:flex items-center gap-8">
          <a href="#core" className="text-midnight-muted hover:text-lilac transition-colors font-medium">Core</a>
          <a href="#rails" className="text-midnight-muted hover:text-lilac transition-colors font-medium">Rails</a>
          <a href="#liquidity" className="text-midnight-muted hover:text-lilac transition-colors font-medium">Liquidity</a>
          <a href="#trust" className="text-midnight-muted hover:text-lilac transition-colors font-medium">Trust</a>
        </div>
      </Container>
    </nav>
  );
};
