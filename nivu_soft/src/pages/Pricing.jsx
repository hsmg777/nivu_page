import React from 'react';

export default function PricingPage() {
  const plans = [
    {
      title: '💻 Web Básica',
      price: 'Desde $70 USD',
      description: 'Ideal para emprendedores o negocios que recién empiezan.',
      features: [
        '1 página (Landing)',
        'Diseño adaptativo y personalizado',
        'Formulario de contacto',
        'Botón de WhatsApp',
        'Hosting gratis 1 mes',
        'Certificado SSL',
        'Páginas adicionales: $15 c/u',
        'Posicionamiento básico en Google (SEO): $40',
        'Instalación y levantamiento de la página',
        '🔒 No incluye panel ni autogestión',
        '📌 Entrega en 4–7 días',
      ],
      button: 'Elegir este plan',
    },
    {
      title: '🌐 Web Profesional',
      price: 'Desde $180 USD',
      description: 'Para negocios establecidos que necesitan presencia sólida y funcionalidad ampliada.',
      features: [
        'Hasta 5 páginas (Inicio, Nosotros, Servicios, Contacto, etc.)',
        'Diseño adaptativo y personalizado',
        'Formulario de contacto',
        'Botones conectados con redes sociales',
        'Google Maps con tu ubicación',
        'Hosting + dominio gratis 1 meses',
        'Certificado SSL',
        'Instalación y levantamiento de la página',
        'Blog que puedas editar tu mismo: $60',
        'Posicionamiento básico en Google (SEO): $40',
        '📌 Entrega estimada: 10–15 días',
      ],
      button: 'Solicitar este plan',
    },
    {
      title: '🛒 Aplicación Web Avanzada',
      price: 'Desde $350 USD',
      description: 'Ideal para empresas que necesitan catálogo, gestión interna o tienda online.',
      features: [
        'Panel de administración (control de tus modulos) de acuerdo a tu negocio y solución',
        'Login con roles',
        'Reporteria según la necesidad de tu negocio ',
        'Solución adaptable a tu negocio',
        'Diseño adaptable para pc y celular',
        'Instalación y levantamiento de la aplicación',
        '📌 Proyecto escalable y listo para crecer',
        '📌 Entrega segun el alcance del proyecto',
      ],
      button: 'Cotizar este plan',
    },
    {
      title: '📱 Aplicaciones Escritorio / Móviles',
      price: 'Desde $400 USD',
      description: 'Para empresas o startups que requieren sistemas internos, dashboards o apps móviles.',
      features: [
        'Panel de administración (control de tus modulos) de acuerdo a tu negocio y solución',
        'Login con roles',
        'Reporteria según la necesidad de tu negocio',
        'Solución adaptable a reglas y necesidades de tu negocio',
        'Diseño para pc o para celular',
        'Tecnología moderna que se adapta a tu proyecto (web o móvil)',
        'Documentación técnica e instalación en un servidor con acceso privado',
        '📌 Fases de pago:',
        '40% inicio, 40% entrega demo (MVP), 20% entrega y publicación',
      ],
      button: 'Quiero una app',
    },
    {
      title: '🚀 Plan SaaS Mensual',
      price: 'Desde $350 setup + $49–$99/mes',
      description: 'Ideal para negocios que necesitan una plataforma actualizada, siempre disponible y sin preocupaciones.',
      features: [
        'Desarrollo completo de tu sistema personalizado',
        'Puede ser app web, app móvil/escritorio',
        'Solución adaptable a tu negocio',
        'Acceso con usuarios, panel de control y reportes',
        'Instalación y levantamiento de la aplicación',
        'Dominio + alojamiento + soporte técnico incluidos',
        'Mantenimiento mensual (mejoras, seguridad, backups)',
        'Setup inicial único desde: $350',
        'Mantenimiento mensual: Básico: $49, Avanzado: $69, Experto: $99',
        '📌 Contrato mínimo 6 meses',
        '🔁 Sistema siempre actualizado y monitoreado',
      ],
      button: 'Agendar demo',
    },
    {
      title: '🛠️ Soporte, Asesoria o Mantenimiento',
      price: 'Desde $6.25 USD/hora',
      description: 'Ideal para negocios que tienen su sistema y necesitan integrar mejoras o resolver problemas.',
      features: [
        'Soporte y Mantenimiento: \n El precio varia según los cambios a realizar en el sistema.\n Se entrega documentación de los cambios realizados',
        'Asesoria: \n Se cotiza según la horas solicitadas por el cliente con un minimo de horas (8h), $6.25/h, ',
      ],
      button: 'Agendar',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#00aaff] via-[#b0e6ff] to-[#e6f8ff] py-8 px-4">
      {/* Botón para Volver al Inicio */}
      <a
        href="/" // Redirige a la página principal
        className="absolute top-6 left-6 text-lg text-[#ffffff] bg-[#00aaff] hover:bg-[#007acc] p-3 rounded-xl shadow-lg flex items-center space-x-2 transition-all duration-300"
        aria-label="Volver al inicio"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="w-5 h-5"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M17 11l-4-4m0 0l-4 4m4-4v12" />
        </svg>
        <span className="ml-2">Volver al Inicio</span>
      </a>

      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-[#ffffff]">Planes y Precios</h2>
        <p className="text-[#ffffff] mt-4">Elige el plan que mejor se adapte a tu negocio. Todos nuestros desarrollos son 100% personalizados.</p>
      </div>

      <div className="bg-white p-10 rounded-[36px] shadow-xl max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div
              key={index}
              className="relative group p-8 rounded-3xl border transition-all transform hover:-translate-y-2 shadow-md hover:shadow-2xl hover:bg-[#002b62] hover:text-white text-[#002b62] bg-white"
            >
              <h3 className="text-2xl font-bold">{plan.title}</h3>
              <p className="mt-2 text-xl">{plan.price}</p>
              <p className="text-sm my-4 group-hover:text-gray-300">{plan.description}</p>
              <ul className="space-y-2 text-sm mb-6">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-[#00aaff] group-hover:text-white">✔</span> {feature}
                  </li>
                ))}
              </ul>
              <a
                href={`https://wa.me/593999567465?text=${encodeURIComponent(`Hola! quiero cotizar el plan ${plan.title}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-center w-full py-2 rounded-full font-medium transition bg-[#00aaff] hover:bg-[#007acc] text-white"
              >
                {plan.button}
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
