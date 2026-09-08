"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeToggle from "./ThemeToggle";
export default function Navbar(){const path=usePathname();return <header className="lab-nav"><Link href="/" className="wordmark" aria-label="Yashika Jotwani home">yj<span>_</span></Link><nav aria-label="Main navigation"><Link href="/" aria-current={path==="/"?"page":undefined}>Index<span>01</span></Link><Link href="/about" aria-current={path==="/about"?"page":undefined}>About<span>02</span></Link><Link href="/#log">Writing<span>03</span></Link></nav><div className="nav-end"><a href="https://github.com/yashikajotwani12" target="_blank" rel="noopener noreferrer">GitHub ↗</a><ThemeToggle/></div></header>}
