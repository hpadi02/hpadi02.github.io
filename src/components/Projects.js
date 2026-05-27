import { useState, useMemo } from "react";
import projects from "../data/projects";
import "./Projects.css";

function GitHubIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.36-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

function CodeIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden="true"
    >
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  );
}

function ExternalIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden="true"
    >
      <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  );
}

function Projects() {
  const allTags = useMemo(() => {
    const tagSet = new Set();
    projects.forEach((p) => p.tags.forEach((t) => tagSet.add(t)));
    return ["All", ...Array.from(tagSet).sort()];
  }, []);

  const [activeFilter, setActiveFilter] = useState("All");

  const filtered =
    activeFilter === "All"
      ? projects
      : projects.filter((p) => p.tags.includes(activeFilter));

  return (
    <section className="projects section" id="projects">
      <div className="section__inner">
        <h2 className="section__heading">
          What I&apos;ve <span className="outline-text">Built</span>
        </h2>

        <div className="projects__filters">
          {allTags.map((tag) => (
            <button
              key={tag}
              type="button"
              className={`projects__filter ${
                activeFilter === tag ? "projects__filter--active" : ""
              }`}
              onClick={() => setActiveFilter(tag)}
            >
              {tag}
            </button>
          ))}
        </div>

        <div className="projects__grid">
          {filtered.map((project) => (
            <article key={project.id} className="projects__card">
              <div className="projects__card-header">
                <span className="projects__card-icon">
                  <CodeIcon />
                </span>
                <div className="projects__card-links">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${project.title} on GitHub`}
                  >
                    <GitHubIcon />
                  </a>
                  {project.live && (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${project.title} live demo`}
                    >
                      <ExternalIcon />
                    </a>
                  )}
                </div>
              </div>

              <h3 className="projects__card-title">{project.title}</h3>
              <p className="projects__card-subtitle">{project.subtitle}</p>
              <p className="projects__card-desc">{project.description}</p>

              <div className="projects__tech">
                {project.tech.map((t) => (
                  <span key={t} className="projects__tech-chip">
                    {t}
                  </span>
                ))}
              </div>

              <div className="projects__tags">
                {project.tags.map((t) => (
                  <span key={t} className="projects__tag-chip">
                    {t}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Projects;
