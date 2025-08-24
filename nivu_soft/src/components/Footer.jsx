function Footer() {
  return (
    <footer className="relative text-white">
      {/* Fondo: imagen + overlay para contraste */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[url('/images/bg_footer.jpeg')] bg-cover bg-center"
      />
     

      {/* Contenido */}
      <div className="relative py-16 md:py-20 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16 text-base md:text-lg text-center md:text-left">
          {/* Menú */}
          <div className="flex flex-col items-center md:items-start px-6">
            <h3 className="text-xl md:text-2xl font-bold mb-5">Menu</h3>
            <ul className="space-y-2.5">
              <li><a href="#inicio" className="hover:underline">Inicio</a></li>
              <li><a href="/contact" className="hover:underline">Contacto</a></li>
              <li><a href="/about" className="hover:underline">Sobre nosotros</a></li>
              <li><a href="#portafolio" className="hover:underline">Portafolio</a></li>
              <li><a href="/pricing" className="hover:underline">Precios &amp; Servicios</a></li>
            </ul>
          </div>

          {/* Servicios */}
          <div className="relative flex flex-col items-center md:items-start px-6">
            {/* Separador vertical (solo desktop) */}
            <div className="absolute -left-6 top-0 bottom-0 w-px bg-white/40 hidden md:block" />
            <div className="relative z-10">
              <h3 className="text-xl md:text-2xl font-bold mb-5">Servicios</h3>
              <ul className="space-y-2.5">
                <li><a href="/pricing" className="hover:underline">Páginas web</a></li>
                <li><a href="/pricing" className="hover:underline">Aplicaciones</a></li>
                <li><a href="/pricing" className="hover:underline">Sistemas SaaS</a></li>
                <li><a href="/pricing" className="hover:underline">Automatización e Integraciones con IA</a></li>
                <li><a href="/pricing" className="hover:underline">Soporte, Asesoría y Mantenimiento</a></li>
              </ul>
            </div>
          </div>

          {/* Social */}
          <div className="relative flex flex-col items-center md:items-start px-6">
            {/* Separador vertical (solo desktop) */}
            <div className="absolute -left-6 top-0 bottom-0 w-px bg-white/40 hidden md:block" />
            <div className="relative z-10">
              <h3 className="text-xl md:text-2xl font-bold mb-5">Social</h3>

              <ul className="space-y-3">
                <li>
                  <a
                    href="https://www.facebook.com/share/1ACV3fuaPk/?mibextid=wwXIfr"
                    target="_blank" rel="noopener noreferrer"
                    className="group inline-flex items-center gap-2 text-white/90 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
                  >
                    Facebook
                    <svg
                      xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                      className="size-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                    >
                      <path d="M7 17L17 7M8 7h9v9" />
                    </svg>
                  </a>
                </li>

                <li>
                  <a
                    href="https://instagram.com/nivu.soft"
                    target="_blank" rel="noopener noreferrer"
                    className="group inline-flex items-center gap-2 text-white/90 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
                  >
                    Instagram
                    <svg
                      xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                      className="size-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                    >
                      <path d="M7 17L17 7M8 7h9v9" />
                    </svg>
                  </a>
                </li>

                <li>
                  <a
                    href="https://www.tiktok.com/@nivusoft"
                    target="_blank" rel="noopener noreferrer"
                    className="group inline-flex items-center gap-2 text-white/90 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
                  >
                    TikTok
                    <svg
                      xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                      className="size-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                    >
                      <path d="M7 17L17 7M8 7h9v9" />
                    </svg>
                  </a>
                </li>

                <li>
                  <a
                    href="https://wa.me/593999567465?text=Hola%20NivuSoft%2C%20quiero%20informaci%C3%B3n%20👋"
                    target="_blank" rel="noopener noreferrer"
                    className="group inline-flex items-center gap-2 text-white/90 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
                    aria-label="WhatsApp"
                  >
                    WhatsApp
                    <svg
                      xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                      className="size-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                    >
                      <path d="M7 17L17 7M8 7h9v9" />
                    </svg>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Texto inferior CENTRADO a todo el ancho */}
        <div className="max-w-7xl mx-auto mt-10 md:mt-12 px-4 text-center">
          <p className="text-lg md:text-xl font-semibold">
            Nivu Soft © 2025 | Desarrollo de software a medida
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
