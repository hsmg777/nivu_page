import React, { useState } from 'react';

export default function PricingPage() {
  const [isMonthly, setIsMonthly] = useState(true);

  const prices = {
    starter: isMonthly ? 19 : 190,
    professional: isMonthly ? 54 : 540,
    company: isMonthly ? 89 : 890,
    label: isMonthly ? '/month' : '/year',
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#00aaff] via-[#b0e6ff] to-[#e6f8ff] py-8 px-4">
      
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-[#002b62]">Planes y Precios</h2>
        <p className="text-[#003366] mt-4">Elige el plan que mejor se adapte a tu negocio.</p>
      </div>

      {/* Toggle Buttons */}
      <div className="flex justify-center mb-12">
        <div className="bg-white shadow-lg rounded-full flex p-1 gap-1">
          <button
            onClick={() => setIsMonthly(true)}
            className={`px-4 py-1 text-sm font-medium rounded-full transition-all ${
              isMonthly ? 'bg-[#0099dd] text-white' : 'text-[#002b62]'
            }`}
          >
            MENSUAL
          </button>
          <button
            onClick={() => setIsMonthly(false)}
            className={`px-4 py-1 text-sm font-medium rounded-full transition-all ${
              !isMonthly ? 'bg-[#0099dd] text-white' : 'text-[#002b62]'
            }`}
          >
            ANUAL
          </button>
        </div>
      </div>

      {/* Tabla blanca contenedora */}
      <div className="bg-white p-10 rounded-[36px] shadow-xl max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: 'Starter',
              price: prices.starter,
              desc: 'Desbloquea el poder de la automatización.',
              features: ['Multi-step Zaps', '3 Aplicaciones Premium', 'Equipo de 2 Usuarios'],
            },
            {
              title: 'Professional',
              price: prices.professional,
              desc: 'Herramientas avanzadas para escalar tu negocio.',
              features: ['Multi-step Zaps', 'Premium Ilimitado', '50 Usuarios', 'Espacio Compartido'],
            },
            {
              title: 'Empresa',
              price: prices.company,
              desc: 'Automatización y características empresariales.',
              features: [
                'Multi-step Zaps',
                'Premium Ilimitado',
                'Usuarios Ilimitados',
                'Panel Administrativo',
                'Retención de Datos Personalizada',
              ],
            },
          ].map((plan, index) => (
            <div
              key={index}
              className="relative group p-8 rounded-3xl border transition-all transform hover:-translate-y-2 shadow-md hover:shadow-2xl 
                         hover:bg-[#002b62] hover:text-white text-[#002b62] bg-white"
            >
              <h3 className="text-3xl font-bold">
                ${plan.price}
                <span className="text-sm font-normal"> {prices.label}</span>
              </h3>
              <p className="font-semibold text-lg mt-2">{plan.title}</p>
              <p className="text-sm my-4 group-hover:text-gray-300">{plan.desc}</p>
              <ul className="space-y-2 text-sm mb-6">
                {plan.features.map((f, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span className="text-[#00aaff] group-hover:text-white">✔</span> {f}
                  </li>
                ))}
              </ul>
              <button className="w-full py-2 rounded-full font-medium transition bg-[#00aaff] hover:bg-[#007acc] text-white">
                Elegir plan
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
