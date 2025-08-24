import { useEffect, useRef } from "react";

export default function PortfolioIntro() {
  const sectionRef = useRef(null);
  const stickyRef  = useRef(null);
  const titleRef   = useRef(null);
  const finalRef   = useRef(null);
  const line1Ref   = useRef(null);
  const line2Ref   = useRef(null);
  const captionRef = useRef(null);

  // Métricas precalculadas para evitar reflows por frame
  const metricsRef = useRef({
    localScrollMax: 1,
    finalX: 0,
    finalY: 0,
    startScale: 2.0,
    vh: 0,
    sectionHeight: 0,
    desktop: false,
  });

  // Sólo corre animación cuando la sección es visible
  const inViewRef = useRef(false);

  useEffect(() => {
    const section = sectionRef.current;
    const sticky  = stickyRef.current;
    const title   = titleRef.current;
    const final   = finalRef.current;
    const l1 = line1Ref.current;
    const l2 = line2Ref.current;
    const cap = captionRef.current;
    if (!section || !sticky || !title || !final) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Estados iniciales
    [l1, l2, cap].forEach(el => {
      if (!el) return;
      el.style.opacity   = "0";
      el.style.transform = "translateY(16px)";
    });
    title.style.transformOrigin = "left top";

    // Helper
    const clamp = (n, a, b) => Math.min(Math.max(n, a), b);
    const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

    // Recalcular métricas (sólo en mount/resize)
    const recalc = () => {
      const desktop = window.matchMedia("(min-width: 768px)").matches;
      metricsRef.current.desktop = desktop;
      metricsRef.current.startScale = desktop ? 2.0 : 1.6;

      const vh = window.innerHeight;
      metricsRef.current.vh = vh;

      // Altura de la sección para progreso local
      const sectionHeight = section.offsetHeight; // no fuerza layout caro
      metricsRef.current.sectionHeight = sectionHeight;
      metricsRef.current.localScrollMax = Math.max(1, sectionHeight - vh);

      // Offset final (NO cambia con el scroll, sólo con layout)
      const finalBox  = final.getBoundingClientRect();
      const stickyBox = sticky.getBoundingClientRect();
      metricsRef.current.finalX = finalBox.left - stickyBox.left;
      metricsRef.current.finalY = finalBox.top  - stickyBox.top;
    };

    // Animación por scroll (usa SOLO una lectura por frame)
    let raf = 0;
    const onScroll = () => {
      if (!inViewRef.current || reduce) return; // no hacer nada si no está visible
      if (raf) return;
      raf = requestAnimationFrame(() => {
        const { localScrollMax, finalX, finalY, startScale, desktop, vh } = metricsRef.current;

        const rect = section.getBoundingClientRect(); // 1 lectura/layout por frame
        const localScroll = clamp(-rect.top, 0, localScrollMax);
        const p = easeOutCubic(localScroll / localScrollMax);

        const scale = startScale + (1.0 - startScale) * p;
        const tx = finalX * p;
        const ty = finalY * p;

        // Sólo transform (barato)
        title.style.transform = `translate3d(${tx}px, ${ty}px, 0) scale(${scale})`;

        // Frases escalonadas (transform + opacity)
        const [d1, d2, d3] = desktop
          ? [0.40, 0.55, 0.72]
          : [0.48, 0.63, 0.78];

        const step1 = clamp((p - d1) / 0.15, 0, 1);
        const step2 = clamp((p - d2) / 0.15, 0, 1);
        const step3 = clamp((p - d3) / 0.15, 0, 1);

        if (l1) { l1.style.opacity = String(step1); l1.style.transform = `translateY(${(1 - step1) * 14}px)`; }
        if (l2) { l2.style.opacity = String(step2); l2.style.transform = `translateY(${(1 - step2) * 14}px)`; }
        if (cap){ cap.style.opacity = String(step3); cap.style.transform = `translateY(${(1 - step3) * 12}px)`; }

        raf = 0;
      });
    };

    // IO para encender/apagar animación + will-change
    const io = new IntersectionObserver(([e]) => {
      inViewRef.current = e.isIntersecting;
      if (inViewRef.current) {
        title.style.willChange = "transform";
        [l1,l2,cap].forEach(el => el && (el.style.willChange = "transform, opacity"));
        onScroll(); // pinta el estado actual
        window.addEventListener("scroll", onScroll, { passive: true });
      } else {
        title.style.willChange = "auto";
        [l1,l2,cap].forEach(el => el && (el.style.willChange = "auto"));
        window.removeEventListener("scroll", onScroll);
      }
    }, { rootMargin: "40% 0px 40% 0px" });

    // Recalcular al inicio y en resize (usa rAF para no bloquear)
    const ro = new ResizeObserver(() => requestAnimationFrame(recalc));
    recalc();
    ro.observe(section);
    ro.observe(sticky);
    ro.observe(final);

    io.observe(section);
    window.addEventListener("resize", recalc, { passive: true });

    // Accesibilidad: si reduce motion, muestra directo y no anima
    if (reduce) {
      title.style.transform = "none";
      [l1, l2, cap].forEach(el => { if (el) { el.style.opacity = "1"; el.style.transform = "translateY(0)"; } });
    }

    return () => {
      window.removeEventListener("resize", recalc);
      window.removeEventListener("scroll", onScroll);
      io.disconnect();
      ro.disconnect();
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative min-h-[220vh] bg-white">
      <div ref={stickyRef} className="sticky top-0 h-screen overflow-hidden">
        {/* Título animado */}
        <h2
          ref={titleRef}
          className="
            absolute left-0 top-0 
            text-[clamp(1.8rem,12vw,4rem)]
            md:text-[14vw] 
            font-extrabold 
            leading-none tracking-tight 
            text-[#05b7ff] 
            select-none
          "
          style={{ transform: "scale(6)" }}
        >
          PORTAFOLIO
        </h2>

        {/* Layout final */}
        <div className="absolute inset-0 grid grid-cols-1 md:grid-cols-12 items-start px-6 md:px-12 pt-24">
          <div className="md:col-span-7">
            <h3
              ref={finalRef}
              className="
                pointer-events-none 
                text-[clamp(1.2rem,5vw,2.2rem)]
                md:text-[5.6rem] 
                font-extrabold 
                leading-tight 
                text-[#05b7ff] 
                opacity-0
              "
            >
              PORTAFOLIO
            </h3>
          </div>

          {/* Frases */}
          <div
            className="
              md:col-start-8 md:col-span-5
              md:justify-self-end md:text-right md:pr-12
              md:max-w-[34rem]
              mt-80
              md:mt-[34vh] lg:mt-[38vh] xl:mt-[40vh] 2xl:mt-[42vh]
            "
          >
            <p ref={line1Ref} className="text-2xl md:text-4xl font-extrabold text-blue-900 opacity-0">
              Conoce los proyectos
            </p>
            <p ref={line2Ref} className="mt-1 text-2xl md:text-4xl font-extrabold text-blue-900 opacity-0">
              que hemos realizado
            </p>
            <p ref={captionRef} className="mt-5 text-sm md:text-base font-semibold text-blue-900/80 opacity-0">
              nuestro trabajo hecho a medida de los clientes
            </p>
          </div>
        </div>
      </div>

      <div className="h-[20vh]" />
    </section>
  );
}
