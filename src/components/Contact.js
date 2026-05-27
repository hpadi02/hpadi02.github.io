import "./Contact.css";

const CONTACT_ROWS = [
  {
    label: "Email",
    value: "hugop4420@gmail.com",
    href: "mailto:hugop4420@gmail.com",
    external: false,
  },
  {
    label: "LinkedIn",
    value: "Hugo Padilla Cuadros",
    href: "https://www.linkedin.com/in/hugo-padilla-cuadros-tamusa/",
    external: true,
  },
  {
    label: "GitHub",
    value: "@hpadi02",
    href: "https://github.com/hpadi02",
    external: true,
  },
];

function Contact() {
  return (
    <section className="contact section" id="contact">
      <div className="section__inner contact__inner">
        <h2 className="contact__heading">
          Let&apos;s <span className="outline-text">Connect</span>
        </h2>
        <p className="contact__intro">
          Questions about my work or a project? Reach out by email or on
          LinkedIn.
        </p>

        <ul className="contact__list">
          {CONTACT_ROWS.map((row) => (
            <li key={row.label} className="contact__row">
              <span className="contact__label">{row.label}</span>
              <a
                href={row.href}
                target={row.external ? "_blank" : undefined}
                rel={row.external ? "noopener noreferrer" : undefined}
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
