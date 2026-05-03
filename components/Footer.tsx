export default function Footer() {
  return (
    <footer
      className="relative z-[2]"
      style={{
        padding: "48px 40px 36px",
        borderTop: "1px solid var(--rule)",
      }}
    >
      <div
        className="max-w-[1200px] mx-auto flex flex-wrap justify-between items-center gap-6 mono uppercase"
        style={{ fontSize: 11, color: "var(--ink-3)", letterSpacing: "0.08em" }}
      >
        <div>© MMXXVI · Yashika Jotwani</div>
        <div className="flex items-center gap-5">
          <a
            href="https://github.com/yashikajotwani12"
            target="_blank"
            rel="noopener noreferrer"
            className="foot-link"
          >
            github
          </a>
          <a
            href="https://www.are.na"
            target="_blank"
            rel="noopener noreferrer"
            className="foot-link"
          >
            are.na
          </a>
          <a
            href="https://read.cv"
            target="_blank"
            rel="noopener noreferrer"
            className="foot-link"
          >
            read.cv
          </a>
          <a href="mailto:hello@yashika.dev" className="foot-link">
            email
          </a>
        </div>
      </div>

      <style>{`
        .foot-link {
          color: var(--ink-2);
          text-decoration: none;
          transition: color 0.3s ease;
        }
        .foot-link:hover {
          color: var(--ink);
        }
      `}</style>
    </footer>
  );
}
