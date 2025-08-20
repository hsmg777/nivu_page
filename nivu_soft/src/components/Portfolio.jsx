import React, { useEffect, useMemo, useRef } from "react";

/* helpers */
const clamp = (v, a = 0, b = 1) => Math.min(Math.max(v, a), b);
const lerp = (a, b, t) => a + (b - a) * t;
/** suavidad milimétrica */
const smooth = (t) => t * t * (3 - 2 * t);

export default function Portfolio() {
  const proyectos = useMemo(
    () => [
      { nombre: "Vida Buena Ec", descripcion: "Página web para compañia de medicina prepagada, tiene notificaciones automáticas y funcionalidades hechas a medida de la empresa.", imagen: "/images/vidabuena.png", ratio: 16 / 9 },
      { nombre: "Teramont", descripcion: "Colaboración en la plataforma digital de Teramont Host, El proyecto permite mostrar sus productos, planes personalizados y administrativos adaptados a cada tipo de servicio.", imagen: "/images/teramont.png", ratio: 16 / 9 },
      { nombre: "Bee Concert Club", descripcion: "Reservas con QR, panel admin, correos y publicación de eventos.", imagen: "/images/beeclub.jpeg", ratio: 16 / 9 },
      { nombre: "Watones", descripcion: "Sitio para red de servidores Minecraft: modalidades, VIP y tienda.", imagen: "/images/watones.png", ratio: 16 / 9 },
      { nombre: "SysByte", descripcion: "Gestión agrícola: cosechas, stock, ingresos/gastos y alertas.", imagen: "/images/sysbyte.jpeg", ratio: 16 / 9 },
      { nombre: "Magic Water", descripcion: "Sitio para servicios de plomería en Florida: agenda y contacto.", imagen: "/images/magicwater.jpeg", ratio: 3 / 2 },
      { nombre: "Infinity Water", descripcion: "Corporativo de filtros de agua: catálogo y cotización.", imagen: "/images/infiniwater.jpeg", ratio: 3 / 2 },
    ],
    []
  );

  const sectionRefs = useRef([]);
  const cardRefs = useRef([]);
  const prefersReduce =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  useEffect(() => {
    const visible = new Set();
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) visible.add(e.target);
          else visible.delete(e.target);
        }
      },
      { rootMargin: "40% 0px 40% 0px" }
    );
    sectionRefs.current.forEach((el) => el && io.observe(el));

    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        const vh = window.innerHeight;

        sectionRefs.current.forEach((section, i) => {
          const card = cardRefs.current[i];
          if (!section || !card) return;
          if (!visible.has(section)) return;

          const rect = section.getBoundingClientRect();
          const h = section.offsetHeight;

          const max = Math.max(1, h - vh);
          const p = clamp(-rect.top / max, 0, 1);

          const tIn = smooth(clamp(p / 0.33, 0, 1));
          const tHold = clamp((p - 0.33) / 0.34, 0, 1);
          const tOut = smooth(clamp((p - 0.67) / 0.33, 0, 1));

          const yIn = lerp(vh * 0.60, 0, tIn);
          const scIn = lerp(0.76, 1.02, tIn);
          const rotIn = lerp(-4.5, 0, tIn);
          const opIn = lerp(0.80, 1, tIn);
          const shIn = lerp(0.08, 0.30, tIn);

          const scHold = lerp(scIn, 1.02, tHold);
          const yHold = lerp(yIn, 0, tHold);
          const rotHold = rotIn;
          const shHold = lerp(shIn, 0.34, tHold);

          const yOut = lerp(yHold, -vh * 0.03, tOut);
          const scOut = lerp(scHold, 0.98, tOut);
          const rotOut = lerp(rotHold, 1.0, tOut);
          const opOut = lerp(opIn, 0.92, tOut);
          const shOut = lerp(shHold, 0.22, tOut);

          if (prefersReduce) {
            card.style.transform = "translate3d(0,0,0) scale(1)";
            card.style.opacity = "1";
            card.style.filter = "drop-shadow(0 30px 80px rgba(0,0,0,0.25))";
          } else {
            card.style.transform = `translate3d(0, ${yOut}px, 0) scale(${scOut}) rotate(${rotOut}deg)`;
            card.style.opacity = String(opOut);
            card.style.filter = `drop-shadow(0 34px 90px rgba(0,0,0,${shOut}))`;
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
      {proyectos.map((p, i) => (
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
                  // Móvil igual:
                  "w-[90vw] sm:w-[92vw]",
                  // ↓ PC más pequeño:
                  "md:w-[90vw] lg:w-[80vw] xl:w-[75vw] 2xl:w-[70vw]",
                  // límites para que no se pase en pantallas grandes:
                  "md:max-w-[1700px] md:max-h-[85vh]",
                  // ratios (móvil 9/16, desktop el ratio original del proyecto):
                  "aspect-[9/16] md:[aspect-ratio:var(--asr)]",
                  "rounded-[1.5rem] md:rounded-[2.2rem]",
                  "overflow-hidden",
                  "will-change-transform will-change-opacity will-change-filter",
              ].join(" ")}
              style={{
                "--asr": String(p.ratio),
                transform: "translate3d(0,60vh,0) scale(0.76) rotate(-4.5deg)",
                opacity: 0.8,
                filter: "drop-shadow(0 30px 80px rgba(0,0,0,0.08))",
                backgroundColor: "rgba(0,0,0,0.04)",
              }}
            >
              {/* ========= IMAGEN ========= */}
              {/* Desktop (una sola imagen, igual que antes) */}
              <img
                src={p.imagen}
                alt={p.nombre}
                loading="lazy"
                decoding="async"
                className="absolute inset-0 hidden md:block h-full w-full object-cover"
              />
              {/* Mobile: fondo de relleno difuminado + imagen nítida en CONTAIN */}
              <img
                src={p.imagen}
                alt=""
                aria-hidden="true"
                className="absolute inset-0 md:hidden h-full w-full object-cover blur-2xl scale-125 opacity-60"
              />
              <img
                src={p.imagen}
                alt={p.nombre}
                loading="lazy"
                decoding="async"
                className="absolute inset-0 md:hidden h-full w-full object-contain"
                /* Puedes ajustar el foco vertical si hace falta (ej.: '50% 35%') */
                style={{ objectPosition: "50% 50%" }}
              />

              {/* Overlay con más blur para legibilidad en móvil */}
              <footer className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 via-black/40 to-transparent p-5 sm:p-6 md:p-8">
                <div className="backdrop-blur-[12px] md:backdrop-blur-[8px]">
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
      ))}
    </section>
  );
}
