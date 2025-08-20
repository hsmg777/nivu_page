import { useEffect, useRef } from "react";

export default function PortfolioIntro() {
  const sectionRef = useRef(null);
  const stickyRef  = useRef(null);
  const titleRef   = useRef(null);
  const finalRef   = useRef(null);
  const line1Ref   = useRef(null);
  const line2Ref   = useRef(null);
  const captionRef = useRef(null);

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

    // === Parámetros responsivos ===
    const isDesktop = () => window.matchMedia("(min-width: 768px)").matches;
    const START_SCALE_DESKTOP = 2.0;
    const START_SCALE_MOBILE  = 1.6;     // ⬅️ más pequeño en móvil
    const END_SCALE           = 1.0;     // match exacto con el dummy final

    // Delays de aparición (un poco más tarde en móvil)
    const DELAY_1_DESKTOP = 0.40, DELAY_2_DESKTOP = 0.55, DELAY_3_DESKTOP = 0.70;
    const DELAY_1_MOBILE  = 0.48, DELAY_2_MOBILE  = 0.63, DELAY_3_MOBILE  = 0.78;

    [l1, l2, cap].forEach(el => {
      if (!el) return;
      el.style.opacity    = "0";
      el.style.transform  = "translateY(16px)";
      el.style.willChange = "opacity, transform";
    });
    title.style.willChange = "transform";

    if (reduce) {
      title.style.transform = "none";
      [l1, l2, cap].forEach(el => { if (el) { el.style.opacity = "1"; el.style.transform = "translateY(0)"; }});
      return;
    }

    const clamp = (n, a, b) => Math.min(Math.max(n, a), b);
    const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

    let raf = 0;

    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        const rect = section.getBoundingClientRect();
        const vh = window.innerHeight;
        const sectionHeight = section.offsetHeight;

        const localScrollMax = Math.max(1, sectionHeight - vh);
        const localScroll = clamp(-rect.top, 0, localScrollMax);
        const p = easeOutCubic(localScroll / localScrollMax);

        const finalBox  = final.getBoundingClientRect();
        const stickyBox = sticky.getBoundingClientRect();

        const finalX = finalBox.left - stickyBox.left;
        const finalY = finalBox.top  - stickyBox.top;

        const startScale = isDesktop() ? START_SCALE_DESKTOP : START_SCALE_MOBILE;
        const scale = startScale + (END_SCALE - startScale) * p;
        const tx = finalX * p;
        const ty = finalY * p;

        title.style.transformOrigin = "left top";
        title.style.transform = `translate3d(${tx}px, ${ty}px, 0) scale(${scale})`;

        // Aparición más tardía en móvil
        const [d1, d2, d3] = isDesktop()
          ? [DELAY_1_DESKTOP, DELAY_2_DESKTOP, DELAY_3_DESKTOP]
          : [DELAY_1_MOBILE , DELAY_2_MOBILE , DELAY_3_MOBILE ];

        const step1 = clamp((p - d1) / 0.15, 0, 1);
        const step2 = clamp((p - d2) / 0.15, 0, 1);
        const step3 = clamp((p - d3) / 0.15, 0, 1);

        if (l1) { l1.style.opacity = String(step1); l1.style.transform = `translateY(${(1 - step1) * 14}px)`; }
        if (l2) { l2.style.opacity = String(step2); l2.style.transform = `translateY(${(1 - step2) * 14}px)`; }
        if (cap){ cap.style.opacity = String(step3); cap.style.transform = `translateY(${(1 - step3) * 12}px)`; }

        raf = 0;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    onScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
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
          {/* Dummy final (define tamaño final del PORTAFOLIO) */}
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

          {/* Frases pegadas a la derecha sin cambiar altura */}
          <div
            className="
              md:col-start-8 md:col-span-5
              md:justify-self-end md:text-right md:pr-12
              md:max-w-[34rem]
              mt-80 md:mt-[32rem]
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

      {/* Respiro antes del grid real de proyectos */}
      <div className="h-[20vh]" />
    </section>
  );
}
