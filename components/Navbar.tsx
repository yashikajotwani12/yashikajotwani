"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import ThemeToggle from "./ThemeToggle";

const links = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Log", href: "/#log" },
];

function useISTClock() {
  const [time, setTime] = useState("—");
  useEffect(() => {
    const tick = () => {
      const opts: Intl.DateTimeFormatOptions = {
        hour: "2-digit",
        minute: "2-digit",
        timeZone: "Asia/Kolkata",
        hour12: false,
      };
      const s = new Intl.DateTimeFormat("en-GB", opts).format(new Date());
      setTime(`IST · ${s}`);
    };
    tick();
    const id = setInterval(tick, 30_000);
    return () => clearInterval(id);
  }, []);
  return time;
}

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const time = useISTClock();

  useEffect(() => setMenuOpen(false), [pathname]);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    if (href === "/#log") return false;
    return pathname.startsWith(href);
  };

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-20 flex items-center justify-between"
        style={{ padding: "24px 40px" }}
      >
        <Link
          href="/"
          className="serif-italic inline-flex items-baseline gap-[2px]"
          style={{
            fontSize: 30,
            lineHeight: 1,
            color: "var(--ink)",
            textDecoration: "none",
            letterSpacing: "-0.02em",
          }}
        >
          Yashika
          <span
            aria-hidden="true"
            className="inline-block ml-1"
            style={{
              width: 6,
              height: 6,
              borderRadius: 999,
              background: "var(--accent)",
              transform: "translateY(-3px)",
            }}
          />
        </Link>

        <div className="hidden sm:flex items-center gap-7">
          {links.map((link) => {
            const active = isActive(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`navlink ${active ? "active" : ""}`}
              >
                {link.label}
              </Link>
            );
          })}
          <span
            className="inline-flex items-center gap-2 mono uppercase"
            style={{ fontSize: 10.5, color: "var(--ink-2)", letterSpacing: "0.06em" }}
          >
            <span className="pulse-dot" />
            <span>{time}</span>
          </span>
          <ThemeToggle />
        </div>

        <div className="flex sm:hidden items-center gap-3">
          <ThemeToggle />
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-2 rounded-lg"
            style={{ color: "var(--ink-2)", border: "1px solid var(--rule)" }}
            aria-label="Toggle menu"
          >
            {menuOpen ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>
      </nav>

      {menuOpen && (
        <div className="fixed inset-0 z-10 pt-16 sm:hidden">
          <div
            className="absolute inset-0"
            style={{ background: "rgba(0,0,0,0.2)" }}
            onClick={() => setMenuOpen(false)}
          />
          <div
            className="relative mx-4 mt-2 p-4 rounded-xl"
            style={{
              background: "var(--paper-2)",
              border: "1px solid var(--rule)",
            }}
          >
            <ul className="space-y-1 list-none p-0 m-0">
              {links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="navlink block px-3 py-3"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div
              className="mt-3 pt-3 mono uppercase flex items-center gap-2"
              style={{
                fontSize: 10.5,
                color: "var(--ink-2)",
                letterSpacing: "0.06em",
                borderTop: "1px solid var(--rule)",
              }}
            >
              <span className="pulse-dot" />
              {time}
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        :global(.navlink) {
          font-family: var(--font-jetbrains-mono), ui-monospace, monospace;
          font-size: 11px;
          color: var(--ink-2);
          text-decoration: none;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          position: relative;
          padding: 6px 0;
          transition: color 0.3s ease;
        }
        :global(.navlink)::after {
          content: "";
          position: absolute;
          left: 0;
          right: 0;
          bottom: 0;
          height: 1px;
          background: currentColor;
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.4s cubic-bezier(0.2, 0.7, 0.2, 1);
        }
        :global(.navlink:hover) {
          color: var(--ink);
        }
        :global(.navlink:hover)::after {
          transform: scaleX(1);
        }
        :global(.navlink.active) {
          color: var(--ink);
        }
        :global(.navlink.active)::before {
          content: "";
          position: absolute;
          left: -10px;
          top: 50%;
          width: 4px;
          height: 4px;
          border-radius: 999px;
          background: var(--accent);
          transform: translateY(-50%);
        }
      `}</style>
    </>
  );
}
