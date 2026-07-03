import { ArteryLogo } from "./Logo";

export default function Nav() {
  return (
    <nav className="nav">
      <ArteryLogo />
      <div className="nav-links">
        <a href="#powers">Product</a>
        <a href="#industries">Industries</a>
        <a href="#trust">Compliance</a>
      </div>
      <div className="nav-ctas">
        <a href="https://tally.so/r/obg4oP" target="_blank" rel="noopener noreferrer" className="nav-cta">
          Request access
        </a>
      </div>
    </nav>
  );
}
