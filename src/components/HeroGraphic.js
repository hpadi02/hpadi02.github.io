import "./HeroGraphic.css";

function HeroGraphic() {
  return (
    <div className="hero-graphic-wrap">
      <svg
        viewBox="0 0 500 600"
        xmlns="http://www.w3.org/2000/svg"
        className="hero-graphic-svg"
        aria-hidden="true"
      >
        {Array.from({ length: 8 }).map((_, row) =>
          Array.from({ length: 6 }).map((_, col) => (
            <circle
              key={`${row}-${col}`}
              cx={60 + col * 64}
              cy={60 + row * 68}
              r={2.5}
              fill="#d1d1d6"
              className={`dot dot-${(row * 6 + col) % 4}`}
            />
          ))
        )}

        <line
          x1="80"
          y1="0"
          x2="460"
          y2="600"
          stroke="#e5e5ea"
          strokeWidth="1"
        />
        <line
          x1="0"
          y1="120"
          x2="500"
          y2="480"
          stroke="#e5e5ea"
          strokeWidth="1"
        />

        <circle
          cx="320"
          cy="300"
          r="180"
          fill="none"
          stroke="#d1d1d6"
          strokeWidth="1.5"
          className="circle-large"
        />

        <circle
          cx="220"
          cy="220"
          r="90"
          fill="rgba(0, 113, 227, 0.06)"
          stroke="rgba(0, 113, 227, 0.15)"
          strokeWidth="1"
          className="circle-medium"
        />

        <rect
          x="288"
          y="108"
          width="12"
          height="12"
          fill="#0071e3"
          opacity="0.7"
          className="accent-square"
        />

        <circle
          cx="400"
          cy="460"
          r="40"
          fill="none"
          stroke="rgba(0, 113, 227, 0.2)"
          strokeWidth="1"
        />
      </svg>
    </div>
  );
}

export default HeroGraphic;
