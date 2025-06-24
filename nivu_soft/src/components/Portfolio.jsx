function Portfolio() {
  const proyectos = [
    {
      nombre: 'Proyecto 1',
      descripcion: 'Descripción corta',
      imagen: 'https://via.placeholder.com/390x312?text=Proyecto+1',
    },
    {
      nombre: 'Proyecto 2',
      descripcion: 'Descripción corta',
      imagen: 'https://via.placeholder.com/390x312?text=Proyecto+2',
    },
    {
      nombre: 'Proyecto 3',
      descripcion: 'Descripción corta',
      imagen: 'https://via.placeholder.com/390x312?text=Proyecto+3',
    },
  ];

  return (
    <section className="bg-white py-16" id="portafolio">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold mb-12 text-blue-900">Portafolio</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {proyectos.map((proyecto, index) => (
            <div key={index} className="flex flex-col items-center">
              <img
                src={proyecto.imagen}
                alt={proyecto.nombre}
                className="rounded-lg shadow-md w-[390px] h-[312px] object-cover"
              />
              <h3 className="mt-4 font-semibold text-lg text-gray-800">
                {proyecto.nombre}
              </h3>
              <p className="text-gray-500 text-sm">{proyecto.descripcion}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Portfolio;
