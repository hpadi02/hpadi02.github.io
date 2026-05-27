import "./Contact.css";

const CONTACT_ROWS = [
  {
    label: "Email",
    value: "hugop4420@gmail.com",
    href: "mailto:hugop4420@gmail.com",
  },
  {
    label: "LinkedIn",
    value: "Hugo Padilla Cuadros",
    href: "https://www.linkedin.com/in/hugo-padilla-cuadros-tamusa/",
  },
  {
    label: "GitHub",
    value: "@hpadi02",
    href: "https://github.com/hpadi02",
  },
];

function Contact() {
  return (
    <section className="contact section" id="contact">
      <div className="section__inner contact__inner">
        <h2 className="section__heading">
          Let&apos;s <span className="outline-text">Connect</span>
        </h2>
        <p className="contact__intro">
          I am graduating in May 2026 and actively looking for new grad software
          engineering, AI, and data roles. U.S. work authorized with no
          sponsorship required.
        </p>

        <ul className="contact__list">
          {CONTACT_ROWS.map((row) => (
            <li key={row.label} className="contact__row">
              <span className="contact__label">{row.label}</span>
              <a
                href={row.href}
                target={row.href.startsWith("http") ? "_blank" : undefined}
                rel={
                  row.href.startsWith("http") ? "noopener noreferrer" : undefined
                }
                className="contact__value"
              >
                {row.value}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default Contact;
