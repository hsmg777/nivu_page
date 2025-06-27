import React from 'react';
import { motion } from 'framer-motion';
import bgImage from '../../public/images/bg_services.png'; 
import '../css/Service.css'


export default function Services() {
  const servicios = [
    {
      icon: '🖥',
      title: 'Páginas Web Corporativas',
      description: 'Creamos páginas web personalizadas con diseño moderno, responsive y optimizadas para buscadores (SEO). Ideales para negocios que necesitan mostrar sus servicios, atraer clientes y tener una presencia sólida en línea.',
      bullets: [
        'Posicionamiento en Google',
        'Credibilidad y confianza',
        'Formularios de contacto, mapas, redes sociales',
      ],
    },
    {
      icon: '💻',
      title: 'Aplicaciones Web Empresariales',
      description: 'Desarrollamos plataformas web (sistemas de gestión) a medida que permiten automatizar tareas repetitivas, gestionar bases de datos, controlar inventarios, usuarios, reportes, ventas y más. Accesibles desde cualquier navegador.',
      bullets: [
        'Ahorro de tiempo y costos operativos',
        'Reportería',
        'Acceso multiusuario',
        'Escalabilidad para crecer contigo',
      ],
    },
    {
      icon: '📱',
      title: 'Aplicaciones Móviles y Escritorio',
      description: 'Creamos apps móviles nativas o híbridas que permiten a tus clientes interactuar con tus productos o servicios desde su celular. Perfectas para pedidos, reservas, notificaciones, ventas, delivery, gestión de clientes, etc.',
      bullets: [
        'Experiencia directa en el bolsillo del cliente',
        'Push notifications',
        'Publicación en Google Play / App Store',
      ],
    },
    {
      icon: '🚀',
      title: 'Sistemas SaaS',
      description: (<>¿Tienes una idea para un sistema o plataforma que funcione todo el tiempo sin preocuparte por el mantenimiento? <br/>
                      Con este plan, te desarrollamos tu sistema web desde cero y solo pagas mensualmente por tenerlo funcionando.</>),
      bullets: [
        'Pago por un servicio, no por un producto',
        'Menor inversión inicial',
        'Trabaja de la mano de nivusoft',
        'Base sólida para escalar',
        'Administración desde un panel central',
      ],
    },
    {
      icon: '🤖',
      title: 'Automatización e Integraciones con IA',
      description: 'Integramos soluciones con inteligencia artificial y APIs externas que te permiten automatizar tareas como atención al cliente, análisis de datos, clasificación de información, generación de contenido, entre otros.',
      bullets: [
        'Chatbots conectados con tu base de datos',
        'Clasificación automática de correos o documentos',
        'Asistentes virtuales entrenados con tu información',
      ],
    },
    {
      icon: '🛠',
      title: 'Soporte, Asesoría y Mantenimiento',
      description: 'Nos encargamos de que todo funcione sin que tú te preocupes, te asesoramos de la mejor manera de implementar tus ideas y te ayudamos a mantener tus sistemas actualizados y seguros.',
      bullets: [
        'Asesoría profesional para tu proyecto',
        'Cambios en tus apps / paginas / sistemas',
        'Soporte humano por WhatsApp',
      ],
    },
  ];

  return (
    <section
      id="servicios"
      className="bg-cover bg-center bg-no-repeat py-20 px-6 text-gray-800 relative"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="max-w-6xl mx-auto text-center">
        {/* Título animado */}
        <motion.h2
          className="text-4xl md:text-5xl font-extrabold text-cyan-50 mb-6"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.5 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          Creamos soluciones digitales hechas a medida para tu negocio
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.5 }}
          transition={{ duration: 0.3, delay: 0.1, ease: 'easeOut' }}
        >
          <p className="text-lg md:text-l text-blue-100 mb-4">
            En Nivu Soft desarrollamos sistemas y plataformas personalizadas que transforman la manera en que las empresas operan, venden y crecen.
          </p>
          <p className="text-lg md:text-l text-blue-100 mb-12">
            Puedes elegir uno de nuestros planes mensuales o pedir una cotización a medida según tu proyecto.
          </p>
        </motion.div>


        {/* Cards animadas en grupo */}
        <motion.div
          className="grid gap-12 md:grid-cols-3 text-left"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          {servicios.map((servicio, idx) => (
            <div key={idx} className="flip-card h-80">
              <div className="flip-card-inner">
                <div className="flip-card-front flex items-center justify-center text-center">
                  <h3 className="text-2xl font-bold text-sky-900">
                    {servicio.icon} <br /> {servicio.title}
                  </h3>
                </div>
                <div className="flip-card-back overflow-auto text-left text-gray-800">
                  <p className="mb-2 text-blue-950">{servicio.description}</p>
                  <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                    {servicio.bullets.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Beneficios transversales + CTA */}
        <motion.div
          className="mt-20"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }} 
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <h3 className="text-2xl font-bold text-cyan-50 mb-6">
            Beneficios de todos nuestros servicios
          </h3>
          <div className="flex flex-wrap justify-center gap-4 text-gray-700 mb-12">
            {[
              'Tecnología moderna',
              'Escalabilidad',
              'Soporte humano real',
              'Seguridad',
            ].map((benef, i) => (
              <span
                key={i}
                className="bg-white border border-blue-50 text-blue-950 px-4 py-2 rounded-full shadow-sm hover:shadow-md transition"
              >
                {benef}
              </span>
            ))}
          </div>

          <div className="text-center">
            <h3 className="text-2xl text-cyan-50 font-semibold mb-4">
              👉 ¿Te interesa uno de estos servicios?
            </h3>
            <p className="text-gray-100 mb-6">
              Mira nuestros planes mensuales o agenda una demo sin compromiso.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="/pricing"
                className="bg-blue-900 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-800 transition"
              >
                Ver precios
              </a>
              <a
                href="https://wa.me/593999567465?text=Hola%2C+quiero+cotizar+un+servicio"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-600 text-white px-6 py-3 rounded-lg shadow hover:bg-green-500 transition"
              >
                Hablemos por WhatsApp
              </a>
             
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
