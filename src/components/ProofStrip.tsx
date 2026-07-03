const ITEMS = [
  { n: "90,000+", l: "Retail collection points across South Africa", tone: "red" },
  { n: "T+2", l: "Settlement time. Transactions hit your ledger instantly", tone: null },
  { n: "PASA", l: "Registered under ABSA sponsorship", tone: "red" },
  { n: "Live", l: "Collections today. Payouts launching soon", tone: "teal" },
] as const;

export default function ProofStrip() {
  return (
    <div className="proof">
      {ITEMS.map((item) => (
        <div className="proof-item" key={item.l}>
          <div className="proof-n">
            {item.tone ? <span className={item.tone}>{item.n}</span> : item.n}
          </div>
          <div className="proof-l">{item.l}</div>
        </div>
      ))}
    </div>
  );
}
