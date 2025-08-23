// components/ScrollHint.jsx
import React, { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";

/* ------------------------ Controlador de visibilidad ------------------------ */
function useScrollHintController({
  pageId = "global",
  showOncePerSession = true,
  hideAfterMs = 55000,       // máx. visible
  startListenDelayMs = 800,  // esperar antes de escuchar interacción
  minVisibleMs = 3500,       // debe verse al menos este tiempo
  lingerAfterInteractMs = 3000, // tras primera interacción, cuánto más se queda
  scrollThresholdPx = 140,   // ignora micro-scrolls hasta pasar este umbral
} = {}) {
  const storageKey = useMemo(() => `scroll-hint-seen:${pageId}`, [pageId]);
  const seenInSession =
    typeof window !== "undefined" && sessionStorage.getItem(storageKey) === "1";

  const [show, setShow] = useState(
    () => (showOncePerSession ? !seenInSession : true)
  );

  useEffect(() => {
    if (!show) return;

    const startedAt = Date.now();
    let listening = false;
    let hideTimer = null;

    // control de desplazamiento acumulado
    let lastY = window.scrollY || 0;
    let scrolledAccum = 0;

    const clearHideTimer = () => {
      if (hideTimer) clearTimeout(hideTimer);
      hideTimer = null;
    };

    const dismiss = () => {
      clearHideTimer();
      if (!show) return;
      setShow(false);
      try { sessionStorage.setItem(storageKey, "1"); } catch {}
    };

    const scheduleHideAfterInteract = () => {
      if (!listening) return;
      clearHideTimer();
      const elapsed = Date.now() - startedAt;
      const waitMin = Math.max(0, minVisibleMs - elapsed);
      const delay = Math.max(waitMin, lingerAfterInteractMs);
      hideTimer = setTimeout(dismiss, delay);
    };

    const startTimer = setTimeout(() => { listening = true; }, startListenDelayMs);
    const maxTimer = setTimeout(dismiss, hideAfterMs);

    const onScroll = () => {
      if (!listening) return;
      const y = window.scrollY || 0;
      scrolledAccum += Math.abs(y - lastY);
      lastY = y;
      if (scrolledAccum >= scrollThresholdPx) scheduleHideAfterInteract();
    };
    const onWheel = () => listening && scheduleHideAfterInteract();
    const onAny = () => listening && scheduleHideAfterInteract();

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("wheel", onWheel, { passive: true });
    window.addEventListener("touchstart", onAny, { passive: true });
    window.addEventListener("mousemove", onAny, { passive: true });
    window.addEventListener("keydown", onAny, { passive: true });

    return () => {
      clearTimeout(startTimer);
      clearTimeout(maxTimer);
      clearHideTimer();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onAny);
      window.removeEventListener("mousemove", onAny);
      window.removeEventListener("keydown", onAny);
    };
  }, [
    show,
    pageId,
    hideAfterMs,
    startListenDelayMs,
    minVisibleMs,
    lingerAfterInteractMs,
    scrollThresholdPx,
  ]);

  return { show };
}

/* ------------------------------ Hint transparente ------------------------------ */
export default function ScrollHint({
  pageId = "global",
  showOncePerSession = true,
  hideAfterMs = 55000,
  bottom = 36,
  startListenDelayMs = 800,
  minVisibleMs = 3500,
  lingerAfterInteractMs = 3000,
  scrollThresholdPx = 140,
  size = 28,            // tamaño de la flecha
  text = "Desliza",     // ← texto solicitado
} = {}) {
  const { show } = useScrollHintController({
    pageId,
    showOncePerSession,
    hideAfterMs,
    startListenDelayMs,
    minVisibleMs,
    lingerAfterInteractMs,
    scrollThresholdPx,
  });

  if (typeof window === "undefined" || !show) return null;

  // ⬇️ Asegura mismo font que tu sitio aunque el portal esté en <body>
  const bodyFont =
    (typeof window !== "undefined" &&
      window.getComputedStyle(document.body).fontFamily) ||
    "inherit";

  const node = (
    <div
      aria-live="polite"
      aria-label="Desliza"
      style={{
        position: "fixed",
        left: 0,
        right: 0,
        bottom,
        zIndex: 100000,
        fontFamily: bodyFont,   // ⬅️ forzamos el font a ser el mismo
      }}
      className="pointer-events-none flex items-center justify-center gap-3"
    >
      {/* Texto en blanco, sin fondo */}
      <span
        className="pointer-events-none select-none font-extrabold tracking-wide"
        style={{
          color: "#fff",
          textShadow: "0 6px 14px rgba(0,0,0,.35)",
          fontSize: "clamp(14px, 2.2vw, 18px)",
          animation: "hintIn .45s ease-out forwards",
          opacity: 0,
        }}
      >
        {text}
      </span>

      {/* Flecha con bounce */}
      <svg
        role="img"
        viewBox="0 0 24 24"
        width={size}
        height={size}
        className="pointer-events-none"
        style={{
          color: "white",
          filter: "drop-shadow(0 6px 14px rgba(0,0,0,.35))",
          animation:
            "hintIn .45s ease-out forwards, hintBounce 1.1s ease-in-out infinite",
          opacity: 0,
        }}
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <title>Desliza</title>
        <path d="M12 5v14" />
        <path d="m19 12-7 7-7-7" />
      </svg>

      {/* keyframes inline */}
      <style>{`
        @keyframes hintIn {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes hintBounce {
          0%, 100% { transform: translateY(0); }
          50%      { transform: translateY(6px); }
        }
      `}</style>
    </div>
  );

  return createPortal(node, document.body);
}
