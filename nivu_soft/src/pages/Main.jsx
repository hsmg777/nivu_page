// Main.jsx
import { useEffect } from "react";
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import PortfolioIntro from '../components/PortfolioIntro';
import Portfolio from '../components/Portfolio';
import Caption from '../components/Caption';
import Footer from '../components/Footer';

function useHashScroll() {
  useEffect(() => {
    const scrollToHash = () => {
      const hash = decodeURIComponent(window.location.hash.replace('#',''));
      if (!hash) return;

      let tries = 40;
      const tryScroll = () => {
        const el = document.getElementById(hash);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else if (tries-- > 0) {
          setTimeout(tryScroll, 50);
        }
      };
      tryScroll();
    };

    scrollToHash();
    window.addEventListener('hashchange', scrollToHash);
    return () => window.removeEventListener('hashchange', scrollToHash);
  }, []);
}

function Main() {
  useHashScroll(); 

  return (
    <>
      <Navbar />
      <div id="inicio" className="scroll-mt-32"><Hero /></div>
      <div id="portafolio" className="scroll-mt-32"><PortfolioIntro /></div>
      <div className="scroll-mt-32"><Portfolio /></div>
      <div id="caption" className="scroll-mt-32"><Caption /></div>
      <Footer />
    </>
  );
}
export default Main;
