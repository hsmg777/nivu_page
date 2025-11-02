import { Search, Palette, Code, Rocket, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';

const steps = [
  {
    id: 1,
    icon: Search,
    title: '1. Análisis y Planificación',
    description: 'Entendemos tu negocio, objetivos y necesidades específicas. Definimos juntos el alcance del proyecto.',
    features: ['Reunión inicial gratuita', 'Análisis de requerimientos', 'Propuesta detallada']
  },
  {
    id: 2,
    icon: Palette,
    title: '2. Diseño UI/UX',
    description: 'Creamos prototipos y diseños visuales que representan la identidad de tu marca de forma profesional.',
    features: ['Mockups visuales', 'Prototipo interactivo', 'Hasta 3 revisiones']
  },
  {
    id: 3,
    icon: Code,
    title: '3. Desarrollo',
    description: 'Programamos tu solución usando tecnologías modernas y mejores prácticas de la industria.',
    features: ['Código de calidad', 'Arquitectura escalable', 'Testing completo']
  },
  {
    id: 4,
    icon: Rocket,
    title: '4. Lanzamiento y Soporte',
    description: 'Desplegamos tu proyecto y te acompañamos con soporte y capacitación continua para asegurar el éxito.',
    features: ['Despliegue profesional', 'Capacitación incluida', 'Soporte 24/7']
  },
];

export function Process() {
  return (
    <section id="proceso" className="py-20 bg-white">
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
            Cómo Trabajamos
          </h2>
          <p className="text-xl text-slate-600">
            Un proceso simple, transparente y probado en más de 50 proyectos exitosos
          </p>
        </motion.div>

        {/* Process Steps */}
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-slate-50 border-2 border-slate-200 hover:border-[#00D4FF]/50 rounded-2xl p-8 hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 rounded-xl bg-[#00D4FF] flex items-center justify-center shadow-lg">
                      <step.icon className="h-8 w-8 text-slate-900" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-slate-900 mb-3">
                      {step.title}
                    </h3>
                    <p className="text-slate-600 mb-4 leading-relaxed">
                      {step.description}
                    </p>
                    <ul className="space-y-2">
                      {step.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center text-sm text-slate-700">
                          <CheckCircle2 className="h-4 w-4 text-[#00D4FF] mr-2 flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16 max-w-4xl mx-auto"
        >
          <div className="bg-gradient-to-r from-[#00D4FF]/10 to-sky-500/10 border-2 border-[#00D4FF]/20 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-slate-900 mb-4 text-center">
              Metodología Ágil y Transparente
            </h3>
            <p className="text-slate-700 mb-6 text-center text-lg leading-relaxed max-w-2xl mx-auto">
              Trabajamos con metodología ágil: entregas semanales, comunicación constante y total transparencia. 
              Siempre sabrás en qué estamos trabajando.
            </p>
            <div className="grid sm:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-white shadow-md flex items-center justify-center mx-auto mb-3">
                  <CheckCircle2 className="h-8 w-8 text-[#00D4FF]" />
                </div>
                <div className="font-semibold text-slate-900">Entregas Semanales</div>
                <div className="text-sm text-slate-600 mt-1">Ver progreso constante</div>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-white shadow-md flex items-center justify-center mx-auto mb-3">
                  <CheckCircle2 className="h-8 w-8 text-[#00D4FF]" />
                </div>
                <div className="font-semibold text-slate-900">Comunicación Directa</div>
                <div className="text-sm text-slate-600 mt-1">WhatsApp y videollamadas</div>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-white shadow-md flex items-center justify-center mx-auto mb-3">
                  <CheckCircle2 className="h-8 w-8 text-[#00D4FF]" />
                </div>
                <div className="font-semibold text-slate-900">100% Transparente</div>
                <div className="text-sm text-slate-600 mt-1">Sin costos ocultos</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
