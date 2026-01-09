import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Globe, Smartphone, Layout, Monitor, RefreshCw, Wrench, Check, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
const handleWhatsApp = () => {
  window.open('https://wa.me/593994993430?text=Hola, me interesa conocer más sobre sus servicios de desarrollo de software', '_blank');
};

const services = [
  {
    id: 1,
    icon: Globe,
    title: 'Página Web Básica',
    description: 'Landing page profesional, responsive y optimizada para buscadores.',
    price: '$80',
    features: [
      'Diseño responsive (móvil, tablet, escritorio)',
      'Optimización SEO básica',
      'Integración con redes sociales',
      'Formulario de contacto',
      'Hosting gratis por 1 mes',
      'Mapa interactivo con ubicación'
    ],
    popular: false,
    delivery: '5-7 días',
  },
  {
    id: 2,
    icon: Layout,
    title: 'Página Web Corporativa',
    description: 'Sitio web completo con múltiples secciones y blog administrable.',
    price: '$180',
    features: [
      'Inlcuye lo de la Página Web Básica',
      'Hasta 6 secciones personalizadas',
      'SEO avanzado (Google ranking)',
      'Formulario de contacto múltiples',
      'Optimización de velocidad'
    ],
    popular: true,
    delivery: '10-14 días',
  },
  {
    id: 3,
    icon: Monitor,
    title: 'Aplicación Web',
    description: 'Sistema web administrativo completo con panel de control.',
    price: '$350',
    features: [
      'Panel administrativo completo',
      'Sistema de usuarios y roles',
      'Reportes y estadísticas',
      'API REST integrada',
      'Base de datos segura',
      'Despliegue en producción'
    ],
    popular: false,
    delivery: '3-4 semanas',
  },
  {
    id: 4,
    icon: Smartphone,
    title: 'App Móvil o Escritorio',
    description: 'Aplicación nativa para iOS, Android o Windows/Mac.',
    price: '$400',
    features: [
      'iOS & Android (o Desktop)',
      'Publicación en stores',
      'Notificaciones push',
      'Funciona sin internet (offline)',
      'Sincronización automática',
    ],
    popular: false,
    delivery: '4-6 semanas',
  },
  {
    id: 5,
    icon: RefreshCw,
    title: 'Plan de Mantenimiento SaaS',
    description: 'Mantenimiento continuo y nuevas funcionalidades.',
    price: '$49 - $150/mes',
    features: [
      'Actualizaciones mensuales',
      'Soporte prioritario 24/7',
      'Cambios no funcionales incluidos',
      'Monitoreo y seguridad',
      'Paga por uso',
      'Hosting incluido'
    ],
    popular: false,
    delivery: 'Inmediato',
    badge: 'Mensual',
  },
  {
    id: 6,
    icon: Wrench,
    title: 'Soporte Técnico',
    description: 'Asistencia técnica profesional para cambios y correcciones.',
    price: '$6.50/hora',
    features: [
      'Respuesta en menos de 24h',
      'Corrección de errores',
      'Cambios menores',
      'Actualización de contenido',
      'Documentación técnica',
      'Asesoría personalizada'
    ],
    popular: false,
    delivery: 'Inmediato',
  },
];

export function Services() {
  return (
    <section id="servicios" className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16 max-w-3xl mx-auto"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-4">
            Nuestros Servicios
          </h2>
          <p className="text-xl text-slate-600">
            Soluciones digitales profesionales con precios transparentes y sin sorpresas
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className={`h-full hover:shadow-2xl transition-all duration-300 border-2 ${service.popular ? 'border-[#00D4FF] ring-4 ring-[#00D4FF]/10 scale-105' : 'border-slate-200 hover:border-[#00D4FF]/30'} relative flex flex-col`}>
                {service.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-[#00D4FF] text-slate-900 px-4 py-1.5 text-sm font-semibold shadow-lg">
                      Más Popular
                    </Badge>
                  </div>
                )}
                {service.badge && !service.popular && (
                  <div className="absolute -top-3 right-4">
                    <Badge className="bg-slate-900 text-white px-3 py-1 text-xs">{service.badge}</Badge>
                  </div>
                )}

                <CardHeader className="pb-4">
                  <div className="w-14 h-14 rounded-xl bg-[#00D4FF]/10 flex items-center justify-center mb-4">
                    <service.icon className="h-7 w-7 text-[#00D4FF]" />
                  </div>
                  <CardTitle className="text-2xl mb-2">{service.title}</CardTitle>
                  <CardDescription className="text-base text-slate-600 leading-relaxed">
                    {service.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="flex-1">
                  <div className="mb-6 pb-6 border-b border-slate-200">
                    <div className="flex items-baseline mb-1">
                      <span className="text-4xl font-bold text-slate-900">{service.price.split('/')[0]}</span>
                      {service.price.includes('/') && (
                        <span className="text-slate-600 ml-1">/{service.price.split('/')[1]}</span>
                      )}
                    </div>
                    <div className="text-sm text-slate-600 font-medium">Tiempo de entrega: {service.delivery}</div>
                  </div>

                  <ul className="space-y-3">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start text-sm text-slate-700">
                        <Check className="h-5 w-5 text-[#00D4FF] mr-2 flex-shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>

                <CardFooter className="pt-6">
                  <Button
                    className={`w-full h-12 font-semibold ${service.popular ? 'bg-[#00D4FF] hover:bg-[#00B8E6] text-slate-900 shadow-lg shadow-[#00D4FF]/30' : 'bg-slate-900 hover:bg-slate-800 text-white'} transition-all duration-300`}
                    onClick={handleWhatsApp}
                  >
                    Solicitar Cotización
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-16 text-center max-w-4xl mx-auto"
        >
          <div className="bg-slate-50 border-2 border-slate-200 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-slate-900 mb-3">
              ¿Necesitas algo personalizado?
            </h3>
            <p className="text-slate-600 mb-6 text-lg">
              Cada proyecto es único. Cuéntanos tu idea y te preparamos una cotización a medida.
            </p>
            <Button
              size="lg"
              className="bg-[#00D4FF] hover:bg-[#00B8E6] text-slate-900 font-semibold shadow-lg shadow-[#00D4FF]/30"
              onClick={() => {
                const element = document.getElementById('contacto');
                if (element) element.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Contactar para proyecto personalizado
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
