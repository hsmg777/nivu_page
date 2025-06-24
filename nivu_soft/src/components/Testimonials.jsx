function Testimonials() {
  const testimonios = [
    {
      nombre: "Carlos Méndez",
      mensaje: "Excelente servicio, muy profesionales y atentos.",
      avatar: "https://i.pravatar.cc/100?img=1",
    },
    {
      nombre: "María López",
      mensaje: "Diseñaron nuestra web justo como la imaginábamos.",
      avatar: "https://i.pravatar.cc/100?img=2",
    },
    {
      nombre: "Juan Pérez",
      mensaje: "El equipo de Nivu Soft fue rápido y eficiente.",
      avatar: "https://i.pravatar.cc/100?img=3",
    },
    {
      nombre: "Ana Torres",
      mensaje: "Recomendados al 100%, gran experiencia.",
      avatar: "https://i.pravatar.cc/100?img=4",
    },
    {
      nombre: "Luis Herrera",
      mensaje: "Buena comunicación y excelente resultado final.",
      avatar: "https://i.pravatar.cc/100?img=5",
    },
    {
      nombre: "Gabriela Núñez",
      mensaje: "Los contrataría de nuevo sin dudarlo.",
      avatar: "https://i.pravatar.cc/100?img=6",
    },
  ];

  return (
    <section className="bg-sky-500 py-16" id="testimonios">
      <div className="max-w-6xl mx-auto px-6 text-center text-white">
        <h2 className="text-3xl font-bold mb-12">Testimonios</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {testimonios.map((item, index) => (
            <div
              key={index}
              className="bg-white text-gray-700 rounded-lg shadow-lg p-6 flex flex-col items-center"
            >
              <img
                src={item.avatar}
                alt={item.nombre}
                className="w-16 h-16 rounded-full mb-4"
              />
              <h3 className="font-semibold text-base">{item.nombre}</h3>
              <p className="text-sm text-gray-600 mt-2 text-center">
                “{item.mensaje}”
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
