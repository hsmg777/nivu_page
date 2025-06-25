import TechCarousel from "../components/TechCarousel";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#e0f7ff] via-[#f2fbff] to-white py-12 px-6 md:px-16">

      <h1 className="text-4xl font-bold text-center text-[#002b62] mb-12">Conócenos</h1>

      {/* Sección de Historia, Emilio y Hayland en estructura de grilla */}
      <div className="grid md:grid-cols-2 gap-8 mb-16">
        {/* Historia grande a la izquierda */}
        <div className="bg-gray-100 p-6 rounded-xl shadow">
          <h2 className="text-2xl font-bold text-[#002b62] mb-4">Nuestra historia</h2>
          <p className="text-gray-700 text-base leading-relaxed">
            Nivu Soft nació con la misión de digitalizar procesos y crear soluciones a medida para negocios que buscan crecer en el mundo digital. Fundada por un grupo de jóvenes apasionados por la tecnología y la innovación, hemos trabajado en distintos sectores ayudando a empresas a modernizarse con sistemas web, automatizaciones y asesoramiento especializado.
          </p>
        </div>

        {/* Lado derecho: Emilio arriba, Hayland abajo */}
        <div className="flex flex-col gap-8">
          <div className="bg-gray-100 p-6 rounded-xl shadow">
            <h2 className="text-2xl font-bold text-[#002b62] mb-4">Emilio info</h2>
            <p className="text-gray-700 text-base leading-relaxed">
              Emilio es ingeniero en software con años de experiencia en desarrollo backend, arquitectura de sistemas y liderazgo de proyectos. Apasionado por la eficiencia, lidera la visión tecnológica de Nivu Soft asegurando que cada solución cumpla con altos estándares de calidad y escalabilidad.
            </p>
          </div>
          <div className="bg-gray-100 p-6 rounded-xl shadow">
            <h2 className="text-2xl font-bold text-[#002b62] mb-4">Hayland info</h2>
            <p className="text-gray-700 text-base leading-relaxed">
              Hayland es desarrollador full stack y diseñador de experiencia de usuario. Encargado de transformar ideas en interfaces amigables y modernas, combina su creatividad con habilidades técnicas para entregar productos funcionales y visualmente atractivos.
            </p>
          </div>
        </div>
      </div>

      {/* Tecnologías - Carrusel */}
      <TechCarousel />
    </div>
  );
}
