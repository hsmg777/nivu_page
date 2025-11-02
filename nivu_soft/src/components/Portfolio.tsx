import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { ExternalLink, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Button } from './ui/button';

const projects = [
  {
    id: 1,
    name: 'Fundacion Maria Augusta Ochoa',
    description:
      'Landing Page con SEO basico, conexión con redes sociales y pasarela de pagos integrada para donaciones',
    category: 'Landing page',
    tags: ['Redes sociales', 'Pasarela de pagos', 'Carga rapida'],
    image:
      '/public/images/mao.jpeg',
    result: 'Donaciones y ayuda comunitaria',
    href: 'https://fundacionmariaaugustaochoaandrade.com/',
  },
  {
    id: 2,
    name: 'Vida Buena Ec',
    description:
      'Página web corporativa, SEO avanzaco, cotizadores y formularios inteligentes a medida, conexión con intranet.',
    category: 'Salud',
    tags: ['Cotizador', 'Notificaciones', 'Web'],
    image: '/images/vbec.jpeg', 
    result: '500+ pacientes activos',
    href: 'https://vidabuena.ec',
  },
  {
    id: 3,
    name: 'Fast Cleaning Laundry',
    description:
      'Sitio web corporativo con conexión con reseñas de Google, SEO avanzado y notificaciones automáticas',
    category: 'Servicios de lavanderia',
    tags: ['SEO Avanzado', 'Blog', 'Formularios'],
    image:
      '/public/images/fc.jpeg',
    result: 'Mayor atracción de clientes',
    href: 'https://fastcleaninglaundry.com',
  },
  {
    id: 4,
    name: 'Multitalent ATS + IA',
    description:
      'Sistema institucional web para captación de postulantes, seguimiento de proceso de selección y onboarding con notificaciones automatica e INTELIGECIA ARTIFICIAL.',
    category: 'Institucional',
    tags: ['ATS', 'Inteligencia artificial', 'Automatización'],
    image:
      '/public/images/multi.jpeg',
    result: 'Optimización de procesos; + 250 Postulantes ',
    href: 'https://multitalent.multiapoyo.com.ec',
  },
  {
    id: 5,
    name: 'Infinity Water',
    description:
      'Página web corporativa para empresa Estado Unidense, con SEO avanzado, sistema de formularios inteligentes.',
    category: 'Corporativo',
    tags: ['SEO avanzado', 'Internacional', 'Posicionamiento en web'],
    image:
      '/public/images/inw.jpeg',
    result: '+30 clientes /mes',
    href: 'https://infinitywatersite.com/',
  },
  {
    id: 6,
    name: 'Watones Network',
    description:
      'Plataforma gaming completa con tienda en línea, sistema de membresías VIP y panel administrativo.',
    category: 'E-commerce',
    tags: ['Tienda Online', 'Sistema VIP', 'Panel Admin'],
    image: '/public/images/wtns.jpeg',
    result: '+300% ventas online',
    href: 'https://tienda.watones.net/',
  },
  
];

export function Portfolio() {
  return (
    <section id="portafolio" className="py-20 bg-slate-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16 max-w-3xl mx-auto"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-4">Proyectos Exitosos</h2>
          <p className="text-xl text-slate-600">
            Casos reales recientes de empresas ecuatorianas que confiaron en nosotros
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto mb-12">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="relative h-full overflow-hidden hover:shadow-2xl transition-all duration-300 group border-2 border-slate-200 hover:border-[#00D4FF]/50 cursor-pointer">
                {/* Enlace que cubre toda la card */}
                <a
                  href={project.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute inset-0 z-10"
                  aria-label={`Ver proyecto ${project.name}`}
                  title={`Ver proyecto ${project.name}`}
                />

                <div className="relative h-56 overflow-hidden bg-slate-100">
                  <ImageWithFallback
                    src={project.image}
                    alt={project.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6">
                    <div className="flex items-center space-x-2 text-white font-semibold">
                      <span>Ver Proyecto</span>
                      <ExternalLink className="h-4 w-4" />
                    </div>
                  </div>
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-[#00D4FF] text-slate-900 font-semibold shadow-lg">
                      {project.category}
                    </Badge>
                  </div>
                </div>

                <CardHeader>
                  <CardTitle className="text-xl mb-2">{project.name}</CardTitle>
                  <CardDescription className="text-slate-600 leading-relaxed">
                    {project.description}
                  </CardDescription>
                </CardHeader>

                <CardContent>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="text-xs px-3 py-1.5 bg-slate-100 text-slate-700 rounded-full font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center space-x-2 text-[#00D4FF] font-semibold">
                    <ArrowRight className="h-4 w-4" />
                    <span className="text-sm">{project.result}</span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <p className="text-slate-600 mb-6 text-lg">¿Quieres que tu proyecto sea el próximo caso de éxito?</p>
          <Button
            size="lg"
            className="bg-[#00D4FF] hover:bg-[#00B8E6] text-slate-900 font-semibold shadow-lg shadow-[#00D4FF]/30"
            onClick={() => document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Comenzar mi proyecto ahora
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
