/**
 * Wondr Footer
 * Design: dark bg, logo SVG inline (bianco), 3 colonne
 * Font: AvertaStd
 */
import { Link } from "wouter";
import WondrLogo from "./WondrLogo";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer style={{ backgroundColor: "#0d0d1a" }} className="text-white">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div className="flex flex-col gap-3">
            <WondrLogo color="#ffffff" height={20} />
            <p className="text-sm leading-relaxed mt-1" style={{ color: "rgba(255,255,255,0.55)", fontFamily: "'AvertaStd', sans-serif", fontWeight: 300 }}>
              {t("footer_tagline")}
            </p>
          </div>

          {/* Prodotto */}
          <div className="flex flex-col gap-3">
            <span className="text-xs uppercase tracking-widest" style={{ color: "rgba(255,255,255,0.4)", fontFamily: "'AvertaStd', sans-serif", fontWeight: 700 }}>
              {t("footer_product")}
            </span>
            <ul className="flex flex-col gap-2">
              <li>
                <Link href="/how-it-works" className="text-sm no-underline transition-colors duration-150" style={{ color: "rgba(255,255,255,0.6)", fontFamily: "'AvertaStd', sans-serif", fontWeight: 400 }}>
                  {t("nav_how")}
                </Link>
              </li>
              <li>
                <a href="/#destinations" className="text-sm no-underline transition-colors duration-150" style={{ color: "rgba(255,255,255,0.6)", fontFamily: "'AvertaStd', sans-serif", fontWeight: 400 }}>
                  {t("nav_destinations")}
                </a>
              </li>
              <li>
                <a href="/#tips" className="text-sm no-underline transition-colors duration-150" style={{ color: "rgba(255,255,255,0.6)", fontFamily: "'AvertaStd', sans-serif", fontWeight: 400 }}>
                  {t("nav_tips")}
                </a>
              </li>
            </ul>
          </div>

          {/* Azienda */}
          <div className="flex flex-col gap-3">
            <span className="text-xs uppercase tracking-widest" style={{ color: "rgba(255,255,255,0.4)", fontFamily: "'AvertaStd', sans-serif", fontWeight: 700 }}>
              {t("footer_company")}
            </span>
            <ul className="flex flex-col gap-2">
              <li>
                <a href="#" className="text-sm no-underline transition-colors duration-150" style={{ color: "rgba(255,255,255,0.6)", fontFamily: "'AvertaStd', sans-serif", fontWeight: 400 }}>
                  {t("footer_about")}
                </a>
              </li>
              <li>
                <a href="#" className="text-sm no-underline transition-colors duration-150" style={{ color: "rgba(255,255,255,0.6)", fontFamily: "'AvertaStd', sans-serif", fontWeight: 400 }}>
                  {t("footer_partners")}
                </a>
              </li>
              <li>
                <a href="#" className="text-sm no-underline transition-colors duration-150" style={{ color: "rgba(255,255,255,0.6)", fontFamily: "'AvertaStd', sans-serif", fontWeight: 400 }}>
                  {t("footer_privacy")}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div
          className="mt-10 pt-6 flex flex-col md:flex-row items-center justify-between gap-2 text-xs"
          style={{ borderTop: "1px solid rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.35)", fontFamily: "'AvertaStd', sans-serif", fontWeight: 300 }}
        >
          <span>{t("footer_copy")}</span>
          <span>{t("footer_disclaimer")}</span>
        </div>
      </div>
    </footer>
  );
}
