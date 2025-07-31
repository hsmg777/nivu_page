import React from 'react';
import '../css/Portafolio.css'; // Importamos el CSS externo

function Portfolio() {
  const proyectos = [
    {
      nombre: 'Vida Buena Ec',
      descripcion: (
        <>
          Desarrollo y puesta en producción de la pagina web para la compañia de medicina prepagada, tiene notificaciones <br /> automaticasy funcionalidades hechas a medida de la empresa.
        </>
      ),
      imagen: '/images/vidabuena.png',
    },
    {
      nombre: 'Teramont',
      descripcion: (
        <>
          Colaboración en la plataforma digital de Teramont Host, una empresa de servicios de hosting.<br />
          El proyecto permite mostrar sus productos, planes personalizados y paneles de administración<br />
          adaptados a cada tipo de servicio.<br />
        </>
      ),
      imagen: '/images/teramont.png',
    },
    {
      nombre: 'Bee Concert Club',
      descripcion: (
        <>
          Bee Concert Club es un sistema inteligente para la discoteca de Quito que digitaliza las reservas con códigos QR,<br />
          gestionados desde un panel administrativo. Permite aprobar reservas, enviar notificaciones por correo<br />
          y publicar fotos o eventos, optimizando así la experiencia del club.
        </>
      ),
      imagen: '/images/beeclub.jpeg',
    },
    {
      nombre: 'Watones',
      descripcion: (
        <>
          Sitio web creado para Watones Network, una comunidad de servidores Minecraft.<br />
          El sistema presenta información clave sobre sus modalidades de juego, rangos VIP, tienda en línea,<br />
          y enlaces de acceso.<br />
          Fue desarrollado con un enfoque visual atractivo y funcional,<br />
          orientado a mejorar la experiencia de sus jugadores y facilitar el crecimiento de la red.
        </>
      ),
      imagen: '/images/watones.png',
    },
    {
      nombre: 'SysByte',
      descripcion: (
        <>
          SysByte es un sistema integral diseñado para productores agrícolas que permite registrar cosechas,<br />
          gestionar stock de champiñones, controlar ingresos, gastos y ventas,<br />
          y generar alertas en tiempo real cuando el inventario está bajo.<br />
          Optimiza la gestión operativa y financiera de forma eficiente y segura.
        </>
      ),
      imagen: '/images/sysbyte.jpeg',
    },
    {
      nombre: 'Magic Water',
      descripcion: (<>Sistema web desarrollado para Magic Water, una empresa ubicada en Florida especializada en servicios de plomería, <br />soluciones hidráulicas y mantenimiento integral de sistemas de agua residenciales y comerciales. <br />El sitio fue diseñado para comunicar de forma clara sus servicios,<br /> agendar visitas técnicas y facilitar el contacto con clientes que enfrentan problemas como fugas, filtraciones o instalaciones complejas.</>),
      imagen: '/images/magicwater.jpeg',
    },
    {
      nombre: 'Infinity Water',
      descripcion:(<>Sitio web corporativo creado para Infinity Water, empresa dedicada a la fabricación y comercialización de <br/>filtros y sistemas de purificación de agua en Florida. La plataforma expone los beneficios de sus productos frente a los problemas comunes<br/> del agua en la región (pozos contaminados, acumulación de minerales, sistemas sépticos), <br/>y permite a los clientes conocer, cotizar y adquirir soluciones efectivas para el hogar.</>),
      imagen: '/images/infiniwater.jpeg',
    },
  ];

  return (
    <section className="portfolio-section" id="portafolio">
      <div className="portfolio-container">
        <h2 className="portfolio-title">Portafolio</h2>
        <div className="carousel-wrapper">
          <div className="carousel">
            {proyectos.map((proyecto, index) => (
              <div key={index} className="carousel-item">
                <img
                  src={proyecto.imagen}
                  alt={proyecto.nombre}
                  className="carousel-img"
                />
                <h3 className="carousel-name">{proyecto.nombre}</h3>
                <p className="carousel-desc">{proyecto.descripcion}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Portfolio;
