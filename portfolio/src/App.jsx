import { useState, useEffect, useRef } from "react";
import "./App.css";

const NAV_LINKS = ["About", "Experience", "Projects", "Skills", "Contact"];

const SKILLS = {
  "Languages": ["Python", "JavaScript", "C", "TypeScript",],
  "Frontend": ["React.js", "HTML5", "CSS3", "Tailwind CSS", "Next.js"],
  "Backend": [ "Node.js", "Express", "REST APIs", "JWT"],
  "Databases": ["MySQL", "MongoDB", "PostgreSQL"],
  "Cloud & DevOps": ["Azure", "AWS", "Docker", "Terraform", "Bicep", "GitHub Actions"],
  "Core": ["Data Structures", "Algorithms", "OOPs", "System Design", "Agile"],
};

const PROJECTS = [
  {
    title: "TaskFlow — Team Task Tracker API",
    stack: ["Node.js", "TypeScript", "Express", "PostgreSQL", "React.js", "Docker", "Redis", "JWT", "REST APIs"],
    emoji: "✔️",
    color: "rgb(37, 162, 79)",
    description: "Full-stack task management platform with JWT authentication, role-based access control, and Redis caching. Built a production-ready REST API with containerized deployment supporting multi-role team workflows.",
    highlight: "Designed RBAC middleware enforcing 3 permission tiers (Admin, Manager, Member) at the middleware level - zero role checks in controller logic, making permissions auditable from a single file.",
    link: "https://github.com/SakshiCvedi/Task_tracker",
    published_link: "https://task-tracker-eta-drab-36.vercel.app"
  },
  {
    title: "Seller Dashboard MVP",
    stack: ["React.js", "Node.js", "Express", "REST APIs", "JWT"],
    emoji: "🛒",
    color: "#4ecdc4",
    description: "Full-stack seller portal with product listing management, dynamic fee calculation, and promotion application using React and an Express-based RESTful backend.",
    highlight: "Implemented JWT-based authentication and clean frontend-backend architecture supporting onboarding and pricing workflows from scratch.",
    link: "https://github.com/SakshiCvedi/Seller-Dashboard"
  },
  {
    title: "AI-Powered Threat Model Detector",
    stack: ["Python", "Anthropic Claude API"],
    emoji: "🛡️",
    color: "#ff6b6b",
    description: "Built a threat model analyzer that parses input from files (.md, .txt) or raw text, with a modular pipeline featuring file type detection, UTF-8 encoding support, and structured dictionary outputs.",
    highlight: "Integrated Anthropic Claude API to automate threat classification — reducing manual security review effort significantly.",
    link: "https://github.com/SakshiCvedi/Threat-model-generator"
  },
];

function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return [ref, inView];
}

function Section({ id, children, className = "" }) {
  const [ref, inView] = useInView();
  return (
    <section id={id} ref={ref} className={`section ${inView ? "visible" : ""} ${className}`}>
      {children}
    </section>
  );
}

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
      <div className="nav-logo" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
        SC<span className="dot">.</span>
      </div>
      <div className={`nav-links ${menuOpen ? "open" : ""}`}>
        {NAV_LINKS.map((link) => (
          <button key={link} className="nav-link" onClick={() => scrollTo(link)}>{link}</button>
        ))}
      </div>
      <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
        <span /><span /><span />
      </button>
    </nav>
  );
}

function Hero() {
  return (
    <section id="about" className="hero">
      <div className="hero-bg">
        <div className="blob blob1" />
        <div className="blob blob2" />
        <div className="grid-lines" />
      </div>
      <div className="hero-content">
        <div className="hero-badge">👋 Available for new opportunities</div>
        <h1 className="hero-name">
          Sakshi<br />
          <span className="accent">Chaturvedi</span>
        </h1>
        <p className="hero-role">Software Engineer · Cloud Security · Full Stack</p>
        <p className="hero-bio">
          2 years building automation tools and cloud compliance systems at Accenture.
          Passionate about scalable full-stack systems, seller-facing products, and security engineering.
        </p>
        <div className="hero-actions">
          <a href="https://mail.google.com/mail/?view=cm&fs=1&to=beingchaturvedi27@gmail.com" target="_blank" rel="noreferrer" className="btn btn-primary">Get In Touch</a>
          <a href="https://github.com/SakshiCvedi" target="_blank" rel="noreferrer" className="btn btn-outline">GitHub ↗</a>
        </div>
        <div className="hero-stats">
          <div className="stat"><span>2+</span><p>Years Exp.</p></div>
          <div className="stat-sep" />
          <div className="stat"><span>AZ-500</span><p>Certified</p></div>
          <div className="stat-sep" />
          <div className="stat"><span>3</span><p>Projects</p></div>
        </div>
      </div>
      <div className="hero-scroll-hint">scroll ↓</div>
    </section>
  );
}

function Experience() {
  return (
    <Section id="experience">
      <div className="section-label">Work Experience</div>
      <h2 className="section-title">Where I've Worked</h2>
      <div className="timeline">
        <div className="timeline-item">
          <div className="timeline-dot" />
          <div className="timeline-card">
            <div className="card-header">
              <div>
                <h3>Associate Software Engineer</h3>
                <p className="company">Accenture</p>
              </div>
              <span className="badge">Jul 2024 – Present</span>
            </div>
            <ul className="card-bullets">
              <li>Contributed to a cloud security delivery project within a 10-member Agile team, designing and implementing governance and compliance frameworks across Azure cloud resources using <strong>Azure Policy</strong> and <strong>Terraform</strong>.</li>
              <li>Developed automation and validation scripts in <strong>Python</strong>, collaborating in code reviews and sprint planning to ensure high-quality delivery.</li>
            </ul>
            <div className="tag-row">
              {["Azure", "Terraform", "Python", "Agile", "Cloud Security", "Microsoft Sentinel"].map((t) => (
                <span key={t} className="tag">{t}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="edu-section">
        <div className="section-label" style={{ marginTop: "3rem" }}>Education</div>
        <div className="edu-grid">
          <div className="edu-card">
            <div className="edu-year">2020 – 2024</div>
            <h4>B.Tech in Computer Science & Engineering</h4>
            <p>GPA: 7.8 / 10</p>
          </div>
          <div className="edu-card">
            <div className="edu-year">2020</div>
            <h4>Class 12th — CBSE</h4>
            <p>89.8%</p>
          </div>
          <div className="edu-card">
            <div className="edu-year">2018</div>
            <h4>Class 10th — CBSE</h4>
            <p>90.2%</p>
          </div>
        </div>
      </div>
    </Section>
  );
}

function Projects() {
  return (
    <Section id="projects">
      <div className="section-label">Projects</div>
      <h2 className="section-title">Things I've Built</h2>
      <div className="projects-grid">
        {PROJECTS.map((p) => (
          <div className="project-card" key={p.title} style={{ "--accent": p.color }}>
            <div className="project-top">
              <span className="project-emoji">{p.emoji}</span>
              <div className="project-links">
                <a href={p.link} target="_blank" rel="noreferrer" className="icon-link">⬡ GitHub</a>
                <a href={p.published_link} target="_blank" rel="noreferrer" className="icon-link">⬡ Live Demo</a>
              </div>
            </div>
            <h3 className="project-title">{p.title}</h3>
            <p className="project-desc">{p.description}</p>
            <div className="project-highlight">💡 {p.highlight}</div>
            <div className="tag-row">
              {p.stack.map((s) => (
                <span key={s} className="tag" style={{ borderColor: p.color, color: p.color }}>{s}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}

function Skills() {
  return (
    <Section id="skills">
      <div className="section-label">Skills</div>
      <h2 className="section-title">My Toolbox</h2>
      <div className="skills-grid">
        {Object.entries(SKILLS).map(([category, items]) => (
          <div className="skills-group" key={category}>
            <h4 className="skills-cat">{category}</h4>
            <div className="skills-pills">
              {items.map((skill) => (
                <span key={skill} className="skill-pill">{skill}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="cert-banner">
        <span className="cert-icon">🏅</span>
        <div>
          <p className="cert-label">Certification</p>
          <p className="cert-name">AZ-500 · Microsoft Azure Security Technologies</p>
        </div>
        <a href="https://learn.microsoft.com/en-us/users/sakshichaturvedi-4146/transcript/vjzr4hyym0k303w" className="btn btn-outline btn-sm">View ↗</a>
      </div>
    </Section>
  );
}

function Contact() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <Section id="contact">
      <div className="section-label">Contact</div>
      <h2 className="section-title">Let's Connect</h2>
      <div className="contact-wrap">
        <div className="contact-left">
          <p className="contact-copy">
            I'm currently open to full-time roles and interesting projects. Whether you have a question or just want to say hi — my inbox is always open!
          </p>
          <div className="social-links">
            <a href="https://github.com/SakshiCvedi" target="_blank" rel="noreferrer" className="social-btn">GitHub</a>
            <a href="https://www.linkedin.com/in/sakshi-chaturvedi-29476b210" target="_blank" rel="noreferrer" className="social-btn">LinkedIn</a>
            <a href="https://mail.google.com/mail/?view=cm&fs=1&to=beingchaturvedi27@gmail.com" target="_blank" rel="noreferrer" className="social-btn">Email</a>
          </div>
        </div>
        <div className="contact-right">
          {sent ? (
            <div className="sent-msg">✅ Message sent! I'll get back to you soon.</div>
          ) : (
            <div className="contact-form">
              <div className="form-group">
                <label>Name</label>
                <input name="name" placeholder="Your name" value={form.name} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input name="email" type="email" placeholder="your@email.com" value={form.email} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label>Message</label>
                <textarea name="message" rows={4} placeholder="What's on your mind?" value={form.message} onChange={handleChange} />
              </div>
              <button className="btn btn-primary" style={{ width: "100%" }} onClick={handleSubmit}>
                Send Message →
              </button>
            </div>
          )}
        </div>
      </div>
    </Section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <p>Designed & Built by <strong>Sakshi Chaturvedi</strong></p>
      <p className="footer-sub">© {new Date().getFullYear()} · All rights reserved</p>
    </footer>
  );
}

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Experience />
        <Projects />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </>
  );
}