import { useState, useEffect } from "react";
import "./Hero.css";

const ROLES = [
  "Software Engineer",
  "AI Developer",
  "Full Stack Builder",
  "CS Graduate",
];

const TYPE_SPEED = 70;
const DELETE_SPEED = 40;
const PAUSE_MS = 1800;

function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentRole = ROLES[roleIndex];
    let timeout;

    if (!isDeleting && displayText === currentRole) {
      timeout = setTimeout(() => setIsDeleting(true), PAUSE_MS);
    } else if (isDeleting && displayText === "") {
      timeout = setTimeout(() => {
        setIsDeleting(false);
        setRoleIndex((prev) => (prev + 1) % ROLES.length);
      }, 400);
    } else {
      const nextLength = isDeleting
        ? displayText.length - 1
        : displayText.length + 1;
      const nextText = currentRole.slice(0, nextLength);
      timeout = setTimeout(() => {
        setDisplayText(nextText);
      }, isDeleting ? DELETE_SPEED : TYPE_SPEED);
    }

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, roleIndex]);

  return (
    <section className="hero" id="hero">
      <div className="hero__orb hero__orb--1" aria-hidden="true" />
      <div className="hero__orb hero__orb--2" aria-hidden="true" />
      <div className="hero__grid" aria-hidden="true" />

      <div className="hero__content">
        <div className="hero__eyebrow hero__animate" style={{ animationDelay: "0.1s" }}>
          <span className="hero__eyebrow-line" />
          <span>Available for new grad roles</span>
        </div>

        <h1 className="hero__name">
          <span className="hero__name-line hero__animate" style={{ animationDelay: "0.2s" }}>
            Hugo
          </span>
          <span
            className="hero__name-line hero__name-line--outline hero__animate"
            style={{ animationDelay: "0.3s" }}
          >
            Padilla
          </span>
        </h1>

        <p
          className="hero__typewriter hero__animate"
          style={{ animationDelay: "0.4s" }}
          aria-live="polite"
        >
          <span className="hero__typewriter-text">{displayText}</span>
          <span className="hero__cursor" aria-hidden="true" />
        </p>

        <p className="hero__bio hero__animate" style={{ animationDelay: "0.5s" }}>
          CS senior at Texas A&amp;M San Antonio graduating May 2026. I build full
          stack apps and AI systems, from hackathon winners to production style
          backends. Open to software engineering, AI, and data roles.
        </p>

        <div className="hero__actions hero__animate" style={{ animationDelay: "0.6s" }}>
          <a href="#projects" className="hero__btn hero__btn--primary">
            View Projects
          </a>
          <a
            href="https://github.com/hpadi02"
            target="_blank"
            rel="noopener noreferrer"
            className="hero__btn hero__btn--ghost"
          >
            GitHub
          </a>
          <a
            href="https://linkedin.com/in/hugopadillacuadros"
            target="_blank"
            rel="noopener noreferrer"
            className="hero__btn hero__btn--ghost"
          >
            LinkedIn
          </a>
        </div>

        <div className="hero__stats hero__animate" style={{ animationDelay: "0.7s" }}>
          <div className="hero__stat">
            <span className="hero__stat-num">3.84</span>
            <span className="hero__stat-label">GPA</span>
          </div>
          <span className="hero__stat-divider" aria-hidden="true" />
          <div className="hero__stat">
            <span className="hero__stat-num">6+</span>
            <span className="hero__stat-label">Projects</span>
          </div>
          <span className="hero__stat-divider" aria-hidden="true" />
          <div className="hero__stat">
            <span className="hero__stat-num">AI</span>
            <span className="hero__stat-label">Certificate</span>
          </div>
        </div>
      </div>

      <div className="hero__scroll" aria-hidden="true">
        <span className="hero__scroll-line" />
      </div>
    </section>
  );
}

export default Hero;
