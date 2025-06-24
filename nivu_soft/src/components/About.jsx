import React from "react";

export default function About() {
  return (
    <section className="flex flex-wrap items-center justify-between px-6 md:px-20 py-20 bg-[#f8f9ff] gap-10">
      
      <div className="flex-1 max-w-xl">
        <h2 className="text-4xl font-extrabold text-[#071952] mb-6">
          ¿Quiénes somos?
        </h2>
        <p className="text-lg text-gray-700 leading-relaxed mb-8">
          En <strong className="text-[#071952]">Nuvi Soft</strong> creamos soluciones digitales a medida
          para potenciar tu negocio. Combinamos ingeniería y diseño
          moderno para desarrollar sitios rápidos, únicos y funcionales, sin
          plantillas genéricas.
        </p>
        <button className="bg-[#071952] text-white py-3 px-6 rounded-xl font-semibold text-base hover:bg-[#19376d] transition duration-300">
          💡 Conoce más
        </button>
      </div>

        <div className="flex-1 flex justify-center gap-10 mt-10 md:mt-0">
        <div className="text-center">
            <img
            src="/images/emilio.png"
            alt="Emilio Albornoz"
            className="w-52 h-52 rounded-full mx-auto shadow-xl object-cover"
            />
            <h3 className="text-lg font-semibold text-[#071952] mt-4">Emilio Albornoz</h3>
            <p className="text-sm text-[#071952]">CEO / CTO</p>
        </div>

        <div className="text-center">
            <img
            src="/images/hsmg.png"
            alt="Hayland Montalvo"
            className="w-52 h-52 rounded-full mx-auto shadow-xl object-cover"
            />
            <h3 className="text-lg font-semibold text-[#071952] mt-4">Hayland Montalvo</h3>
            <p className="text-sm text-[#071952]">CEO / CTO</p>
        </div>
        </div>

    </section>
  );
}
