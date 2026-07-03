import SettlementFlow from "./SettlementFlow";

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-inner">
        <h1 className="hero-h1">
          The infrastructure moving money <span className="red">in South Africa</span>
        </h1>
        <p className="hero-sub">
          Three rails. One integration. Global platforms reach South Africa&apos;s banked and unbanked customers
          alike — cash, card, and bank app, settled to the currency you run on.
        </p>
        <a href="https://tally.so/r/obg4oP" target="_blank" rel="noopener noreferrer" className="btn-primary">
          Request access
        </a>
        <SettlementFlow />
      </div>
    </section>
  );
}
