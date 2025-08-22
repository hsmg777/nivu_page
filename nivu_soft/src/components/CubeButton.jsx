import { motion, useReducedMotion } from "framer-motion";
import React from "react";

/**
 * Botón 3D que rota 90° a la cara adyacente (no la trasera),
 * con clip-path por cara (sin recortes del contenedor) para evitar
 * que la cara blanca desaparezca en el hover.
 */
export default function CubeButton({
  text = "Quiero mi web!",
  onClick,
  width = 320,
  height = 88,
  duration = 1.15,
  reveal = "bottom", // "bottom" | "top"
  frontClass = "bg-neutral-900 text-white",
  nextClass  = "bg-white text-neutral-900",
}) {
  const reduce = useReducedMotion();

  const radius = 22;
  const EPS = 1.0;                   // offset Z para evitar z-fighting
  const HALF = height / 2;           // para caras adyacentes exactas

  const cubeHover = reveal === "bottom" ? 90 : -90;
  const nextAngle = reveal === "bottom" ? -90 : 90;

  // Estilo común de cara (recorte por cara: evita que el contenedor tape la blanca)
  const faceBase = {
    position: "absolute",
    inset: 0,
    backfaceVisibility: "hidden",
    WebkitBackfaceVisibility: "hidden",
    clipPath: `inset(0 round ${radius}px)`,
    WebkitClipPath: `inset(0 round ${radius}px)`,
  };

  return (
    <div className="inline-block" style={{ perspective: 1400, WebkitPerspective: 1400 }}>
      <motion.div
        role="button"
        tabIndex={0}
        onClick={onClick}
        className="relative cursor-pointer focus:outline-none transform-gpu"
        style={{
          width,
          height,
          transformStyle: "preserve-3d",
          willChange: "transform",
        }}
        initial={{ rotateX: 0 }}
        whileHover={reduce ? {} : { rotateX: cubeHover }}
        whileTap={{ scale: 0.985 }}
        transition={{ duration, ease: [0.22, 0.85, 0.22, 1] }}
        onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && onClick?.(e)}
      >
        {/* CARA FRONTAL (negra, plana en reposo) */}
        <div
          style={{
            ...faceBase,
            transform: `translateZ(${HALF + EPS}px)`,
          }}
          aria-hidden
        >
          {/* Oversize para eliminar hairline */}
          <div
            className={`absolute inset-[-1px] grid place-items-center font-semibold tracking-wide select-none ${frontClass}`}
          >
            {text}
          </div>
        </div>

        {/* CARA ADYACENTE (blanca, aparece en hover) */}
        <div
          style={{
            ...faceBase,
            transform: `rotateX(${nextAngle}deg) translateZ(${HALF + EPS}px)`,
          }}
          aria-hidden
        >
          <div
            className={`absolute inset-[-1px] grid place-items-center font-semibold tracking-wide select-none ${nextClass}`}
          >
            {text}
          </div>
        </div>

        {/* Base/sombra opcional para volumen */}
        <div
          className="pointer-events-none absolute -z-10 left-[8%] right-[8%] rounded-full"
          style={{
            bottom: -Math.max(12, Math.round(height * 0.18)),
            height: Math.max(10, Math.round(height * 0.25)),
            background: "linear-gradient(to bottom, rgba(0,0,0,.35), rgba(0,0,0,0))",
            filter: "blur(6px)",
          }}
          aria-hidden
        />
      </motion.div>
    </div>
  );
}
