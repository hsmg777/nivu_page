// src/components/PricingServices.jsx
import React, { useEffect, useMemo, useRef, useState } from "react";

/* ===================== Helper: media query ===================== */
function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mql = window.matchMedia("(min-width:768px)");
    const update = () => setIsDesktop(mql.matches);
    update();
    mql.addEventListener("change", update);
    return () => mql.removeEventListener("change", update);
  }, []);
  return isDesktop;
}

/* ===================== Paletas por categoría ===================== */
function paletteFor(key) {
  switch (key) {
    case "web":
      return { grad: "linear-gradient(180deg,#60a5fa 0%,#3b82f6 40%,#1e40af 100%)", card: "linear-gradient(135deg,#38bdf8 0%,#22d3ee 45%,#2563eb 100%)", pill: "rgba(255,255,255,.18)" };
    case "apps":
      return { grad: "linear-gradient(180deg,#fb7185 0%,#ec4899 40%,#7e22ce 100%)", card: "linear-gradient(135deg,#ec4899 0%,#d946ef 45%,#fb7185 100%)", pill: "rgba(255,255,255,.18)" };
    case "saas":
      return { grad: "linear-gradient(180deg,#34d399 0%,#14b8a6 40%,#0ea5e9 100%)", card: "linear-gradient(135deg,#10b981 0%,#14b8a6 45%,#06b6d4 100%)", pill: "rgba(255,255,255,.18)" };
    case "support":
      return { grad: "linear-gradient(180deg,#f59e0b 0%,#f97316 40%,#ef4444 100%)", card: "linear-gradient(135deg,#f59e0b 0%,#f97316 45%,#fb7185 100%)", pill: "rgba(255,255,255,.18)" };
    default:
      return { grad: "linear-gradient(180deg,#64748b 0%,#475569 100%)", card: "linear-gradient(135deg,#64748b 0%,#475569 100%)", pill: "rgba(255,255,255,.2)" };
  }
}

/* ===================== ICONOS (SVG livianos) ===================== */
const IconBase = ({ children, className = "" }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
    {children}
  </svg>
);
const WindowIcon = ({ className = "" }) => (
  <IconBase className={className}>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <circle cx="7" cy="9" r="1" />
    <circle cx="10" cy="9" r="1" />
    <circle cx="13" cy="9" r="1" />
  </IconBase>
);
const BracketsIcon = ({ className = "" }) => (
  <IconBase className={className}>
    <path d="M8 6 3 12l5 6" />
    <path d="M16 6l5 6-5 6" />
  </IconBase>
);
const PhoneIcon = ({ className = "" }) => (
  <IconBase className={className}>
    <rect x="8" y="2" width="8" height="20" rx="2" />
    <line x1="12" y1="18" x2="12" y2="18" />
  </IconBase>
);
const CardIcon = ({ className = "" }) => (
  <IconBase className={className}>
    <rect x="3" y="6" width="18" height="12" rx="2" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </IconBase>
);
const LifebuoyIcon = ({ className = "" }) => (
  <IconBase className={className}>
    <circle cx="12" cy="12" r="8" />
    <circle cx="12" cy="12" r="3.5" />
    <line x1="12" y1="4" x2="12" y2="8.5" />
    <line x1="12" y1="19.5" x2="12" y2="16" />
    <line x1="4" y1="12" x2="8.5" y2="12" />
    <line x1="19.5" y1="12" x2="16" y2="12" />
  </IconBase>
);
const IconBadge = ({ children }) => (
  <span className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-white/15 ring-1 ring-white/20 text-white">
    {children}
  </span>
);
function iconFor(blockKey, title) {
  const t = (title || "").toLowerCase();
  if (blockKey === "web") return <WindowIcon className="w-4 h-4" />;
  if (blockKey === "apps") return t.includes("móvil") || t.includes("movil") || t.includes("escritorio") ? <PhoneIcon className="w-4 h-4" /> : <BracketsIcon className="w-4 h-4" />;
  if (blockKey === "saas") return <CardIcon className="w-4 h-4" />;
  if (blockKey === "support") return <LifebuoyIcon className="w-4 h-4" />;
  return <WindowIcon className="w-4 h-4" />;
}

/* ===================== DATA ===================== */
function usePricingData() {
  return useMemo(
    () => [
      {
        key: "web",
        title: "Páginas web",
        lead: "Presencia impecable, rendimiento sólido y SEO desde el día uno.",
        items: [
          { h: "Web básica", price: "Desde $70", p: "Landing page moderna, responsive, integrada con redes y optimizada para buscadores." },
          { h: "Web corporativa", price: "Desde $180", p: "Múltiples secciones, blog autoadministrable (extra), formularios y SEO avanzado." },
        ],
      },
      {
        key: "apps",
        title: "Aplicaciones",
        lead: "Del panel de control a tu app móvil: construimos productos listos para crecer.",
        items: [
          { h: "Apps Web", price: "Desde $350", p: "Panel de administración, roles, reportes y despliegue listo para producción." },
          { h: "Móviles / Escritorio", price: "Desde $400", p: "Android/iOS o desktop. Publicación en stores, roles y reportería a medida." },
        ],
      },
      {
        key: "saas",
        title: "Plan SaaS",
        lead: "Paga por uso, sin dolores técnicos. Nosotros nos encargamos.",
        items: [{ h: "⭐ Plan mensual - Mas Vendido!", price: "Desde $49–$150/mes", p: "Cambios, mantenimiento y evolución continua. Te enfocas en tu negocio; nosotros en la tecnología." }],
      },
      {
        key: "support",
        title: "Soporte",
        lead: "Un equipo a un mensaje de distancia para mantenerlo todo en verde.",
        items: [{ h: "Soporte y Mantenimiento", price: "Desde $6,50/h", p: "Mejoras, cambios y correcciones en tu sistema, app o web." }],
      },
    ],
    []
  );
}

/* ===================== Storytelling Scroll ===================== */
export default function PricingServices() {
  const data = usePricingData();
  const isDesktop = useIsDesktop();

  const [activeIdx, setActiveIdx] = useState(0);
  const sceneRefs = useRef([]);

  // Observa qué escena está centrada
  useEffect(() => {
    const sections = sceneRefs.current.filter(Boolean);
    if (!sections.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const idx = Number(e.target.getAttribute("data-idx") || 0);
            setActiveIdx(idx);
          }
        });
      },
      { threshold: 0.6 }
    );
    sections.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [data.length]);

  // Fondo
  const bgSky = "/images/test2.jpg";
  const grad = paletteFor(data[activeIdx]?.key || "").grad;

  // HERO fijo para eliminar totalmente el scroll inicial "en blanco"
  const [hideHero, setHideHero] = useState(false);
  useEffect(() => {
    const onScroll = () => setHideHero(window.scrollY > 16); // se desvanece apenas se mueve un poco
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section className="relative w-full">
      {/* Fondo sticky (cielo + gradiente variable) */}
      <div className="pointer-events-none sticky top-0 h-screen w-full -z-10" aria-hidden>
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${bgSky})`, filter: "saturate(1.05) contrast(1.05)" }} />
        <div className="absolute inset-0 transition-[background] duration-700 ease-out mix-blend-multiply" style={{ background: grad, opacity: 0.9 }} />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.12),transparent_55%)]" />
      </div>

      {/* HERO FIXED: visible SIEMPRE al cargar, centrado. No ocupa flujo, por eso no hay scroll vacío */}
      <div
        className={[
          "fixed inset-0 z-10 flex items-center justify-center pointer-events-none",
          "transition-opacity duration-300 ease-out",
          hideHero ? "opacity-0" : "opacity-100",
        ].join(" ")}
      >
        <h1 className="text-white text-5xl sm:text-6xl md:text-7xl font-extrabold text-center drop-shadow-[0_12px_40px_rgba(0,0,0,0.55)]">
          Elige tu forma de crecer
        </h1>
      </div>

      {/* Escenas: comienzan EN EL TOP del documento (sin márgenes negativos) */}
      <div>
        {data.map((block, i) => {
          const pal = paletteFor(block.key);
          return (
            <StoryScene
              key={block.key}
              idx={i}
              title={block.title}
              lead={block.lead}
              items={block.items}
              palette={pal}
              sceneRef={(el) => (sceneRefs.current[i] = el)}
              isDesktop={isDesktop}
            />
          );
        })}
      </div>

      {/* Cierre / CTA */}
      <div className="min-h-[70vh] flex items-center justify-center px-6">
        <div className="max-w-3xl text-center">
          <h3 className="text-white text-4xl md:text-5xl font-extrabold drop-shadow-[0_12px_40px_rgba(0,0,0,0.55)]">
            ¿Listo para despegar tu proyecto?
          </h3>
          <p className="text-white/90 mt-4 md:text-lg">
            Conversemos 15 minutos. Te proponemos el plan ideal y un roadmap claro.
          </p>
          <a
            href="https://wa.me/593999567465?text=Hola%21%20Quiero%20m%C3%A1s%20informaci%C3%B3n"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Escríbenos por WhatsApp"
            data-reveal
            className="inline-flex mt-8 items-center gap-2 rounded-2xl px-6 py-3 font-semibold bg-white/90 text-sky-800 hover:bg-white transition shadow-[0_18px_60px_-10px_rgba(0,0,0,0.55)]"
          >
            Solicitar Demo
          </a>
          <p className="text-white/80 mt-5 text-xs md:text-sm">* Valores de referencia; personalizamos cada proyecto.</p>
        </div>
      </div>
    </section>
  );
}

/* ============ Escena (100vh) con animaciones suaves ============ */
function StoryScene({ idx, title, lead, items, palette, sceneRef }) {
  const [visible, setVisible] = useState(false);
  const localRef = useRef(null);

  useEffect(() => {
    const el = localRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.35 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section
      ref={(el) => {
        localRef.current = el;
        sceneRef?.(el);
      }}
      data-idx={idx}
      className="min-h-screen flex items-center"
      aria-label={title}
    >
      <div className="mx-auto w-full max-w-6xl px-6">
        {/* Título + lead */}
        <header className={["transition-all duration-700", visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"].join(" ")}>
          <h3 className="text-white text-4xl md:text-5xl font-extrabold drop-shadow-[0_12px_40px_rgba(0,0,0,0.55)]">
            {title}
          </h3>
          {lead && <p className="text-white/90 mt-3 max-w-2xl">{lead}</p>}
        </header>

        {/* Cards */}
        <div className={`mt-8 grid grid-cols-1 gap-6 md:gap-8 ${items.length > 1 ? "md:grid-cols-2" : ""}`}>
          {items.map((it, j) => (
            <article
              key={it.h}
              className={[
                "rounded-3xl text-white p-6 md:p-7",
                "shadow-[0_30px_120px_-20px_rgba(0,0,0,0.55)] ring-1 ring-black/10",
                "transition-all duration-700",
                visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
              ].join(" ")}
              style={{
                background: palette.card,
                transitionDelay: `${(j + 1) * 90}ms`,
              }}
            >
              <header className="mb-3 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <IconBadge>{iconFor(title.toLowerCase().includes("web") ? "web" : title.toLowerCase().includes("app") ? "apps" : title.toLowerCase().includes("saas") ? "saas" : "support", it.h)}</IconBadge>
                  <h4 className="text-2xl md:text-3xl font-extrabold leading-tight drop-shadow-[0_8px_22px_rgba(0,0,0,0.25)]">
                    {it.h}
                  </h4>
                </div>
                <span className="text-xs md:text-sm font-semibold rounded-full px-3 py-1" style={{ background: palette.pill }}>
                  {it.price}
                </span>
              </header>
              <p className="text-white/95 text-sm md:text-[15px] leading-relaxed">{it.p}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
