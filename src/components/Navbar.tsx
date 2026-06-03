"use client";

import { useState, useEffect } from "react";

const navLinks = [
  { label: "ARCHIVE", href: "#archive" },
  { label: "TIMELINE", href: "#timeline" },
  { label: "SIGNAL", href: "#signal" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(`#${entry.target.id}`);
          }
        });
      },
      { threshold: 0.3 }
    );

    const sections = document.querySelectorAll("section[id]");
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <nav
      id="main-nav"
      className={`fixed top-0 left-0 right-0 z-[1000] transition-all duration-500 ${
        scrolled
          ? "backdrop-blur-xl bg-surface-container-lowest/80"
          : "bg-transparent"
      }`}
      style={{
        borderBottom: scrolled ? "1px solid #2a2a2a" : "1px solid transparent",
        boxShadow: scrolled
          ? "0 0 20px rgba(227,24,55,0.15)"
          : "none",
        height: "80px",
      }}
    >
      <div className="max-w-[1200px] mx-auto px-6 h-full flex items-center justify-between">
        {/* Logo */}
        <a
          href="#"
          className="text-headline-lg text-primary-container no-underline"
          style={{
            filter: "drop-shadow(0 0 10px rgba(227,24,55,0.8))",
            fontFamily: "var(--font-display)",
          }}
        >
          THE VOID
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`nav-link text-label-mono no-underline ${
                activeSection === link.href
                  ? "text-primary active"
                  : "text-on-surface-variant"
              }`}
            >
              {link.label}
            </a>
          ))}
          <button
            className="text-on-surface-variant hover:text-primary transition-colors"
            aria-label="Search"
          >
            <span className="material-symbols-outlined" style={{ fontSize: 22 }}>
              search
            </span>
          </button>
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden flex flex-col gap-[5px] p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <span
            className={`block w-6 h-[2px] bg-on-surface-variant transition-all duration-300 ${
              mobileOpen ? "rotate-45 translate-y-[7px]" : ""
            }`}
          />
          <span
            className={`block w-6 h-[2px] bg-on-surface-variant transition-all duration-300 ${
              mobileOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block w-6 h-[2px] bg-on-surface-variant transition-all duration-300 ${
              mobileOpen ? "-rotate-45 -translate-y-[7px]" : ""
            }`}
          />
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden absolute top-[80px] left-0 right-0 bg-surface-container-lowest/95 backdrop-blur-xl border-b border-surface-container-high transition-all duration-500 overflow-hidden ${
          mobileOpen ? "max-h-[400px] py-6" : "max-h-0 py-0"
        }`}
      >
        <div className="flex flex-col items-center gap-6">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`nav-link text-label-mono no-underline ${
                activeSection === link.href
                  ? "text-primary active"
                  : "text-on-surface-variant"
              }`}
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}
