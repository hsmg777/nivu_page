import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { ExternalLink, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'motion/react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Button } from './ui/button';
import { useKeenSlider } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css';
import { useState } from 'react';

const projects = [
  {
    id: 1,
    name: 'Bee Concert Club',
    description:
      'App web para discoteca en QUITO, gestiona reservas con QR para sus eventos y validacion del QR unico en cada evento, envio de invitacion automaticas para eventos privados y evaluación de metricas.',
    category: 'App web',
    tags: ['Reservas QR', 'Evaluación de métricas', 'Gestión de eventos'],
    image:
      '/images/bee.jpeg',
    result: 'Gestión y validacion de eventos con reservas y QR',
    href: 'https://beeconcertclub.com/',
  },
  {
    id: 5,
    name: 'Multitalent ATS + IA',
    description:
      'Sistema institucional web para captación de postulantes, seguimiento de proceso de selección y onboarding con notificaciones automatica e INTELIGECIA ARTIFICIAL.',
    category: 'Sistema ATS Institucional + IA',
    tags: ['ATS', 'Inteligencia artificial', 'Automatización'],
    image:
      '/images/multi.jpeg',
    result: 'Optimización de procesos; + 250 Postulantes ',
    href: 'https://multitalent.multiapoyo.com.ec',
  },
  {
    id: 2,
    name: 'Caesa Group Mexico ',
    description:
      'Web corporativa con SEO avanzado, conexión con redes sociales y whatsapp, conexión con hotmart para venta de cursos.',
    category: 'Web Corporativa',
    tags: ['SEO', 'Redes sociales', 'Whatsapp', 'Hotmart'],
    image:
      '/images/caesa.jpeg',
    result: '+150 clientes interesados en cursos y dirección del flujo a comunidad de whatsapp',
    href: 'https://cursos.caesagroup.com/',
  },
  {
    id: 2,
    name: 'Taencu SA',
    description:
      'Web corporativa con SEO basico, conexión con redes sociales, formulario de contacto y Blog autogestionable!',
    category: 'Web Corporativa',
    tags: ['SEO', 'Redes sociales', 'Formulario de contacto', 'Blog autogestionable'],
    image:
      '/images/taencu.jpeg',
    result: '+30 empresas certificandose con sus servicios',
    href: 'https://taencu.com/',
  },
  {
    id: 2,
    name: 'Autogruas Ec',
    description:
      'Landing Page con SEO basico, conexión con redes sociales y whatsapp, conexión con meta ads para publicidad.',
    category: 'Landing Page',
    tags: ['SEO', 'Redes sociales', 'Whatsapp', 'Meta ads'],
    image:
      '/images/gruas.jpeg',
    result: '+30 clientes diarios por llamas y mensajes de WhatsApp',
    href: 'https://autogruasec.com/',
  },
  {
    id: 2,
    name: 'Thomson School',
    description:
      'Landing Page institucional, conexión con redes sociales y whatsapp, formulario de contacto y pagina de protección de datos.',
    category: 'Landing Page',
    tags: ['Redes sociales', 'Whatsapp', 'Formulario de contacto', 'Protección de datos'],
    image:
      '/images/tschool.jpeg',
    result: 'Web institucional para sus alumnos y nuevos alumnos',
    href: 'https://thomsonschool.edu.ec/',
  },
  {
    id: 2,
    name: 'Fundacion Maria Augusta Ochoa',
    description:
      'Landing Page con SEO basico, conexión con redes sociales y pasarela de pagos integrada para donaciones',
    category: 'Landing page',
    tags: ['Redes sociales', 'Pasarela de pagos', 'Carga rapida'],
    image:
      '/images/mao.jpeg',
    result: 'Donaciones y ayuda comunitaria',
    href: 'https://fundacionmariaaugustaochoaandrade.com/',
  },
  {
    id: 3,
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
    id: 4,
    name: 'Fast Cleaning Laundry',
    description:
      'Sitio web corporativo con conexión con reseñas de Google, SEO avanzado y notificaciones automáticas',
    category: 'Servicios de lavanderia',
    tags: ['SEO Avanzado', 'Blog', 'Formularios'],
    image:
      '/images/fc.jpeg',
    result: 'Mayor atracción de clientes',
    href: 'https://fastcleaninglaundry.com',
  },
  {
    id: 6,
    name: 'Infinity Water',
    description:
      'Página web corporativa para empresa Estado Unidense, con SEO avanzado, sistema de formularios inteligentes.',
    category: 'Corporativo',
    tags: ['SEO avanzado', 'Internacional', 'Posicionamiento en web'],
    image:
      '/images/inw.jpeg',
    result: '+30 clientes /mes',
    href: 'https://infinitywatersite.com/',
  },
  {
    id: 7,
    name: 'Watones Network',
    description:
      'Plataforma gaming completa con tienda en línea, sistema de membresías VIP y panel administrativo.',
    category: 'E-commerce',
    tags: ['Tienda Online', 'Sistema VIP', 'Panel Admin'],
    image: '/images/wtns.jpeg',
    result: '+300% ventas online',
    href: 'https://tienda.watones.net/',
  },

];

export function Portfolio() {
  const [loaded, setLoaded] = useState(false)
  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>(
    {
      loop: true,
      mode: "free-snap",
      slides: {
        perView: 1,
        spacing: 15,
      },
      breakpoints: {
        '(min-width: 640px)': {
          slides: { perView: 2, spacing: 15 },
        },
        '(min-width: 1024px)': {
          slides: { perView: 3, spacing: 30 },
        },
      },
      created() {
        setLoaded(true)
      },
    },
    [
      (slider: any) => {
        let timeout: ReturnType<typeof setTimeout>
        let mouseOver = false
        function clearNextTimeout() {
          clearTimeout(timeout)
        }
        function nextTimeout() {
          clearTimeout(timeout)
          if (mouseOver) return
          timeout = setTimeout(() => {
            slider.next()
          }, 3000)
        }
        slider.on("created", () => {
          slider.container.addEventListener("mouseover", () => {
            mouseOver = true
            clearNextTimeout()
          })
          slider.container.addEventListener("mouseout", () => {
            mouseOver = false
            nextTimeout()
          })
          nextTimeout()
        })
        slider.on("dragStarted", clearNextTimeout)
        slider.on("animationEnded", nextTimeout)
        slider.on("updated", nextTimeout)
      },
    ]
  )

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
          <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-4">Proyectos Recientes y Exitosos</h2>
          <p className="text-xl text-slate-600">
            Casos reales recientes de empresas ecuatorianas e internacionales que confiaron en nosotros
          </p>
        </motion.div>

        {/* Projects Carousel */}
        <div className="relative group px-4 sm:px-10">
          <div ref={sliderRef} className="keen-slider mb-12">
            {projects.map((project) => (
              <div key={project.id} className="keen-slider__slide h-full py-4">
                <Card className="relative h-full overflow-hidden hover:shadow-2xl transition-all duration-300 group/card border-2 border-slate-200 hover:border-[#00D4FF]/50 cursor-pointer">
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
                      className="w-full h-full object-cover group-hover/card:scale-110 transition-transform duration-500"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6">
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
              </div>
            ))}
          </div>

          {/* Navigation Arrows */}
          {loaded && instanceRef.current && (
            <>
              <Button
                variant="outline"
                size="icon"
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 sm:translate-x-0 z-20 bg-white/80 hover:bg-white shadow-lg border-2 border-slate-200 text-slate-700 hover:text-[#00D4FF] hover:border-[#00D4FF] rounded-full w-10 h-10 hidden sm:flex"
                onClick={(e) => {
                  e.stopPropagation();
                  instanceRef.current?.prev();
                }}
                aria-label="Previous slide"
              >
                <ChevronLeft className="h-6 w-6" />
              </Button>

              <Button
                variant="outline"
                size="icon"
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 sm:translate-x-0 z-20 bg-white/80 hover:bg-white shadow-lg border-2 border-slate-200 text-slate-700 hover:text-[#00D4FF] hover:border-[#00D4FF] rounded-full w-10 h-10 hidden sm:flex"
                onClick={(e) => {
                  e.stopPropagation();
                  instanceRef.current?.next();
                }}
                aria-label="Next slide"
              >
                <ChevronRight className="h-6 w-6" />
              </Button>
            </>
          )}
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
