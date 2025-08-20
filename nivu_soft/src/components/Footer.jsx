function Footer() {
  return (
    <footer className="relative text-white">
      {/* Fondo: imagen + overlay para contraste */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[url('/images/bg_footer.jpeg')] bg-cover bg-center"
      />
      {/* Contenido */}
      <div className="relative py-12 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 text-sm text-center md:text-left">
          {/* Menú */}
          <div className="flex flex-col items-center md:items-start space-y-2 px-4">
            <h3 className="text-lg font-bold mb-4">Menu</h3>
            <ul className="space-y-1">
              <li><a href="#inicio" className="hover:underline">Inicio</a></li>
              <li><a href="#contacto" className="hover:underline">Contacto</a></li>
              <li><a href="#nosotros" className="hover:underline">Sobre nosotros</a></li>
              <li><a href="#portafolio" className="hover:underline">Portafolio</a></li>
              <li><a href="#testimonios" className="hover:underline">Testimonio</a></li>
            </ul>
          </div>

          {/* Servicios */}
          <div className="relative flex flex-col items-center md:items-start space-y-2 px-4">
            <div className="absolute -left-5 top-0 bottom-0 w-px bg-white/30 hidden md:block" />
            <div className="relative z-10">
              <h3 className="text-lg font-bold mb-4">Servicios</h3>
              <ul className="space-y-1">
                <li><a href="/services" className="hover:underline">Páginas web</a></li>
                <li><a href="/services" className="hover:underline">Aplicaciones web</a></li>
                <li><a href="/services" className="hover:underline">Aplicaciones móviles y de escritorio</a></li>
                <li><a href="/services" className="hover:underline">Sistemas SaaS</a></li>
                <li><a href="/services" className="hover:underline">Automatización e Integraciones con IA</a></li>
                <li><a href="/services" className="hover:underline">Soporte, Asesoría y Mantenimiento</a></li>
              </ul>
            </div>
          </div>

          {/* Precios */}
          <div className="relative flex flex-col items-center md:items-start space-y-2 px-4">
            <div className="absolute -left-5 top-0 bottom-0 w-px bg-white/30 hidden md:block" />
            <div className="relative z-10">
              <h3 className="text-lg font-bold mb-4">Precios</h3>
              <ul className="space-y-1">
                <li><a href="/pricing" className="hover:underline">Web Básica</a></li>
                <li><a href="/pricing" className="hover:underline">Web Profesional</a></li>
                <li><a href="/pricing" className="hover:underline">Web Avanzada</a></li>
                <li><a href="/pricing" className="hover:underline">Aplicaciones Escritorio / Móviles</a></li>
                <li><a href="/pricing" className="hover:underline">Sistemas SaaS</a></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Texto inferior */}
        <div className="mt-12 text-center px-4">
          <p className="text-base md:text-lg font-medium">
            Nivu Soft © 2025 | Desarrollo de software a medida
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
