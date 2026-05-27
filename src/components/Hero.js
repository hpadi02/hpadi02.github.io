import { useState, useEffect } from "react";
import HeroGraphic from "./HeroGraphic";
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
      <div className="hero-content">
        <p className="hero-role" aria-live="polite">
          <span className="role-text">{displayText}</span>
          <span className="cursor" aria-hidden="true">
            |
          </span>
        </p>

        <h1 className="hero-name">
          Hugo
          <span className="name-outline">Padilla</span>
        </h1>

        <p className="hero-bio">
          CS senior at Texas A&amp;M San Antonio. I build full stack apps, AI
          pipelines, and iOS tools. Some of them have won things.
        </p>

        <div className="hero-actions">
          <a href="#projects" className="btn-primary">
            View Projects
          </a>
          <a
            href="https://github.com/hpadi02"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost"
          >
            GitHub ↗
          </a>
          <a
            href="https://www.linkedin.com/in/hugo-padilla-cuadros-tamusa/"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost"
          >
            LinkedIn ↗
          </a>
        </div>
      </div>

      <HeroGraphic />
    </section>
  );
}

export default Hero;
