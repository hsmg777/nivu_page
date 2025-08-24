import React, { useEffect, useMemo, useRef } from "react";

/* helpers */
const clamp  = (v, a = 0, b = 1) => Math.min(Math.max(v, a), b);
const lerp   = (a, b, t) => a + (b - a) * t;
const smooth = (t) => t * t * (3 - 2 * t);

/* construye la ruta .avif a partir de /images/*.png|jpg|jpeg|webp */
const toAvif = (path) => path.replace(/\.(png|jpe?g|webp)$/i, ".avif");

export default function Portfolio() {
  const proyectos = useMemo(
    () => [
      { nombre: "Vida Buena Ec",   descripcion: "Página web para compañia de medicina prepagada, tiene notificaciones automáticas y funcionalidades hechas a medida de la empresa.", imagen: "/images/vidabuena.png",   ratio: 16 / 9 },
      { nombre: "Teramont",        descripcion: "Colaboración en la plataforma digital de Teramont Host, El proyecto permite mostrar sus productos, planes personalizados y administrativos adaptados a cada tipo de servicio.", imagen: "/images/teramont.png",    ratio: 16 / 9 },
      { nombre: "Bee Concert Club",descripcion: "Aplicación para gestion de eventos mediante reservas y QRs, con panel autoadministrable, hecho a medida del cliente.", imagen: "/images/beeclub.jpeg",     ratio: 16 / 9 },
      { nombre: "Watones",         descripcion: "Sitio web para Watones Network, presenta información clave sobre sus modalidades de juego, rangos VIP, tienda en línea, y enlaces de acceso...", imagen: "/images/watones.png",     ratio: 16 / 9 },
      { nombre: "SysByte",         descripcion: "Aplicación para la gestion integral de un negocio agricola, inventario, facturación, reportería.", imagen: "/images/sysbyte.jpeg",     ratio: 16 / 9 },
      { nombre: "Magic Water",     descripcion: "Sistema web desarrollado para Magic Water...", imagen: "/images/magicwater.jpeg", ratio: 3 / 2 },
      { nombre: "Infinity Water",  descripcion: "Sitio web corporativo creado para Infinity Water...", imagen: "/images/infiniwater.jpeg", ratio: 3 / 2 },
    ],
    []
  );

  const sectionRefs = useRef([]);
  const cardRefs    = useRef([]);
  const shadowRefs  = useRef([]);
  const heightsRef  = useRef([]);
  const activeSet   = useRef(new Set());

  const prefersReduce =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  useEffect(() => {
    const sections = sectionRefs.current;
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
  }, [prefersReduce]);

  return (
    <section id="portafolio" className="bg-white">
      {proyectos.map((p, i) => {
        const avif = toAvif(p.imagen); // /public/images/*.avif
        return (
          <article
            key={i}
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
                  "aspect-[9/16] md:[aspect-ratio:var(--asr)]",
                  "rounded-[1.5rem] md:rounded-[2.2rem]",
                  "overflow-hidden",
                  "bg-[rgba(0,0,0,0.04)]",
                ].join(" ")}
                style={{
                  "--asr": String(p.ratio),
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
                {/* Desktop: cover */}
                <img
                  src={avif}
                  alt={p.nombre}
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 hidden md:block h-full w-full object-cover"
                />

                {/* Mobile: fondo + contain (sin blur caro) */}
                <div className="absolute inset-0 md:hidden">
                  {/* Fondo de relleno (cover) */}
                  <img
                    src={avif}
                    alt=""
                    aria-hidden="true"
                    loading="lazy"
                    decoding="async"
                    className="absolute inset-0 h-full w-full object-cover opacity-60 scale-110"
                  />
                  {/* Gradiente para legibilidad */}
                  <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-transparent" />
                  {/* Imagen nítida principal (contain) */}
                  <img
                    src={avif}
                    alt={p.nombre}
                    loading="lazy"
                    decoding="async"
                    className="absolute inset-0 h-full w-full object-contain"
                    style={{ objectPosition: "50% 50%" }}
                  />
                </div>

                {/* Overlay de texto (sin backdrop-blur en móvil) */}
                <footer className="absolute inset-x-0 bottom-0 p-5 sm:p-6 md:p-8">
                  <div className="bg-gradient-to-t from-black/75 via-black/40 to-transparent rounded-[inherit] p-0.5">
                    <h3 className="text-white text-xl sm:text-2xl md:text-4xl font-extrabold leading-tight drop-shadow">
                      {p.nombre}
                    </h3>
                    <p className="mt-2 text-white/95 text-sm sm:text-base md:text-xl max-w-[78ch]">
                      {p.descripcion}
                    </p>
                  </div>
                </footer>

                <div className="pointer-events-none absolute inset-0 rounded-[1.5rem] md:rounded-[2.2rem] ring-1 ring-white/25" />
              </div>
            </div>
          </article>
        );
      })}
    </section>
  );
}
