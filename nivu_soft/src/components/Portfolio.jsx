import React, { useEffect, useMemo, useRef, useState } from "react";

/* ------------------------- helpers & math utils ------------------------- */
const clamp  = (v, a = 0, b = 1) => Math.min(Math.max(v, a), b);
const lerp   = (a, b, t) => a + (b - a) * t;
const smooth = (t) => t * t * (3 - 2 * t);

/* construye la ruta .avif a partir de /images/*.png|jpg|jpeg|webp */
const toAvif = (path) => path.replace(/\.(png|jpe?g|webp)$/i, ".avif");

/* ------------------------------- componente ------------------------------ */
export default function Portfolio() {
  /* --------------------------- data del portafolio --------------------------- */
  const proyectos = useMemo(
    () => [
      { nombre: "Fast Cleaning Laundry",   descripcion: "Página web para la empresa Fast Cleaning, empresa qeu ofrece servicios de lavado, tiene SEO optimizado, notificaciones automaticas, a demas de ser una app de reporteria a medida de la empresa.", imagen: "/images/fc.png",   ratio: 16 / 9 },
      { nombre: "Vida Buena Ec",   descripcion: "Página web para compañia de medicina prepagada, tiene notificaciones automáticas y funcionalidades hechas a medida de la empresa.", imagen: "/images/vidabuena.png",   ratio: 16 / 9 },
      { nombre: "Teramont",        descripcion: "Colaboración en la plataforma digital de Teramont Host, El proyecto permite mostrar sus productos, planes personalizados y administrativos adaptados a cada tipo de servicio.", imagen: "/images/teramont.png",    ratio: 16 / 9 },
      { nombre: "Bee Concert Club",descripcion: "Aplicación para gestion de eventos mediante reservas y QRs, con panel autoadministrable, hecho a medida del cliente.", imagen: "/images/beeclub.jpeg",     ratio: 16 / 9 },
      { nombre: "Watones",         descripcion: "Sitio web para Watones Network, presenta información clave sobre sus modalidades de juego, rangos VIP, tienda en línea, y enlaces de acceso RAPIDO", imagen: "/images/watones.png",     ratio: 16 / 9 },
      { nombre: "SysByte",         descripcion: "Aplicación para la gestion integral de un negocio agricola, inventario, facturación, reportería.", imagen: "/images/sysbyte.jpeg",     ratio: 16 / 9 },
      { nombre: "Magic Water",     descripcion: "Página web corporativa para Magic Water, con diseño moderno, optimización SEO, integración de formularios de contacto y presentación de productos y servicios.", imagen: "/images/magicwater.jpeg", ratio: 3 / 2 },
      { nombre: "Infinity Water",  descripcion: "Sitio web corporativo creado para Infinity Water, SEO optimizado, notificaciones.", imagen: "/images/infiniwater.jpeg", ratio: 3 / 2 },
    ],
    []
  );

  /* --------------------------- flags y preferencia --------------------------- */
  const prefersReduce =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== "undefined"
      ? window.matchMedia("(max-width: 767.98px)").matches
      : false
  );

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mql = window.matchMedia("(max-width: 767.98px)");
    const handler = (e) => setIsMobile(e.matches);
    // Safari < 14 fallback
    if (mql.addEventListener) mql.addEventListener("change", handler);
    else mql.addListener(handler);
    return () => {
      if (mql.removeEventListener) mql.removeEventListener("change", handler);
      else mql.removeListener(handler);
    };
  }, []);

  /* ---------------------------- refs (desktop) ---------------------------- */
  const sectionRefs = useRef([]);
  const cardRefs    = useRef([]);
  const shadowRefs  = useRef([]);
  const heightsRef  = useRef([]);
  const activeSet   = useRef(new Set());

  /* ---------------------------- refs (mobile) ----------------------------- */
  const gridCardRefs = useRef([]);
  const mobileObserverRef = useRef(null);

  /* ------------------------- animación DESKTOP ------------------------- */
  useEffect(() => {
    if (isMobile) return; // En móvil NO montamos el efecto de scroll sticky

    const sections = sectionRefs.current.filter(Boolean);
    const cards    = cardRefs.current;

    // Visibilidad: sólo trabajamos con lo cercano al viewport
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          const idx = sections.indexOf(e.target);
          if (idx < 0) continue;
          if (e.isIntersecting) {
            activeSet.current.add(idx);
            if (cards[idx]) cards[idx].style.willChange = "transform, opacity";
            if (shadowRefs.current[idx]) shadowRefs.current[idx].style.willChange = "opacity";
          } else {
            activeSet.current.delete(idx);
            if (cards[idx]) cards[idx].style.willChange = "auto";
            if (shadowRefs.current[idx]) shadowRefs.current[idx].style.willChange = "auto";
          }
        }
      },
      { rootMargin: "40% 0px 40% 0px" }
    );
    sections.forEach((el) => el && io.observe(el));

    const recalcHeights = () => {
      heightsRef.current = sections.map((el) => (el ? el.offsetHeight : 0));
    };
    recalcHeights();
    window.addEventListener("resize", recalcHeights, { passive: true });

    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        const vh = window.innerHeight;

        activeSet.current.forEach((i) => {
          const section = sections[i];
          const card    = cards[i];
          const shadow  = shadowRefs.current[i];
          if (!section || !card) return;

          const rect = section.getBoundingClientRect();
          const h    = heightsRef.current[i] || section.offsetHeight;
          const max  = Math.max(1, h - vh);
          const p    = clamp(-rect.top / max, 0, 1);

          const tIn   = smooth(clamp(p / 0.33, 0, 1));
          const tHold = clamp((p - 0.33) / 0.34, 0, 1);
          const tOut  = smooth(clamp((p - 0.67) / 0.33, 0, 1));

          const yIn   = lerp(vh * 0.60, 0, tIn);
          const scIn  = lerp(0.76, 1.02, tIn);
          const rotIn = lerp(-4.5, 0, tIn);
          const opIn  = lerp(0.80, 1, tIn);

          const scHold = lerp(scIn, 1.02, tHold);
          const yHold  = lerp(yIn, 0, tHold);
          const rotHold= rotIn;

          const yOut   = lerp(yHold, -vh * 0.03, tOut);
          const scOut  = lerp(scHold, 0.98, tOut);
          const rotOut = lerp(rotHold, 1.0, tOut);
          const opOut  = lerp(opIn, 0.92, tOut);

          const shOut  = prefersReduce ? 0.22 : lerp(0.18, 0.32, tIn) * (1 - tOut * 0.5);

          if (prefersReduce) {
            card.style.transform = "translate3d(0,0,0) scale(1)";
            card.style.opacity   = "1";
            if (shadow) shadow.style.opacity = "0.22";
          } else {
            card.style.transform = `translate3d(0, ${yOut}px, 0) scale(${scOut}) rotate(${rotOut}deg)`;
            card.style.opacity   = String(opOut);
            if (shadow) shadow.style.opacity = String(shOut);
          }
        });

        raf = 0;
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      io.disconnect();
      if (raf) cancelAnimationFrame(raf);
    };
  }, [isMobile, prefersReduce]);

  /* ------------------------- animación de ENTRADA (MÓVIL) ------------------------- */
  useEffect(() => {
    if (!isMobile) return; // Solo en móvil
    const cards = gridCardRefs.current.filter(Boolean);
    // limpiar posible observer previo
    if (mobileObserverRef.current) {
      mobileObserverRef.current.disconnect();
    }
    const io = new IntersectionObserver(
      (entries, obs) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            // animación de entrada (una sola vez)
            e.target.classList.remove("opacity-0", "translate-y-6");
            e.target.classList.add("opacity-100", "translate-y-0");
            obs.unobserve(e.target);
          }
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.15 }
    );
    cards.forEach((el) => el && io.observe(el));
    mobileObserverRef.current = io;
    return () => io.disconnect();
  }, [isMobile, proyectos.length]);

  /* ----------------------------------- UI ----------------------------------- */
  return (
    <section id="portafolio" className="bg-white">
      {/* ========================= MÓVIL: grid sin sticky ========================= */}
      <div className="md:hidden px-4 py-10">
        <div className="grid grid-cols-1 gap-6">
          {proyectos.map((p, i) => {
            const avif = toAvif(p.imagen);
            return (
              <article key={`m-${i}`}>
                <div
                  ref={(el) => (gridCardRefs.current[i] = el)}
                  className={[
                    "relative overflow-hidden rounded-2xl ring-1 ring-black/10 shadow-lg",
                    // estado inicial (se cambia con IO al entrar)
                    "opacity-0 translate-y-6",
                    // transición suave y eficiente
                    "transition-all duration-700 ease-out will-change-transform will-change-opacity",
                  ].join(" ")}
                  style={{ aspectRatio: String(p.ratio || 16 / 9) }}
                >
                  {/* Imagen principal (cover) */}
                  <img
                    src={avif}
                    alt={p.nombre}
                    loading="lazy"
                    decoding="async"
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                  {/* Degradado para legibilidad de textos */}
                  <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />
                  {/* Texto */}
                  <div className="absolute inset-x-0 bottom-0 p-4">
                    <h3 className="text-white text-lg font-extrabold leading-tight drop-shadow">
                      {p.nombre}
                    </h3>
                    <p className="mt-1 text-white/95 text-xs">
                      {p.descripcion}
                    </p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      {/* ======================= DESKTOP: diseño original ======================= */}
      <div className="hidden md:block">
        {proyectos.map((p, i) => {
          const avif = toAvif(p.imagen); // /public/images/*.avif
          return (
            <article
              key={`d-${i}`}
              ref={(el) => (sectionRefs.current[i] = el)}
              className="relative min-h-[240vh]"
            >
              <div className="sticky top-0 h-screen flex items-center justify-center">
                <div
                  ref={(el) => (cardRefs.current[i] = el)}
                  className={[
                    "relative",
                    "w-[90vw] sm:w-[92vw]",
                    "md:w-[90vw] lg:w-[80vw] xl:w-[75vw] 2xl:w-[70vw]",
                    "md:max-w-[1700px] md:max-h-[85vh]",
                    "rounded-[1.5rem] md:rounded-[2.2rem]",
                    "overflow-hidden",
                    // antes: "bg-[rgba(0,0,0,0.04)]"
                    "bg-black/5",
                  ].join(" ")}
                  style={{
                    "--asr": String(p.ratio),
                    aspectRatio: String(p.ratio || 16 / 9),
                    transform: "translate3d(0,60vh,0) scale(0.76) rotate(-4.5deg)",
                    opacity: 0.8,
                  }}
                >
                  {/* Pseudo-sombra (sin filter animado) */}
                  <div
                    ref={(el) => (shadowRefs.current[i] = el)}
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 z-0 rounded-[inherit]"
                    style={{ boxShadow: "0 34px 90px rgba(0,0,0,0.28)", opacity: 0.22 }}
                  />

                  {/* ======== IMAGEN (solo AVIF) ======== */}
                  <img
                    src={avif}
                    alt={p.nombre}
                    loading="lazy"
                    decoding="async"
                    className="absolute inset-0 h-full w-full object-cover"
                  />

                  {/* Scrim inferior suave para legibilidad (separado del panel) */}
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[38%] md:h-[42%]">
                    <div className="h-full w-full bg-gradient-to-t from-black/70 via-black/35 to-transparent mix-blend-multiply" />
                  </div>

                  {/* Panel de texto tipo “glass card” compacto */}
                  <footer className="absolute inset-x-0 bottom-0 p-6 md:p-8">
                    <div className="max-w-3xl">
                      <div
                        className="
                          inline-flex flex-col
                          backdrop-blur-md bg-white/8
                          ring-1 ring-white/20
                          rounded-xl md:rounded-2xl
                          px-5 py-4 md:px-6 md:py-5
                          shadow-[0_8px_32px_rgba(0,0,0,0.25)]
                          transition-transform duration-300 will-change-transform
                          hover:scale-[1.01]
                        "
                      >
                        <h3 className="text-white text-2xl md:text-4xl font-extrabold leading-tight drop-shadow-sm">
                          {p.nombre}
                        </h3>
                        <p className="mt-2 text-white/95 text-sm md:text-lg leading-relaxed">
                          {p.descripcion}
                        </p>
                      </div>
                    </div>
                  </footer>

                  {/* Anillo exterior sutil */}
                  <div className="pointer-events-none absolute inset-0 rounded-[1.5rem] md:rounded-[2.2rem] ring-1 ring-white/25" />
                </div>
              </div>
            </article>

          );
        })}
      </div>
    </section>
  );
}
