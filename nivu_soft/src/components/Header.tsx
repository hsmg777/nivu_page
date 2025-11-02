import { useState, useEffect } from 'react';
import { Menu, X, Phone } from 'lucide-react';
import { Button } from './ui/button';
import logo from '/public/images/lg_nivu.png';

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setMobileMenuOpen(false);
    }
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-md' : 'bg-white/95 backdrop-blur-sm'}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <button onClick={() => scrollToSection('hero')} className="flex items-center space-x-3 group">
            <img src={logo} alt="NivuSoft" className="h-12 w-auto" />
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            <button onClick={() => scrollToSection('servicios')} className="text-slate-700 hover:text-[#00D4FF] font-medium transition-colors">
              Servicios
            </button>
            <button onClick={() => scrollToSection('portafolio')} className="text-slate-700 hover:text-[#00D4FF] font-medium transition-colors">
              Portafolio
            </button>
            <button onClick={() => scrollToSection('proceso')} className="text-slate-700 hover:text-[#00D4FF] font-medium transition-colors">
              Cómo trabajamos
            </button>
            <button onClick={() => scrollToSection('testimonios')} className="text-slate-700 hover:text-[#00D4FF] font-medium transition-colors">
              Testimonios
            </button>
            <Button 
              onClick={() => scrollToSection('contacto')} 
              className="bg-[#00D4FF] hover:bg-[#00B8E6] text-slate-900 font-semibold shadow-lg shadow-[#00D4FF]/25 hover:shadow-xl hover:shadow-[#00D4FF]/30 transition-all duration-300"
            >
              <Phone className="h-4 w-4 mr-2" />
              Contactar ahora
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 hover:bg-slate-100 rounded-lg transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-6 w-6 text-slate-700" /> : <Menu className="h-6 w-6 text-slate-700" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-slate-200">
            <nav className="flex flex-col space-y-3">
              <button onClick={() => scrollToSection('servicios')} className="text-left px-4 py-3 text-slate-700 hover:text-[#00D4FF] hover:bg-slate-50 rounded-lg font-medium transition-colors">
                Servicios
              </button>
              <button onClick={() => scrollToSection('portafolio')} className="text-left px-4 py-3 text-slate-700 hover:text-[#00D4FF] hover:bg-slate-50 rounded-lg font-medium transition-colors">
                Portafolio
              </button>
              <button onClick={() => scrollToSection('proceso')} className="text-left px-4 py-3 text-slate-700 hover:text-[#00D4FF] hover:bg-slate-50 rounded-lg font-medium transition-colors">
                Cómo trabajamos
              </button>
              <button onClick={() => scrollToSection('testimonios')} className="text-left px-4 py-3 text-slate-700 hover:text-[#00D4FF] hover:bg-slate-50 rounded-lg font-medium transition-colors">
                Testimonios
              </button>
              <Button 
                onClick={() => scrollToSection('contacto')} 
                className="bg-[#00D4FF] hover:bg-[#00B8E6] text-slate-900 font-semibold w-full"
              >
                <Phone className="h-4 w-4 mr-2" />
                Contactar ahora
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
