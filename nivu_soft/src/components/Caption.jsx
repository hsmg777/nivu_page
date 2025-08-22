import React, { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import CubeButton from "./CubeButton"; 


export default function Caption({
  bgSrc = "../../public/images/bg_caption.jpeg",
  headline = "Haz que te encuentren, impacta y vende\nTodo comienza con tu web.",
  subheadline = "",
  ctaText = "Quiero mi web!",
  extraScreens = 1.25,
}) {
  const wrapperRef = useRef(null);
  const shouldReduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ["start end", "end start"],
  });

const openWhatsApp = () => {
  const phone = "593999567465";                   
  const text  = "Hola, quiero una web me ayudan?";                  
  const url   = `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
  window.open(url, "_blank", "noopener,noreferrer");
};


  const bgOpacity = shouldReduce ? 1 : useTransform(scrollYProgress, [0.0, 0.14], [0, 1]);
  const bgScale = shouldReduce ? 1 : useTransform(scrollYProgress, [0.0, 0.22], [1.06, 1]);
  const bgBlurAmount = shouldReduce ? 0 : useTransform(scrollYProgress, [0.0, 0.14], [12, 0]);
  const bgBlurFilter = useTransform(bgBlurAmount, (v) => `blur(${v}px)`);

  const overlayOpacity = shouldReduce ? 0.45 : useTransform(scrollYProgress, [0.12, 0.35], [0, 0.45]);
  const overlayY = shouldReduce ? "0%" : useTransform(scrollYProgress, [0.12, 0.35], ["-8%", "0%"]);

  const textOpacity = shouldReduce ? 1 : useTransform(scrollYProgress, [0.32, 0.52, 0.96], [0, 1, 1]);
  const textY = shouldReduce ? 0 : useTransform(scrollYProgress, [0.32, 0.52, 0.96], [24, 0, 0]);

  const buttonOpacity = shouldReduce ? 1 : useTransform(scrollYProgress, [0.40, 0.60, 0.98], [0, 1, 1]);
  const buttonY = shouldReduce ? 0 : useTransform(scrollYProgress, [0.40, 0.60, 0.98], [20, 0, 0]);

  const lines = String(headline).split("\n");

 

  return (
    <section ref={wrapperRef} className="relative" style={{ minHeight: `${(1 + extraScreens) * 100}vh` }}>
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Imagen de fondo */}
        <motion.img
          src={bgSrc}
          alt=""
          loading="eager"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover"
          style={{
            opacity: bgOpacity,
            scale: bgScale,
            filter: bgBlurFilter,
            willChange: "opacity, transform, filter",
            transformOrigin: "center",
          }}
        />

        {/* Overlay degradado (se asienta sobre la imagen) */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-b from-[#060a23]/60 via-[#0a0f2e]/40 to-[#0a0f2e]/70"
          style={{ opacity: overlayOpacity, y: overlayY, willChange: "opacity, transform" }}
        />

        {/* Contenido centrado */}
        <div className="relative z-10 flex h-full items-center justify-center px-6">
          <motion.div
            className="max-w-5xl text-center"
            style={{ opacity: textOpacity, y: textY, willChange: "opacity, transform" }}
          >
            <h1 className="text-white drop-shadow-xl font-extrabold tracking-tight leading-tight text-4xl md:text-6xl">
              {lines.map((l, i) => (
                <span key={i} className={i > 0 ? "block mt-2" : "block"}>
                  {l}
                </span>
              ))}
            </h1>
            {subheadline && (
              <p className="mt-4 text-white/90 text-lg md:text-2xl">{subheadline}</p>
            )}

            <motion.div
                style={{ opacity: buttonOpacity, y: buttonY, willChange: "opacity, transform" }}
                className="mt-8 flex justify-center"
                >
                <CubeButton
                    text={ctaText}               
                    onClick={openWhatsApp}         
                    width={280}
                    height={72}
                    thickness={14}
                    frontClass="bg-neutral-900 text-white"
                    backClass="bg-white text-neutral-900"
                />
                </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
