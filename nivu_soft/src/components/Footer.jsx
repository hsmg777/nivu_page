function Footer() {
  return (
    <footer className="bg-[#0B1F54] text-white py-12 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 text-sm">

        {/* Menú */}
        <div className="flex flex-col items-start">
          <h3 className="text-lg font-bold mb-4">Menu</h3>
          <ul className="space-y-1">
            <li><a href="#inicio" className="hover:underline">Inicio</a></li>
            <li><a href="#contact" className="hover:underline">Contacto</a></li>
            <li><a href="#about" className="hover:underline">Sobre nosotros</a></li>
            <li><a href="#portafolio" className="hover:underline">Portafolio</a></li>
            <li><a href="#testimonios" className="hover:underline">Testimonio</a></li>
          </ul>
        </div>

        {/* Línea divisora + Servicios */}
        <div className="relative flex flex-col items-center">
          {/* Línea vertical */}
          <div className="absolute left-0 top-0 bottom-0 w-px bg-white opacity-30 hidden md:block"></div>
          <div className="relative z-10 flex flex-col items-start pl-6">
            <h3 className="text-lg font-bold mb-4">Servicios</h3>
            <ul className="space-y-1">
              <li>Web Corporativa</li>
              <li>Landing Page con CTA</li>
              <li>Sistema con login/admin</li>
              <li>MVP para Startups</li>
            </ul>
          </div>
        </div>

        {/* Línea divisora + Precios */}
        <div className="relative flex flex-col items-center">
          {/* Línea vertical */}
          <div className="absolute left-0 top-0 bottom-0 w-px bg-white opacity-30 hidden md:block"></div>
          <div className="relative z-10 flex flex-col items-start pl-6">
            <h3 className="text-lg font-bold mb-4">Precios</h3>
            <ul className="space-y-1">
              <li>Esencial: Emprendedores</li>
              <li>Negocios: Empresas</li>
              <li>Avanzado: Startups/Sistemas</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Texto inferior grande y centrado */}
      <div className="mt-12 text-center">
        <p className="text-base md:text-lg font-medium text-white">
          Nuvi Soft © 2025 | Desarrollo web a medida
        </p>
      </div>
    </footer>
  );
}

export default Footer;
