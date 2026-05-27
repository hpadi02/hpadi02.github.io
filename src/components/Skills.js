import "./Skills.css";

const SKILL_GROUPS = [
  {
    category: "Languages",
    items: ["Python", "JavaScript", "TypeScript", "Swift", "Java", "C++", "SQL"],
  },
  {
    category: "AI/ML",
    items: [
      "PyTorch",
      "scikit-learn",
      "OpenCV",
      "MediaPipe",
      "NLP pipelines",
      "LLM security tooling",
    ],
  },
  {
    category: "Web and Mobile",
    items: [
      "React",
      "Next.js",
      "FastAPI",
      "Node.js",
      "SwiftUI",
      "REST APIs",
      "MongoDB",
    ],
  },
  {
    category: "Data and Infra",
    items: [
      "PostgreSQL",
      "Prisma",
      "Docker",
      "Git",
      "CI/CD",
      "Cloudinary",
      "Auth0",
    ],
  },
  {
    category: "Security and Networks",
    items: [
      "TLS/HTTPS",
      "Socket programming",
      "LLMGuard",
      "Prompt injection defense",
      "JWT auth",
      "Network protocols",
    ],
  },
];

function Skills() {
  return (
    <section className="skills section" id="skills">
      <div className="section__inner">
        <h2 className="section__heading">Skills</h2>
        <div className="skills__grid">
          {SKILL_GROUPS.map((group) => (
            <div key={group.category} className="skills__group">
              <h3 className="skills__category">{group.category}</h3>
              <span className="skills__rule" aria-hidden="true" />
              <ul className="skills__list">
                {group.items.map((item) => (
                  <li key={item} className="skills__item">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Skills;
