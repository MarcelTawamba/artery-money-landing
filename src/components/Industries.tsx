import { IconEcommerce, IconExchanges, IconMarketplaces, IconNeobank } from "./icons";

const INDUSTRIES = [
  { icon: IconExchanges, name: "Exchanges", desc: "ZAR on/off-ramps for crypto and digital asset platforms." },
  { icon: IconMarketplaces, name: "Marketplaces", desc: "Collect from buyers and sellers across South Africa, one ledger." },
  { icon: IconEcommerce, name: "E-commerce", desc: "Accept cash, card, and bank app — reach customers card-only checkouts miss." },
  { icon: IconNeobank, name: "Neobanks", desc: "Launch in South Africa on rails and compliance you don't have to build." },
];

export default function Industries() {
  return (
    <section className="industries" id="industries">
      <div className="section-head">
        <h2 className="section-h2">Who We Serve</h2>
        <p className="section-sub">
          Global platforms that need a foothold in South Africa — without building local infrastructure from
          scratch.
        </p>
      </div>
      <div className="ind-grid">
        {INDUSTRIES.map(({ icon: Icon, name, desc }) => (
          <div className="ind-card" key={name}>
            <div className="ind-icon"><Icon /></div>
            <div className="ind-name">{name}</div>
            <div className="ind-desc">{desc}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
