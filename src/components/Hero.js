import { useState, useEffect, useRef } from "react";
import ParticleField from "./ParticleField";
import "./Hero.css";

const ROLES = [
  "Software Engineer",
  "AI Developer",
  "Full Stack Builder",
  "iOS Developer",
];

function Hero() {
  const [mouse, setMouse] = useState({
    x: typeof window !== "undefined" ? window.innerWidth / 2 : 760,
    y: typeof window !== "undefined" ? window.innerHeight / 2 : 400,
  });
  const rafRef = useRef(null);
  const roleRef = useRef(null);
  const idxRef = useRef(0);
  const charRef = useRef(0);
  const dirRef = useRef("typing");

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        setMouse({ x: e.clientX, y: e.clientY });
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  useEffect(() => {
    let timer;
    const tick = () => {
      const el = roleRef.current;
      if (!el) return;
      const word = ROLES[idxRef.current];
      const speed = dirRef.current === "typing" ? 70 : 40;

      if (dirRef.current === "typing") {
        charRef.current++;
        el.textContent = word.slice(0, charRef.current);
        if (charRef.current === word.length) {
          dirRef.current = "pausing";
          timer = setTimeout(() => {
            dirRef.current = "deleting";
            tick();
          }, 1800);
          return;
        }
      } else if (dirRef.current === "deleting") {
        charRef.current--;
        el.textContent = word.slice(0, charRef.current);
        if (charRef.current === 0) {
          idxRef.current = (idxRef.current + 1) % ROLES.length;
          dirRef.current = "typing";
        }
      }
      timer = setTimeout(tick, speed);
    };
    timer = setTimeout(tick, 600);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="hero" id="hero">
      <div className="hero-content">
        <p className="hero-role">
          <span ref={roleRef} className="role-text" />
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

      <ParticleField mouseX={mouse.x} mouseY={mouse.y} />
    </section>
  );
}

export default Hero;
