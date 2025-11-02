import { Card, CardContent } from './ui/card';
import { Star, Quote } from 'lucide-react';
import { motion } from 'motion/react';

const testimonials = [
  {
    id: 1,
    name: 'Carlos Mendoza',
    role: 'CEO de Watones Network',
    company: 'Watones Network',
    content: 'NivuSoft transformó completamente nuestra plataforma gaming. El equipo es extremadamente profesional, cumplen los plazos establecidos y siempre están disponibles cuando necesitamos mejoras. Las ventas online aumentaron 300% desde el lanzamiento.',
    rating: 5,
    avatar: 'CM',
    result: '+300% en ventas',
  },
  {
    id: 2,
    name: 'Bernardo Varea',
    role: 'Gerente general',
    company: 'Vida Buena Ec',
    content: 'La atención al detalle en nuestra página de medicina prepagada fue excepcional. El soporte continuo y las actualizaciones constantes han sido fundamentales para nuestro crecimiento. Mil gracias! Excelente trabajo',
    rating: 5,
    avatar: 'BV',
    result: '500+ pacientes activos',
  },
  {
    id: 3,
    name: 'Roberto Salazar',
    role: 'Administrador',
    company: 'Fundación María Augusta Ochoa Andrade',
    content: 'Nuestra página web corporativa superó todas nuestras expectativas. nos acompañaron en todo el proceso de diseño y corrección del mismo, el SEO nos permitio darnos a conocer en internet.',
    rating: 5,
    avatar: 'RS',
    result: 'Buen posicionamiento en Google',
  },
];

export function Testimonials() {
  return (
    <section id="testimonios" className="py-20 bg-slate-50">
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
            Lo Que Dicen Nuestros Clientes
          </h2>
          <p className="text-xl text-slate-600">
            100% de clientes satisfechos. Lee las experiencias reales de empresas que confiaron en nosotros.
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full hover:shadow-2xl transition-all duration-300 border-2 border-slate-200 hover:border-[#00D4FF]/50 relative">
                <Quote className="absolute top-6 right-6 h-10 w-10 text-[#00D4FF]/20" />
                
                <CardContent className="pt-8 relative">
                  {/* Stars */}
                  <div className="flex space-x-1 mb-6">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-[#00D4FF] text-[#00D4FF]" />
                    ))}
                  </div>

                  {/* Content */}
                  <p className="text-slate-700 mb-6 leading-relaxed italic">
                    "{testimonial.content}"
                  </p>

                  {/* Result Badge */}
                  <div className="inline-flex items-center space-x-2 px-3 py-1.5 bg-[#00D4FF]/10 border border-[#00D4FF]/20 rounded-full mb-6">
                    <span className="text-sm font-semibold text-[#00D4FF]">Resultado: {testimonial.result}</span>
                  </div>

                  {/* Author */}
                  <div className="flex items-center space-x-4 pt-6 border-t border-slate-200">
                    <div className="w-14 h-14 rounded-full bg-[#00D4FF] flex items-center justify-center shadow-md flex-shrink-0">
                      <span className="text-slate-900 font-bold text-lg">{testimonial.avatar}</span>
                    </div>
                    <div>
                      <div className="font-semibold text-slate-900">{testimonial.name}</div>
                      <div className="text-sm text-slate-600">{testimonial.role}</div>
                      <div className="text-xs text-slate-500">{testimonial.company}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Trust Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="inline-flex flex-col items-center space-y-2 bg-white border-2 border-slate-200 rounded-2xl px-8 py-6 shadow-lg">
            <div className="flex items-center space-x-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-6 w-6 fill-[#00D4FF] text-[#00D4FF]" />
              ))}
            </div>
            <div className="text-3xl font-bold text-slate-900">5.0</div>
            <div className="text-slate-600">Calificación promedio basada en +50 proyectos</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
