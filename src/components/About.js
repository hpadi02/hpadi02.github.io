import "./About.css";

const TIMELINE = [
  {
    year: "2026",
    label: "Graduating",
    detail: "B.S. Computer Science, Texas A&M San Antonio",
  },
  {
    year: "2025",
    label: "AI Certificate",
    detail: "Undergraduate Certificate in AI Systems Development",
  },
  {
    year: "2024",
    label: "HackUTD Win",
    detail: "PNC track winner with HERMES retirement platform",
  },
  {
    year: "2023",
    label: "Research",
    detail: "Early ML and software engineering coursework and labs",
  },
];

const BADGES = ["San Antonio, TX", "Open to remote"];

function About() {
  return (
    <section className="about section" id="about">
      <div className="section__inner about__grid">
        <div className="about__text">
          <h2 className="section__heading">
            Builder. Engineer.{" "}
            <span className="outline-text">Problem Solver.</span>
          </h2>
          <p className="about__paragraph">
            I am a computer science senior at Texas A&amp;M San Antonio with a
            3.84 GPA and hands on experience across full stack web, mobile, and
            AI. I have shipped hackathon winners, open source security tooling,
            and course projects that go beyond the minimum requirements.
          </p>
          <p className="about__paragraph">
            I am a U.S. citizen authorized to work in the United States and do
            not require visa sponsorship. I am open to relocation and remote
            roles starting after graduation in May 2026.
          </p>
          <div className="about__badges">
            {BADGES.map((badge) => (
              <span key={badge} className="about__badge">
                {badge}
              </span>
            ))}
          </div>
        </div>

        <div className="about__timeline">
          {TIMELINE.map((item, index) => (
            <div key={item.year} className="about__timeline-item">
              <div className="about__timeline-marker">
                <span className="about__timeline-dot" />
                {index < TIMELINE.length - 1 && (
                  <span className="about__timeline-line" aria-hidden="true" />
                )}
              </div>
              <div className="about__timeline-content">
                <span className="about__timeline-year">{item.year}</span>
                <h3 className="about__timeline-label">{item.label}</h3>
                <p className="about__timeline-detail">{item.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default About;
