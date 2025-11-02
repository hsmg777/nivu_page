import { Button } from './ui/button';
import { ArrowRight, CheckCircle2, Star } from 'lucide-react';
import { motion } from 'motion/react';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function Hero() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-slate-50 to-white pt-28 pb-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-center lg:text-left"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-flex items-center space-x-2 px-4 py-2.5 bg-[#00D4FF]/10 border border-[#00D4FF]/20 rounded-full mb-6"
            >
              <div className="flex items-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-3.5 w-3.5 fill-[#00D4FF] text-[#00D4FF]" />
                ))}
              </div>
              <span className="text-sm font-semibold text-slate-700">Empresa ecuatoriana líder en software</span>
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 mb-6 leading-tight"
            >
              Transformamos tus ideas en{' '}
              <span className="text-[#00D4FF]">software profesional</span>
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="text-xl text-slate-600 mb-8 leading-relaxed max-w-2xl mx-auto lg:mx-0"
            >
              Desarrollo de páginas web, aplicaciones móviles y sistemas SaaS con tecnología de vanguardia. 
              Desde <strong className="text-slate-900">$70 USD</strong>.
            </motion.p>

            {/* Trust Indicators */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="flex flex-wrap gap-6 justify-center lg:justify-start mb-8"
            >
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="h-5 w-5 text-[#00D4FF]" />
                <span className="text-slate-700 font-medium">50+ proyectos entregados</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="h-5 w-5 text-[#00D4FF]" />
                <span className="text-slate-700 font-medium">100% clientes satisfechos</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="h-5 w-5 text-[#00D4FF]" />
                <span className="text-slate-700 font-medium">Soporte 24/7</span>
              </div>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <Button
                size="lg"
                onClick={() => scrollToSection('servicios')}
                className="bg-[#00D4FF] hover:bg-[#00B8E6] text-slate-900 font-semibold shadow-xl shadow-[#00D4FF]/30 hover:shadow-2xl hover:shadow-[#00D4FF]/40 transition-all duration-300 text-lg h-14 px-8"
              >
                Ver servicios y precios
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => scrollToSection('portafolio')}
                className="border-2 border-slate-300 text-slate-700 hover:bg-slate-50 hover:border-[#00D4FF] hover:text-[#00D4FF] font-semibold text-lg h-14 px-8 transition-all duration-300"
              >
                Ver proyectos
              </Button>
            </motion.div>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-slate-200">
              <img
                src="/images/oficinas.png"
                alt="Desarrollo de Software"
                className="w-full h-auto"
              />
            </div>

            {/* Floating Badges */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.8 }}
              className="absolute -left-4 top-1/4 bg-white p-4 rounded-xl shadow-xl border border-slate-200 hidden lg:block"
            >
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 rounded-lg bg-[#00D4FF] flex items-center justify-center">
                  <CheckCircle2 className="h-6 w-6 text-slate-900" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-slate-900">Desde</div>
                  <div className="text-xl font-bold text-[#00D4FF]">$70 USD</div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 1 }}
              className="absolute -right-4 bottom-1/4 bg-white p-4 rounded-xl shadow-xl border border-slate-200 hidden lg:block"
            >
              <div className="text-center">
                <div className="text-3xl font-bold text-slate-900 mb-1">100%</div>
                <div className="text-sm text-slate-600">Satisfacción</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
