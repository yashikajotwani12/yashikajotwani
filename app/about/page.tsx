import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About — Yashika Jotwani",
  description:
    "Backend engineer at HackerRank, based in Delhi. Scalable systems, open source, and the experience behind the work.",
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

const toolkit = [
  { title: "Languages", items: ["TypeScript", "Python"] },
  { title: "Application", items: ["React", "Next.js", "Node.js"] },
  { title: "Infrastructure", items: ["PostgreSQL", "Docker", "Git"] },
  { title: "Interface", items: ["Tailwind CSS", "Figma"] },
];

export default function AboutPage() {
  return <main className="profile-page">
    <section className="profile-intro">
      <p className="mono profile-label">02 / THE PERSON BEHIND THE CODE</p>
      <h1>Systems thinker.<br/><span>Detail obsessive.</span><br/>Always a builder.</h1>
      <div className="profile-summary"><p>I’m Yashika, a backend engineer at HackerRank. I build scalable systems, contribute to open source, and care about how software feels to the people using it.</p><a className="profile-github" href="https://github.com/yashikajotwani12" target="_blank" rel="noopener noreferrer">Find me on GitHub <span>↗</span></a></div>
    </section>
    <section className="profile-grid" aria-label="At a glance">
      <div className="profile-now"><div className="mono"><i className="status-light"/> CURRENT CHAPTER</div><h2>HackerRank<span>↗</span></h2><p>SDE 2 · Backend engineering</p><div className="mono now-since">SINCE MAR 2025</div></div>
      <div className="profile-fact"><span className="mono">HOME BASE</span><h2>Delhi, India<span>↗ 28.61° N / 77.23° E</span></h2><p>English & Hindi</p></div>
      <div className="profile-fact"><span className="mono">AWAY FROM THE KEYBOARD</span><h2>Reading.<br/>Walking.<br/><span className="fact-accent">Resetting.</span></h2></div>
    </section>
    <section className="career-section"><div className="profile-section-head"><p className="mono profile-label">01 / EXPERIENCE</p><h2>The journey<br/>so far<span>.</span></h2><p>From working in public to building for production.</p></div><div className="career-list">{roles.map((role,i)=><article className="career-card" key={role.where+role.what}><div className="career-meta mono"><span>{role.when}</span><span>{i===0?"● NOW":String(roles.length-i).padStart(2,"0")}</span></div><h3>{role.where}</h3><div className="career-role">{role.what}</div><p>{role.desc}</p><div className="career-tags">{role.tags.filter(t=>!t.current).map(t=><span key={t.label}>{t.label}</span>)}</div></article>)}</div></section>
    <section className="toolkit-section"><div className="profile-section-head"><p className="mono profile-label">02 / TOOLKIT</p><h2>Good tools.<br/>Better questions<span>.</span></h2></div><div className="toolkit-grid">{toolkit.map((group,i)=><div className="toolkit-card" key={group.title}><div className="mono"><span>0{i+1}</span>{group.title}</div><ul>{group.items.map(item=><li key={item}>{item}</li>)}</ul></div>)}</div></section>
  </main>;
}
