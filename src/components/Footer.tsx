import React from 'react';
import { Container } from './Container';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-gray-100 py-16">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-2">
            <a href="/" className="flex items-center gap-4 mb-6 hover:opacity-80 transition-opacity w-fit">
              <img src="/logo.png" alt="Artery Logo" className="w-14 h-14 object-contain" />
              <h3 className="text-2xl font-bold font-heading text-midnight">ARTERY</h3>
            </a>
            <p className="text-midnight-muted max-w-sm mb-6">
              The infrastructure moving money across emerging markets. Global liquidity. Local rails. One unified system.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-midnight mb-4">Platform</h4>
            <ul className="space-y-3 text-midnight-muted">
              <li><a href="#core" className="hover:text-lilac transition-colors">Artery Core</a></li>
              <li><a href="#rails" className="hover:text-lilac transition-colors">Artery Rails</a></li>
              <li><a href="#liquidity" className="hover:text-lilac transition-colors">Artery Liquidity</a></li>
              <li><a href="#trust" className="hover:text-lilac transition-colors">Artery Trust</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-midnight mb-4">Company</h4>
            <ul className="space-y-3 text-midnight-muted">
              <li><a href="#" className="hover:text-lilac transition-colors">About</a></li>
              <li><a href="#" className="hover:text-lilac transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-lilac transition-colors">Contact</a></li>
              <li><a href="#" className="hover:text-lilac transition-colors">Privacy</a></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-400">© {new Date().getFullYear()} Nuage Technologies. All rights reserved.</p>
          <div className="flex gap-6">
            {/* Social icons could go here */}
          </div>
        </div>
      </Container>
    </footer>
  );
};
