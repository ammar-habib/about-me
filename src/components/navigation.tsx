"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { site } from "@/data/site";
import { legacySlugs } from "@/data/legacy";
const links = [
  ["/", "Home"],
  ["/about/", "About"],
  ["/projects/", "Projects"],
  ["/experience/", "Experience"],
  ["/contact/", "Contact"],
];
export function Navigation() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const scroll = () => setScrolled(window.scrollY > 24);
    scroll();
    window.addEventListener("scroll", scroll, { passive: true });
    const map: Record<string, string> = {
      "#about_me": "/about/",
      "#resume": "/experience/",
      "#portfolio": "/projects/",
      "#contact": "/contact/",
    };
    const archived = location.hash.split("/")[1]?.toLowerCase();
    if (archived && legacySlugs.includes(archived))
      location.replace("/projects/" + archived + "/");
    else if (map[location.hash]) location.replace(map[location.hash]);
    return () => window.removeEventListener("scroll", scroll);
  }, []);
  return (
    <header className={`header ${scrolled ? "scrolled" : ""}`}>
      <div className="nav-shell">
        <Link href="/" className="wordmark" aria-label="Ammar Habib home">
          ammar<span>.</span>
          <small>HABIB</small>
        </Link>
        <button
          ref={toggle}
          className="menu-toggle"
          aria-expanded={open}
          aria-controls="primary-navigation"
          aria-label={open ? "Close navigation" : "Open navigation"}
          onClick={() => setOpen(!open)}
        >
          {open ? <X /> : <Menu />}
        </button>
        <nav
          id="primary-navigation"
          className={open ? "nav open" : "nav"}
          aria-label="Main navigation"
          onKeyDown={(e) => {
            if (e.key === "Escape") {
              setOpen(false);
              toggle.current?.focus();
            }
          }}
        >
          {links.map(([url, label]) => (
            <Link
              key={url}
              href={url}
              aria-current={
                (
                  url === "/"
                    ? pathname === "/"
                    : pathname.startsWith(url.replace(/\/$/, ""))
                )
                  ? "page"
                  : undefined
              }
              onClick={() => setOpen(false)}
            >
              {label}
            </Link>
          ))}
          <a className="nav-cv" href={site.resume} download>
            Download CV <ArrowUpRight size={14} />
          </a>
        </nav>
      </div>
    </header>
  );
}
