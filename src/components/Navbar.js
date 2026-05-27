import { useState, useEffect } from "react";
import "./Navbar.css";

const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className={`navbar ${scrolled ? "navbar--scrolled" : ""}`}>
      <div className="navbar__inner">
        <a href="#hero" className="navbar__logo" onClick={closeMenu}>
          HP<span className="navbar__logo-dot">.</span>
        </a>

        <nav className="navbar__nav" aria-label="Main navigation">
          {NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href} className="navbar__link">
              {link.label}
            </a>
          ))}
          <a
            href="https://github.com/hpadi02"
            target="_blank"
            rel="noopener noreferrer"
            className="navbar__github-btn"
          >
            GitHub
          </a>
        </nav>

        <button
          type="button"
          className={`navbar__hamburger ${menuOpen ? "navbar__hamburger--open" : ""}`}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      <div
        className={`navbar__overlay ${menuOpen ? "navbar__overlay--visible" : ""}`}
        onClick={closeMenu}
        aria-hidden="true"
      />

      <aside className={`navbar__drawer ${menuOpen ? "navbar__drawer--open" : ""}`}>
        <nav className="navbar__drawer-nav" aria-label="Mobile navigation">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="navbar__drawer-link"
              onClick={closeMenu}
            >
              {link.label}
            </a>
          ))}
          <a
            href="https://github.com/hpadi02"
            target="_blank"
            rel="noopener noreferrer"
            className="navbar__drawer-github"
            onClick={closeMenu}
          >
            GitHub
          </a>
        </nav>
      </aside>
    </header>
  );
}

export default Navbar;
