/**
 * Wondr How It Works Page
 * Design: hero #1a1a2e, 3 step, modello aggregatore, FAQ accordion, CTA
 * Font: AvertaStd (Bold titoli, Regular corpo, Light secondari)
 */
import { useState, useEffect, useRef } from "react";
import { Link } from "wouter";
import { Search, GitBranch, CreditCard, ChevronDown, ChevronUp, ChevronRight, CheckCircle, Globe, RefreshCw } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";

function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add("visible"); obs.disconnect(); } },
      { threshold: 0.12 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

function RevealDiv({ children, className = "", delay = 0, style = {} }: { children: React.ReactNode; className?: string; delay?: number; style?: React.CSSProperties }) {
  const ref = useReveal();
  return (
    <div ref={ref} className={`reveal ${className}`} style={{ transitionDelay: `${delay}ms`, ...style }}>
      {children}
    </div>
  );
}

export default function HowItWorks() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const { t } = useLanguage();

  const STEPS = [
    {
      icon: <Search size={22} style={{ color: "#ec009b" }} />,
      num: "01",
      title: t("how_1_title"),
      desc: t("how_1_desc"),
    },
    {
      icon: <GitBranch size={22} style={{ color: "#ec009b" }} />,
      num: "02",
      title: t("how_2_title"),
      desc: t("how_2_desc"),
    },
    {
      icon: <CreditCard size={22} style={{ color: "#ec009b" }} />,
      num: "03",
      title: t("how_3_title"),
      desc: t("how_3_desc"),
    },
  ];

  const MODEL_ITEMS = [
    { icon: <CheckCircle size={18} style={{ color: "#ec009b" }} />, title: t("hiw_model_1"), desc: t("hiw_model_1_desc") },
    { icon: <Globe size={18} style={{ color: "#ec009b" }} />, title: t("hiw_model_2"), desc: t("hiw_model_2_desc") },
    { icon: <RefreshCw size={18} style={{ color: "#ec009b" }} />, title: t("hiw_model_3"), desc: t("hiw_model_3_desc") },
  ];

  const FAQS = [
    { q: t("hiw_faq_1_q"), a: t("hiw_faq_1_a") },
    { q: t("hiw_faq_2_q"), a: t("hiw_faq_2_a") },
    { q: t("hiw_faq_3_q"), a: t("hiw_faq_3_a") },
    { q: t("hiw_faq_4_q"), a: t("hiw_faq_4_a") },
  ];

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "#F7F7F9" }}>
      <Navbar />

      {/* ── HERO ── */}
      <section
        className="relative overflow-hidden flex items-center"
        style={{ background: "#1a1a2e", minHeight: "45vh", paddingTop: "4rem" }}
      >
        <div className="dot-pattern absolute inset-0 pointer-events-none" style={{ opacity: 0.08 }} />
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 60% 80% at 80% 50%, rgba(236,0,155,0.12) 0%, transparent 70%)" }} />

        <div className="container relative z-10 py-16 md:py-20">
          <span
            className="inline-block px-4 py-1.5 rounded-full text-xs mb-6"
            style={{ background: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.6)", border: "1px solid rgba(255,255,255,0.12)", fontFamily: "'AvertaStd', sans-serif" }}
          >
            {t("hiw_badge")}
          </span>
          <h1
            className="text-white leading-tight mb-5"
            style={{ fontFamily: "'AvertaStd', sans-serif", fontWeight: 800, fontSize: "clamp(2.4rem, 5.5vw, 4rem)", letterSpacing: "-0.03em" }}
          >
            {t("hiw_h1_line1")}<br />
            <span style={{ color: "#ec009b" }}>{t("hiw_h1_line2")}</span>
          </h1>
          <p
            className="max-w-xl leading-relaxed"
            style={{ color: "rgba(255,255,255,0.6)", fontFamily: "'AvertaStd', sans-serif", fontWeight: 400, fontSize: "1.05rem" }}
          >
            {t("hiw_sub")}
          </p>
        </div>
      </section>

      {/* ── 3 STEP ── */}
      <section className="py-20" style={{ background: "#ffffff" }}>
        <div className="container">
          <RevealDiv className="mb-12">
            <p className="text-xs uppercase tracking-widest mb-2" style={{ color: "#ec009b", fontFamily: "'AvertaStd', sans-serif", fontWeight: 600 }}>{t("hiw_process_label")}</p>
            <h2 style={{ fontFamily: "'AvertaStd', sans-serif", fontWeight: 700, fontSize: "clamp(1.8rem, 4vw, 2.6rem)", letterSpacing: "-0.02em", color: "#2D2D2D" }}>
              {t("hiw_process_title")}
            </h2>
          </RevealDiv>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {STEPS.map((s, i) => (
              <RevealDiv key={s.num} delay={i * 100} className="rounded-2xl p-7 flex flex-col gap-4 hover:-translate-y-1 hover:shadow-lg transition-all duration-200" style={{ border: "1.5px solid #f0f0f4", background: "#fff" }}>
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "#fce4ec" }}>
                    {s.icon}
                  </div>
                  <span style={{ fontFamily: "'AvertaStd', sans-serif", fontWeight: 800, fontSize: "2rem", color: "#f0f0f4", lineHeight: 1 }}>{s.num}</span>
                </div>
                <h3 style={{ fontFamily: "'AvertaStd', sans-serif", fontWeight: 700, fontSize: "1rem", color: "#2D2D2D" }}>{s.title}</h3>
                <p style={{ fontFamily: "'AvertaStd', sans-serif", fontWeight: 400, fontSize: "0.875rem", color: "#888", lineHeight: 1.7 }}>{s.desc}</p>
              </RevealDiv>
            ))}
          </div>
        </div>
      </section>

      {/* ── IL MODELLO ── */}
      <section className="py-20" style={{ background: "#F7F7F9" }}>
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
            <RevealDiv>
              <p className="text-xs uppercase tracking-widest mb-3" style={{ color: "#ec009b", fontFamily: "'AvertaStd', sans-serif", fontWeight: 600 }}>{t("hiw_model_label")}</p>
              <h2 className="mb-5" style={{ fontFamily: "'AvertaStd', sans-serif", fontWeight: 700, fontSize: "clamp(1.6rem, 3.5vw, 2.4rem)", letterSpacing: "-0.02em", color: "#2D2D2D" }}>
                {t("hiw_model_title")}
              </h2>
              <p className="leading-relaxed" style={{ color: "#555", fontFamily: "'AvertaStd', sans-serif", fontWeight: 400, fontSize: "0.95rem" }}>
                {t("hiw_model_desc")}
              </p>
            </RevealDiv>
            <RevealDiv delay={120}>
              <div className="flex flex-col gap-4">
                {MODEL_ITEMS.map((item, i) => (
                  <div key={i} className="flex items-start gap-4 rounded-2xl p-5 hover:-translate-y-0.5 hover:shadow-md transition-all duration-200" style={{ background: "#ffffff", border: "1.5px solid #f0f0f4" }}>
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0" style={{ background: "#fce4ec" }}>
                      {item.icon}
                    </div>
                    <div>
                      <h4 style={{ fontFamily: "'AvertaStd', sans-serif", fontWeight: 700, fontSize: "0.9rem", color: "#2D2D2D" }}>{item.title}</h4>
                      <p style={{ fontFamily: "'AvertaStd', sans-serif", fontWeight: 400, fontSize: "0.825rem", color: "#888", lineHeight: 1.6 }}>{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </RevealDiv>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-20" style={{ background: "#ffffff" }}>
        <div className="container max-w-3xl mx-auto">
          <RevealDiv className="mb-10">
            <p className="text-xs uppercase tracking-widest mb-3" style={{ color: "#ec009b", fontFamily: "'AvertaStd', sans-serif", fontWeight: 600 }}>{t("hiw_faq_label")}</p>
            <h2 style={{ fontFamily: "'AvertaStd', sans-serif", fontWeight: 700, fontSize: "clamp(1.8rem, 4vw, 2.6rem)", letterSpacing: "-0.02em", color: "#2D2D2D" }}>
              {t("hiw_faq_title")}
            </h2>
          </RevealDiv>
          <div className="flex flex-col">
            {FAQS.map((faq, i) => (
              <RevealDiv key={i} delay={i * 60}>
                <div style={{ borderTop: "1px solid #f0f0f4", borderBottom: i === FAQS.length - 1 ? "1px solid #f0f0f4" : "none" }}>
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-center justify-between py-5 text-left transition-colors"
                    style={{ background: "transparent", border: "none", fontFamily: "'AvertaStd', sans-serif", fontWeight: 700, fontSize: "1rem", color: "#2D2D2D" }}
                  >
                    {faq.q}
                    {openFaq === i
                      ? <ChevronUp size={18} style={{ color: "#ec009b", flexShrink: 0 }} />
                      : <ChevronDown size={18} style={{ color: "#bbb", flexShrink: 0 }} />
                    }
                  </button>
                  {openFaq === i && (
                    <p className="pb-5 text-sm leading-relaxed" style={{ color: "#666", fontFamily: "'AvertaStd', sans-serif", fontWeight: 400 }}>
                      {faq.a}
                    </p>
                  )}
                </div>
              </RevealDiv>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-24 text-center" style={{ background: "#1a1a2e" }}>
        <div className="container max-w-2xl mx-auto">
          <RevealDiv>
            <h2 className="text-white mb-4" style={{ fontFamily: "'AvertaStd', sans-serif", fontWeight: 800, fontSize: "clamp(2rem, 5vw, 3.2rem)", letterSpacing: "-0.03em" }}>
              {t("hiw_cta_title")}
            </h2>
            <p className="mb-10" style={{ color: "rgba(255,255,255,0.6)", fontFamily: "'AvertaStd', sans-serif", fontSize: "1rem" }}>
              {t("hiw_cta_sub")}
            </p>
            <a href="/#search" className="btn-magenta inline-flex no-underline" style={{ fontSize: "1rem", padding: "0.9rem 2rem" }}>
              {t("hiw_cta_btn")} <ChevronRight size={17} />
            </a>
          </RevealDiv>
        </div>
      </section>

      {/* Sticky mobile CTA */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 p-4" style={{ background: "rgba(247,247,249,0.95)", backdropFilter: "blur(12px)", borderTop: "1px solid #e8e8ec" }}>
        <Link href="/" className="btn-magenta w-full block text-center no-underline" style={{ padding: "0.875rem", borderRadius: "0.875rem" }}>
          {t("hiw_sticky_cta")}
        </Link>
      </div>

      <Footer />
    </div>
  );
}
