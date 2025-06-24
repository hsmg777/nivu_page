import { useState } from "react";
import '../css/Navbar.css';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleNavClick = () => {
    setMenuOpen(false); // Cierra el menú móvil después de hacer clic
  };

  return (
    <nav className="fixed top-4 left-4 right-4 z-50 bg-[#071952] text-white rounded-full px-8 py-2 shadow-md backdrop-blur-sm scroll-smooth">
      <div className="flex items-center justify-between w-full">

        {/* Logo */}
        <a href="#inicio" onClick={handleNavClick} className="flex items-center gap-2">
          <img src="/images/logo_nube.png" alt="Nuvi Soft" className="h-10 md:h-12 w-auto object-contain" />
          <span className="text-white font-semibold text-lg md:text-xl">Nivu Soft</span>
        </a>

        {/* Botón hamburguesa */}
        <button
          className="md:hidden text-white text-2xl z-50"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>

        {/* Menú de navegación */}
        <ul className={`
          ${menuOpen ? "flex" : "hidden"}
          md:flex flex-col md:flex-row
          absolute md:static
          top-20 md:top-0 left-0 right-0
          bg-[#071952] md:bg-transparent
          rounded-md md:rounded-none
          p-4 md:p-0
          text-base md:text-lg font-medium
          z-40 md:z-auto
          gap-6 md:gap-14
          navbar-center-md
        `}>
          <li><a href="#inicio" onClick={handleNavClick} className="hover:underline">Inicio</a></li>
          <li><a href="#nosotros" onClick={handleNavClick} className="hover:underline">Nosotros</a></li>
          <li><a href="#portafolio" onClick={handleNavClick} className="hover:underline">Portafolio</a></li>
          <li><a href="#testimonios" onClick={handleNavClick} className="hover:underline">Testimonios</a></li>
          <li><a href="#contacto" onClick={handleNavClick} className="hover:underline">Contacto</a></li>

          <li className="relative dropdown-hover">
            <span className="hover:underline cursor-pointer flex items-center">
              Servicios
              <svg className="ml-1 h-4 w-4 text-cyan-100 transition-transform duration-300 group-hover:rotate-180" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 10.939l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.25a.75.75 0 01-1.06 0L5.25 8.27a.75.75 0 01-.02-1.06z" clipRule="evenodd" />
              </svg>
            </span>
            <ul className="dropdown-content">
              <li><a href="/servicios/web">Desarrollo Web</a></li>
              <li><a href="/servicios/sistemas">Sistemas a medida</a></li>
            </ul>
          </li>
        </ul>
      </div>
    </nav>
  );
}
