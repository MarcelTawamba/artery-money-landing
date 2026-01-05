import React from 'react';
import { Container } from './Container';
import { CheckCircle2 } from 'lucide-react';

export const Details: React.FC = () => {
  return (
    <section className="py-24 bg-white overflow-hidden">
      <Container>
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="lg:w-1/2">
            <h2 className="text-4xl font-bold text-midnight mb-6">Built for scale. Trusted by regulators.</h2>
            <p className="text-lg text-midnight-muted mb-8 leading-relaxed">
              Artery is engineered for high-volume payouts, marketplaces, and digital-native flows. We don't just move money; we ensure it arrives safely and compliantly.
            </p>

            <div className="space-y-4">
              {[
                "Digital-native settlement",
                "Local rails in emerging markets",
                "One unified ledger",
                "Regulatory-first design",
                "Enterprise-grade APIs"
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <CheckCircle2 className="w-6 h-6 text-lilac flex-shrink-0" />
                  <span className="text-lg font-medium text-midnight">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:w-1/2 relative">
            <div className="absolute inset-0 bg-gradient-to-tr from-lilac/20 to-purple-100 rounded-3xl transform rotate-3 scale-105 -z-10"></div>
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 md:p-12 relative z-10">
              <pre className="font-mono text-sm text-gray-800 overflow-x-auto">
                <code className="language-json">
                  {`{
  "transaction": {
    "id": "tx_8f92j29...",
    "amount": 500000,
    "currency": "NGN",
    "rail": "mobile_money",
    "status": "completed",
    "settlement": {
       "asset": "USDX",
       "rate": "1450.50"
    }
  }
}`}
                </code>
              </pre>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};
