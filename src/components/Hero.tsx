import React from 'react';
import { Container } from './Container';
import { Button } from './Button';

export const Hero: React.FC = () => {
  return (
    <section className="pt-32 pb-20 lg:pt-48 lg:pb-32 relative overflow-hidden">
      <Container className="relative z-10 text-center">
        <h1 className="text-5xl md:text-7xl font-bold font-heading text-midnight mb-6 leading-tight">
          The infrastructure moving money <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-lilac to-purple-400">across emerging markets.</span>
        </h1>
        <p className="text-xl md:text-2xl text-midnight-muted max-w-3xl mx-auto mb-10 leading-relaxed">
          Global liquidity. Local rails. One unified system. Artery connects global liquidity to local payment networks.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button size="lg">Join the waitlist</Button>
        </div>
      </Container>

      {/* Background decoration */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl -z-10 pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-lilac/10 rounded-full blur-3xl opacity-60 mix-blend-multiply animate-blob"></div>
        <div className="absolute top-20 right-10 w-96 h-96 bg-purple-300/10 rounded-full blur-3xl opacity-60 mix-blend-multiply animate-blob animation-delay-2000"></div>
      </div>
    </section>
  );
};
