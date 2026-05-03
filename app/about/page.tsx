import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About — Yashika Jotwani",
  description:
    "Backend engineer at HackerRank, based in Delhi. Building scalable backends by day and chasing quiet, considered design by night.",
};

type Role = {
  when: string;
  where: string;
  what: string;
  desc: string;
  tags: { label: string; current?: boolean }[];
};

const roles: Role[] = [
  {
    when: "Mar 2025 — Present",
    where: "HackerRank",
    what: "SDE 2 · Backend",
    desc:
      "Building and maintaining scalable systems that power HackerRank's platform — the services that quietly carry millions of code submissions each month.",
    tags: [{ label: "Now", current: true }, { label: "Backend" }, { label: "Scale" }],
  },
  {
    when: "2024 — Mar 2025",
    where: "HackerRank",
    what: "SDE 1 · Backend",
    desc:
      "Joined full-time as a backend engineer. Contributed to core platform development and the work of keeping our backend services calm under load.",
    tags: [{ label: "Full-time" }, { label: "Platform" }],
  },
  {
    when: "2023",
    where: "HackerRank",
    what: "Software Developer Intern",
    desc:
      "Interned on the engineering team — backend development, my first encounters with production systems, and a great deal of learning by reading other people's code.",
    tags: [{ label: "Internship" }],
  },
  {
    when: "2022",
    where: "Google Summer of Code · OpenWisp",
    what: "Open-Source Contributor",
    desc:
      "Selected for GSoC 2022 with OpenWisp — an open-source network management project. Shipped core features alongside contributors from across the world.",
    tags: [{ label: "GSoC" }, { label: "Open Source" }],
  },
  {
    when: "2022",
    where: "MLH Fellowship · Solana Labs",
    what: "MLH Fellow",
    desc:
      "Joined the Major League Hacking Fellowship, working on collaborative projects with Solana Labs.",
    tags: [{ label: "Fellowship" }, { label: "Web3" }],
  },
  {
    when: "2022",
    where: "Suborbital",
    what: "GitHub Extern",
    desc:
      "Contributed to open-source projects at Suborbital as part of the GitHub Externship program — my first taste of working in public.",
    tags: [{ label: "Externship" }, { label: "Open Source" }],
  },
];

type Chip = { label: string; size?: "big"; mono?: boolean; ast?: boolean };

const skills: Chip[] = [
  { label: "TypeScript", size: "big", ast: true },
  { label: "React" },
  { label: "Next.js" },
  { label: "node.js", mono: true },
  { label: "Tailwind" },
  { label: "Python", size: "big", ast: true },
  { label: "postgresql", mono: true },
  { label: "git", mono: true },
  { label: "Figma" },
  { label: "docker", mono: true },
];

export default function AboutPage() {
  return (
    <main className="about-main">
      {/* HERO */}
      <section className="hero-row">
        <div>
          <div className="about-eyebrow">
            <span className="bar" />
            <span>About · backend engineer at HackerRank · based in Delhi</span>
          </div>
          <h1 className="about-title">
            <span className="roman">A</span> developer{" "}
            <span className="ampersand">&amp;</span> a designer
            <span style={{ color: "var(--accent)" }}>.</span>
          </h1>
          <p className="about-lede">
            I build <em>scalable backends</em> by day and chase{" "}
            <em>quiet, considered design</em> by night. Most of what I make starts as a{" "}
            <span className="accent">careful sentence</span> in a notebook — then becomes
            code that, with luck, no one notices.
          </p>
        </div>

        <div className="portrait" aria-hidden="true">
          <div className="pin">↳ Delhi · IST</div>
          <div className="yj">YJ</div>
          <div className="caption">
            <span>Self-portrait</span>
            <span className="v">MMXXVI</span>
          </div>
        </div>
      </section>

      {/* EXPERIENCE */}
      <section>
        <div className="section-rule">
          <span className="label">// experience</span>
          <span className="star">✱</span>
        </div>

        <h2 className="section-title">Where I&apos;ve spent my hours.</h2>
        <p className="section-sub">
          A timeline of roles, internships, and fellowships — listed newest first.
        </p>

        <div className="timeline">
          {roles.map((r, i) => (
            <div className="role-row" key={i}>
              <div className="when">{r.when}</div>
              <div>
                <div className="where">{r.where}</div>
                <div className="what">{r.what}</div>
                <p className="desc">{r.desc}</p>
              </div>
              <div className="tags">
                {r.tags.map((t) => (
                  <span key={t.label} className={`tag${t.current ? " cur" : ""}`}>
                    {t.label}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SKILLS */}
      <section className="skills-section">
        <div>
          <div className="section-rule" style={{ margin: "0 0 24px" }}>
            <span className="label">// skills</span>
            <span className="star">✱</span>
          </div>
          <h2 className="section-title">Tools I reach for.</h2>
          <p
            className="section-sub"
            style={{ marginTop: 14, marginBottom: 0, maxWidth: 280 }}
          >
            A small, reliable kit. The shape of it changes slowly, on purpose.
          </p>
        </div>
        <div className="skill-cloud">
          {skills.map((c) => {
            const cls = ["chip", c.size === "big" ? "big" : "", c.mono ? "mono" : ""]
              .filter(Boolean)
              .join(" ");
            return (
              <span key={c.label} className={cls}>
                {c.ast && <span className="ast">✱</span>}
                {c.label}
              </span>
            );
          })}
        </div>
      </section>

      {/* FACTS */}
      <section className="facts">
        <div className="fact">
          <div className="k">Based in</div>
          <div className="v">Delhi, India</div>
        </div>
        <div className="fact">
          <div className="k">Currently</div>
          <div className="v">
            <span className="accent">SDE 2</span> · HackerRank
          </div>
        </div>
        <div className="fact">
          <div className="k">Languages</div>
          <div className="v">English, Hindi</div>
        </div>
        <div className="fact">
          <div className="k">Off the clock</div>
          <div className="v">Reading, walking</div>
        </div>
      </section>

      {/* CONTACT */}
      <section className="contact-card">
        <div className="glyph">✱</div>
        <h3>
          Want to <span className="accent">build something quiet</span> together?
        </h3>
        <p>
          I read every email. The best ones say what you&apos;re working on and what&apos;s
          getting in the way — I&apos;ll write back within a few days.
        </p>
        <div className="cta-row">
          <a className="about-cta primary" href="mailto:hello@yashika.dev">
            <span>hello@yashika.dev</span>
            <span className="arrow">↗</span>
          </a>
          <a
            className="about-cta"
            href="https://github.com/yashikajotwani12"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span>github</span>
            <span className="arrow">↗</span>
          </a>
          <a
            className="about-cta"
            href="https://read.cv"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span>read.cv</span>
            <span className="arrow">↗</span>
          </a>
        </div>
      </section>
    </main>
  );
}
