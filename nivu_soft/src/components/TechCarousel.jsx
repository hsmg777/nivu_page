import React from 'react';
import '../css/carousel.css';

const technologies = [
  { name: 'React', logo: '/images/react.png' },
  { name: 'Laravel', logo: '/images/laravel.png' },
  { name: 'Tailwind CSS', logo: '/images/tailwind.png' },
  { name: 'Node.js', logo: '/images/node.png' },
  { name: 'Docker', logo: '/images/docker.png' },
  { name: 'OpenAI API', logo: '/images/openai.png' },
  { name: 'Python', logo: '/images/python.png' },
  { name: 'C#', logo: '/images/csharp.png' },
  { name: 'Java', logo: '/images/java.png' },
];

export default function TechCarousel() {
  return (
    <section className="mb-16 px-4">
      <h2 className="text-3xl md:text-4xl font-bold text-center text-[#002b62] mb-10 tracking-tight">
        Tecnologías que manejamos
      </h2>

      <div className="carousel-wrapper">
        <div className="carousel-track">
          {[...technologies, ...technologies].map((tech, index) => (
            <div key={index} className="carousel-slide">
              <img
                src={tech.logo}
                alt={tech.name}
                className="w-16 h-16 object-contain mb-2"
              />
              <p className="text-indigo-900 font-semibold">{tech.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
