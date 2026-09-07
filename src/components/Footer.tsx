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
        <div className="foot-links" style={{ display: 'flex', gap: '24px', alignItems: 'center', flexWrap: 'wrap' }}>
          <a href="https://portal.artery.money" style={{ color: '#9CA3AF', textDecoration: 'none', fontSize: '13px' }}>Developer Portal</a>
          <a href="https://portal.artery.money/login" style={{ color: '#9CA3AF', textDecoration: 'none', fontSize: '13px' }}>Sign In</a>
          <a href="https://tally.so/r/obg4oP" target="_blank" rel="noopener noreferrer" style={{ color: '#E8334A', textDecoration: 'none', fontSize: '13px', fontWeight: 600 }}>Request Access</a>
        </div>
      </div>
      <div className="foot-bottom">
        <div className="foot-copy">© 2026 Artery South Africa (Pty) Ltd. All rights reserved.</div>
      </div>
    </footer>
  );
}
