// TechAbout.jsx
import React, { useMemo, useRef, useState } from "react";
import { motion, useScroll, useReducedMotion, useMotionValueEvent } from "framer-motion";

export default function TechAbout({
  pinOffsetVH = 0,
  sceneVH,
  title1 = "TECNOLOGÍAS QUE",
  title2 = "MANEJAMOS",
  subtitle = "Creamos experiencias digitales con las herramientas más potentes del mercado",
}) {
  const prefersReduced = useReducedMotion();
  const ref = useRef(null);

  const technologies = [
    { name: "React",       logo: "/images/react.png" },
    { name: "Laravel",     logo: "/images/laravel.png" },
    { name: "Tailwind CSS",logo: "/images/tailwind.png" },
    { name: "Node.js",     logo: "/images/node.png" },
    { name: "Docker",      logo: "/images/docker.png" },
    { name: "OpenAI API",  logo: "/images/openai.png" },
    { name: "Python",      logo: "/images/python.png" },
    { name: "C#",          logo: "/images/csharp.png" },
    { name: "Java",        logo: "/images/java.png" },
  ];

  const colorFor = (n) => {
    n = n.toLowerCase();
    if (n.includes("react")) return "#00D8FF";
    if (n.includes("laravel")) return "#FF2D20";
    if (n.includes("tailwind")) return "#38BDF8";
    if (n.includes("node")) return "#3C873A";
    if (n.includes("docker")) return "#2496ED";
    if (n.includes("openai")) return "#10A37F";
    if (n.includes("python")) return "#3776AB";
    if (n.includes("c#") || n.includes("csharp")) return "#68217A";
    if (n.includes("java")) return "#F89820";
    return "#111827";
  };

  const cards = technologies.map(t => ({
    name: t.name,
    img: t.logo,
    color: colorFor(t.name),
    label: t.name.toUpperCase(),
  }));
  const techCount = cards.length;

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const [p, setP] = useState(0);
  useMotionValueEvent(scrollYProgress, "change", (v) => setP(v));

  const trackVH = useMemo(() => {
    if (sceneVH) return sceneVH;
    const base    = 420;
    const perCard = 70;
    const tail    = 470;            // deja cola suficiente para la retirada de -100vh
    return base + techCount * perCard + tail;
  }, [sceneVH, techCount]);

  const clamp01 = (x) => Math.min(1, Math.max(0, x));
  const norm = (x, a, b) => clamp01((x - a) / (b - a));
  const lerp = (a, b, t) => a + (b - a) * t;

  // ==== Fase 1: Titulares ====
  const t1 = norm(p, 0.008, 0.035);
  const t2 = norm(p, 0.020, 0.055);
  const ts = norm(p, 0.035, 0.080);

  const title1Y = prefersReduced ? 0 : lerp(12, 0, t1);
  const title2Y = prefersReduced ? 0 : lerp(12, 0, t2);
  const subY    = prefersReduced ? 0 : lerp(10, 0, ts);

  // ==== Fase 2: Cards ====
  const TITLES_END = 0.085;
  const START = TITLES_END + 0.02;
  const END   = 0.955;
  const range = Math.max(0.001, END - START);

  const seg = range / techCount;
  const ENTER_FRAC = 0.62;
  const inDur = seg * ENTER_FRAC;

  const computedCards = useMemo(() => {
    const lastIdx = techCount - 1;

    return cards.map((c, i) => {
      const segStart = START + i * seg;
      const segEnd   = segStart + seg;

      let tIn = norm(p, segStart, segStart + inDur);

      // Mantén visible la última hasta casi el END
      if (i === lastIdx) {
        const tToEnd = norm(p, segStart, END);
        tIn = Math.max(tIn, tToEnd);
      }

      const yvhIn = prefersReduced ? 0 : lerp(72, 0, tIn);
      const scIn  = prefersReduced ? 1 : lerp(0.70, 1, tIn);
      const opIn  = tIn;
      const rotIn = prefersReduced ? 0 : lerp(i % 2 ? 5 : -5, 0, tIn);

      const finishedIn = p >= (segStart + inDur);
      const holdLimit  = i === lastIdx ? (END + 0.01) : segEnd;
      const onHold     = finishedIn && p <= holdLimit;

      return {
        ...c,
        yvh: onHold ? 0 : yvhIn,
        sc:  onHold ? 1 : scIn,
        op:  onHold ? 1 : opIn,
        rot: onHold ? 0 : rotIn,
        z:   10 + i,
      };
    });
  }, [cards, p, prefersReduced, seg, inDur, techCount]);

  // ==== Fase 3: SALIDA / retirada vertical ====
  // En el último tramo trasladamos TODO el escenario fijo hacia arriba hasta -100vh.
  // Así se descubre naturalmente la sección siguiente sin "pantalla negra".
  const LIFT_START = 0.94;      // ajusta si quieres que empiece antes / después
  const LIFT_END   = 0.995;
  const tLift      = norm(p, LIFT_START, LIFT_END);
  const stageYvh   = prefersReduced ? 0 : lerp(0, -100, tLift); // 0 → -100vh
  const stageOp    = lerp(1, 0.98, tLift);                      // leve difuminado opcional

  return (
    <section
      ref={ref}
      className="relative w-full overflow-x-hidden"
      style={{ height: `${trackVH}vh`, backgroundColor: "#000" }}
    >
      {/* Escenario fijo (pinned) */}
      <motion.div
        className="fixed left-0 right-0"
        style={{
          top: `${pinOffsetVH}vh`,
          height: `calc(100vh - ${pinOffsetVH}vh)`,
          pointerEvents: "none",
          zIndex: 10,
          // 👇 la retirada vertical final:
          y: `${stageYvh}vh`,
          opacity: stageOp,
        }}
      >
        {/* TITULARES */}
        <div className="absolute inset-0 grid place-items-center">
          <div className="text-center px-4">
            <motion.h2
              style={{ y: `${title1Y}vh`, opacity: t1 }}
              className="text-white font-extrabold leading-[0.9] tracking-tight"
            >
              <span className="block text-[clamp(48px,9vw,150px)]">{title1}</span>
            </motion.h2>
            <motion.h2
              style={{ y: `${title2Y}vh`, opacity: t2 }}
              className="text-white font-extrabold leading-[0.9] tracking-tight mt-2"
            >
              <span className="block text-[clamp(56px,10vw,170px)]">{title2}</span>
            </motion.h2>
            <motion.p
              style={{ y: `${subY}vh`, opacity: ts }}
              className="mt-6 text-white/80 text-[clamp(16px,2.2vw,28px)] max-w-5xl mx-auto"
            >
              {subtitle}
            </motion.p>
          </div>
        </div>

        {/* CARDS */}
        <div className="absolute inset-0">
          {computedCards.map((card, i) => (
            <div
              key={card.name + i}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
              style={{ zIndex: card.z }}
            >
              <motion.article
                className="rounded-3xl shadow-2xl overflow-hidden will-change-transform"
                style={{
                  y: `${card.yvh}vh`,
                  scale: card.sc,
                  opacity: card.op,
                  rotate: `${card.rot}deg`,
                  width: "min(68vh, 82vw)",
                  height: "min(68vh, 82vw)",
                }}
              >
                <div className="absolute inset-0" style={{ backgroundColor: card.color }} />
                <img
                  src={card.img}
                  alt={card.name}
                  className="absolute inset-0 w-full h-full object-contain p-[clamp(24px,4vw,56px)] drop-shadow-[0_8px_24px_rgba(0,0,0,0.35)]"
                  draggable={false}
                />
                <div className="absolute left-5 bottom-4 text-white/90 font-semibold tracking-wide text-sm">
                  {card.label}
                </div>
              </motion.article>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
