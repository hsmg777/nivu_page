import React, { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";

export default function CardsAbout({
  // ----- ESCRITORIO (igual que tenías) -----
  sceneVH = 220,
  pinOffsetVH = 0,

  centerImg = "/images/bg_card.jpeg",

  leftBg = "/images/about-left.png",
  leftName = "Hayland Montalvo",
  leftRole = "Ing en Software",
  leftPosition = "Co-Fundador CEO",
  leftDescription = `Hayland combina su formación como ingeniero de software con una mentalidad creativa
e innovadora. Experto en arquitectura y desarrollo full-stack con tecnologías como Laravel, React y Flask, ha liderado proyectos que integran automatización, inteligencia artificial y diseño de alto impacto. Su enfoque no es solo construir software, sino crear soluciones a medida que resuelvan problemas reales y escalen con tu negocio.`,

  rightBg = "/images/about-right.png",
  rightName = "Emilio Albornoz",
  rightRole = "Ing en Software",
  rightPosition = "Co-Fundador CEO",
  rightDescription = `Emilio es un Ingeniero de Software con una fuerte orientación al análisis estratégico y a la ejecución operativa. Posee una mentalidad emprendedora y resolutiva, capaz de transformar ideas en soluciones digitales robustas. Con experiencia en arquitectura de sistemas, metodologías ágiles y desarrollo full-stack, Ha trabajado en plataformas web, apps móviles y sistemas empresariales, siempre priorizando la escalabilidad y la experiencia del usuario.`,
}) {
  const prefersReduced = useReducedMotion();

  // =========================
  // ESCRITORIO (md y superior)
  // =========================
  const desktopRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: desktopRef,
    offset: ["start start", "end start"],
  });

  const appearStart = 0.10;
  const appearEnd = 0.45;

  const leftX = useTransform(scrollYProgress, [0, appearStart, appearEnd, 1], ["-140%", "-140%", "0%", "0%"]);
  const rightX = useTransform(scrollYProgress, [0, appearStart, appearEnd, 1], ["140%", "140%", "0%", "0%"]);
  const sidesOp = useTransform(scrollYProgress, [0, appearStart, appearEnd], [0, 0, 1]);
  const leftRotY = useTransform(scrollYProgress, [0, appearStart, appearEnd], [12, 12, 0]);
  const rightRotY = useTransform(scrollYProgress, [0, appearStart, appearEnd], [-12, -12, 0]);

  const centerScale = useTransform(scrollYProgress, [0, appearEnd, 1], [1, 0.96, 0.96]);
  const centerShadow = useTransform(scrollYProgress, [0, 1], [16, 10]);
  const layerOpacity = useTransform(scrollYProgress, [0, 0.001, 0.999, 1], [1, 1, 1, 0]);
  const safe = (v, fb) => (prefersReduced ? fb : v);

  return (
    <>
      {/* ====== DESKTOP (igual que tenías) ====== */}
      <section
        ref={desktopRef}
        className="relative w-full overflow-x-hidden hidden md:block"
        style={{ height: `${sceneVH}vh` }}
      >
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-[#d6d6d6]" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#020827]/30 to-[#030b3c]" />
        </div>

        <motion.div
          className="fixed left-0 right-0"
          style={{
            top: `${pinOffsetVH}vh`,
            height: `calc(100vh - ${pinOffsetVH}vh)`,
            opacity: layerOpacity,
            pointerEvents: "none",
          }}
        >
          <div className="grid place-items-center h-full">
            <div className="flex items-center justify-center gap-[clamp(16px,3vw,36px)]" style={{ perspective: 1200 }}>
              {/* IZQUIERDA */}
              <motion.div
                style={{
                  x: safe(leftX, "0%"),
                  opacity: safe(sidesOp, 1),
                  rotateY: safe(leftRotY, 0),
                  willChange: "transform, opacity",
                }}
                className="pointer-events-none transform-gpu"
              >
                <AboutCard
                  bg={leftBg}
                  name={leftName}
                  role={leftRole}
                  position={leftPosition}
                  description={leftDescription}
                />
              </motion.div>

              {/* CENTRO */}
              <motion.div
                style={{
                  scale: safe(centerScale, 1),
                  filter: safe(centerShadow, 10)
                    ? `drop-shadow(0 20px ${Math.round(centerShadow.get?.() || 10)}px rgba(0,0,0,.35))`
                    : undefined,
                  willChange: "transform",
                }}
                className="pointer-events-none transform-gpu"
              >
                <CenterCard img={centerImg} />
              </motion.div>

              {/* DERECHA */}
              <motion.div
                style={{
                  x: safe(rightX, "0%"),
                  opacity: safe(sidesOp, 1),
                  rotateY: safe(rightRotY, 0),
                  willChange: "transform, opacity",
                }}
                className="pointer-events-none transform-gpu"
              >
                <AboutCard
                  bg={rightBg}
                  name={rightName}
                  role={rightRole}
                  position={rightPosition}
                  description={rightDescription}
                />
              </motion.div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ====== MÓVIL: columna (sin sticky), reveal por scroll ====== */}
      <section className="md:hidden relative w-full bg-white">
        {/* mismo fondo que desktop */}
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-[#d6d6d6]" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#020827]/20 to-[#030b3c]/40" />
        </div>

        <div className="px-5 pt-[10vh] md:pt-0 pb-20 space-y-8">
          {/* 1) Centro */}
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ amount: 0.45, once: false }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            <CenterCard img={centerImg} mobile />
          </motion.div>

          {/* 2) Izquierda */}
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ amount: 0.45, once: false }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            <AboutCard
              bg={leftBg}
              name={leftName}
              role={leftRole}
              position={leftPosition}
              description={leftDescription}
              mobile
            />
          </motion.div>

          {/* 3) Derecha */}
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ amount: 0.45, once: false }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            <AboutCard
              bg={rightBg}
              name={rightName}
              role={rightRole}
              position={rightPosition}
              description={rightDescription}
              mobile
            />
          </motion.div>
        </div>
      </section>
    </>
  );
}

/* ---------- Sub-componentes visuales ---------- */

function CenterCard({ img, mobile = false }) {
  return (
    <article
      className={[
        "relative overflow-hidden rounded-3xl shadow-2xl ring-1 ring-white/10",
        mobile ? "h-[74vh] w-[88vw]" : "aspect-[3/4] h-[80vh] min-h-[480px] max-h-[820px]",
        "bg-[radial-gradient(120%_120%_at_50%_0%,#0b1024_0%,#0a0f1d_70%,#090f1a_100%)]",
      ].join(" ")}
    >
      <img src={img} alt="NIVU" className="absolute inset-0 w-full h-full object-cover" />
    </article>
  );
}

function AboutCard({ bg, name, role, position, description, mobile = false }) {
  return (
    <article
      className={[
        "relative overflow-hidden rounded-3xl shadow-2xl ring-1 ring-white/10",
        mobile ? "h-[74vh] w-[88vw]" : "aspect-[3/4] h-[80vh] min-h-[480px] max-h-[820px]",
      ].join(" ")}
    >
      <img src={bg} alt={`${name} background`} className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-[#0a133d]/45" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a133d]/10 via-[#0a133d]/40 to-[#0a133d]/80" />
      <div className="relative z-10 h-full w-full p-6 md:p-10 flex flex-col">
        <h3 className="text-white text-xl md:text-3xl font-semibold leading-snug">
          {name} <span className="font-normal text-white/80"> - {role}</span>
        </h3>
        <p className="mt-2 md:mt-3 text-white/85">{position}</p>
        <p className="mt-4 md:mt-6 text-white/80 text-sm md:text-[15px] leading-6 md:leading-7 max-w-[36ch]">
          {description}
        </p>
      </div>
    </article>
  );
}
