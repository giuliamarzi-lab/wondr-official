/**
 * Wondr Results Page
 * Prompt spec: 3 risultati mock Roma→Dubai, filtri laterali, card espandibili,
 * badge risparmio, disclaimer prezzi, link prenota → omio.com
 * Font: AvertaStd (Bold titoli, Regular corpo, Light secondario)
 */
import React, { useState } from "react";
import { useLocation } from "wouter";
import { ArrowLeft, SlidersHorizontal, ChevronDown, ChevronUp, ExternalLink, Clock, MapPin, Plane, Train, Bus, Ship, X, Search, Users, CalendarDays } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";

const RESULTS = [
  {
    id: 1,
    from: "Roma",
    to: "Dubai",
    price: 146,
    directPrice: 420,
    saving: 274,
    duration: "28h",
    legs: 4,
    means: ["bus", "traghetto", "treno", "volo"],
    detail: [
      { Icon: Bus, from: "Roma Tiburtina", to: "Bari Centrale", carrier: "Bus, FlixBus", time: "06:30, 13:10", price: 12 },
      { Icon: Ship, from: "Bari", to: "Patrasso", carrier: "Traghetto, Grimaldi Lines", time: "19:30, 08:00", price: 25 },
      { Icon: Train, from: "Patrasso", to: "Atene", carrier: "Treno, Hellenic Train", time: "10:15, 13:40", price: 20 },
      { Icon: Plane, from: "Atene (ATH)", to: "Dubai (DXB)", carrier: "Volo, Wizz Air", time: "16:50, 23:30", price: 89 },
    ],
  },
  {
    id: 2,
    from: "Roma",
    to: "Dubai",
    price: 175,
    directPrice: 420,
    saving: 245,
    duration: "20h",
    legs: 3,
    means: ["treno", "traghetto", "volo"],
    detail: [
      { Icon: Train, from: "Roma Termini", to: "Brindisi", carrier: "Treno, Italo", time: "07:00, 12:30", price: 30 },
      { Icon: Ship, from: "Brindisi", to: "Atene (Patrasso)", carrier: "Traghetto, GNV", time: "15:00, 07:00", price: 45 },
      { Icon: Plane, from: "Atene (ATH)", to: "Dubai (DXB)", carrier: "Volo, Volotea", time: "10:30, 17:00", price: 100 },
    ],
  },
  {
    id: 3,
    from: "Roma",
    to: "Dubai",
    price: 210,
    directPrice: 420,
    saving: 210,
    duration: "13h",
    legs: 2,
    means: ["volo"],
    detail: [
      { Icon: Plane, from: "Roma (FCO)", to: "Atene (ATH)", carrier: "Volo, Ryanair", time: "06:00, 09:30", price: 55 },
      { Icon: Plane, from: "Atene (ATH)", to: "Dubai (DXB)", carrier: "Volo, easyJet", time: "12:00, 19:00", price: 155 },
    ],
  },
];

const MEANS_FORM = [
  { key: "voli", Icon: Plane },
  { key: "treni", Icon: Train },
  { key: "bus", Icon: Bus },
  { key: "traghetti", Icon: Ship },
];

export default function Results() {
  const [, navigate] = useLocation();
  const { t, lang } = useLanguage();
  const [expanded, setExpanded] = useState<number | null>(1);
  const [sortBy, setSortBy] = useState<"prezzo" | "durata">("prezzo");
  const ALL_MEANS = ["volo", "treno", "bus", "traghetto"];
  const [filterMeans, setFilterMeans] = useState<string[]>(["tutti"]);

  // Drawer stato
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editFrom, setEditFrom] = useState("Roma");
  const [editTo, setEditTo] = useState("Dubai");
  const [editDate, setEditDate] = useState("2026-07-10");
  const [editTravelers, setEditTravelers] = useState(1);
  const [editHours, setEditHours] = useState("48");
  const [editBudget, setEditBudget] = useState("100-300");
  const [editMeans, setEditMeans] = useState<string[]>(["voli", "treni", "bus", "traghetti"]);

  const toggleEditMean = (key: string) => {
    setEditMeans(prev =>
      prev.includes(key) ? prev.filter(k => k !== key) : [...prev, key]
    );
  };

  const toggleMeanFilter = (val: string) => {
    if (val === "tutti") {
      setFilterMeans(["tutti"]);
      return;
    }
    setFilterMeans(prev => {
      const withoutTutti = prev.filter(v => v !== "tutti");
      const next = withoutTutti.includes(val)
        ? withoutTutti.filter(v => v !== val)
        : [...withoutTutti, val];
      if (next.length === ALL_MEANS.length) return ["tutti"];
      if (next.length === 0) return ["tutti"];
      return next;
    });
  };

  const filtered = RESULTS
    .filter(r => filterMeans.includes("tutti") || r.means.some(m => filterMeans.includes(m)))
    .sort((a, b) => sortBy === "prezzo" ? a.price - b.price : parseInt(a.duration) - parseInt(b.duration));

  const HOURS_OPTIONS = [
    { val: "12", label: lang === "it" ? "Fino a 12h" : "Up to 12h" },
    { val: "24", label: lang === "it" ? "Fino a 24h" : "Up to 24h" },
    { val: "48", label: "48h+" },
  ];
  const BUDGET_OPTIONS = [
    { val: "<100", label: "< €100" },
    { val: "100-300", label: "€100-300" },
    { val: ">300", label: "> €300" },
  ];

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "#F7F7F9" }}>
      <Navbar />

      {/* ── HEADER DARK ── */}
      <section className="pt-16" style={{ background: "#12172a" }}>
        <div className="container py-8">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-sm mb-6 transition-colors"
            style={{ color: "rgba(255,255,255,0.55)", fontFamily: "'AvertaStd', sans-serif", background: "transparent", border: "none" }}
            onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = "white"}
            onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.55)"}
          >
            <ArrowLeft size={16} /> {t("results_back").replace("← ", "")}
          </button>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h1 className="text-white mb-1" style={{ fontFamily: "'AvertaStd', sans-serif", fontWeight: 800, fontSize: "clamp(1.8rem, 4vw, 2.8rem)", letterSpacing: "-0.03em" }}>
                Roma <span style={{ color: "#ec009b" }}>→</span> Dubai
              </h1>
              <p style={{ color: "rgba(255,255,255,0.5)", fontFamily: "'AvertaStd', sans-serif", fontSize: "0.9rem" }}>
                1 {lang === "it" ? "viaggiatore, fino a 48h, €100-300" : "traveler, up to 48h, €100-300"}
              </p>
            </div>
            <button
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm transition-all"
              style={{ border: "1.5px solid rgba(255,255,255,0.2)", color: "rgba(255,255,255,0.7)", background: "transparent", fontFamily: "'AvertaStd', sans-serif" }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.08)"; (e.currentTarget as HTMLElement).style.color = "white"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "transparent"; (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.7)"; }}
              onClick={() => setDrawerOpen(true)}
            >
              <SlidersHorizontal size={15} /> {t("results_modify")}
            </button>
          </div>

          {/* ── DRAWER MODIFICA RICERCA ── */}
          <div
            style={{
              maxHeight: drawerOpen ? "600px" : "0px",
              overflow: "hidden",
              transition: "max-height 0.35s cubic-bezier(0.23,1,0.32,1)",
            }}
          >
            <div className="mt-6 rounded-2xl p-6" style={{ background: "rgba(255,255,255,0.06)", border: "1.5px solid rgba(255,255,255,0.1)", backdropFilter: "blur(12px)" }}>
              <div className="flex items-center justify-between mb-5">
                <p style={{ color: "white", fontFamily: "'AvertaStd', sans-serif", fontWeight: 700, fontSize: "1rem" }}>
                  {lang === "it" ? "Modifica la tua ricerca" : "Edit your search"}
                </p>
                <button
                  onClick={() => setDrawerOpen(false)}
                  style={{ background: "transparent", border: "none", color: "rgba(255,255,255,0.5)", cursor: "pointer" }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = "white"}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.5)"}
                >
                  <X size={18} />
                </button>
              </div>

              {/* Row 1: Partenza, Destinazione, Data, Viaggiatori */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                <div className="rounded-xl p-3" style={{ background: "rgba(255,255,255,0.08)", border: "1.5px solid rgba(255,255,255,0.12)" }}>
                  <p className="text-xs uppercase tracking-widest mb-1" style={{ color: "rgba(255,255,255,0.4)", fontFamily: "'AvertaStd', sans-serif", fontWeight: 600, fontSize: "0.65rem" }}>
                    {lang === "it" ? "Partenza" : "From"}
                  </p>
                  <div className="flex items-center gap-2">
                    <MapPin size={13} style={{ color: "#ec009b", flexShrink: 0 }} />
                    <input
                      value={editFrom}
                      onChange={e => setEditFrom(e.target.value)}
                      className="bg-transparent border-none outline-none w-full text-sm text-white"
                      style={{ fontFamily: "'AvertaStd', sans-serif", fontWeight: 600 }}
                    />
                  </div>
                </div>
                <div className="rounded-xl p-3" style={{ background: "rgba(255,255,255,0.08)", border: "1.5px solid rgba(255,255,255,0.12)" }}>
                  <p className="text-xs uppercase tracking-widest mb-1" style={{ color: "rgba(255,255,255,0.4)", fontFamily: "'AvertaStd', sans-serif", fontWeight: 600, fontSize: "0.65rem" }}>
                    {lang === "it" ? "Destinazione" : "To"}
                  </p>
                  <div className="flex items-center gap-2">
                    <MapPin size={13} style={{ color: "#ec009b", flexShrink: 0 }} />
                    <input
                      value={editTo}
                      onChange={e => setEditTo(e.target.value)}
                      className="bg-transparent border-none outline-none w-full text-sm text-white"
                      style={{ fontFamily: "'AvertaStd', sans-serif", fontWeight: 600 }}
                    />
                  </div>
                </div>
                <div className="rounded-xl p-3" style={{ background: "rgba(255,255,255,0.08)", border: "1.5px solid rgba(255,255,255,0.12)" }}>
                  <p className="text-xs uppercase tracking-widest mb-1" style={{ color: "rgba(255,255,255,0.4)", fontFamily: "'AvertaStd', sans-serif", fontWeight: 600, fontSize: "0.65rem" }}>
                    {lang === "it" ? "Data" : "Date"}
                  </p>
                  <div className="flex items-center gap-2">
                    <CalendarDays size={13} style={{ color: "#ec009b", flexShrink: 0 }} />
                    <input
                      type="date"
                      value={editDate}
                      onChange={e => setEditDate(e.target.value)}
                      className="bg-transparent border-none outline-none w-full text-sm text-white"
                      style={{ fontFamily: "'AvertaStd', sans-serif", fontWeight: 600, colorScheme: "dark" }}
                    />
                  </div>
                </div>
                <div className="rounded-xl p-3" style={{ background: "rgba(255,255,255,0.08)", border: "1.5px solid rgba(255,255,255,0.12)" }}>
                  <p className="text-xs uppercase tracking-widest mb-1" style={{ color: "rgba(255,255,255,0.4)", fontFamily: "'AvertaStd', sans-serif", fontWeight: 600, fontSize: "0.65rem" }}>
                    {lang === "it" ? "Viaggiatori" : "Travelers"}
                  </p>
                  <div className="flex items-center gap-2">
                    <Users size={13} style={{ color: "#ec009b", flexShrink: 0 }} />
                    <button onClick={() => setEditTravelers(Math.max(1, editTravelers - 1))} style={{ background: "transparent", border: "none", color: "rgba(255,255,255,0.6)", cursor: "pointer", fontSize: "1rem", lineHeight: 1 }}>−</button>
                    <span className="text-sm text-white" style={{ fontFamily: "'AvertaStd', sans-serif", fontWeight: 700, minWidth: "1.2rem", textAlign: "center" }}>{editTravelers}</span>
                    <button onClick={() => setEditTravelers(editTravelers + 1)} style={{ background: "transparent", border: "none", color: "rgba(255,255,255,0.6)", cursor: "pointer", fontSize: "1rem", lineHeight: 1 }}>+</button>
                  </div>
                </div>
              </div>

              {/* Row 2: Ore massime */}
              <div className="mb-4">
                <p className="text-xs uppercase tracking-widest mb-2" style={{ color: "rgba(255,255,255,0.4)", fontFamily: "'AvertaStd', sans-serif", fontWeight: 600, fontSize: "0.65rem" }}>
                  {lang === "it" ? "Ore massime di viaggio" : "Max travel hours"}
                </p>
                <div className="flex gap-2 flex-wrap">
                  {HOURS_OPTIONS.map(h => (
                    <button key={h.val} onClick={() => setEditHours(h.val)}
                      className="px-4 py-2 rounded-full text-sm transition-all"
                      style={{
                        fontFamily: "'AvertaStd', sans-serif",
                        fontWeight: editHours === h.val ? 700 : 400,
                        background: editHours === h.val ? "#12172a" : "rgba(255,255,255,0.08)",
                        color: editHours === h.val ? "white" : "rgba(255,255,255,0.6)",
                        border: editHours === h.val ? "1.5px solid rgba(255,255,255,0.3)" : "1.5px solid rgba(255,255,255,0.1)",
                      }}
                    >{h.label}</button>
                  ))}
                </div>
              </div>

              {/* Row 3: Budget */}
              <div className="mb-4">
                <p className="text-xs uppercase tracking-widest mb-2" style={{ color: "rgba(255,255,255,0.4)", fontFamily: "'AvertaStd', sans-serif", fontWeight: 600, fontSize: "0.65rem" }}>
                  {lang === "it" ? "Budget massimo" : "Max budget"}
                </p>
                <div className="flex gap-2 flex-wrap">
                  {BUDGET_OPTIONS.map(b => (
                    <button key={b.val} onClick={() => setEditBudget(b.val)}
                      className="px-4 py-2 rounded-full text-sm transition-all"
                      style={{
                        fontFamily: "'AvertaStd', sans-serif",
                        fontWeight: editBudget === b.val ? 700 : 400,
                        background: editBudget === b.val ? "#12172a" : "rgba(255,255,255,0.08)",
                        color: editBudget === b.val ? "white" : "rgba(255,255,255,0.6)",
                        border: editBudget === b.val ? "1.5px solid rgba(255,255,255,0.3)" : "1.5px solid rgba(255,255,255,0.1)",
                      }}
                    >{b.label}</button>
                  ))}
                </div>
              </div>

              {/* Row 4: Mezzi inclusi */}
              <div className="mb-5">
                <p className="text-xs uppercase tracking-widest mb-2" style={{ color: "rgba(255,255,255,0.4)", fontFamily: "'AvertaStd', sans-serif", fontWeight: 600, fontSize: "0.65rem" }}>
                  {lang === "it" ? "Mezzi inclusi" : "Included means"}
                </p>
                <div className="flex gap-2 flex-wrap">
                  {MEANS_FORM.map(m => {
                    const isActive = editMeans.includes(m.key);
                    const labels: Record<string, { it: string; en: string }> = {
                      voli: { it: "Voli", en: "Flights" },
                      treni: { it: "Treni", en: "Trains" },
                      bus: { it: "Bus", en: "Bus" },
                      traghetti: { it: "Traghetti", en: "Ferries" },
                    };
                    return (
                      <button key={m.key} onClick={() => toggleEditMean(m.key)}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm transition-all"
                        style={{
                          fontFamily: "'AvertaStd', sans-serif",
                          fontWeight: isActive ? 600 : 400,
                          background: isActive ? "rgba(236,0,155,0.15)" : "rgba(255,255,255,0.06)",
                          color: isActive ? "#ec009b" : "rgba(255,255,255,0.5)",
                          border: isActive ? "1.5px solid rgba(236,0,155,0.4)" : "1.5px solid rgba(255,255,255,0.1)",
                        }}
                      >
                        <m.Icon size={12} />
                        {lang === "it" ? labels[m.key].it : labels[m.key].en}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* CTA aggiorna */}
              <button
                onClick={() => setDrawerOpen(false)}
                className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white transition-all"
                style={{ background: "#ec009b", fontFamily: "'AvertaStd', sans-serif", fontWeight: 700, border: "none", boxShadow: "0 4px 20px rgba(236,0,155,0.35)" }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = "#d4008a"}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = "#ec009b"}
              >
                <Search size={15} />
                {lang === "it" ? "Aggiorna ricerca" : "Update search"}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── CONTENT ── */}
      <div className="container py-8 flex-1">
        <div className="flex flex-col md:flex-row gap-6">

          {/* ── SIDEBAR FILTRI ── */}
          <aside className="w-full md:w-56 shrink-0">
            <div className="rounded-2xl p-5 sticky top-20" style={{ background: "#ffffff", border: "1.5px solid #f0f0f4" }}>
              <p className="text-xs uppercase tracking-widest mb-3" style={{ color: "#888", fontFamily: "'AvertaStd', sans-serif", fontWeight: 600 }}>{t("results_sort_label")}</p>
              {(["prezzo", "durata"] as const).map(s => (
                <button key={s} onClick={() => setSortBy(s)}
                  className="w-full text-left px-4 py-2.5 rounded-xl mb-2 text-sm transition-all"
                  style={{
                    background: sortBy === s ? "#ec009b" : "transparent",
                    color: sortBy === s ? "white" : "#2D2D2D",
                    fontFamily: "'AvertaStd', sans-serif",
                    fontWeight: sortBy === s ? 600 : 400,
                    border: sortBy === s ? "none" : "1.5px solid #f0f0f4",
                  }}
                >
                  {s === "prezzo" ? t("results_sort_price") : t("results_sort_duration")}
                </button>
              ))}

              <p className="text-xs uppercase tracking-widest mt-5 mb-3" style={{ color: "#888", fontFamily: "'AvertaStd', sans-serif", fontWeight: 600 }}>{t("results_filter_label")}</p>
              {[
                { val: "tutti", label: t("results_filter_all"), Icon: null },
                { val: "volo", label: t("results_filter_flight"), Icon: Plane },
                { val: "treno", label: t("results_filter_train"), Icon: Train },
                { val: "bus", label: t("results_filter_bus"), Icon: Bus },
                { val: "traghetto", label: t("results_filter_ferry"), Icon: Ship },
              ].map(m => {
                const isActive = filterMeans.includes(m.val);
                return (
                  <button key={m.val} onClick={() => toggleMeanFilter(m.val)}
                    className="w-full text-left px-4 py-2.5 rounded-xl mb-2 text-sm transition-all inline-flex items-center gap-2"
                    style={{
                      background: "white",
                      color: isActive ? "#ec009b" : "#2D2D2D",
                      fontFamily: "'AvertaStd', sans-serif",
                      fontWeight: isActive ? 600 : 400,
                      border: isActive ? "1.5px solid #ec009b" : "1.5px solid #f0f0f4",
                    }}
                  >
                    {m.Icon && <m.Icon size={13} style={{ color: isActive ? "#ec009b" : "#aaa" }} />}
                    {m.label}
                  </button>
                );
              })}

              <p className="text-xs mt-5 leading-relaxed" style={{ color: "#bbb", fontFamily: "'AvertaStd', sans-serif" }}>
                {t("results_disclaimer")}
              </p>
            </div>
          </aside>

          {/* ── RESULTS LIST ── */}
          <main className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-5">
              <p style={{ fontFamily: "'AvertaStd', sans-serif", fontWeight: 700, fontSize: "1.1rem", color: "#2D2D2D" }}>
                {filtered.length} {t("results_found")}
              </p>
              <p className="text-sm" style={{ color: "#888", fontFamily: "'AvertaStd', sans-serif" }}>
                {t("results_from")} <strong style={{ color: "#ec009b" }}>€{Math.min(...filtered.map(r => r.price))}</strong>
              </p>
            </div>

            <div className="flex flex-col gap-4">
              {filtered.map(r => (
                <div key={r.id} className="result-card overflow-hidden hover:-translate-y-0.5 hover:shadow-lg transition-all duration-200">
                  <div className="p-5 md:p-6">
                    {/* Top row */}
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4">
                      <div className="flex-1">
                        {/* Badge risparmio */}
                        <div className="flex items-center gap-3 mb-3">
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold" style={{ background: "#fce4ec", color: "#ec009b", fontFamily: "'AvertaStd', sans-serif" }}>
                            {t("results_saving")} €{r.saving}
                          </span>
                          <span className="text-xs" style={{ color: "#bbb", fontFamily: "'AvertaStd', sans-serif" }}>
                            {t("results_vs")} €{r.directPrice}
                          </span>
                        </div>

                        <h3 style={{ fontFamily: "'AvertaStd', sans-serif", fontWeight: 700, fontSize: "1.2rem", color: "#2D2D2D" }}>
                          {r.from} → {r.to}
                        </h3>

                        <div className="flex items-center gap-4 mt-2 flex-wrap">
                          <span className="flex items-center gap-1 text-sm" style={{ color: "#888", fontFamily: "'AvertaStd', sans-serif" }}>
                            <Clock size={13} /> {r.duration} {t("results_hours")}
                          </span>
                          <span className="flex items-center gap-1 text-sm" style={{ color: "#888", fontFamily: "'AvertaStd', sans-serif" }}>
                            <MapPin size={13} /> {r.legs} {t("results_legs")}
                          </span>
                          <div className="flex gap-1">
                            {r.detail.map((d, i) => (
                              <span key={i} className="inline-flex items-center justify-center w-5 h-5 rounded-full" style={{ background: "#fce4ec" }}>
                                <d.Icon size={11} style={{ color: "#ec009b" }} />
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col items-end gap-3">
                        <div className="text-right">
                          <div style={{ fontFamily: "'AvertaStd', sans-serif", fontWeight: 800, fontSize: "1.8rem", color: "#ec009b", lineHeight: 1 }}>€{r.price}</div>
                          <div className="text-xs mt-0.5" style={{ color: "#bbb", fontFamily: "'AvertaStd', sans-serif" }}>{t("results_total")}, {r.legs} {t("results_tickets")}</div>
                        </div>
                        <a
                          href="https://www.omio.com"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-sm font-semibold text-white no-underline transition-all"
                          style={{ background: "#2D2D2D", fontFamily: "'AvertaStd', sans-serif", boxShadow: "0 2px 10px rgba(0,0,0,0.12)" }}
                          onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = "#12172a"}
                          onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = "#2D2D2D"}
                        >
                          {t("results_book")} <ExternalLink size={13} />
                        </a>
                      </div>
                    </div>

                    {/* Expand toggle */}
                    <button
                      onClick={() => setExpanded(expanded === r.id ? null : r.id)}
                      className="flex items-center gap-1.5 text-sm transition-colors"
                      style={{ color: expanded === r.id ? "#ec009b" : "#888", fontFamily: "'AvertaStd', sans-serif", fontWeight: 500, background: "transparent", border: "none" }}
                    >
                      {expanded === r.id ? (
                        <><ChevronUp size={15} /> {t("results_hide")}</>
                      ) : (
                        <><ChevronDown size={15} /> {t("results_show")}</>
                      )}
                    </button>
                  </div>

                  {/* Expanded detail */}
                  {expanded === r.id && (
                    <div className="px-5 md:px-6 pb-5 pt-0" style={{ borderTop: "1px solid #f0f0f4" }}>
                      <div className="flex flex-col gap-0 mt-4">
                        {r.detail.map((leg, i) => (
                          <div key={i} className="flex items-center gap-4 py-3" style={{ borderBottom: i < r.detail.length - 1 ? "1px solid #f8f8f8" : "none" }}>
                            <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0" style={{ background: "#fce4ec" }}>
                              <leg.Icon size={16} style={{ color: "#ec009b" }} />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="text-sm font-semibold" style={{ color: "#2D2D2D", fontFamily: "'AvertaStd', sans-serif" }}>
                                {leg.from} → {leg.to}
                              </div>
                              <div className="text-xs" style={{ color: "#aaa", fontFamily: "'AvertaStd', sans-serif" }}>
                                {leg.carrier}, {leg.time}
                              </div>
                            </div>
                            <div className="text-sm font-semibold shrink-0" style={{ color: "#2D2D2D", fontFamily: "'AvertaStd', sans-serif" }}>
                              €{leg.price}
                            </div>
                          </div>
                        ))}
                      </div>
                      <p className="text-xs mt-4 leading-relaxed" style={{ color: "#bbb", fontFamily: "'AvertaStd', sans-serif" }}>
                        {t("results_leg_total")}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </main>
        </div>
      </div>

      {/* Sticky mobile CTA */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 p-4" style={{ background: "rgba(247,247,249,0.95)", backdropFilter: "blur(12px)", borderTop: "1px solid #e8e8ec" }}>
        <button
          onClick={() => setDrawerOpen(true)}
          className="btn-magenta w-full"
          style={{ padding: "0.875rem", borderRadius: "0.875rem" }}
        >
          {lang === "it" ? "Modifica ricerca" : "Edit search"}
        </button>
      </div>

      <Footer />
    </div>
  );
}
