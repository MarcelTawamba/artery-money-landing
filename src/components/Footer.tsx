import { ArteryLogo } from "./Logo";

export default function Footer() {
  return (
    <footer className="foot">
      <div className="foot-top">
        <div className="foot-brand">
          <ArteryLogo />
          <p className="foot-desc">
            The infrastructure moving money across emerging markets. Global liquidity. Local rails. One unified
            system.
          </p>
        </div>
      </div>
      <div className="foot-bottom">
        <div className="foot-copy">© 2026 Artery South Africa (Pty) Ltd. All rights reserved.</div>
      </div>
    </footer>
  );
}
