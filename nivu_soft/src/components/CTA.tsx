import { Button } from './ui/button';
import { Phone, Mail, MessageCircle, ArrowRight, Clock, Shield, Award } from 'lucide-react';
import { motion } from 'motion/react';

export function CTA() {
  const handleWhatsApp = () => {
    window.open('https://wa.me/593994993430?text=Hola, me interesa conocer más sobre sus servicios de desarrollo de software', '_blank');
  };

  const handleEmail = () => {
    window.location.href = 'mailto:nivusoftware@gmail.com?subject=Consulta sobre servicios de desarrollo';
  };

  return (
    <section id="contacto" className="py-20 bg-gradient-to-b from-slate-900 to-slate-800 text-white relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#00D4FF]/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#00D4FF]/5 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">
              ¿Listo Para Comenzar Tu Proyecto?
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Conversemos 15 minutos y te proponemos el plan ideal con un roadmap claro. 
              Sin compromiso y totalmente gratis.
            </p>
          </motion.div>

          {/* Contact Cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 hover:bg-white/15 transition-all duration-300"
            >
              <Phone className="h-8 w-8 text-[#00D4FF] mb-4" />
              <h3 className="font-semibold mb-2">Llamada Directa</h3>
              <p className="text-sm text-slate-300 mb-4">Habla con un experto ahora mismo</p>

              <Button
                asChild
                className="w-full bg-[#00D4FF] hover:bg-[#00B8E6] text-slate-900 font-semibold"
              >
                <a href="tel:+593994993430">Llamar Ahora</a>
              </Button>
            </motion.div>


            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 hover:bg-white/15 transition-all duration-300"
            >
              <MessageCircle className="h-8 w-8 text-[#00D4FF] mb-4" />
              <h3 className="font-semibold mb-2">WhatsApp</h3>
              <p className="text-sm text-slate-300 mb-4">Chatea con nosotros 24/7</p>
              <Button
                onClick={handleWhatsApp}
                className="w-full bg-[#00D4FF] hover:bg-[#00B8E6] text-slate-900 font-semibold"
              >
                Abrir WhatsApp
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 hover:bg-white/15 transition-all duration-300"
            >
              <Mail className="h-8 w-8 text-[#00D4FF] mb-4" />
              <h3 className="font-semibold mb-2">Email</h3>
              <p className="text-sm text-slate-300 mb-4">Envíanos tu consulta detallada</p>
              <Button
                onClick={handleEmail}
                className="w-full bg-[#00D4FF] hover:bg-[#00B8E6] text-slate-900 font-semibold"
              >
                Enviar Email
              </Button>
            </motion.div>
          </div>

          {/* Guarantees */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="grid sm:grid-cols-3 gap-8 pt-12 border-t border-white/20"
          >
            <div className="flex items-start space-x-3">
              <Clock className="h-6 w-6 text-[#00D4FF] flex-shrink-0 mt-1" />
              <div>
                <div className="font-semibold mb-1">Respuesta en menos de 24 horas</div>
                <div className="text-sm text-slate-300">Te contactamos inmediatamente</div>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <Shield className="h-6 w-6 text-[#00D4FF] flex-shrink-0 mt-1" />
              <div>
                <div className="font-semibold mb-1">Sin compromiso</div>
                <div className="text-sm text-slate-300">Cotización gratuita y sin obligación</div>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <Award className="h-6 w-6 text-[#00D4FF] flex-shrink-0 mt-1" />
              <div>
                <div className="font-semibold mb-1">100% Satisfacción</div>
                <div className="text-sm text-slate-300">Garantizamos tu completa satisfacción</div>
              </div>
            </div>
          </motion.div>

          {/* Main CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Button
              size="lg"
              onClick={handleWhatsApp}
              className="bg-[#00D4FF] hover:bg-[#00B8E6] text-slate-900 font-semibold shadow-2xl shadow-[#00D4FF]/30 text-lg h-16 px-10"
            >
              Comenzar Mi Proyecto Ahora
              <ArrowRight className="ml-2 h-6 w-6" />
            </Button>
            <p className="text-sm text-slate-400 mt-4">
              Únete a las +50 empresas que ya confiaron en NivuSoft
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
