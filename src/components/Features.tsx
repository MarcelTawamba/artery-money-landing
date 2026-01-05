import React from 'react';
import { Container } from './Container';
import { Card } from './Card';
import { Database, Globe, RefreshCcw, ShieldCheck } from 'lucide-react';

export const Features: React.FC = () => {
  const features = [
    {
      id: 'core',
      title: 'Artery Core',
      description: 'The foundational engine. Multi-currency ledger, smart routing, and reconciliation.',
      icon: Database,
      items: ['Multi-currency ledger', 'Wallet infrastructure', 'Smart routing', 'Risk & compliance logic']
    },
    {
      id: 'rails',
      title: 'Artery Rails',
      description: 'Connectivity to local and global payment rails. One API for everywhere.',
      icon: Globe,
      items: ['Mobile money (MTN, Orange)', 'Bank rails (ACH, SEPA)', 'Cards (Issuing/Acquiring)', 'Cash networks']
    },
    {
      id: 'liquidity',
      title: 'Artery Liquidity',
      description: 'Liquidity, FX, and settlement layer powered by digital rails.',
      icon: RefreshCcw,
      items: ['Multi-currency treasury', 'On/Off-ramps', 'FX pricing & hedging', 'Instant settlement']
    },
    {
      id: 'trust',
      title: 'Artery Trust',
      description: 'Compliance, security, and regulatory tooling built for scale.',
      icon: ShieldCheck,
      items: ['KYC / KYB', 'AML & Monitoring', 'Sanctions screening', 'Regulatory reporting']
    }
  ];

  return (
    <section className="py-24 bg-white" id="features">
      <Container>
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-midnight mb-6">What Artery Powers</h2>
          <p className="text-xl text-midnight-muted max-w-2xl mx-auto">
            The complete stack for moving money. From ledger to liquidity, we handle the infrastructure so you can build the product.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature) => (
            <Card key={feature.id} className="h-full relative overflow-hidden group">
              <div className="flex items-start gap-6">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-xl bg-lilac/10 flex items-center justify-center text-lilac group-hover:bg-lilac group-hover:text-white transition-colors duration-300">
                    <feature.icon className="w-6 h-6" />
                  </div>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-midnight mb-3" id={feature.id}>{feature.title}</h3>
                  <p className="text-midnight-muted mb-6 leading-relaxed">
                    {feature.description}
                  </p>
                  <ul className="space-y-2">
                    {feature.items.map((item, idx) => (
                      <li key={idx} className="flex items-center text-sm font-medium text-midnight-muted">
                        <span className="w-1.5 h-1.5 rounded-full bg-lilac mr-3"></span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
};
