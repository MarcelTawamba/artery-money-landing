import { IconCheck } from "./icons";

const CHECKS = [
  "PASA-registered, ABSA sponsored",
  "FSCA & FIC Act compliant",
  "ZAR and USD recorded on every transaction",
];

export default function Trust() {
  return (
    <section className="scale" id="trust">
      <div className="scale-grid">
        <div>
          <h2 className="scale-h2">
            Built on <span className="red">South African</span> rails. Trusted by regulators.
          </h2>
          <p className="scale-sub">
            Artery is licensed infrastructure, not a workaround. Every transaction runs through a PASA-registered
            system under ABSA sponsorship — built for exchanges, marketplaces, and platforms that need South Africa
            done right.
          </p>
          <div className="checklist">
            {CHECKS.map((label) => (
              <div className="check" key={label}>
                <div className="check-icon"><IconCheck /></div>
                {label}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
