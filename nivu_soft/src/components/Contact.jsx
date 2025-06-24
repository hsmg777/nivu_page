function Contact() {
  return (
    <section className="bg-white py-16 px-4" id="contact">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-4xl font-extrabold text-blue-900 mb-14">Contacto</h2>

        {/* Fila superior */}
        <div className="grid grid-cols-3 gap-8 items-center justify-items-center mb-10">
          <img src="/images/ig link.png" alt="Instagram" className="w-[86px] h-[89px]" />
          <img src="/images/wpp link.png" alt="WhatsApp" className="w-[125px] h-[105px]" />
          <img src="/images/mail lnk.png" alt="Gmail" className="w-[170px] h-[91px]" />
        </div>

        {/* Fila inferior */}
        <div className="grid grid-cols-2 gap-10 justify-center items-center max-w-xl mx-auto">
          <img src="/images/facebook lnk.png" alt="Facebook" className="w-[72px] h-[91px]" />
          <img src="/images/tiktok lnk.png" alt="TikTok" className="w-[103px] h-[109px]" />
        </div>
      </div>
    </section>
  );
}

export default Contact;
