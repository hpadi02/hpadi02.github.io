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

      <div className="hero__content">
        <h1 className="hero__name">
          <span className="hero__name-line hero__animate hero__animate--d1">
            Hugo
          </span>
          <span className="hero__name-line hero__name-line--outline hero__animate hero__animate--d2">
            Padilla
          </span>
        </h1>

        <p
          className="hero__typewriter hero__animate hero__animate--d3"
          aria-live="polite"
        >
          <span className="hero__typewriter-text">{displayText}</span>
          <span className="hero__cursor" aria-hidden="true" />
        </p>

        <p className="hero__bio hero__animate hero__animate--d4">
          CS senior at Texas A&amp;M San Antonio. I build full stack apps, AI
          pipelines, and iOS tools. Some of them have won things.
        </p>

        <div className="hero__actions hero__animate hero__animate--d5">
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
            href="https://www.linkedin.com/in/hugo-padilla-cuadros-tamusa/"
            target="_blank"
            rel="noopener noreferrer"
            className="hero__btn hero__btn--ghost"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </section>
  );
}

export default Hero;
