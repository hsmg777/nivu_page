// Contact.jsx
import { useEffect, useRef } from "react";

/* =========================
   Splash Cursor (fondo)
   ========================= */
function SplashCursorBG({
  colors = [
    "rgba(5, 183, 255, 0.50)",
    "rgba(108, 99, 255, 0.40)",
    "rgba(56, 189, 248, 0.34)",
    "rgba(16, 185, 129, 0.30)",
    "rgba(236, 72, 153, 0.30)",
  ],
  radii = [220, 190, 170, 150, 130],
  blur = 26,
}) {
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);

  const runningRef = useRef(true);
  const visibleRef = useRef(true);
  const pointerRef = useRef({ x: 0, y: 0 });
  const blobsRef = useRef([]);

  const lerp = (a, b, t) => a + (b - a) * t;

  useEffect(() => {
    const cvs = canvasRef.current;
    const ctx = cvs.getContext("2d");
    ctxRef.current = ctx;

    const fit = () => {
      const parent = cvs.parentElement; // <section> o wrapper relativo
      if (!parent) return;
      const dpr = Math.max(1, window.devicePixelRatio || 1);

      // ancho/alto del contenedor (si clientHeight es 0, usa scrollHeight)
      const wCSS = Math.max(parent.clientWidth, 1);
      const hCSS = Math.max(parent.clientHeight || parent.scrollHeight, 1);

      // tamaño de dibujo (buffer) + tamaño CSS visible
      cvs.width = Math.round(wCSS * dpr);
      cvs.height = Math.round(hCSS * dpr);
      cvs.style.width = wCSS + "px";
      cvs.style.height = hCSS + "px";

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.filter = `blur(${blur}px)`;
    };

    // Ajuste inicial y pequeño diferido (por fuentes/layout)
    fit();
    requestAnimationFrame(fit);

    // Centro inicial del puntero
    const parentRect = cvs.parentElement.getBoundingClientRect();
    pointerRef.current = { x: parentRect.width / 2, y: parentRect.height / 2 };

    // Crear blobs
    blobsRef.current = colors.map((c, i) => ({
      x: pointerRef.current.x,
      y: pointerRef.current.y,
      lag: 0.08 + i * 0.035,
      radius: radii[i] || radii[radii.length - 1],
      color: c,
    }));

    // Mezcla visible en fondos claros
    let blend = "screen";
    try {
      ctx.globalCompositeOperation = "plus-lighter";
      blend =
        ctx.globalCompositeOperation === "plus-lighter" ? "plus-lighter" : "screen";
    } catch {
      blend = "screen";
    }

    let raf = 0;
    const prefersReduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const draw = () => {
      if (!runningRef.current || !visibleRef.current || prefersReduce) return;

      const ctx = ctxRef.current;
      const r = cvs.getBoundingClientRect();
      const w = r.width;
      const h = r.height;

      // limpiar
      ctx.globalCompositeOperation = "source-over";
      ctx.clearRect(0, 0, w, h);

      // follow + wobble
      const { x: tx, y: ty } = pointerRef.current;
      blobsRef.current.forEach((b, i) => {
        const t = performance.now() * (0.0005 + i * 0.00015);
        const wobX = Math.sin(t * 2 + i) * 6;
        const wobY = Math.cos(t * 1.6 + i) * 6;
        b.x = lerp(b.x, tx + wobX, b.lag);
        b.y = lerp(b.y, ty + wobY, b.lag);
      });

      // pintar
      ctx.globalCompositeOperation = blend;
      blobsRef.current.forEach((b) => {
        const g = ctx.createRadialGradient(b.x, b.y, 0, b.x, b.y, b.radius);
        g.addColorStop(0.0, b.color);
        g.addColorStop(0.5, b.color);
        g.addColorStop(1.0, "rgba(0,0,0,0)");
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.radius, 0, Math.PI * 2);
        ctx.fill();
      });
    };

    const loop = () => {
      raf = requestAnimationFrame(loop);
      draw();
    };

    // Eventos: usamos window (el canvas tiene pointer-events:none)
    const updateFromEvent = (clientX, clientY) => {
      const r = canvasRef.current.getBoundingClientRect();
      pointerRef.current = { x: clientX - r.left, y: clientY - r.top };
    };
    const onMouse = (e) => updateFromEvent(e.clientX, e.clientY);
    const onTouch = (e) => {
      const t = e.touches[0];
      if (t) updateFromEvent(t.clientX, t.clientY);
    };

    window.addEventListener("mousemove", onMouse, { passive: true });
    window.addEventListener("touchstart", onTouch, { passive: true });
    window.addEventListener("touchmove", onTouch, { passive: true });

    // Resize del viewport
    const onResize = () => fit();
    window.addEventListener("resize", onResize, { passive: true });

    // Resize del CONTENEDOR (clave para cubrir toda la sección)
    const ro = new ResizeObserver(() => fit());
    if (cvs.parentElement) ro.observe(cvs.parentElement);

    // Visibilidad/intersection
    const io = new IntersectionObserver(
      (entries) => (visibleRef.current = entries[0]?.isIntersecting ?? true),
      { threshold: 0.01 }
    );
    io.observe(cvs);

    const onVis = () => (runningRef.current = !document.hidden);
    document.addEventListener("visibilitychange", onVis);

    loop();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMouse);
      window.removeEventListener("touchstart", onTouch);
      window.removeEventListener("touchmove", onTouch);
      window.removeEventListener("resize", onResize);
      ro.disconnect();
      io.disconnect();
      document.removeEventListener("visibilitychange", onVis);
    };
  }, [blur, colors, radii]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="absolute inset-0 w-full h-full z-0 pointer-events-none"
    />
  );
}

/* =========================
   Pequeño hook de reveal
   ========================= */
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll("[data-reveal]");
    if (!els.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.remove("opacity-0", "translate-y-6");
            e.target.classList.add("opacity-100", "translate-y-0");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.2 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

/* =========================
   Contact
   ========================= */
export default function Contact() {
  useReveal();

  return (
    <section
      id="contacto"
      className="relative w-full bg-gray-200 py-20 sm:py-24 md:py-28 overflow-hidden"
    >
      {/* Splash Cursor detrás del contenido y cubriendo TODA la sección */}
      <SplashCursorBG />

      <div className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 md:grid-cols-12 items-center gap-12 px-6">
        {/* Columna izquierda: título + botón */}
        <div className="md:col-span-4">
          <h3
            data-reveal
            className="opacity-0 translate-y-7 transition duration-700 text-[#05b7ff] font-extrabold tracking-tight
                       text-3xl sm:text-4xl md:text-[2.6rem] leading-none"
          >
            CONTACTO
          </h3>

          {/* Botón circular */}
          <a
            href="https://wa.me/593999567465?text=Hola%21%20Quiero%20m%C3%A1s%20informaci%C3%B3n"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Escríbenos por WhatsApp"
            data-reveal
            className={[
              "group relative mt-10 inline-grid place-items-center",
              "h-28 w-28 sm:h-32 sm:w-32 md:h-36 md:w-36",
              "rounded-full overflow-hidden",
              "bg-[#05b7ff] ring-1 ring-white/30 shadow-xl",
              "opacity-0 translate-y-7 translate-x-10 transition duration-700",
            ].join(" ")}
          >
            <span className="absolute inset-0 rounded-full bg-[#05b7ff]" />
            <span
              aria-hidden="true"
              className={[
                "absolute inset-0 m-auto aspect-square rounded-full bg-[#0B1F54]",
                "scale-0 group-hover:scale-100",
                "transition-transform duration-400 ease-out",
              ].join(" ")}
            />
            <span
              aria-hidden="true"
              className={[
                "pointer-events-none absolute inset-0 m-auto aspect-square rounded-full bg-white/25",
                "opacity-0 scale-0 group-hover:opacity-100 group-hover:scale-125",
                "transition-all duration-400 ease-out",
              ].join(" ")}
            />
            <svg
              viewBox="0 0 24 24"
              className={[
                "relative z-10 h-8 w-8 sm:h-9 sm:w-9",
                "text-white",
                "transition-all duration-200",
                "group-hover:scale-75 group-hover:opacity-0",
              ].join(" ")}
              fill="none"
              stroke="currentColor"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14" />
              <path d="M13 6l6 6-6 6" />
            </svg>
            <svg
              viewBox="0 0 24 24"
              className={[
                "absolute z-10 h-8 w-8 sm:h-9 sm:w-9",
                "text-white",
                "opacity-0 scale-90",
                "transition-all duration-300 delay-150",
                "group-hover:opacity-100 group-hover:scale-110",
              ].join(" ")}
              fill="none"
              stroke="currentColor"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14" />
              <path d="M13 6l6 6-6 6" />
            </svg>
          </a>
        </div>

        {/* Columna derecha: mensaje grande */}
        <div className="md:col-span-8">
          <h2
            data-reveal
            className="opacity-0 translate-y-6 transition duration-700
                       text-right text-[#05b7ff] font-extrabold tracking-tight leading-[1.08]
                       text-2xl sm:text-3xl md:text-5xl lg:text-7xl
                       max-w-[68rem] ml-auto md:pr-2 lg:pr-8 [text-wrap:balance] break-words"
          >
            <span className="block">ESTÁS A UN CLICK DE</span>
            <span className="block">TRANSFORMAR TU</span>
            <span className="block">EMPRESA. ESCRÍBENOS Y</span>
            <span className="block">HAGÁMOSLO REALIDAD</span>
          </h2>
        </div>
      </div>
    </section>
  );
}
