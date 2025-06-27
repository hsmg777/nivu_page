
function Contact() {
  return (
    <section className="bg-white py-16 px-4 scroll-mt-32 min-h-[400px]" id="contacto">
      <div className="max-w-6xl mx-auto text-center">

        {/* Título + descripción pegados */}
        <div className="mb-14">
          <h2 className="text-4xl font-extrabold text-blue-900">Contacto</h2>
          <span className="text-lg text-gray-400 block mt-2">
            Da click sobre alguna de las siguientes redes sociales para contactarnos        
          </span>
        </div>

        {/* Redes sociales en una sola fila */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 justify-items-center items-center mb-10">
          {/* Instagram */}
          <div className="flex flex-col items-center">
            <a href="https://www.instagram.com/nivu.soft" target="_blank" rel="noopener noreferrer">
              <img src="/images/ig_logo.png" alt="Instagram" className="w-14 h-14 md:w-[70px] md:h-[70px]" />
            </a>
            <p className="mt-2 text-sm text-gray-500">@nivu.soft</p>
          </div>

          {/* WhatsApp */}
          <div className="flex flex-col items-center">
            <a href="https://wa.me/593999567465" target="_blank" rel="noopener noreferrer">
              <img src="/images/wp_logo.png" alt="WhatsApp" className="w-14 h-14 md:w-[70px] md:h-[70px]" />
            </a>
            <p className="mt-2 text-sm text-gray-500">0999567465</p>
          </div>

          {/* Gmail */}
          <div className="flex flex-col items-center">
            <a href="mailto:nivusoftware@gmail.com" target="_blank" rel="noopener noreferrer">
              <img src="/images/mail_logo.png" alt="Gmail" className="w-14 h-14 md:w-[66px] md:h-[56px]" />
            </a>
            <p className="mt-2 text-sm text-gray-500">nivusoftware@gmail.com</p>
          </div>

          {/* Facebook */}
          <div className="flex flex-col items-center">
            <a href="https://www.facebook.com/people/Nivu-Software/61577565552467/?mibextid=wwXIfr&rdid=taUYj51kiZBfUvHD&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1T1JTXHYcn%2F%3Fmibextid%3DwwXIfr" target="_blank" rel="noopener noreferrer">
              <img src="/images/fb_logo.png" alt="Facebook" className="w-14 h-14 md:w-[70px] md:h-[70px]" />
            </a>
            <p className="mt-2 text-sm text-gray-500">nivusoftware</p>
          </div>

          {/* TikTok */}
          <div className="flex flex-col items-center">
            <a href="https://www.tiktok.com/@nivusoft" target="_blank" rel="noopener noreferrer">
              <img src="/images/tk_logo.png" alt="TikTok" className="w-14 h-14 md:w-[70px] md:h-[70px]" />
            </a>
            <p className="mt-2 text-sm text-gray-500">@nivusoft</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;
