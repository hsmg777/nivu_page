import TechCarousel from "../components/TechCarousel";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#00B2FF] via-white to-[#e6f3ff] px-4 md:px-16 py-12 font-sans">

      <h2 className="text-3xl md:text-4xl font-bold text-[#002b62] text-center mb-12">
        Conócenos
      </h2>

      {/* Tarjetas de integrantes */}
      <div className="grid md:grid-cols-2 gap-8 mb-20">

        {/* Hayland */}
        <div className="bg-white p-6 rounded-2xl shadow-lg text-center">
          <img 
            src="/images/hsmg.png" 
            alt="Hayland" 
            className="mx-auto w-32 h-32 object-cover rounded-full mb-4" 
          />
          <h3 className="text-xl font-semibold text-[#002b62]">Hayland</h3>
          <p className="text-sm text-[#002b62] mb-1">Co-fundador NivuSoft - CTO - Ing de Software</p>
          <p className="text-gray-700 text-sm mt-2 leading-relaxed">
            Hayland combina su formación como ingeniero de software con una mentalidad creativa <br/>e  innovadora. 
            Experto en arquitectura y desarrollo full-stack con tecnologías como Laravel, React y Flask,  ha liderado proyectos que integran automatización, inteligencia artificial y diseño de alto impacto.

            Su enfoque no es solo construir software, sino crear soluciones a medida que resuelvan problemas reales y escalen con tu negocio.
          </p>
        </div>

        {/* Emilio */}
        <div className="bg-white p-6 rounded-2xl shadow-lg text-center">
          <img 
            src="/images/emilio.png" 
            alt="Emilio" 
            className="mx-auto w-32 h-32 object-cover rounded-full mb-4" 
          />
          <h3 className="text-xl font-semibold text-[#002b62]">Emilio</h3>
          <p className="text-sm text-[#002b62] mb-1">Co-fundador NivuSoft - CEO - Ing. en Software</p>
          <p className="text-gray-700 text-sm mt-2 leading-relaxed">
            Emilio es un Ingeniero de Software con una fuerte orientación al análisis estratégico y a la ejecución operativa.
            Posee una mentalidad emprendedora y resolutiva, capaz de transformar ideas en soluciones digitales robustas.
            Con experiencia en arquitectura de sistemas, metodologías ágiles y desarrollo full-stack,

            Ha trabajado en plataformas web, apps móviles y sistemas empresariales, siempre priorizando la escalabilidad y la experiencia del usuario.
          </p>
        </div>
      </div>

      {/* Carrusel de Tecnologías */}
      <div className="mt-10">
        <TechCarousel />
      </div>
    </div>
  );
}
