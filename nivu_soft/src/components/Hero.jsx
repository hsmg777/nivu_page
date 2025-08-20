import { useEffect, useRef } from "react";

/* Reveal simple */
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll("[data-reveal]");
    if (!els.length) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.remove("opacity-0", "translate-y-6");
          e.target.classList.add("opacity-100", "translate-y-0");
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.2 });
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

export default function Hero() {
  const bgRef = useRef(null);
  useReveal();

  // Parallax solo desktop
  useEffect(() => {
    const el = bgRef.current;
    if (!el) return;
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        const y = window.scrollY || 0;
        el.style.transform = `translate3d(0, ${y * 0.015}px, 0) scale(1.02)`;
        raf = 0;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section
      id="inicio"
      className="relative min-h-[100svh] w-full overflow-hidden"
    >
      <div
        ref={bgRef}
        className={[
          "absolute inset-0 -z-10",
          "bg-[url('/images/bg_hero_cell.png')] md:bg-[url('/images/hero_bg.png')]",
          "bg-no-repeat bg-cover bg-top md:bg-[center_top_-210px]",
          "bg-[#7ec6f0]" 
        ].join(" ")}
      />

      {/* Contenido */}
      <div className="flex h-[100svh] w-full flex-col items-center justify-end px-6 pb-24 text-center sm:pb-28">
        <p
          className="mt-6 text-lg sm:text-2xl text-white/90 font-bold opacity-0 translate-y-6 transition duration-700 delay-150"
          data-reveal
        >
          Desarrollo de software personalizado
        </p>
<a
  href="https://wa.me/593999567465?text=Hola%21%20me%20gustar%C3%ADa%20agendar%20una%20demo"
  target="_blank"
  rel="noopener noreferrer"
  className={[
    "group relative isolate inline-flex items-center justify-center mt-8 overflow-hidden",
    "rounded-2xl border border-white/40 px-8 py-3",
    "text-white text-lg font-semibold backdrop-blur-md",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300",
    "opacity-0 translate-y-6 duration-700 delay-300",
    "bg-white/10",
  ].join(" ")}
  data-reveal
>
  {/* ONDA 1: relleno azul desde el centro */}
  <span
    className={[
      "pointer-events-none absolute inset-0 z-0",
      "before:content-[''] before:absolute before:left-1/2 before:top-1/2",
      "before:h-4 before:w-4 before:-translate-x-1/2 before:-translate-y-1/2",
      "before:rounded-full before:bg-[#0a1a5f]",
      "before:transform before:transition-transform before:duration-500 before:ease-out",
      "before:scale-0 group-hover:before:scale-[18] group-focus-visible:before:scale-[18]",
      "motion-reduce:before:transition-none",
    ].join(" ")}
  />

  {/* ONDA 2: halo suave que se desvanece */}
  <span
    aria-hidden="true"
    className={[
      "pointer-events-none absolute inset-0 z-0",
      "after:content-[''] after:absolute after:left-1/2 after:top-1/2",
      "after:h-6 after:w-6 after:-translate-x-1/2 after:-translate-y-1/2",
      "after:rounded-full after:bg-cyan-400/30",
      "after:transform after:transition-all after:duration-700 after:ease-out",
      "after:scale-0 group-hover:after:scale-[20] group-hover:after:opacity-0",
      "group-focus-visible:after:scale-[20] group-focus-visible:after:opacity-0",
      "motion-reduce:after:transition-none",
    ].join(" ")}
  />

  {/* Contenido encima del efecto */}
  <span className="relative z-10 flex items-center gap-2 transition-colors duration-300">
    Agenda tu demo
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-0.5"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M5 12h14" />
      <path d="M13 6l6 6-6 6" />
    </svg>
  </span>
</a>

      </div>
    </section>
  );
}
