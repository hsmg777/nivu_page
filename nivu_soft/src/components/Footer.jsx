function Footer() {
  return (
    <footer className="bg-[#0B1F54] text-white py-12">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 text-sm text-center md:text-left">
        {/* Columna 1 */}
        <div>
          <h3 className="font-semibold text-base mb-4">Menú</h3>
          <ul className="space-y-1">
            <li><a href="#inicio" className="hover:underline">Inicio</a></li>
            <li><a href="#contact" className="hover:underline">Contacto</a></li>
            <li><a href="#about" className="hover:underline">Sobre nosotros</a></li>
            <li><a href="#portafolio" className="hover:underline">Portafolio</a></li>
            <li><a href="#testimonios" className="hover:underline">Testimonios</a></li>
          </ul>
        </div>

        {/* Línea divisora */}
        <div className="hidden md:flex justify-center items-center">
          <div className="h-full w-px bg-white opacity-30"></div>
        </div>

        {/* Columna 2 y 3 combinadas */}
        <div className="md:col-span-1 grid grid-cols-1 sm:grid-cols-2 gap-8">
          {/* Servicios */}
          <div>
            <h3 className="font-semibold text-base mb-4">Servicios</h3>
            <ul className="space-y-1">
              <li>Web Corporativa</li>
              <li>Landing Page con CTA</li>
              <li>Sistema con login/admin</li>
              <li>MVP para Startups</li>
            </ul>
          </div>

          {/* Precios */}
          <div>
            <h3 className="font-semibold text-base mb-4">Precios</h3>
            <ul className="space-y-1">
              <li>Esencial: Emprendedores</li>
              <li>Negocios: Empresas</li>
              <li>Avanzado: Startups/Sistemas</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Línea inferior */}
      <div className="text-center text-sm text-white mt-10 px-4">
        Nuvi Soft © 2025 | Desarrollo web a medida
      </div>
    </footer>
  );
}

export default Footer;
