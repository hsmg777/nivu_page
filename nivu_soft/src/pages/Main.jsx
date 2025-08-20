
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import About from '../components/About';
import PortfolioIntro from '../components/PortfolioIntro';
import Portfolio from '../components/Portfolio';
import Testimonials from '../components/Testimonials';
import Contact from '../components/Contact';
import Footer from '../components/Footer';

function Main() {
  return (
    <>
      <Navbar />
      <div id="inicio" className="scroll-mt-32"><Hero /></div>
      <div id="portafolio-intro" className="scroll-mt-32"><PortfolioIntro /></div>
      <div id="portafolio" className="scroll-mt-32"><Portfolio /></div>

      <div id="contacto" className="scroll-mt-32"><Contact /></div>
      <div id="nosotros" className="scroll-mt-32"><About /></div>
      <div id="testimonios" className="scroll-mt-32"><Testimonials /></div>
      <Footer />
    </>
  );
}
export default Main;


