import { useEffect, useRef } from "react";
import "./ParticleField.css";

const PARTICLE_COUNT = 130;
const PARTICLE_RADIUS = 2.2;
const REPEL_RADIUS = 110;
const REPEL_STRENGTH = 3.5;
const FLOAT_BACK_SPEED = 0.042;
const PARTICLE_COLOR = "rgba(0, 113, 227, 0.45)";
const PARTICLE_COLOR_CLOSE = "rgba(0, 113, 227, 0.9)";

function ParticleField({ mouseX, mouseY }) {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const rafRef = useRef(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });

  useEffect(() => {
    mouseRef.current = { x: mouseX, y: mouseY };
  }, [mouseX, mouseY]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    const initParticles = () => {
      particlesRef.current = Array.from({ length: PARTICLE_COUNT }, () => {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        return { x, y, originX: x, originY: y, vx: 0, vy: 0 };
      });
    };

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      initParticles();
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const rect = canvas.getBoundingClientRect();
      const localMouseX = mouseRef.current.x - rect.left;
      const localMouseY = mouseRef.current.y - rect.top;

      particlesRef.current.forEach((p) => {
        const dx = localMouseX - p.x;
        const dy = localMouseY - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < REPEL_RADIUS && dist > 0) {
          const force = (REPEL_RADIUS - dist) / REPEL_RADIUS;
          const angle = Math.atan2(dy, dx);
          p.vx -= Math.cos(angle) * force * REPEL_STRENGTH;
          p.vy -= Math.sin(angle) * force * REPEL_STRENGTH;
        }

        p.vx += (p.originX - p.x) * FLOAT_BACK_SPEED;
        p.vy += (p.originY - p.y) * FLOAT_BACK_SPEED;

        p.vx *= 0.78;
        p.vy *= 0.78;

        p.x += p.vx;
        p.y += p.vy;

        const distFromCursor = Math.sqrt(
          Math.pow(localMouseX - p.x, 2) + Math.pow(localMouseY - p.y, 2)
        );
        const isClose = distFromCursor < REPEL_RADIUS * 0.7;

        ctx.beginPath();
        ctx.arc(p.x, p.y, PARTICLE_RADIUS, 0, Math.PI * 2);
        ctx.fillStyle = isClose ? PARTICLE_COLOR_CLOSE : PARTICLE_COLOR;
        ctx.fill();
      });

      rafRef.current = requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener("resize", resize);
    draw();

    return () => {
      window.removeEventListener("resize", resize);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const gradX = (mouseX / window.innerWidth) * 100;
  const gradY = (mouseY / window.innerHeight) * 100;

  return (
    <div className="particle-wrap">
      <div
        className="particle-gradient"
        style={{
          background: `radial-gradient(
            ellipse 70% 70% at ${gradX}% ${gradY}%,
            rgba(0, 113, 227, 0.09) 0%,
            rgba(0, 113, 227, 0.03) 50%,
            transparent 100%
          )`,
        }}
      />
      <canvas ref={canvasRef} className="particle-canvas" />
    </div>
  );
}

export default ParticleField;
