import '../css/contact.css';

function Contact() {
  return (
    <section className="bg-white py-16" id="contact">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold mb-12 text-gray-800">Contacto</h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-5 gap-8 justify-items-center">
          {/* Instagram */}
          <div className="flex flex-col items-center">
            <img
              src="/images/ig link.png"
              alt="Instagram"
              className="w-14 h-14 mb-2 contact-icon"
            />
            <p className="text-sm text-gray-600">@nivu.soft</p>
          </div>

          {/* WhatsApp */}
          <div className="flex flex-col items-center">
            <img
              src="/images/Contacto.png"
              alt="WhatsApp"
              className="w-14 h-14 mb-2 contact-icon"
            />
            <p className="text-sm text-gray-600">0989671461</p>
          </div>

          {/* Gmail */}
          <div className="flex flex-col items-center">
            <img
              src="/images/logo.jpeg"
              alt="Gmail"
              className="w-14 h-14 mb-2 rounded-full contact-icon"
            />
            <p className="text-sm text-gray-600">nivusoftmain@gmail.com</p>
          </div>

          {/* Facebook */}
          <div className="flex flex-col items-center">
            <img
              src="/images/facebook lnk.png"
              alt="Facebook"
              className="w-14 h-14 mb-2 contact-icon"
            />
            <p className="text-sm text-gray-600">@nivu.soft</p>
          </div>

          {/* TikTok */}
          <div className="flex flex-col items-center">
            <img
              src="/images/tiktok lnk.png"
              alt="TikTok"
              className="w-14 h-14 mb-2 contact-icon"
            />
            <p className="text-sm text-gray-600">@nivu.soft</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;
