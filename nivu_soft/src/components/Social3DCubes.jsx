// Social3DCubes.jsx
import React, { useEffect, useRef, useState } from "react";

/* ==== SVG logos muy ligeros ==== */
const FACEBOOK_SVG_DATA =
  "data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24'%3e%3cpath fill='white' d='M9.198 21.5h4v-8.01h3.604l.396-3.98h-4V7.5a1 1 0 0 1 1-1h3v-4h-3a5 5 0 0 0-5 5v2.01h-2l-.396 3.98h2.396z'/%3e%3c/svg%3e";

const FacebookLogo = ({ className = "" }) => (
   <img
    src={FACEBOOK_SVG_DATA}
    alt="Facebook"
    className={`block select-none pointer-events-none ${className}`}
    draggable="false"
    width="256"
    height="256"
    style={{ objectFit: "contain", imageRendering: "auto" }}
  />
);


const INSTA_SVG_DATA =
  "data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='white' viewBox='0 0 16 16'%3e%3cpath d='M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.9 3.9 0 0 0-1.417.923A3.9 3.9 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.9 3.9 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.9 3.9 0 0 0-.923-1.417A3.9 3.9 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599s.453.546.598.92c.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.5 2.5 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.5 2.5 0 0 1-.92-.598 2.5 2.5 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233s.008-2.388.046-3.231c.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92s.546-.453.92-.598c.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92m-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217m0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334'/%3e%3c/svg%3e";

const InstagramLogo = ({ className = "" }) => (
  <img
    src={INSTA_SVG_DATA}
    alt="Instagram"
    className={`block select-none pointer-events-none ${className}`}
    draggable="false"
    width="256"
    height="256"
    style={{ objectFit: "contain", imageRendering: "auto" }}
  />
);

const TIKTOK_SVG_DATA =
  "data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3e%3cpath fill='white' d='M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 3 3 0 0 1 .88.13V9.4a7 7 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a5 5 0 0 1-1-.1z'/%3e%3c/svg%3e";

const TikTokLogo = ({ className = "" }) => (
  <img
    src={TIKTOK_SVG_DATA}
    alt="TikTok"
    className={`block select-none pointer-events-none ${className}`}
    draggable="false"
    width="256"
    height="256"
    style={{ objectFit: "contain", imageRendering: "auto" }}
  />
);


const WHATSAPP_SVG_DATA =
  "data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='white' viewBox='0 0 16 16'%3e%3cpath d='M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232'/%3e%3c/svg%3e";

const WhatsAppLogo = ({ className = "" }) => (
  <img
    src={WHATSAPP_SVG_DATA}
    alt="WhatsApp"
    className={`block select-none pointer-events-none ${className}`}
    draggable="false"
    width="256"
    height="256"
    style={{ objectFit: "contain", imageRendering: "auto" }}
  />
);







/* ==== Cara del cubo (esquinas en punta, sin bleed) ==== */
function Face({ size, transform, style = {}, className = "", children }) {
  return (
    <div
      className={`absolute inset-0 flex items-center justify-center ${className}`}
      style={{
        width: size,
        height: size,
        transformStyle: "preserve-3d",
        backfaceVisibility: "hidden",
        transform,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

/* ==== Cubo 3D ==== */
function Cube({ size = 140, link = "#", brand, floatPhase = 0 }) {
  const wrap = useRef(null);
  const cube = useRef(null);
  const [hover, setHover] = useState(false);

  useEffect(() => {
    let raf = 0;
    let t = floatPhase;
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const visible = { v: false };
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => (visible.v = e.isIntersecting)),
      { rootMargin: "40% 0% 40% 0%" }
    );
    if (wrap.current) io.observe(wrap.current);

    const tick = () => {
      raf = requestAnimationFrame(tick);
      if (!visible.v || reduce) return;
      t += hover ? 0.028 : 0.016;

      // límites de inclinación (ajústalos a gusto)
      const maxX = 22;      // tilt vertical máximo (grados)
      const maxY = 28;      // tilt horizontal máximo (grados)
      const speedX = 0.85;  // velocidad del vaivén en X
      const speedY = 0.60;  // velocidad del vaivén en Y

      // al pasar el mouse aumenta un poco la amplitud
      const amp   = hover ? 1.15 : 1.0;

      // oscilación (siempre dentro de [-max, max])
      const rotX = Math.sin(t * speedX) * maxX * amp;
      const rotY = Math.sin(t * speedY) * maxY * amp;
      const ty   = Math.sin(t * 0.9) * 6; // flotación suav       // flotación

      if (cube.current) {
        cube.current.style.transform =
            `translate3d(0, ${ty}px, 0) rotateX(${rotX}deg) rotateY(${rotY}deg)`;
      }
    };

    tick();
    return () => { if (raf) cancelAnimationFrame(raf); io.disconnect(); };
  }, [hover, floatPhase]);

  const half   = size / 2;
  const zFix   = half + 0.6;                // solapado leve para evitar líneas
  const LogoEl = brand.Logo;

  const logo = (sz = "w-12 h-12 md:w-14 md:h-14") => <LogoEl className={sz} />;
  const textFace = (
    <span className="text-white font-bold text-lg md:text-xl">nivusoft</span>
  );

  // Fondos por estilo (no Tailwind) para evitar issues del JIT
  const logoFaceStyle = {
    background: `linear-gradient(135deg, ${brand.colors.from}, ${brand.colors.to})`,
    color: "#fff",
  };
  const textFaceStyle = { background: brand.colors.textBg, color: "#fff" };

  return (
    <a
      ref={wrap}
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={brand.name}
      className="group block"
      style={{ perspective: 1100 }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div
        ref={cube}
        className="relative mx-auto"
        style={{
          width: size,
          height: size,
          transformStyle: "preserve-3d",
          transition: "transform 160ms ease",
          willChange: "transform",
        }}
      >
        {/* Patrón exacto: front logo → right texto → back logo → left texto → top logo → bottom texto */}

        {/* FRONT (logo) */}
        <Face size={size} transform={`translateZ(${zFix}px)`} style={logoFaceStyle}>
          {logo()}
        </Face>

        {/* RIGHT (texto) */}
        <Face size={size} transform={`rotateY(90deg) translateZ(${zFix}px)`} style={textFaceStyle}>
          {textFace}
        </Face>

        {/* BACK (logo) */}
        <Face size={size} transform={`rotateY(180deg) translateZ(${zFix}px)`} style={logoFaceStyle}>
          {logo("w-10 h-10")}
        </Face>

        {/* LEFT (texto) */}
        <Face size={size} transform={`rotateY(-90deg) translateZ(${zFix}px)`} style={textFaceStyle}>
          {textFace}
        </Face>

        {/* TOP (logo) */}
        <Face size={size} transform={`rotateX(90deg) translateZ(${zFix}px)`} style={logoFaceStyle}>
          {logo("w-8 h-8")}
        </Face>

        {/* BOTTOM (texto) */}
        <Face size={size} transform={`rotateX(-90deg) translateZ(${zFix}px)`} style={textFaceStyle}>
          {textFace}
        </Face>

        {/* Sombra (sin border-radius para esquinas en punta) */}
        <div className="pointer-events-none absolute -inset-6 blur-2xl opacity-25 group-hover:opacity-35 transition"
             style={{ background: "radial-gradient(closest-side, rgba(0,0,0,.25), transparent)" }} />
      </div>
    </a>
  );
}

/* ==== Sección con los 4 cubos ==== */
export default function Social3DCubes() {
  const isDesktop =
    typeof window !== "undefined" &&
    window.matchMedia("(min-width:768px)").matches;
  const base = isDesktop ? 140 : 112;

  const brands = [
    {
      name: "Facebook",
      link: "https://www.facebook.com/share/1ACV3fuaPk/?mibextid=wwXIfr",
      colors: {
        from: "#0B5ED7",
        to:   "#1877F2",
        textBg:"#1877F2",
      },
      Logo: FacebookLogo,
    },
    {
      name: "Instagram",
      link: "https://instagram.com/nivu.soft",
      colors: {
        from: "#DD2A7B",
        to:   "#F58529",
        textBg:"#DD2A7B",
      },
      Logo: InstagramLogo,
    },
    {
      name: "TikTok",
      link: "https://www.tiktok.com/@nivusoft",
      colors: {
        from: "#000000",     
        to:   "#000000",
        textBg:"#000000",     
      },
      Logo: TikTokLogo,
    },
    {
      name: "WhatsApp",
      link: "https://wa.me/593999567465",
      colors: {
        from: "#128C7E",
        to:   "#25D366",
        textBg:"#25D366",
      },
      Logo: WhatsAppLogo,
    },
  ];

  return (
    <section className="w-full bg-white py-16">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-2xl md:text-3xl font-extrabold text-[#05b7ff] mb-2">
          Síguenos y contacta con nosotros
        </h2>
        <p className="text-lg md:text-2xl text-[#676767] mb-24">Haz click sobre un cubo!</p>

        <div className="
          grid
          grid-cols-2                 /* 2 columnas en móvil */
          md:grid-cols-4              /* 4 en desktop */
          gap-x-8 gap-y-16            /* MÁS separación en móvil */
          sm:gap-x-10 sm:gap-y-16
          md:gap-x-14 md:gap-y-16
          place-items-center
        ">
          {brands.map((b, i) => (
            <div key={b.name} className="w-full flex justify-center py-4"> {/* wrapper con padding */}
              <Cube size={base} link={b.link} brand={b} floatPhase={i * 0.7} />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
