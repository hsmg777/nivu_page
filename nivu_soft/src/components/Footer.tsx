import { Mail, Phone, MapPin, Instagram, Facebook } from 'lucide-react';
import logo from '/public/images/logo_nube.png';

export function Footer() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-slate-900 text-white py-16 border-t border-slate-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <img src={logo} alt="NivuSoft" className="h-16 w-auto mb-6" />
            <p className="text-slate-400 mb-6 leading-relaxed max-w-md">
              Empresa ecuatoriana líder en desarrollo de software. Transformamos ideas en soluciones digitales profesionales con más de 50 proyectos exitosos.
            </p>
            <div className="flex space-x-3">
              <a
                href="https://www.instagram.com/nivu.soft"
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 rounded-lg bg-slate-800 hover:bg-[#00D4FF] hover:text-slate-900 transition-all duration-300 flex items-center justify-center"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="https://www.facebook.com/people/Nivu-Software/61577565552467/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 rounded-lg bg-slate-800 hover:bg-[#00D4FF] hover:text-slate-900 transition-all duration-300 flex items-center justify-center"
              >
                <Facebook className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-6 text-lg">Navegación</h3>
            <ul className="space-y-3">
              <li>
                <button
                  onClick={() => scrollToSection('hero')}
                  className="text-slate-400 hover:text-[#00D4FF] transition-colors"
                >
                  Inicio
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('servicios')}
                  className="text-slate-400 hover:text-[#00D4FF] transition-colors"
                >
                  Servicios
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('portafolio')}
                  className="text-slate-400 hover:text-[#00D4FF] transition-colors"
                >
                  Portafolio
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('proceso')}
                  className="text-slate-400 hover:text-[#00D4FF] transition-colors"
                >
                  Cómo trabajamos
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('testimonios')}
                  className="text-slate-400 hover:text-[#00D4FF] transition-colors"
                >
                  Testimonios
                </button>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold mb-6 text-lg">Contacto</h3>
            <ul className="space-y-4">
              <li>
                <a
                  href="mailto:nivusoftware@gmail.com"
                  className="flex items-start space-x-3 text-slate-400 hover:text-[#00D4FF] transition-colors group"
                >
                  <Mail className="h-5 w-5 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">nivusoftware@gmail.com</span>
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/593994993430"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start space-x-3 text-slate-400 hover:text-[#00D4FF] transition-colors"
                >
                  <Phone className="h-5 w-5 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">+593 99 499 3430</span>
                </a>
              </li>
              <li className="flex items-start space-x-3 text-slate-400">
                <MapPin className="h-5 w-5 flex-shrink-0 mt-0.5" />
                <span className="text-sm">Juan Severino y Av Diego de Almagro - Quito - Ecuador</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-slate-800">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-slate-400 text-sm">
              © 2026 NivuSoft. Todos los derechos reservados.
            </p>
            <div className="flex space-x-6 text-sm">
              <a href="#" className="text-slate-400 hover:text-[#00D4FF] transition-colors">
                Términos y Condiciones
              </a>
              <a href="#" className="text-slate-400 hover:text-[#00D4FF] transition-colors">
                Política de Privacidad
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
