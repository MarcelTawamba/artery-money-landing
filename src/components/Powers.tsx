import { IconCollection, IconLedger, IconLiquidity, IconTrust } from "./icons";

const CARDS = [
  {
    icon: IconCollection,
    kicker: "Collection",
    title: "Artery Rails",
    desc: "Three rails, one integration. Cash at 90,000+ retail points, card, or straight from a banking app — the payment methods South Africans already use, reaching banked and unbanked customers alike.",
    items: ["Cash · 90,000+ retail points", "Card · Visa & Mastercard", "Bank app · instant transfer"],
  },
  {
    icon: IconLiquidity,
    kicker: "Settlement",
    title: "Artery Liquidity",
    desc: "FX happens live, and your ledger updates instantly — every transaction converted and recorded the moment it lands. Withdraw to your corporate bank account or wallet within T+2.",
    items: ["Live FX, instant ledger update", "Withdraw to bank account or wallet", "T+2 withdrawal", "Payouts — coming soon"],
  },
  {
    icon: IconLedger,
    kicker: "Ledger",
    title: "Artery Core",
    desc: "Every transaction, one ledger. Each entry records both the ZAR amount and its settlement-currency value, with automatic routing and reconciliation that matches itself.",
    items: ["ZAR + settlement currency, every entry", "Wallet infrastructure", "Smart routing", "Risk & compliance logic"],
  },
  {
    icon: IconTrust,
    kicker: "Compliance",
    title: "Artery Trust",
    desc: "Regulated from day one. Artery is PASA-registered under ABSA sponsorship, with KYC/KYB, sanctions screening, and AML monitoring on every transaction — so you inherit a compliant system, not a liability.",
    items: ["PASA-registered · ABSA sponsor", "KYC / KYB on every partner", "AML & sanctions screening", "FSCA & FIC Act reporting"],
  },
];

export default function Powers() {
  return (
    <section className="powers" id="powers">
      <div className="section-head">
        <h2 className="section-h2">What Artery Powers</h2>
        <p className="section-sub">
          The complete stack for moving money. From ledger to liquidity, we handle the infrastructure so you can
          build the product.
        </p>
      </div>
      <div className="cards">
        {CARDS.map(({ icon: Icon, kicker, title, desc, items }) => (
          <div className="card" key={title}>
            <div className="card-head">
              <div className="card-icon"><Icon /></div>
              <div className="card-headtext">
                <div className="card-kicker">{kicker}</div>
                <div className="card-title">{title}</div>
              </div>
            </div>
            <div className="card-desc">{desc}</div>
            <div className="card-list">
              {items.map((item) => (
                <div className="card-item" key={item}>{item}</div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
