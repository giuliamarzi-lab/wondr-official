/*
 * Wondr Navbar — fixed, trasparente sull'hero, scura allo scroll
 * Voci: Come funziona → /how-it-works | Partner → /#partners
 * Rimosso pulsante "Inizia gratis" e Trip Tips
 */
import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Menu, X } from "lucide-react";
import WondrLogo from "./WondrLogo";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { lang, setLang, t } = useLanguage();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? "rgba(18,23,42,0.95)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "none",
      }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" aria-label="Wondr — Home" className="flex items-center">
          <WondrLogo color="#ffffff" height={28} />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8 text-sm" style={{ color: "rgba(255,255,255,0.8)" }}>
          <Link
            href="/how-it-works"
            className="hover:text-white transition-colors no-underline"
            style={{ color: "inherit" }}
          >
            {t("nav_how")}
          </Link>
          <a
            href="/#partners"
            className="hover:text-white transition-colors no-underline"
            style={{ color: "inherit" }}
          >
            {lang === "it" ? "Partner" : "Partners"}
          </a>
        </nav>

        {/* Right: Language toggle only */}
        <div className="hidden md:flex items-center gap-3">
          <div
            className="flex items-center rounded-full p-0.5"
            style={{ border: "1px solid rgba(255,255,255,0.2)", background: "rgba(255,255,255,0.06)" }}
          >
            <button
              onClick={() => setLang("it")}
              className="px-3 py-1 text-xs font-semibold rounded-full transition-all duration-150"
              style={{
                background: lang === "it" ? "white" : "transparent",
                color: lang === "it" ? "#12172a" : "rgba(255,255,255,0.55)",
              }}
            >
              IT
            </button>
            <button
              onClick={() => setLang("en")}
              className="px-3 py-1 text-xs font-semibold rounded-full transition-all duration-150"
              style={{
                background: lang === "en" ? "white" : "transparent",
                color: lang === "en" ? "#12172a" : "rgba(255,255,255,0.55)",
              }}
            >
              EN
            </button>
          </div>
        </div>

        {/* Mobile: language + hamburger */}
        <div className="md:hidden flex items-center gap-2">
          <div
            className="flex items-center rounded-full p-0.5"
            style={{ border: "1px solid rgba(255,255,255,0.2)", background: "rgba(255,255,255,0.06)" }}
          >
            <button
              onClick={() => setLang("it")}
              className="px-2.5 py-0.5 text-xs font-semibold rounded-full transition-all duration-150"
              style={{
                background: lang === "it" ? "white" : "transparent",
                color: lang === "it" ? "#12172a" : "rgba(255,255,255,0.55)",
              }}
            >
              IT
            </button>
            <button
              onClick={() => setLang("en")}
              className="px-2.5 py-0.5 text-xs font-semibold rounded-full transition-all duration-150"
              style={{
                background: lang === "en" ? "white" : "transparent",
                color: lang === "en" ? "#12172a" : "rgba(255,255,255,0.55)",
              }}
            >
              EN
            </button>
          </div>
          <button
            className="md:hidden text-white p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          className="md:hidden px-4 pb-4 flex flex-col gap-3"
          style={{ background: "rgba(18,23,42,0.97)", borderTop: "1px solid rgba(255,255,255,0.06)" }}
        >
          <Link
            href="/how-it-works"
            className="text-sm py-2 no-underline hover:text-white transition-colors"
            style={{ color: "rgba(255,255,255,0.8)" }}
            onClick={() => setMenuOpen(false)}
          >
            {t("nav_how")}
          </Link>
          <a
            href="/#partners"
            className="text-sm py-2 no-underline hover:text-white transition-colors"
            style={{ color: "rgba(255,255,255,0.8)" }}
            onClick={() => setMenuOpen(false)}
          >
            {lang === "it" ? "Partner" : "Partners"}
          </a>
        </div>
      )}
    </header>
  );
}
