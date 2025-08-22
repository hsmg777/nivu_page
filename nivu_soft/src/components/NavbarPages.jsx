import { useEffect, useRef, useState } from "react";

const MENU_ID = "nav-overlay";

export default function NavbarPages() {
  const [open, setOpen] = useState(false);
  const hamburgerRef = useRef(null);
  const closeRef = useRef(null);

  // Bloquear/desbloquear scroll
  useEffect(() => {
    const prev = document.body.style.overflow;
    if (open) document.body.style.overflow = "hidden";
    return () => (document.body.style.overflow = prev);
  }, [open]);

  // Foco accesible
  useEffect(() => {
    if (open) setTimeout(() => closeRef.current?.focus?.(), 0);
    else setTimeout(() => hamburgerRef.current?.focus?.(), 0);
  }, [open]);

  // Cerrar con ESC
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const handleGo = () => setOpen(false);

  return (
    <>
      {/* Barra fija SIN fondo */}
      <nav className="fixed top-4 left-4 right-4 z-[60]">
        <div className="flex items-center justify-between px-6 md:px-10">
          <a href="/" onClick={handleGo} className="flex items-center gap-3">
            <img
              src="/images/logo_nube.png"
              alt="Nivu Soft"
              className="h-16 w-auto md:h-16"
            />
            {/* Oculto el texto para dejar solo el ícono */}
            <span className="sr-only">Nivu Soft</span>
          </a>

          {/* Botón hamburguesa SIN fondo (grande) */}
          <button
            ref={(el) => (hamburgerRef.current = el)}
            aria-controls={MENU_ID}
            aria-expanded={open}
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            onClick={() => setOpen((v) => !v)}
            className={[
              "inline-flex h-14 w-14 items-center justify-center rounded-md outline-none",
              "focus-visible:ring-2 focus-visible:ring-cyan-400",
              open ? "opacity-0 pointer-events-none" : "opacity-100",
            ].join(" ")}
          >
            {/* Tres barras blancas más gruesas */}
            <span className="relative block h-9 w-10">
              <span
                className={[
                  "absolute left-0 right-0 top-0 h-1 bg-white transition-transform",
                  open ? "translate-y-3 rotate-45" : "",
                ].join(" ")}
              />
              <span
                className={[
                  "absolute left-0 right-0 top-1/2 h-1 -translate-y-1/2 bg-white transition-opacity",
                  open ? "opacity-0" : "opacity-100",
                ].join(" ")}
              />
              <span
                className={[
                  "absolute left-0 right-0 bottom-0 h-1 bg-white transition-transform",
                  open ? "-translate-y-3 -rotate-45" : "",
                ].join(" ")}
              />
            </span>
          </button>
        </div>
      </nav>

      {/* OVERLAY FULL-SCREEN */}
      <div
        id={MENU_ID}
        role="dialog"
        aria-modal="true"
        className={[
          "fixed inset-0 z-[80]",
          "transition-[opacity,visibility] duration-300",
          open ? "visible opacity-100" : "invisible opacity-0",
        ].join(" ")}
        onClick={() => setOpen(false)}
      >
        {/* Imagen de fondo */}
        <div
          className={[
            "absolute inset-0",
            "bg-[url('/images/menu-bg.jpeg')] bg-cover bg-center",
            "before:absolute before:inset-0 before:bg-gradient-to-b before:from-[#0a1a5f]/90 before:via-[#0a1a5f]/80 before:to-[#0a1a5f]/80",
          ].join(" ")}
          aria-hidden="true"
        />
        

        {/* Contenido ocupa TODA la pantalla */}
        <div
          className={[
            "relative flex h-full w-full flex-col",
            "px-6 sm:px-12 py-10",
            "motion-safe:transition-transform motion-safe:duration-300",
            open ? "motion-safe:translate-y-0" : "motion-safe:translate-y-2",
          ].join(" ")}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Botón cerrar (X) arriba derecha, sin fondo */}
          <button
            ref={(el) => (closeRef.current = el)}
            onClick={() => setOpen(false)}
            aria-label="Cerrar menú"
            className="ml-auto inline-flex h-12 w-12 items-center justify-center rounded-md text-white text-2xl outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
          >
            ×
          </button>

          {/* Lista enorme, izquierda – ocupa pantalla completa */}
          <ul className="mt-6 select-none">
            {[
              { label: "INICIO", href: "/" },
              { label: "NOSOTROS", href: "/about" },
              { label: "PORTAFOLIO", href: "/#portafolio" },
              { label: "CONTACTO", href: "/contact" },
              { label: "PRECIOS & SERVICIOS", href: "/pricing" },
            ].map((item, i) => (
              <li key={item.href} className="overflow-hidden">
                <a
                  href={item.href}
                  onClick={handleGo}
                  className={[
                    "block font-extrabold tracking-tight no-underline",
                    "text-cyan-400 drop-shadow-md",
                    "text-5xl sm:text-7xl", 
                    "transition duration-300",
                    open ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0",
                    "hover:pl-1 hover:text-cyan-300",
                  ].join(" ")}
                  style={{ transitionDelay: `${i * 70}ms` }}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="mt-auto text-sm text-white/70">
            © {new Date().getFullYear()} Nivusoft — Desarrollo a medida.
          </div>
        </div>
      </div>
    </>
  );
}
