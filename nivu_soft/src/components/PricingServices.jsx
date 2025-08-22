// PricingServices.jsx
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
      return { bg: "linear-gradient(135deg,#38bdf8 0%,#22d3ee 45%,#2563eb 100%)", pill: "rgba(255,255,255,.18)" };
    case "apps":
      return { bg: "linear-gradient(135deg,#ec4899 0%,#d946ef 45%,#fb7185 100%)", pill: "rgba(255,255,255,.18)" };
    case "saas":
      return { bg: "linear-gradient(135deg,#10b981 0%,#14b8a6 45%,#06b6d4 100%)", pill: "rgba(255,255,255,.18)" };
    case "support":
      return { bg: "linear-gradient(135deg,#f59e0b 0%,#f97316 45%,#fb7185 100%)", pill: "rgba(255,255,255,.18)" };
    default:
      return { bg: "linear-gradient(135deg,#64748b 0%,#475569 100%)", pill: "rgba(255,255,255,.2)" };
  }
}

/* ===================== ICONOS (SVG muy livianos) ===================== */
const IconBase = ({ children, className = "" }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
    {children}
  </svg>
);

// Ventana/navegador (web)
const WindowIcon = ({ className = "" }) => (
  <IconBase className={className}>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <circle cx="7" cy="9" r="1" />
    <circle cx="10" cy="9" r="1" />
    <circle cx="13" cy="9" r="1" />
  </IconBase>
);

// Brackets <>
const BracketsIcon = ({ className = "" }) => (
  <IconBase className={className}>
    <path d="M8 6 3 12l5 6" />
    <path d="M16 6l5 6-5 6" />
  </IconBase>
);

// Teléfono
const PhoneIcon = ({ className = "" }) => (
  <IconBase className={className}>
    <rect x="8" y="2" width="8" height="20" rx="2" />
    <line x1="12" y1="18" x2="12" y2="18" />
  </IconBase>
);

// Tarjeta (suscripción/pagos)
const CardIcon = ({ className = "" }) => (
  <IconBase className={className}>
    <rect x="3" y="6" width="18" height="12" rx="2" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </IconBase>
);

// Salvavidas (soporte)
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

// Badge contenedor para mantener estética
const IconBadge = ({ children }) => (
  <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-white/15 ring-1 ring-white/20 text-white">
    {children}
  </span>
);

/** Mapeo de icono según categoría y/o título del item */
function iconFor(blockKey, title) {
  const t = (title || "").toLowerCase();
  if (blockKey === "web") return <WindowIcon className="w-4 h-4" />;
  if (blockKey === "apps") {
    if (t.includes("móvil") || t.includes("escritorio") || t.includes("movil")) return <PhoneIcon className="w-4 h-4" />;
    return <BracketsIcon className="w-4 h-4" />;
  }
  if (blockKey === "saas") return <CardIcon className="w-4 h-4" />;
  if (blockKey === "support") return <LifebuoyIcon className="w-4 h-4" />;
  return <WindowIcon className="w-4 h-4" />;
}

/* ===================== DATA (tu contenido) ===================== */
function usePricingData() {
  return useMemo(
    () => [
      {
        key: "web",
        title: "Páginas web",
        items: [
          {
            h: "Web básica",
            price: "Desde $70",
            p: "Landing page, conexión con redes sociales, personalizada con diseño moderno, responsive y optimizada para buscadores (SEO). Ideales para negocios que necesitan mostrar sus servicios, atraer clientes y tener una presencia sólida en línea.",
          },
          {
            h: "Web corporativa",
            price: "Desde $180",
            p: "Múltiples secciones, blog autoadministrable (valor extra), conexión con redes sociales, optimizadas para buscadores (SEO), Hosting + dominio gratis 1 mes, formularios de contacto.",
          },
        ],
      },
      {
        key: "apps",
        title: "Aplicaciones",
        items: [
          {
            h: "Apps Web",
            price: "Desde $350",
            p: "Panel de administración (control de tus modulos) de acuerdo a tu negocio y solución, Inicio de sesión con roles, reportes, diseño adaptable para todos los dispositivos. Incluye instalación y despliegue.",
          },
          {
            h: "Móviles / Escritorio",
            price: "Desde $400",
            p: "Android/iOS o desktop (Windows/Mac). Publicación en stores, Panel de administración (control de tus modulos) de acuerdo a tu negocio y solución, Inicio de sesión con roles, reporteria segun las necesidades de tu negocio.",
          },
        ],
      },
      {
        key: "saas",
        title: "Plan SaaS",
        items: [
          {
            h: "⭐ Plan mensual - Mas Vendido!",
            price: "Desde $49–$150/mes",
            p: "Obten cualquiera de nuestros servicios/productos por un valor mensual personalizado según tus necesidades, incluye cambios y mantenimiento, paga  por el uso y no te preocupes por nada técnico, lo hacemos nosotros!",
          },
        ],
      },
      {
        key: "support",
        title: "Soporte",
        items: [
          {
            h: "Soporte y Mantenimiento",
            price: "Desde $6,50/h",
            p: "Mejoras, cambios y correcciones en tu sistema, app o página web.",
          },
        ],
      },
    ],
    []
  );
}

/* ===================== VARIANTE DESKTOP (pineado) ===================== */
function DesktopPinned({ data }) {
  const outerRef = useRef(null);
  const stickyRef = useRef(null);
  const [idx, setIdx] = useState(0);

  const sections = data.length;
  const STEP_VH = 180;
  const heightVh = STEP_VH * (sections - 1) + 100;
  const bgUrl = "/images/sky1.jpg";

  useEffect(() => {
    const el = outerRef.current;
    if (!el) return;
    let raf = 0;
    const onScroll = () => {
      if (raf) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const total = el.offsetHeight - window.innerHeight;
        const scrolled = Math.min(Math.max(window.scrollY - el.offsetTop, 0), Math.max(total, 1));
        const progress = scrolled / Math.max(total, 1);
        const raw = progress * (sections - 1);
        let next = idx;
        if (raw > idx + 0.58) next = Math.min(sections - 1, idx + 1);
        else if (raw < idx - 0.58) next = Math.max(0, idx - 1);
        if (next !== idx) setIdx(next);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [sections, idx]);

  useEffect(() => {
    const sticky = stickyRef.current;
    if (!sticky) return;

    let ticking = false;
    const step = (dir) => {
      const next = Math.min(sections - 1, Math.max(0, idx + dir));
      if (next === idx) return;
      const outer = outerRef.current;
      const total = outer.offsetHeight - window.innerHeight;
      const targetProgress = next / (sections - 1 || 1);
      const targetScroll = outer.offsetTop + targetProgress * total;
      window.scrollTo({ top: targetScroll, behavior: "smooth" });
    };

    const onWheel = (e) => {
      if (!sticky.contains(e.target)) return;
      e.preventDefault();
      if (ticking) return;
      ticking = true;
      step(e.deltaY > 0 ? +1 : -1);
      setTimeout(() => (ticking = false), 650);
    };

    const onKey = (e) => {
      if (!sticky.contains(document.activeElement)) return;
      if (e.key === "ArrowDown") { e.preventDefault(); step(+1); }
      else if (e.key === "ArrowUp") { e.preventDefault(); step(-1); }
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("keydown", onKey);
    };
  }, [idx, sections]);

  const active = data[idx];

  return (
    <section
      ref={outerRef}
      style={{ height: `min(${heightVh}vh, ${heightVh}svh)` }}
      className="relative w-full overflow-visible md:block hidden"
    >
      <div ref={stickyRef} className="sticky top-0 h-screen w-full" style={{ height: "100svh" }}>
        <div className="absolute inset-0 -z-10 bg-cover bg-center" style={{ backgroundImage: `url(${bgUrl})` }} aria-hidden />
        <div className="mx-auto flex h-full max-w-7xl items-center gap-8 px-6 md:gap-14">
          <Menu3D items={data.map((d) => d.title)} index={idx} onSelect={(i) => setIdx(i)} />
          <DetailPane key={active.key} block={active} />
        </div>
      </div>
    </section>
  );
}

function Menu3D({ items, index, onSelect }) {
  return (
    <div className="relative select-none" style={{ perspective: "1200px", width: "30rem", maxWidth: "38vw", height: "72vh" }}>
      <ul className="relative left-0 top-1/2 -translate-y-1/2">
        {items.map((label, i) => {
          const d = i - index;
          const depth = -Math.abs(d) * 140;
          const ty = d * 54;
          const ry = -d * 12;
          const tx = -Math.abs(d) * 18;
          const scale = i === index ? 1.22 : 1 - Math.min(Math.abs(d) * 0.10, 0.28);
          const opacity = i === index ? 1 : 0.44;
          const blur = Math.abs(d) >= 2 ? "blur(1px)" : "none";
          return (
            <li
              key={label}
              onClick={() => onSelect(i)}
              className={[
                "cursor-pointer font-extrabold text-white",
                "text-3xl sm:text-4xl md:text-5xl lg:text-6xl",
                "transition-all duration-400",
              ].join(" ")}
              style={{
                transformOrigin: "left center",
                transformStyle: "preserve-3d",
                transform: `
                  translateX(${tx}px)
                  translateY(${ty}px)
                  translateZ(${depth}px)
                  rotateY(${ry}deg)
                  scale(${scale})
                `,
                opacity,
                filter: blur,
                textShadow: "0 8px 22px rgba(0,0,0,.35)",
                willChange: "transform, opacity, filter",
              }}
            >
              <span className="block leading-none [text-wrap:balance]">{label}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function DetailPane({ block }) {
  const pal = paletteFor(block.key);
  const single = block.items.length === 1;
  return (
    <div className="flex-1">
      <h2 className="text-white/95 text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight drop-shadow-[0_6px_18px_rgba(0,0,0,0.25)]">
        {block.title}
      </h2>

      <div className="mt-8 grid grid-cols-1 gap-6 md:gap-8 md:grid-cols-2">
        {block.items.map((it) => (
          <article
            key={it.h}
            className={[
              "rounded-3xl text-white p-6 md:p-7",
              "shadow-[0_30px_120px_-20px_rgba(0,0,0,0.55)]",
              "ring-1 ring-black/10",
              "transition-transform duration-300 hover:-translate-y-1 hover:scale-[1.01]",
              single ? "md:col-span-2" : "",
            ].join(" ")}
            style={{ background: pal.bg }}
          >
            <header className="mb-3 flex items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <IconBadge>{iconFor(block.key, it.h)}</IconBadge>
                <h3 className="text-2xl md:text-3xl font-extrabold leading-tight drop-shadow-[0_8px_22px_rgba(0,0,0,0.25)]">
                  {it.h}
                </h3>
              </div>
              <span className="text-xs md:text-sm font-semibold rounded-full px-3 py-1" style={{ background: pal.pill }}>
                {it.price}
              </span>
            </header>
            <p className="text-white/95 text-sm md:text-[15px] leading-relaxed">{it.p}</p>
          </article>
        ))}
      </div>

      <p className="mt-6 text-white/80 text-xs md:text-sm">
        * Valores de referencia; personalizamos cada proyecto.
      </p>
    </div>
  );
}

/* ===================== VARIANTE MOBILE ===================== */
function MobileBlocks({ data }) {
  const bgUrl = "/images/sky.jpg";
  const [active, setActive] = useState(0);
  const sectionRefs = useRef([]);

  useEffect(() => {
    const els = sectionRefs.current.filter(Boolean);
    if (!els.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const idx = Number(e.target.getAttribute("data-idx") || 0);
            setActive(idx);
          }
        });
      },
      { threshold: 0.6 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [data.length]);

  const scrollTo = (i) => {
    const el = sectionRefs.current[i];
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section className="md:hidden relative w-full py-20">
      <div className="absolute inset-0 -z-10 bg-cover bg-center" style={{ backgroundImage: `url(${bgUrl})` }} />
      <div className="absolute inset-0 -z-10 bg-white/10 backdrop-blur-[1px]" />

      <div className="px-5 pt-8">
        <div className="flex gap-3 overflow-x-auto snap-x snap-mandatory pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {data.map((b, i) => {
            const is = i === active;
            return (
              <button
                key={b.key}
                onClick={() => scrollTo(i)}
                className={[
                  "whitespace-nowrap rounded-full px-4 py-2 text-sm font-semibold backdrop-blur-sm",
                  is ? "bg-white text-sky-700 shadow-lg" : "bg-white/30 text-white ring-1 ring-white/40",
                ].join(" ")}
              >
                {b.title}
              </button>
            );
          })}
        </div>

        <div className="mt-6 space-y-12 pb-16">
          {data.map((block, i) => {
            const pal = paletteFor(block.key);
            return (
              <section
                key={block.key}
                data-idx={i}
                ref={(el) => (sectionRefs.current[i] = el)}
                className="scroll-mt-20"
              >
                <h2 className="text-white drop-shadow-[0_8px_22px_rgba(0,0,0,0.25)] text-3xl font-extrabold mb-5">
                  {block.title}
                </h2>

                <div className="grid grid-cols-1 gap-5">
                  {block.items.map((it) => (
                    <article
                      key={it.h}
                      className={[
                        "rounded-2xl text-white p-5 shadow-[0_18px_60px_-10px_rgba(0,0,0,0.55)] ring-1 ring-black/10",
                        "transition-transform duration-300 active:scale-[0.99]",
                      ].join(" ")}
                      style={{ background: pal.bg }}
                    >
                      <header className="mb-2 flex items-start justify-between gap-4">
                        <div className="flex items-center gap-2">
                          <IconBadge>{iconFor(block.key, it.h)}</IconBadge>
                          <h3 className="text-xl font-extrabold leading-tight">{it.h}</h3>
                        </div>
                        <span className="text-xs font-semibold rounded-full px-3 py-1" style={{ background: pal.pill }}>
                          {it.price}
                        </span>
                      </header>
                      <p className="text-white/95 text-[15px] leading-relaxed">{it.p}</p>
                    </article>
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ===================== Componente raíz ===================== */
export default function PricingServices() {
  const data = usePricingData();
  const isDesktop = useIsDesktop();
  return isDesktop ? <DesktopPinned data={data} /> : <MobileBlocks data={data} />;
}
