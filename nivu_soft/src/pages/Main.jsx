// Main.jsx
import { useEffect, useRef, useState, lazy, Suspense } from "react";
import Navbar from "../components/Navbar";    // Encima del fold: mantener eager
import Hero from "../components/Hero";        // Encima del fold: mantener eager

// === Carga diferida ===
const PortfolioIntro = lazy(() => import("../components/PortfolioIntro"));
const Portfolio      = lazy(() => import("../components/Portfolio"));
const Caption        = lazy(() => import("../components/Caption"));
const Footer         = lazy(() => import("../components/Footer"));

// ScrollHint se inyecta en idle
function LazyScrollHint() {
  const [Comp, setComp] = useState(null);
  useEffect(() => {
    const load = () => import("../components/ScrollHint").then(m => setComp(() => m.default));
    if ("requestIdleCallback" in window) requestIdleCallback(load, { timeout: 1500 });
    else setTimeout(load, 800);
  }, []);
  return Comp ? (
    <Comp
      pageId="main-v3"
      showOncePerSession={false}
      hideAfterMs={20000}
      startListenDelayMs={1000}
    />
  ) : null;
}

// Monta hijos solo al acercarse al viewport
function Defer({ id, children, rootMargin = "600px 0px" }) {
  const [show, setShow] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        setShow(true);
        io.disconnect();
      }
    }, { rootMargin });
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, [rootMargin]);
  // Placeholder ligero + content-visibility
  return (
    <div
      id={id}
      ref={ref}
      style={{
        contentVisibility: show ? "visible" : "auto",
        containIntrinsicSize: "1000px 800px" // evita saltos de layout
      }}
      className="scroll-mt-32"
    >
      {show ? <Suspense fallback={null}>{children}</Suspense> : null}
    </div>
  );
}

function useHashScroll() {
  useEffect(() => {
    const scrollToHash = () => {
      const hash = decodeURIComponent(window.location.hash.replace("#", ""));
      if (!hash) return;
      let tries = 24;
      const tryScroll = () => {
        const el = document.getElementById(hash);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
        else if (tries-- > 0) requestAnimationFrame(tryScroll);
      };
      tryScroll();
    };
    scrollToHash();
    window.addEventListener("hashchange", scrollToHash, { passive: true });
    return () => window.removeEventListener("hashchange", scrollToHash);
  }, []);
}

export default function Main() {
  useHashScroll();

  return (
    <>
      <LazyScrollHint />

      <Navbar />

      {/* Encima del fold, crítico para LCP */}
      <div id="inicio" className="scroll-mt-32">
        <Hero />
      </div>

      {/* Secciones diferidas */}
      <Defer id="portafolio">
        <PortfolioIntro />
      </Defer>

      <Defer>
        <Portfolio />
      </Defer>

      <Defer id="caption">
        <Caption />
      </Defer>

      <Defer>
        <Footer />
      </Defer>
    </>
  );
}
