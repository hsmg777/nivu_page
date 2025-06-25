import { motion } from "framer-motion";
import { Link } from 'react-router-dom';


export default function About() {
  return (
    <motion.section
      id="nosotros"
      className="flex flex-col md:flex-row items-center justify-between px-6 md:px-20 py-20 bg-[#f8f9ff] gap-10 min-h-[400px] scroll-mt-32"
      initial={{ opacity: 0, y: 50, filter: "blur(1.5px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      viewport={{ once: false, amount: 0.3 }}
    >
      <motion.div
        className="flex-1 max-w-xl"
        initial={{ opacity: 0, x: -40 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        viewport={{ once: false, amount: 0.3 }}
      >
        <h2 className="text-4xl font-extrabold text-[#071952] mb-6">¿Quiénes somos?</h2>
        <p className="text-lg text-gray-700 leading-relaxed mb-8">
          En <strong className="text-[#071952]">Nivu Soft</strong> creamos soluciones digitales a medida
          para potenciar tu negocio. Combinamos ingeniería y diseño moderno para
          desarrollar sitios rápidos, únicos y funcionales.
        </p>
        <Link
          to="/aboutpage"
          className="bg-[#071952] text-white py-3 px-6 rounded-xl font-semibold text-base hover:bg-[#19376d] transition duration-300 inline-block"
        >
          💡 Conoce más
        </Link>

      </motion.div>

      <motion.div
        className="flex-1 flex flex-col md:flex-row justify-center gap-10 mt-10 md:mt-0"
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: "easeOut", delay: 0.1 }}
        viewport={{ once: false, amount: 0.3 }}
      >
        <div className="text-center">
          <img
            src="/images/emilio.png"
            alt="Emilio Albornoz"
            className="w-52 h-52 rounded-full mx-auto shadow-xl object-cover"
          />
          <h3 className="text-lg font-semibold text-[#071952] mt-4">Emilio Albornoz</h3>
          <p className="text-sm text-[#071952]">CEO / CTO</p>
        </div>

        <div className="text-center">
          <img
            src="/images/hsmg.png"
            alt="Hayland Montalvo"
            className="w-52 h-52 rounded-full mx-auto shadow-xl object-cover"
          />
          <h3 className="text-lg font-semibold text-[#071952] mt-4">Hayland Montalvo</h3>
          <p className="text-sm text-[#071952]">CEO / CTO</p>
        </div>
      </motion.div>
    </motion.section>
  );
}
